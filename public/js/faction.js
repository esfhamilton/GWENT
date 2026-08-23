const socket = io();
let SID;
// Get session ID from URL
const roomQuery = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

SID = +Object.values(roomQuery);
socket.emit('rejoinRequest', SID);

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
