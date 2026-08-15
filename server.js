const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.static('public'))

server = app.listen(PORT);

const io = require('socket.io')(server);

let openRooms = [];
let startCheck = {};
let gameData = {};
let redrawnCheck = {};
let roomPassCount = {};
let roomFirstTurn = {};
let rematchCheck = {};
let roomTurn = {};

const roomId = (SID) => String(SID);
const otherPlayer = (player) => player === 'A' ? 'B' : 'A';

function actionIsAuthorised(socket, SID, player = socket.player) {
    const room = roomId(SID);
    return (player === 'A' || player === 'B') &&
        socket.roomId === room && socket.player === player && socket.rooms && socket.rooms[room];
}

function rejectAction(socket) {
    socket.emit('invalidAction');
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
    socket.on('joinRequest', (SID) => {                
        var numClients = io.sockets.adapter.rooms[''+SID];
        if (numClients != undefined || openRooms.includes(SID)){
            if (numClients.length<2){
                // Authorise join request
                socket.join(SID);
                // Emits to both (all) users in SID 
                io.in(SID).emit('continue', SID);
            } 
            else {
                socket.emit('full', SID);
            }
        } 
        else {
            // numClients should not be undefined and openRoom should contain SID
            socket.emit('invalidRoom', SID);
        }            
    });
    
    socket.on('createRequest', () => {
        // Generates random 5 digit SID 
        let SID = Math.floor(Math.random() * 89999) + 10000; 
        // Ensures new SID generated is not already in openRooms
        if (openRooms.includes(SID)){
            let repeat = true;
            while(repeat){
                SID = Math.floor(Math.random() * 89999) + 10000;
                repeat = openRooms.includes(SID) ? true : false;
            }
        }
        // Join room and add corresponding SID to openRooms
        socket.join(SID);
        socket.emit('validRoom', SID);
        openRooms.push(SID);     
    });
    
    // Reconnects user to room with each new page
    socket.on('rejoinRequest', (SID) => {         
        var numClients = io.sockets.adapter.rooms[''+SID];
        // Keep the room listed even if both clients are currently reloading.
        if (!openRooms.includes(SID)){
            openRooms.push(SID);
        }
        if (numClients === undefined || numClients.length < 2){
            socket.join(SID);
        }
        else {
            socket.emit('full', SID);
        }       
    });
    
    // Gets player details from client and stores them on server
    socket.on('playerDeck', (SID, leader, deck, faction) => {
        let playerA = SID +'A';
        let playerB = SID +'B'; 

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
        let OID;
        if (player === 'A') {
            OID = room + 'B';
            socket.emit('opponentDeck', gameData[OID]["faction"], gameData[OID]["leader"], gameData[OID]["deck"]);
        }
        else {
            OID = room + 'A';
            socket.emit('opponentDeck', gameData[OID]["faction"], gameData[OID]["leader"], gameData[OID]["deck"]); 
        }
    });
    
    // Checks if players have redrawn the starting hand
    socket.on('cardsRedrawn', (SID, player, deck, firstTurn) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room, player) || !Array.isArray(deck)) return rejectAction(socket);
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
        if (!actionIsAuthorised(socket, room, opPlayer) || !Array.isArray(cardsToReveal)) return rejectAction(socket);
        io.in(room).emit('revealOpHandToPlayer', otherPlayer(opPlayer), cardsToReveal.slice(0, 3));
    });
    
    // Switches turn and passes on player choice to opponent 
    socket.on('switchTurn', (SID, cardIDs, posIDs, cardsInHand, abilityUsed) => {
        const room = roomId(SID);
        if (!actionIsAuthorised(socket, room) || (roomTurn[room] && roomTurn[room] !== socket.player) ||
            !Array.isArray(cardIDs) || !Array.isArray(posIDs) || !Number.isInteger(cardsInHand) || typeof abilityUsed !== 'boolean') {
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
        // Check each open room and remove SID if every user has disconnected 
        openRooms.forEach((SID, index) => {
            let numClients = io.sockets.adapter.rooms[''+SID];
            if (numClients === undefined){
                if (index > -1) {
                    openRooms.splice(index, 1);
                    delete rematchCheck[SID];
                }
            }
        });
    });
});


