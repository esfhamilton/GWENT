const socket = io();

// Get SID and faction ID from URL
const {SID, player} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.emit('rejoinRequest', SID);
socket.emit('getPlayerDeck', SID, player);
socket.emit('startCheck', SID);

// Initialises player faction styles
/*
    TODO Set the actual styles based 
    on faction rather than 8 different
    style objects. Call function for this around line 74
*/
let styles = {deck:"background: url(img/cards_16.jpg) 64.5% 94% / 455% 331%; display: block;",
              lead1:"background: url(img/cards_13.jpg) 64.5% 94% / 455% 331%; display: block;",
              lead2:"background: url(img/cards_13.jpg) 93.4% 94% / 455% 331%; display: block;",
              lead3:"background: url(img/cards_14.jpg) 6.65% 6% / 455% 331%; display: block;",
              lead4:"background: url(img/cards_14.jpg) 35.5% 6% / 455% 331%; display: block;",
              neutral1:"background: url(img/cards_01.jpg) 6.65% 6% / 455% 331%; display: block;",
              neutral2:"background: url(img/cards_01.jpg) 35.5% 6% / 455% 331%; display: block;",
              neutral3:"background: url(img/cards_01.jpg) 64.5% 6% / 455% 331%; display: block;",
              neutral4:"background: url(img/cards_01.jpg) 93.4% 6% / 455% 331%; display: block;",
              neutral5:"background: url(img/cards_01.jpg) 6.65% 50% / 455% 331%; display: block;",
              neutral6:"background: url(img/cards_01.jpg) 35.5% 50% / 455% 331%; display: block;",
              neutral7:"background: url(img/cards_01.jpg) 64.5% 50% / 455% 331%; display: block;",
              neutral8:"background: url(img/cards_12.jpg) 35.5% 50% / 455% 331%; display: block;",
              neutral9:"background: url(img/cards_12.jpg) 64.5% 50% / 455% 331%; display: block;",
              neutral10:"background: url(img/cards_12.jpg) 93.4% 50% / 455% 331%; display: block;",
              neutral11:"background: url(img/cards_12.jpg) 6.65% 94% / 455% 331%; display: block;",
              neutral12:"background: url(img/cards_12.jpg) 35.5% 94% / 455% 331%; display: block;",
              neutral13:"background: url(img/cards_01.jpg) 93.4% 50% / 455% 331%; display: block;",
              neutral14:"background: url(img/cards_01.jpg) 6.65% 94% / 455% 331%; display: block;",
              neutral15:"background: url(img/cards_01.jpg) 35.5% 94% / 455% 331%; display: block;",
              neutral16:"background: url(img/cards_15.jpg) 64.5% 6% / 455% 331%; display: block;",
              neutral17:"background: url(img/cards_01.jpg) 64.5% 94% / 455% 331%; display: block;",
              faction1:"background: url(img/cards_14.jpg) 64.5% 6% / 455% 331%; display: block;",
              faction2:"background: url(img/cards_14.jpg) 93.4% 6% / 455% 331%; display: block;",
              faction3:"background: url(img/cards_14.jpg) 6.65% 50% / 455% 331%; display: block;",
              faction4:"background: url(img/cards_14.jpg) 35.5% 50% / 455% 331%; display: block;",
              faction5:"background: url(img/cards_07.jpg) 64.5% 6% / 455% 331%; display: block;",
              faction6:"background: url(img/cards_07.jpg) 93.4% 6% / 455% 331%; display: block;",
              faction7:"background: url(img/cards_07.jpg) 6.65% 50% / 455% 331%; display: block;",
              faction8:"background: url(img/cards_07.jpg) 35.5% 50% / 455% 331%; display: block;",
              faction9:"background: url(img/cards_07.jpg) 64.5% 50% / 455% 331%; display: block;",
              faction10:"background: url(img/cards_07.jpg) 93.4% 50% / 455% 331%; display: block;",
              faction11:"background: url(img/cards_07.jpg) 6.65% 94% / 455% 331%; display: block;",
              faction12:"background: url(img/cards_07.jpg) 35.5% 94% / 455% 331%; display: block;",
              faction13:"background: url(img/cards_07.jpg) 64.5% 94% / 455% 331%; display: block;",
              faction14:"background: url(img/cards_07.jpg) 93.4% 94% / 455% 331%; display: block;",
              faction15:"background: url(img/cards_08.jpg) 6.65% 6% / 455% 331%; display: block;",
              faction16:"background: url(img/cards_08.jpg) 35.5% 6% / 455% 331%; display: block;",
              faction17:"background: url(img/cards_08.jpg) 64.5% 6% / 455% 331%; display: block;",
              faction18:"background: url(img/cards_08.jpg) 93.4% 6% / 455% 331%; display: block;",
              faction19:"background: url(img/cards_08.jpg) 6.65% 50% / 455% 331%; display: block;",
              faction20:"background: url(img/cards_08.jpg) 35.5% 50% / 455% 331%; display: block;",
              faction21:"background: url(img/cards_08.jpg) 64.5% 50% / 455% 331%; display: block;",
              faction22:"background: url(img/cards_08.jpg) 93.4% 50% / 455% 331%; display: block;",
              faction23:"background: url(img/cards_08.jpg) 6.65% 94% / 455% 331%; display: block;",
              faction24:"background: url(img/cards_08.jpg) 35.5% 94% / 455% 331%; display: block;",
              faction25:"background: url(img/cards_08.jpg) 64.5% 94% / 455% 331%; display: block;",
              faction26:"background: url(img/cards_08.jpg) 93.4% 94% / 455% 331%; display: block;",
              faction27:"background: url(img/cards_09.jpg) 6.65% 6% / 455% 331%; display: block;",
              faction28:"background: url(img/cards_09.jpg) 35.5% 6% / 455% 331%; display: block;"};

let opStyles = {deck:"background: url(img/cards_16.jpg) 64.5% 94% / 455% 331%; display: block;",
                lead1:"background: url(img/cards_13.jpg) 64.5% 94% / 455% 331%; display: block;",
                lead2:"background: url(img/cards_13.jpg) 93.4% 94% / 455% 331%; display: block;",
                lead3:"background: url(img/cards_14.jpg) 6.65% 6% / 455% 331%; display: block;",
                lead4:"background: url(img/cards_14.jpg) 35.5% 6% / 455% 331%; display: block;",
                neutral1:"background: url(img/cards_01.jpg) 6.65% 6% / 455% 331%; display: block;",
                neutral2:"background: url(img/cards_01.jpg) 35.5% 6% / 455% 331%; display: block;",
                neutral3:"background: url(img/cards_01.jpg) 64.5% 6% / 455% 331%; display: block;",
                neutral4:"background: url(img/cards_01.jpg) 93.4% 6% / 455% 331%; display: block;",
                neutral5:"background: url(img/cards_01.jpg) 6.65% 50% / 455% 331%; display: block;",
                neutral6:"background: url(img/cards_01.jpg) 35.5% 50% / 455% 331%; display: block;",
                neutral7:"background: url(img/cards_01.jpg) 64.5% 50% / 455% 331%; display: block;",
                neutral8:"background: url(img/cards_12.jpg) 35.5% 50% / 455% 331%; display: block;",
                neutral9:"background: url(img/cards_12.jpg) 64.5% 50% / 455% 331%; display: block;",
                neutral10:"background: url(img/cards_12.jpg) 93.4% 50% / 455% 331%; display: block;",
                neutral11:"background: url(img/cards_12.jpg) 6.65% 94% / 455% 331%; display: block;",
                neutral12:"background: url(img/cards_12.jpg) 35.5% 94% / 455% 331%; display: block;",
                neutral13:"background: url(img/cards_01.jpg) 93.4% 50% / 455% 331%; display: block;",
                neutral14:"background: url(img/cards_01.jpg) 6.65% 94% / 455% 331%; display: block;",
                neutral15:"background: url(img/cards_01.jpg) 35.5% 94% / 455% 331%; display: block;",
                neutral16:"background: url(img/cards_15.jpg) 64.5% 6% / 455% 331%; display: block;",
                neutral17:"background: url(img/cards_01.jpg) 64.5% 94% / 455% 331%; display: block;",
                faction1:"background: url(img/cards_14.jpg) 64.5% 6% / 455% 331%; display: block;",
                faction2:"background: url(img/cards_14.jpg) 93.4% 6% / 455% 331%; display: block;",
                faction3:"background: url(img/cards_14.jpg) 6.65% 50% / 455% 331%; display: block;",
                faction4:"background: url(img/cards_14.jpg) 35.5% 50% / 455% 331%; display: block;",
                faction5:"background: url(img/cards_07.jpg) 64.5% 6% / 455% 331%; display: block;",
                faction6:"background: url(img/cards_07.jpg) 93.4% 6% / 455% 331%; display: block;",
                faction7:"background: url(img/cards_07.jpg) 6.65% 50% / 455% 331%; display: block;",
                faction8:"background: url(img/cards_07.jpg) 35.5% 50% / 455% 331%; display: block;",
                faction9:"background: url(img/cards_07.jpg) 64.5% 50% / 455% 331%; display: block;",
                faction10:"background: url(img/cards_07.jpg) 93.4% 50% / 455% 331%; display: block;",
                faction11:"background: url(img/cards_07.jpg) 6.65% 94% / 455% 331%; display: block;",
                faction12:"background: url(img/cards_07.jpg) 35.5% 94% / 455% 331%; display: block;",
                faction13:"background: url(img/cards_07.jpg) 64.5% 94% / 455% 331%; display: block;",
                faction14:"background: url(img/cards_07.jpg) 93.4% 94% / 455% 331%; display: block;",
                faction15:"background: url(img/cards_08.jpg) 6.65% 6% / 455% 331%; display: block;",
                faction16:"background: url(img/cards_08.jpg) 35.5% 6% / 455% 331%; display: block;",
                faction17:"background: url(img/cards_08.jpg) 64.5% 6% / 455% 331%; display: block;",
                faction18:"background: url(img/cards_08.jpg) 93.4% 6% / 455% 331%; display: block;",
                faction19:"background: url(img/cards_08.jpg) 6.65% 50% / 455% 331%; display: block;",
                faction20:"background: url(img/cards_08.jpg) 35.5% 50% / 455% 331%; display: block;",
                faction21:"background: url(img/cards_08.jpg) 64.5% 50% / 455% 331%; display: block;",
                faction22:"background: url(img/cards_08.jpg) 93.4% 50% / 455% 331%; display: block;",
                faction23:"background: url(img/cards_08.jpg) 6.65% 94% / 455% 331%; display: block;",
                faction24:"background: url(img/cards_08.jpg) 35.5% 94% / 455% 331%; display: block;",
                faction25:"background: url(img/cards_08.jpg) 64.5% 94% / 455% 331%; display: block;",
                faction26:"background: url(img/cards_08.jpg) 93.4% 94% / 455% 331%; display: block;",
                faction27:"background: url(img/cards_09.jpg) 6.65% 6% / 455% 331%; display: block;",
                faction28:"background: url(img/cards_09.jpg) 35.5% 6% / 455% 331%; display: block;"};

// Uses an array for each card showing: Base power, current power & hero flag
let cardPower = {neutral8:[15,15,1],
                neutral9:[15,15,1],
                neutral10:[7,7,1],
                neutral11:[7,7,1],
                neutral12:[0,0,1],
                neutral13:[7,7,0],
                neutral14:[6,6,0],
                neutral15:[5,5,0],
                neutral16:[5,5,0],
                neutral17:[2,2,0],
                faction1:[10,10,1],
                faction2:[10,10,1],
                faction3:[10,10,1],
                faction4:[10,10,1],
                faction5:[8,8,0],
                faction6:[6,6,0],
                faction7:[6,6,0],
                faction8:[6,6,0],
                faction9:[6,6,0],
                faction10:[6,6,0],
                faction11:[6,6,0],
                faction12:[5,5,0],
                faction13:[5,5,0],
                faction14:[5,5,0],
                faction15:[5,5,0],
                faction16:[5,5,0],
                faction17:[5,5,0],
                faction18:[5,5,0],
                faction19:[4,4,0],
                faction20:[4,4,0],
                faction21:[4,4,0],
                faction22:[4,4,0],
                faction23:[2,2,0],
                faction24:[1,1,0],
                faction25:[1,1,0],
                faction26:[1,1,0],
                faction27:[1,1,0],
                faction28:[1,1,0]};

/* 
    Like styles, these will need 
    updating based on faction
    using NR as default for now
*/
// Groups cards based on the divs that they can be placed in
let combatCards = ["neutral8", "neutral9", "neutral11", "neutral13", "neutral14", "neutral15", "neutral16", "neutral17", "faction1", "faction2", "faction3", "faction12", "faction13", "faction22", "faction23", "faction 25", "faction26", "faction27"];
let rangedCards = ["neutral10", "faction4", "faction6", "faction14", "faction15", "faction17", "faction20", "faction21"];
let siegeCards = ["faction5", "faction7", "faction8", "faction9", "faction10", "faction11", "faction18", "faction28"];
let combatSpies = ["neutral12", "faction16", "faction19"];
let siegeSpies = ["faction24"];
/* 
    Decoy can allow player cards to be selected (except heroes/ decoys) 
    Commander's horn divs for neutral2 
    All rows for Scorch and clear weather
    Corresponding positional player/opponent rows for everything else
*/
// Decoy = neutral1
// Commander's horn = neutral2
// Scorch = neutral3
// Biting Frost = neutral4
// Impenetrable fog = neutral5
// Torrential rain = neutral6
// Clear weather = neutral7

let faction;
let leader;
let deck;
let hand = [];
let index;
socket.on('playerAssigned', (FID, leaderID, cards) => {
    faction = FID;
    leader = 'lead'+leaderID;
    deck = shuffle(cards);
});

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

socket.on('startGame', () => {
    document.getElementById('waitingMsg').innerHTML = "Starting game...";
    socket.emit('getOpponentDeck', SID, player);
});

let opponentFaction;
let opponentLeader;
let opponentDeckSize;
socket.on('opponentDeck', (opponentFID, opponentLID, opDeckSize) => {
    opponentFaction = opponentFID;
    opponentLeader = 'lead'+opponentLID;
    opponentDeckSize = opDeckSize-10;
    setup();
});



// The amount of cards the player draws at the start
let initDraw = 10;
function setup() {
    document.addEventListener("keydown",keyPressed);
    document.getElementById('redrawMsg').style = "display: fixed;";
    document.getElementById('redrawMsg2').style = "display: fixed;";
    document.getElementById('pDeckSize').innerHTML = deck.length-10;
    document.getElementById('oDeckSize').innerHTML = opponentDeckSize;
    document.getElementById('pStats').style = "display: fixed;";
    document.getElementById('oStats').style = "display: fixed;";
    document.getElementById('opTotalPower').innerHTML = 0;
    document.getElementById('opSiegePower').innerHTML = 0;
    document.getElementById('opRangedPower').innerHTML = 0;
    document.getElementById('opCombatPower').innerHTML = 0;
    document.getElementById('combatPower').innerHTML = 0;
    document.getElementById('rangedPower').innerHTML = 0;
    document.getElementById('siegePower').innerHTML = 0;
    document.getElementById('totalPower').innerHTML = 0;
    document.getElementById('stats').innerHTML = `${initDraw} <span class="iconify" data-icon="ion:tablet-portrait" data-inline="false"></span>`;
    document.getElementById('opponentStats').innerHTML = `${initDraw} <span class="iconify" data-icon="ion:tablet-portrait" data-inline="false"></span>`;
    
    
    // Styles based on player's faction
    for (let i=0; i<initDraw; i++){
        let card = document.createElement('div');
        card.style = styles[deck[0]];
        card.className = 'card';
        card.setAttribute("id", deck[0]);
        card.setAttribute("onclick", "replaceCard(this)");
        document.getElementById('hand').appendChild(card);
        hand.push(deck[0]);
        deck.shift();
    }
    document.getElementById('playerLeader').style = styles[leader];
    document.getElementById('playerDeck').style = styles["deck"];
    
    // This will require opponent's faction to change styles appropriately
    document.getElementById('opponentLeader').style = styles[opponentLeader];
    document.getElementById('opponentDeck').style = styles["deck"];
    hideWaitingMsg();
}

let replaceLimit = 0;
function replaceCard(card) {
    if (replaceLimit < 2) {
        // Update limit counter and display to user
        replaceLimit += 1;
        document.getElementById('redrawMsg').innerHTML = `Choose a card to redraw. ${replaceLimit}/2`
        // Add card to deck
        deck.push(card.id);
        // Remove card from hand
        index = hand.indexOf(card.id);
        if (index > -1) {
            hand.splice(index, 1);
        }
        // Add new card to hand from deck
        card.style = styles[deck[0]];
        card.setAttribute("id", deck[0]);
        hand.push(deck[0]);
        deck.shift();
    }
    if (replaceLimit >= 2) {
        handSelected();
    }
}

let handChosen = false;
function handSelected() {
    handChosen = true;
    document.getElementById('redrawMsg').style = "display: none;";
    document.getElementById('redrawMsg2').style = "display: none;";
    document.getElementById('hand').style = "bottom: 0%;";
    document.getElementById('instructions').innerHTML = `<button style="font-size: 80%;">E</button>&nbsp;&nbsp;Hide Cards
                                                        &nbsp;&nbsp;<button style="font-size: 70%;">⌴</button>&nbsp;&nbsp;End Turn`;
    
    // Remove onclick functionality until opponent has reselected their cards
    cards = document.getElementsByClassName('card');
    for (let i=0; i<hand.length; i++) {
        cards[i].removeAttribute("onclick");
    }
    socket.emit('cardsRedrawn', SID, player);
}

// Informs player that their opponent still needs to confirm starting hand
socket.on('waiting', () => {
    document.getElementById('waitingMsg').innerHTML = "Waiting for opponent...";
    showWaitingMsg();
});

// Refers to the turn of the client running this script
let myTurn = false;
socket.on('firstTurn', (PID) => {
    // Inform player if they need to wait for opponent
    document.getElementById('waitingMsg').innerHTML = "Opponent's turn...";
    if (player != PID){
        showWaitingMsg();
    }
    else {
        hideWaitingMsg();
        myTurn = true;
    }
    
    // Adds new onclick functionality for player whos turn it is
    if (myTurn) {
        cards = document.getElementsByClassName('card');
        for (let i=0; i<hand.length; i++) {
            cards[i].setAttribute("onclick", "selectCard(this)");
        }
    }
});

let selectedCard;
function selectCard(card) {
    cardSelectedFlag = true;
    selectedCard = card.id;
    document.getElementById('cardSelected').style = styles[selectedCard];
    
    // Remove card div from hand (this can be recreated if esc pressed)
    card.parentNode.removeChild(card);
    
    document.getElementById('hand').style = "display: none;"; 
    document.getElementById('instructions').innerHTML = `<button style="font-size: 80%;">Esc</button>&nbsp;&nbsp;Cancel`;
    
    let positions = document.querySelectorAll("combatLane, rangedLane, siegeLane, opCombatLane, opRangedLane, opSiegeLane");
    for (let i=0; i<positions.length; i++) {
        positions[i].removeAttribute("onclick");
    }

    // Highlight divs which are available for the card to be placed in
    // TODO Need to check if card already present for commander's horn/ weather cards
    if (combatCards.includes(selectedCard)) {
        document.getElementById('combatLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('combatLane').setAttribute('onclick','placeCard(this)');
    } 
    else if (rangedCards.includes(selectedCard)) {
        document.getElementById('rangedLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('rangedLane').setAttribute('onclick','placeCard(this)');
    }
    else if (siegeCards.includes(selectedCard)) {
        document.getElementById('siegeLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('siegeLane').setAttribute('onclick','placeCard(this)');
    }
    else if (combatSpies.includes(selectedCard)) {
        document.getElementById('opCombatLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('opCombatLane').setAttribute('onclick','placeCard(this)');
    }
    else if (siegeSpies.includes(selectedCard)) {
        document.getElementById('opSiegeLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('opSiegeLane').setAttribute('onclick','placeCard(this)');
    }
    // Decoy
    else if (selectedCard === "neutral1") {
        // Special case, no divs highlighted 
        // TODO add onclick to non-hero cards for decoy switch
    }
    // Commander's Horn
    else if (selectedCard === "neutral2") {
        document.getElementById('combatHorn').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('rangedHorn').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('siegeHorn').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('combatHorn').setAttribute('onclick','placeCard(this)');
        document.getElementById('rangedHorn').setAttribute('onclick','placeCard(this)');
        document.getElementById('siegeHorn').setAttribute('onclick','placeCard(this)');
    }
    // Biting Frost
    else if (selectedCard === "neutral4") {
        document.getElementById('combatLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('opCombatLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('combatLane').setAttribute('onclick','placeCard(this)');
        document.getElementById('opCombatLane').setAttribute('onclick','placeCard(this)');

    }
    // Impenetrable Fog
    else if (selectedCard === "neutral5") {
        document.getElementById('rangedLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('opRangedLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('rangedLane').setAttribute('onclick','placeCard(this)');
        document.getElementById('opRangedLane').setAttribute('onclick','placeCard(this)');
    }
    // Torrential Rain
    else if (selectedCard === "neutral6") {
        document.getElementById('siegeLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('opSiegeLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('siegeLane').setAttribute('onclick','placeCard(this)');
        document.getElementById('opSiegeLane').setAttribute('onclick','placeCard(this)');
    }
    // Card must be Scorch or Clear Weather
    else {
        document.getElementById('combatLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('opCombatLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('rangedLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('opRangedLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('siegeLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('opSiegeLane').style = "background: rgba(255, 233, 0, 0.15);";
        document.getElementById('combatLane').setAttribute('onclick','placeCard(this)');
        document.getElementById('opCombatLane').setAttribute('onclick','placeCard(this)');
        document.getElementById('rangedLane').setAttribute('onclick','placeCard(this)');
        document.getElementById('opRangedLane').setAttribute('onclick','placeCard(this)');
        document.getElementById('siegeLane').setAttribute('onclick','placeCard(this)');
        document.getElementById('opSiegeLane').setAttribute('onclick','placeCard(this)');
    }
}

function placeCard(boardPos) {
    let boardPosID = boardPos.id;
    cardSelectedFlag = false;
    cancelCardSelection();
    // TODO: Special cards need to go in corresponding positions
    // Displays card in corresponding location
    putCardOnBoard(boardPosID);
    // Updates power values for corresponding lane(s)
    updatePowerValues(boardPosID);
    
    // Remove card from hand
    index = hand.indexOf(selectedCard);  
    if (index > -1) {
        hand.splice(index, 1);
    }       
    
    // Draw 2 cards if card placed was a spy
    if (combatSpies.includes(selectedCard) || siegeSpies.includes(selectedCard)) {
        for (let i=0;i<2;i++){
            if (deck.length != 0) {
                let card = document.createElement('div');
                card.style = styles[deck[0]];
                card.className = 'card';
                card.setAttribute("id", deck[0]);
                document.getElementById('hand').appendChild(card);
                hand.push(deck[0]);
                deck.shift();
                document.getElementById('pDeckSize').innerHTML = deck.length;
            }
        }
    }
    
    // Switch turn and pass data to opponent
    let cardsInHand = document.getElementById("hand").childElementCount;
    document.getElementById('stats').innerHTML = `${cardsInHand} <span class="iconify" data-icon="ion:tablet-portrait" data-inline="false"></span>`;
    socket.emit('switchTurn', SID, selectedCard, boardPosID, cardsInHand);
}

function showWaitingMsg() {
    document.getElementById('waitingMsg').style = "display: fixed;";
}

function hideWaitingMsg() {
    document.getElementById('waitingMsg').style = "display: none;";
}

// Switches turn after player has passed
socket.on('passedTurn', () => {
    switchTurn();
});

// Switches turn after card has been played
socket.on('nextTurn', (card, pos, opHandSize) => { 
    selectedCard = card;
    if (!myTurn){
        putCardOnBoard(pos);
        document.getElementById('opponentStats').innerHTML = `${opHandSize} <span class="iconify" data-icon="ion:tablet-portrait" data-inline="false"></span>`;
    }
    switchTurn();
});

// No turn switch after card has been played
socket.on('returnTurn', (card, pos, opHandSize) => { 
    // TODO
});
     
// Decide who round winner is based on total values and run any faction rules
socket.on('endRound', () => { 
    // TODO
});
          

function switchTurn() {
    cards = document.getElementsByClassName('card');
    if (myTurn) {
        myTurn = false;
        showWaitingMsg();
        for (let i=0; i<hand.length; i++) {
            cards[i].removeAttribute("onclick");
        }
    }
    else {
        myTurn = true;
        hideWaitingMsg();
        for (let i=0; i<hand.length; i++) {
            cards[i].setAttribute("onclick", "selectCard(this)");
        }
    }
}

// TODO: Either work with the ul elements in the html or remove these
function putCardOnBoard(posID) {
    let card = document.createElement('div');
    card.style = styles[selectedCard];
    card.className = 'cardSmall';
    card.setAttribute("id", selectedCard);
    document.getElementById(posID).appendChild(card);
}

let powerLevels = {"opSiegePower":0,
                  "opRangedPower":0,
                  "opCombatPower":0,
                  "opTotalPower":0,    
                  "combatPower":0,
                  "rangedPower":0,
                  "siegePower":0,
                  "totalPower":0};
function updatePowerValues(posID) {
    // String to identify the corresponding power level to update
    let powerStr = posID.substring(0,posID.length-4)+"Power";
    powerLevels[powerStr] += cardPower[selectedCard][1];
    document.getElementById(powerStr).innerHTML = powerLevels[powerStr];
    powerLevels["totalPower"] = powerLevels["combatPower"] + powerLevels["rangedPower"] + powerLevels["siegePower"];
    powerLevels["opTotalPower"] = powerLevels["opCombatPower"] + powerLevels["opRangedPower"] + powerLevels["opSiegePower"];
    document.getElementById("opTotalPower").innerHTML = powerLevels["opTotalPower"];
    document.getElementById("totalPower").innerHTML = powerLevels["totalPower"];
}

let handHiddenFlag = false;
let handSelectedFlag = false;
let cardSelectedFlag = false;
function keyPressed(event) {
    // Enter pressed and hand hasn't been selected
    if (event.keyCode === 13 && !handSelectedFlag) {
        handSelectedFlag = true;
        handSelected();
    }
    
    // E pressed AND hand has been chosen AND card has not been selected
    if (event.keyCode === 69 && handChosen && !cardSelectedFlag) {
        if (handHiddenFlag) {
            document.getElementById('hand').style = "display: fixed; bottom: 0%;";  
            document.getElementById('instructions').innerHTML = `<button style="font-size: 80%;">E</button>&nbsp;&nbsp;Hide Cards
                                                                 &nbsp;&nbsp;<button style="font-size: 70%;">⌴</button>&nbsp;&nbsp;End Turn`;
            handHiddenFlag = false;
        }
        else {
            document.getElementById('hand').style = "display: none;";           
            document.getElementById('instructions').innerHTML = `<button style="font-size: 80%;">E</button>&nbsp;&nbsp;Show Cards
                                                                 &nbsp;&nbsp;<button style="font-size: 70%;">⌴</button>&nbsp;&nbsp;End Turn`;
            handHiddenFlag = true;
        }
    }
    
    // Esc pressed AND a card has been selected
    if (event.keyCode === 27 && cardSelectedFlag) {
        cardSelectedFlag = false;
        cancelCardSelection();
        
        // Recreate card in hand
        let card = document.createElement('div');
        card.style = styles[selectedCard];
        card.className = 'card';
        card.setAttribute("id", selectedCard);
        card.setAttribute("onclick", 'selectCard(this)');
        document.getElementById('hand').appendChild(card);
    }
    
    // Space pressed AND it is player's turn AND card is not selected
    if (event.keyCode===32 && myTurn && !cardSelectedFlag) {
        socket.emit('passTurn', SID);
    }
}

function cancelCardSelection() {
        // Remove card from placeholder at top
        document.getElementById('cardSelected').style = "display: none;";
        
        // Remove any div highlights for where card can be placed
        document.getElementById('combatLane').style = "background: none;";
        document.getElementById('opCombatLane').style = "background: none;";
        document.getElementById('rangedLane').style = "background: none;";
        document.getElementById('opRangedLane').style = "background: none;";
        document.getElementById('siegeLane').style = "background: none;";
        document.getElementById('opSiegeLane').style = "background: none;";
        document.getElementById('combatHorn').style = "background: none;";
        document.getElementById('rangedHorn').style = "background: none;";
        document.getElementById('siegeHorn').style = "background: none;";
        
        // Remove any div onclicks
        document.getElementById('combatLane').removeAttribute("onclick");
        document.getElementById('opCombatLane').removeAttribute("onclick");
        document.getElementById('rangedLane').removeAttribute("onclick");
        document.getElementById('opRangedLane').removeAttribute("onclick");
        document.getElementById('siegeLane').removeAttribute("onclick");
        document.getElementById('opSiegeLane').removeAttribute("onclick");
        document.getElementById('combatHorn').removeAttribute("onclick");
        document.getElementById('rangedHorn').removeAttribute("onclick");
        document.getElementById('siegeHorn').removeAttribute("onclick");
        
        // Show hand and instructions again
        document.getElementById('hand').style = "display: fixed; bottom: 0%;";
        document.getElementById('instructions').innerHTML = `<button style="font-size: 80%;">E</button>&nbsp;&nbsp;Show Cards
                                                             &nbsp;&nbsp;<button style="font-size: 70%;">⌴</button>&nbsp;&nbsp;End Turn`;
}
