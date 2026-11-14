const socket = io();
let activeRoom;
socket.on('connect', () => {
    if (activeRoom) socket.emit('rejoinRequest', activeRoom, sessionStorage.getItem(`gwent-token:${activeRoom}`));
});

// Get session ID from URL
const roomQuery = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

let lobbyMsg = document.getElementById("msgPlaceholder");

// IF SID is not present in query => create session
// ELSE send joinRequest to session SID
if (Object.keys(roomQuery) != "SID"){
    socket.emit('createRequest');
}
else{
    const SID = +Object.values(roomQuery);
    socket.emit('joinRequest', SID);
}

socket.on('roomCredentials', (room, player, token) => {
    activeRoom = room;
    sessionStorage.setItem(`gwent-token:${room}`, token);
    sessionStorage.removeItem(`gwent-game:${room}:A`);
    sessionStorage.removeItem(`gwent-game:${room}:B`);
});

// Shows session ID to users who have joined a room
socket.on("validRoom", (SID) => {
    lobbyMsg.innerHTML = `Session ID: ${SID}`;
});

// Advances users to faction selection after 2 users have connected to a room
socket.on("continue", (SID) => {
    location.replace(`${location.origin}/faction.html?SID=${SID}`);
});

// Deals with users trying to join a full room
socket.on("full", (SID) => {    
    lobbyMsg.innerHTML = `Error: Room ${SID} is full, please create a new room.`;
});

// Deals with users trying to join a non-existent room
socket.on("invalidRoom", (SID) => {
    lobbyMsg.innerHTML = `ERROR: Room ${SID} is an invalid room, please check the session ID has been entered correctly.`;
});


socket.on('roomsFull', () => { lobbyMsg.textContent = 'All rooms are currently in use. Please try again later.'; });
socket.on('invalidRoom', () => { lobbyMsg.textContent = 'This room has expired or your session is invalid.'; });
socket.on('roomExpired', () => { lobbyMsg.textContent = 'This room has expired.'; });
socket.on('sessionReplaced', () => { lobbyMsg.textContent = 'This session was opened in another connection.'; });
