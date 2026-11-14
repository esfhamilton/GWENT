const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.static('public'))

server = app.listen(PORT);

const io = require('socket.io')(server);

let openRooms = new Set();
let startCheck = {};
let gameData = {};
let redrawnCheck = {};
let roomPassCount = {};
let roomFirstTurn = {};
let rematchCheck = {};
let roomTurn = {};
let roomCleanupTimers = {};
const ROOM_CLEANUP_DELAY_MS = Number(process.env.ROOM_CLEANUP_DELAY_MS) || 30000;
const ROOM_IDLE_MS = Number(process.env.ROOM_IDLE_MS) || 2 * 60 * 60 * 1000;
const ROOM_CAPACITY = Math.min(Number(process.env.ROOM_CAPACITY) || 89999, 89999);
let roomIdleTimers = {};

const roomId = (SID) => String(SID);
const otherPlayer = (player) => player === 'A' ? 'B' : 'A';
const validStrings = (value, max = 150) => Array.isArray(value) && value.length <= max && value.every(item => typeof item === 'string' && item.length <= 100);

function actionIsAuthorised(socket, SID, player = socket.player) {
    const room = roomId(SID);
    return (player === 'A' || player === 'B') &&
        socket.roomId === room && socket.player === player && socket.rooms && socket.rooms[room];
}

function rejectAction(socket) {
    socket.emit('invalidAction');
}

function hasOpenRoom(SID) {
    const room = roomId(SID);
    return openRooms.has(room);
}

function addOpenRoom(SID) {
    const room = roomId(SID);
    openRooms.add(room);
    return room;
}

function cleanupRoom(SID) {
    const room = roomId(SID);
    openRooms.delete(room);
    clearTimeout(roomCleanupTimers[room]);
    clearTimeout(roomIdleTimers[room]);
    delete roomIdleTimers[room];
    io.in(room).emit('roomExpired');
    const members = io.sockets.adapter.rooms[room];
    if (members) Object.keys(members.sockets).forEach(id => io.sockets.sockets[id].leave(room));
    delete startCheck[room + 'A'];
    delete startCheck[room + 'B'];
    delete redrawnCheck[room];
    delete roomPassCount[room];
    delete roomFirstTurn[room];
    delete rematchCheck[room];
    delete roomTurn[room];
    Object.keys(gameData).forEach((PID) => {
        if (PID === room + 'A' || PID === room + 'B') delete gameData[PID];
    });
    delete roomCleanupTimers[room];
}

function touchRoom(SID) {
    const room = roomId(SID);
    if (!hasOpenRoom(room)) return;
    clearTimeout(roomIdleTimers[room]);
    roomIdleTimers[room] = setTimeout(() => cleanupRoom(room), ROOM_IDLE_MS);
}

function scheduleRoomCleanup(SID) {
    const room = roomId(SID);
    if (roomCleanupTimers[room]) return;
    roomCleanupTimers[room] = setTimeout(() => {
        if (!io.sockets.adapter.rooms[room]) cleanupRoom(room);
        else delete roomCleanupTimers[room];
    }, ROOM_CLEANUP_DELAY_MS);
}

function shuffle(deck) {
    var currentIndex = deck.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // Swap remaining element with the current element.
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }
    return deck;
}

io.on('connection', (socket) => {
    socket.use((packet, next) => {
        if (socket.roomId) touchRoom(socket.roomId);
        next();
    });
    socket.on('joinRequest', (SID) => {                
        const room = roomId(SID);
        var numClients = io.sockets.adapter.rooms[room];
        if (!numClients) {
            // Preserve a room while its participants are reconnecting.
            socket.emit('invalidRoom', SID);
            return;
        }
        if (numClients.length < 2){
                // Authorise join request
                socket.join(room);
                touchRoom(room);
                // Emits to both (all) users in SID 
                io.in(room).emit('continue', SID);
        } 
        else {
            socket.emit('full', SID);
        }
    });
    
    socket.on('createRequest', () => {
        if (openRooms.size >= ROOM_CAPACITY) return socket.emit('roomsFull');
        const first = Math.floor(Math.random() * ROOM_CAPACITY);
        let SID;
        for (let offset = 0; offset < ROOM_CAPACITY; offset++) {
            const candidate = 10000 + (first + offset) % ROOM_CAPACITY;
            if (!hasOpenRoom(candidate)) { SID = candidate; break; }
        }
        // Join room and add corresponding SID to openRooms
        const room = addOpenRoom(SID);
        if (roomCleanupTimers[room]) {
            clearTimeout(roomCleanupTimers[room]);
            delete roomCleanupTimers[room];
        }
        socket.join(room);
        touchRoom(room);
        socket.emit('validRoom', SID);
    });
    
    // Reconnects user to room with each new page
    socket.on('rejoinRequest', (SID) => {         
        const room = roomId(SID);
        if (!hasOpenRoom(room) && !gameData[room + 'A'] && !gameData[room + 'B']) {
            socket.emit('invalidRoom', SID);
            return;
        }
        addOpenRoom(room);
        var numClients = io.sockets.adapter.rooms[room];
        if (roomCleanupTimers[room]) {
            clearTimeout(roomCleanupTimers[room]);
            delete roomCleanupTimers[room];
        }
        // Keep the room listed even if both clients are currently reloading.
        if (numClients === undefined || numClients.length < 2){
            socket.join(room);
            touchRoom(room);
        }
        else {
            socket.emit('full', SID);
        }       
    });
    
    // Gets player details from client and stores them on server
    socket.on('playerDeck', (SID, leader, deck, faction) => {
        const room = roomId(SID);
        if (!hasOpenRoom(room) || !socket.rooms[room] || typeof leader !== 'string' || leader.length > 100 ||
            typeof faction !== 'string' || faction.length > 100 || !validStrings(deck)) return rejectAction(socket);
        let playerA = room +'A';
        let playerB = room +'B';

        // Check if first player has already been added
        if (playerA in gameData) {
            // Add data under player B
            gameData[playerB] = {"faction":faction,"leader":leader,"deck":deck,"hand":[],"discarded":[], "fullDeck": deck};
            // Inform client which identifier their data is stored under
            socket.emit('playerAssignment', 'B');
        }
        else {
            // Add data under player A
            gameData[playerA] = {"faction":faction,"leader":leader,"deck":deck,"hand":[],"discarded":[], "fullDeck": deck};
            // Inform client which identifier their data is stored under
            socket.emit('playerAssignment', 'A');
        }
    });
    
    // Returns corresponding deck to the player
    socket.on('getPlayerDeck', (SID, player) => {
        const room = roomId(SID);
        if ((socket.player && (socket.roomId !== room || socket.player !== player)) ||
            !socket.rooms || !socket.rooms[room] || (player !== 'A' && player !== 'B')) {
            rejectAction(socket);
            return;
        }

        let PID = room + player;
        // Catch if game has been entered without a deck
        if(gameData[PID] != undefined){
            socket.roomId = room;
            socket.player = player;
            startCheck[PID] = "Added";
            socket.emit('playerAssigned', gameData[PID]["faction"], gameData[PID]["leader"], shuffle(gameData[PID]["fullDeck"]));
        } 
        else{
            socket.emit('noDeck');
        }
    });

    // Checks whether both players are on the game.html page
    socket.on('startCheck', (SID) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room)) return rejectAction(socket);
        if(room in roomFirstTurn) delete roomFirstTurn[room];
        if ((room+'A') in startCheck && (room+'B') in startCheck) {
            delete startCheck[room+'A'];
            delete startCheck[room+'B'];
            roomPassCount[room] = 0;
            io.in(room).emit('startGame');
        } 
    });
    
    socket.on('getOpponentDeck', (SID, player) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room, player)) return rejectAction(socket);
        if(!(room in roomFirstTurn)) roomFirstTurn[room] = Math.random()>0.5 ? 'A':'B';
        const opponent = gameData[room + otherPlayer(player)];
        if (!opponent) return rejectAction(socket);
        socket.emit('opponentDeck', opponent.faction, opponent.leader, opponent.deck);
    });
    
    // Checks if players have redrawn the starting hand
    socket.on('cardsRedrawn', (SID, player, deck, firstTurn) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room, player) || !validStrings(deck) || !gameData[room + player]) return rejectAction(socket);
        gameData[room + player]["deck"] = deck;
        if(firstTurn === 'A' || firstTurn === 'B') roomFirstTurn[room] = firstTurn;
        if(room in redrawnCheck) {
            // Prevents crash from page refresh, should be true
            if (redrawnCheck[room] != player) {
                delete redrawnCheck[room];
                roomTurn[room] = roomFirstTurn[room];
                io.in(room).emit('firstTurn', roomFirstTurn[room]);
            }       
        }
        else {
            redrawnCheck[room] = player;
            socket.emit('waiting');
        }
    });

    socket.on('passTurn', (SID) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room) || (roomTurn[room] && roomTurn[room] !== socket.player)) return rejectAction(socket);
        roomPassCount[room] = (roomPassCount[room] || 0) + 1;
        if (roomPassCount[room] === 2) {
            roomPassCount[room] = 0;
            delete roomTurn[room];
            io.in(room).emit('endRound');
        }
        else {
            roomTurn[room] = otherPlayer(socket.player);
            io.in(room).emit('passedTurn');
        }
    });

    // A restored game page must re-bind its new socket without asking for a
    // newly shuffled deck or participating in the start-game barrier again.
    socket.on('resumePlayer', (SID, player) => {
        const room = roomId(SID);
        if ((socket.player && (socket.roomId !== room || socket.player !== player)) ||
            !socket.rooms || !socket.rooms[room] || (player !== 'A' && player !== 'B') ||
            !gameData[room + player]) {
            return rejectAction(socket);
        }
        socket.roomId = room;
        socket.player = player;
    });

    socket.on('sendMonsterCard', (SID, player, cardId, posId) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room, player) || typeof cardId !== 'string' || typeof posId !== 'string') return rejectAction(socket);
        let opPlayer = otherPlayer(player);
        io.in(room).emit('syncMonsterCard', opPlayer, cardId, 'op'+posId.substring(0,1).toUpperCase()+posId.substring(1));
    });

    socket.on('getOpponentHand', (SID, player) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room, player)) return rejectAction(socket);
        io.in(room).emit('opponentHandRequested', otherPlayer(player));
    });
    
    socket.on('opponentHandRevealed', (SID, opPlayer, cardsToReveal) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room, opPlayer) || !validStrings(cardsToReveal)) return rejectAction(socket);
        io.in(room).emit('revealOpHandToPlayer', otherPlayer(opPlayer), cardsToReveal.slice(0, 3));
    });
    
    // Switches turn and passes on player choice to opponent 
    socket.on('switchTurn', (SID, cardIDs, posIDs, cardsInHand, abilityUsed) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room) || (roomTurn[room] && roomTurn[room] !== socket.player) ||
            !validStrings(cardIDs) || !validStrings(posIDs) || !Number.isInteger(cardsInHand) || cardsInHand < 0 || cardsInHand > 150 || typeof abilityUsed !== 'boolean') {
            return rejectAction(socket);
        }
        let switchedPosIDs = [];
        for (let i=0; i<posIDs.length; i++){
            // Amend capital and remove op if exists, else add op to string header
            if (posIDs[i].substring(0,2) === 'op') {
                switchedPosIDs.push(posIDs[i].substring(2,3).toLowerCase()+posIDs[i].substring(3));
            }
            else {
                switchedPosIDs.push('op'+posIDs[i].substring(0,1).toUpperCase()+posIDs[i].substring(1));
            }
        }
        
        // Return turn to player if opponent has passed their turn, else switch turn
        if (roomPassCount[room] === 1){
            roomTurn[room] = socket.player;
            io.in(room).emit('returnTurn', cardIDs, switchedPosIDs, cardsInHand, abilityUsed);
        }
        else {
            roomTurn[room] = otherPlayer(socket.player);
            io.in(room).emit('nextTurn', cardIDs, switchedPosIDs, cardsInHand, abilityUsed);
        }
    });
    
    socket.on('endGame', (SID, player) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room, player)) return rejectAction(socket);
        // Call only needs to be emit once to room
        if(player == 'A'){
            io.in(room).emit('results');
        }   
    });

    // Start a new match only when both players have explicitly opted in.
    socket.on('playAgain', (SID, player) => {
        const roomIdValue = roomId(SID);
        if (!actionIsAuthorised(socket, roomIdValue, player)) return rejectAction(socket);
        if (!(roomIdValue in rematchCheck)) rematchCheck[roomIdValue] = {};
        rematchCheck[roomIdValue][player] = true;

        if (rematchCheck[roomIdValue].A && rematchCheck[roomIdValue].B) {
            delete rematchCheck[roomIdValue];
            io.in(roomIdValue).emit('rematchReady');

            // Release both old sockets before their pages reload, so neither
            // reconnect is mistaken for a third player in a full room.
            let room = io.sockets.adapter.rooms[roomIdValue];
            if (room !== undefined) {
                Object.keys(room.sockets).forEach((socketId) => {
                    io.sockets.sockets[socketId].leave(roomIdValue);
                });
            }
        }
        else {
            socket.emit('rematchWaiting');
        }
    });
    
    socket.on('disconnect', () => {
        // Give page refreshes time to reconnect, then release genuinely idle rooms.
        openRooms.forEach((SID) => {
            const room = roomId(SID);
            if (!io.sockets.adapter.rooms[room]) scheduleRoomCleanup(room);
        });
    });
});


