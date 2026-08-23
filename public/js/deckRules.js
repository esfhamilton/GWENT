(function (root, factory) {
    const rules = factory();

    if (typeof module === 'object' && module.exports) module.exports = rules;
    else root.deckRules = rules;
}(typeof self !== 'undefined' ? self : this, function () {
    const factions = [
        { id: 'NR', name: 'Northern Realms', perk: 'Draw one extra card whenever you win a round.', cardAmount: 28 },
        { id: 'NG', name: 'Nilfgaard', perk: 'Win rounds that end in a tie.', cardAmount: 30 },
        { id: 'ST', name: "Scoia'Tael", perk: 'Choose which player goes first at the start of the match.', cardAmount: 37 },
        { id: 'MO', name: 'Monsters', perk: 'Keep one random non-hero unit on the battlefield between rounds.', cardAmount: 39 }
    ];

    const factionIds = factions.map(function (faction) { return faction.id; });

    function getDeckFactionIds(deckFaction) {
        return deckFaction === 'ALL'
            ? factionIds.slice()
            : factionIds.filter(function (factionId) { return factionId === deckFaction; });
    }

    function getGameplayFaction(deckFaction, selectedPerk) {
        if (deckFaction === 'ALL' && factionIds.indexOf(selectedPerk) !== -1) return selectedPerk;
        if (factionIds.indexOf(deckFaction) !== -1) return deckFaction;
        return factionIds[0];
    }

    function getLeaderIds(deckFaction) {
        return getDeckFactionIds(deckFaction).reduce(function (leaderIds, factionId) {
            for (let index = 1; index <= 4; index += 1) leaderIds.push(factionId + 'Leader' + index);
            return leaderIds;
        }, []);
    }

    function getNeutralCardIds() {
        const cardIds = [];
        for (let index = 1; index <= 17; index += 1) cardIds.push('neutral' + index);
        return cardIds;
    }

    function getFactionCardIds(deckFaction) {
        return getDeckFactionIds(deckFaction).reduce(function (cardIds, factionId) {
            const faction = factions.find(function (item) { return item.id === factionId; });
            for (let index = 1; index <= faction.cardAmount; index += 1) cardIds.push(factionId + index);
            return cardIds;
        }, []);
    }

    return {
        factions: factions,
        getDeckFactionIds: getDeckFactionIds,
        getGameplayFaction: getGameplayFaction,
        getLeaderIds: getLeaderIds,
        getNeutralCardIds: getNeutralCardIds,
        getFactionCardIds: getFactionCardIds
    };
}));
