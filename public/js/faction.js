const socket = io();
let SID;
// Get session ID from URL
const roomQuery = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

SID = +Object.values(roomQuery);
socket.on('connect', () => socket.emit('rejoinRequest', SID, sessionStorage.getItem(`gwent-token:${SID}`)));
socket.on('invalidRoom', () => { document.body.textContent = 'This room has expired or your session is invalid.'; });
socket.on('roomExpired', () => { document.body.textContent = 'This room has expired.'; });
socket.on('sessionReplaced', () => { document.body.textContent = 'This session was opened in another connection.'; });

const factionSelect = document.getElementById('faction');
const perkFactionSelect = document.getElementById('perkFaction');
const factionPerkChoice = document.getElementById('factionPerkChoice');
const factionPerk = document.getElementById('factionPerk');
const factionPerks = deckRules.factions.reduce((perks, faction) => {
    perks[faction.id] = faction.perk;
    return perks;
}, {});

function updateFactionPerk() {
    const isAllFaction = factionSelect.value === 'ALL';
    factionPerkChoice.hidden = !isAllFaction;
    const perkFaction = isAllFaction ? perkFactionSelect.value : factionSelect.value;
    factionPerk.textContent = factionPerks[perkFaction];
}

factionSelect.addEventListener('change', updateFactionPerk);
perkFactionSelect.addEventListener('change', updateFactionPerk);
updateFactionPerk();

function submit() {
    const faction = factionSelect.value;
    const perkFaction = deckRules.getGameplayFaction(faction, perkFactionSelect.value);
    location.replace(`${location.origin}/deck.html?SID=${SID}&faction=${faction}&perk=${perkFaction}`);
}
