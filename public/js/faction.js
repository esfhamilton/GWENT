const socket = io();
let SID;
// Get session ID from URL
const roomQuery = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

SID = +Object.values(roomQuery);
socket.emit('rejoinRequest', SID);

const factionSelect = document.getElementById('faction');
const factionPerk = document.getElementById('factionPerk');
const factionPerks = {
    NR: 'Draw one extra card whenever you win a round.',
    NG: 'Win rounds that end in a tie.',
    ST: "Choose which player goes first at the start of the match.",
    MO: 'Keep one random non-hero unit on the battlefield between rounds.'
};

function updateFactionPerk() {
    factionPerk.textContent = factionPerks[factionSelect.value];
}

factionSelect.addEventListener('change', updateFactionPerk);
updateFactionPerk();

function submit() {
    const faction = document.getElementById('faction').value;
    location.replace(`${location.origin}/deck.html?SID=${SID}&faction=${faction}`);
}
