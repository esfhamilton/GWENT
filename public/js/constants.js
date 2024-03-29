const instructionTextShow = `<button style="font-size: 90%;">E</button>&nbsp;&nbsp;Show Cards
&nbsp;&nbsp;<button style="font-size: 90%;">Space</button>&nbsp;&nbsp;End Turn`;
const instructionTextHide = `<button style="font-size: 90%;">E</button>&nbsp;&nbsp;Hide Cards
&nbsp;&nbsp;<button style="font-size: 90%;">Space</button>&nbsp;&nbsp;End Turn`;
const leaderInstruction = `<button style="font-size: 90%;">X</button>&nbsp;&nbsp;Leader&nbsp;&nbsp;`;


/*  
    Col Row / Height Width
    6.65% First column
    35.5% Second column
    64.5% Third column
    93.4% Final column
    6% Top row
    50% Second row
    94% Final row
    455% 331% height width 
*/
const styles = {
    NR:{"background": "url(img/cards_16.jpg) 64.5% 94% / 455% 331%", "display": "block"}, 
    NRLeader1:{"background": "url(img/cards_13.jpg) 64.5% 94% / 455% 331%", "display": "block"}, 
    NRLeader2:{"background": "url(img/cards_13.jpg) 93.4% 94% / 455% 331%", "display": "block"}, 
    NRLeader3:{"background": "url(img/cards_14.jpg) 6.65% 6% / 455% 331%", "display": "block"}, 
    NRLeader4:{"background": "url(img/cards_14.jpg) 35.5% 6% / 455% 331%", "display": "block"}, 
    neutral1:{"background": "url(img/cards_01.jpg) 6.65% 6% / 455% 331%", "display": "block"}, 
    neutral2:{"background": "url(img/cards_01.jpg) 35.5% 6% / 455% 331%", "display": "block"}, 
    neutral3:{"background": "url(img/cards_01.jpg) 64.5% 6% / 455% 331%", "display": "block"}, 
    neutral4:{"background": "url(img/cards_01.jpg) 93.4% 6% / 455% 331%", "display": "block"}, 
    neutral5:{"background": "url(img/cards_01.jpg) 6.65% 50% / 455% 331%", "display": "block"}, 
    neutral6:{"background": "url(img/cards_01.jpg) 35.5% 50% / 455% 331%", "display": "block"}, 
    neutral7:{"background": "url(img/cards_01.jpg) 64.5% 50% / 455% 331%", "display": "block"}, 
    neutral8:{"background": "url(img/cards_12.jpg) 35.5% 50% / 455% 331%", "display": "block"}, 
    neutral9:{"background": "url(img/cards_12.jpg) 64.5% 50% / 455% 331%", "display": "block"}, 
    neutral10:{"background": "url(img/cards_12.jpg) 93.4% 50% / 455% 331%", "display": "block"}, 
    neutral11:{"background": "url(img/cards_12.jpg) 6.65% 94% / 455% 331%", "display": "block"}, 
    neutral12:{"background": "url(img/cards_12.jpg) 35.5% 94% / 455% 331%", "display": "block"}, 
    neutral13:{"background": "url(img/cards_01.jpg) 93.4% 50% / 455% 331%", "display": "block"}, 
    neutral14:{"background": "url(img/cards_01.jpg) 6.65% 94% / 455% 331%", "display": "block"}, 
    neutral15:{"background": "url(img/cards_01.jpg) 35.5% 94% / 455% 331%", "display": "block"}, 
    neutral16:{"background": "url(img/cards_15.jpg) 64.5% 6% / 455% 331%", "display": "block"}, 
    neutral17:{"background": "url(img/cards_01.jpg) 64.5% 94% / 455% 331%", "display": "block"}, 
    NR1:{"background": "url(img/cards_14.jpg) 64.5% 6% / 455% 331%", "display": "block"}, 
    NR2:{"background": "url(img/cards_14.jpg) 93.4% 6% / 455% 331%", "display": "block"}, 
    NR3:{"background": "url(img/cards_14.jpg) 6.65% 50% / 455% 331%", "display": "block"}, 
    NR4:{"background": "url(img/cards_14.jpg) 35.5% 50% / 455% 331%", "display": "block"}, 
    NR5:{"background": "url(img/cards_07.jpg) 64.5% 6% / 455% 331%", "display": "block"}, 
    NR6:{"background": "url(img/cards_07.jpg) 93.4% 6% / 455% 331%", "display": "block"}, 
    NR7:{"background": "url(img/cards_07.jpg) 6.65% 50% / 455% 331%", "display": "block"}, 
    NR8:{"background": "url(img/cards_07.jpg) 35.5% 50% / 455% 331%", "display": "block"}, 
    NR9:{"background": "url(img/cards_07.jpg) 64.5% 50% / 455% 331%", "display": "block"}, 
    NR10:{"background": "url(img/cards_07.jpg) 93.4% 50% / 455% 331%", "display": "block"}, 
    NR11:{"background": "url(img/cards_07.jpg) 6.65% 94% / 455% 331%", "display": "block"}, 
    NR12:{"background": "url(img/cards_07.jpg) 35.5% 94% / 455% 331%", "display": "block"}, 
    NR13:{"background": "url(img/cards_07.jpg) 64.5% 94% / 455% 331%", "display": "block"}, 
    NR14:{"background": "url(img/cards_07.jpg) 93.4% 94% / 455% 331%", "display": "block"}, 
    NR15:{"background": "url(img/cards_08.jpg) 6.65% 6% / 455% 331%", "display": "block"}, 
    NR16:{"background": "url(img/cards_08.jpg) 35.5% 6% / 455% 331%", "display": "block"}, 
    NR17:{"background": "url(img/cards_08.jpg) 64.5% 6% / 455% 331%", "display": "block"}, 
    NR18:{"background": "url(img/cards_08.jpg) 93.4% 6% / 455% 331%", "display": "block"}, 
    NR19:{"background": "url(img/cards_08.jpg) 6.65% 50% / 455% 331%", "display": "block"}, 
    NR20:{"background": "url(img/cards_08.jpg) 35.5% 50% / 455% 331%", "display": "block"}, 
    NR21:{"background": "url(img/cards_08.jpg) 64.5% 50% / 455% 331%", "display": "block"}, 
    NR22:{"background": "url(img/cards_08.jpg) 93.4% 50% / 455% 331%", "display": "block"}, 
    NR23:{"background": "url(img/cards_08.jpg) 6.65% 94% / 455% 331%", "display": "block"}, 
    NR24:{"background": "url(img/cards_08.jpg) 35.5% 94% / 455% 331%", "display": "block"}, 
    NR25:{"background": "url(img/cards_08.jpg) 64.5% 94% / 455% 331%", "display": "block"}, 
    NR26:{"background": "url(img/cards_08.jpg) 93.4% 94% / 455% 331%", "display": "block"}, 
    NR27:{"background": "url(img/cards_09.jpg) 6.65% 6% / 455% 331%", "display": "block"}, 
    NR28:{"background": "url(img/cards_09.jpg) 35.5% 6% / 455% 331%", "display": "block"}, 
    NG:{"background": "url(img/cards_17.jpg) 64.5% 94% / 455% 331%", "display": "block"}, 
    NGLeader1:{"background": "url(img/cards_13.jpg) 64.5% 50% / 455% 331%", "display": "block"}, 
    NGLeader2:{"background": "url(img/cards_13.jpg) 93.4% 50% / 455% 331%", "display": "block"}, 
    NGLeader3:{"background": "url(img/cards_13.jpg) 6.65% 94% / 455% 331%", "display": "block"}, 
    NGLeader4:{"background": "url(img/cards_13.jpg) 35.5% 94% / 455% 331%", "display": "block"}, 
    NG1:{"background": "url(img/cards_13.jpg) 64.5% 6% / 455% 331%", "display": "block"}, 
    NG2:{"background": "url(img/cards_13.jpg) 93.4% 6% / 455% 331%", "display": "block"}, 
    NG3:{"background": "url(img/cards_13.jpg) 6.65% 50% / 455% 331%", "display": "block"}, 
    NG4:{"background": "url(img/cards_13.jpg) 35.5% 50% / 455% 331%", "display": "block"}, 
    NG5:{"background": "url(img/cards_04.jpg) 64.5% 94% / 455% 331%", "display": "block"}, 
    NG6:{"background": "url(img/cards_04.jpg) 93.4% 94% / 455% 331%", "display": "block"}, 
    NG7:{"background": "url(img/cards_05.jpg) 6.65% 6% / 455% 331%", "display": "block"}, 
    NG8:{"background": "url(img/cards_05.jpg) 35.5% 6% / 455% 331%", "display": "block"}, 
    NG9:{"background": "url(img/cards_05.jpg) 64.5% 6% / 455% 331%", "display": "block"}, 
    NG10:{"background": "url(img/cards_05.jpg) 93.4% 6% / 455% 331%", "display": "block"}, 
    NG11:{"background": "url(img/cards_05.jpg) 6.65% 50% / 455% 331%", "display": "block"}, 
    NG12:{"background": "url(img/cards_05.jpg) 35.5% 50% / 455% 331%", "display": "block"}, 
    NG13:{"background": "url(img/cards_05.jpg) 64.5% 50% / 455% 331%", "display": "block"}, 
    NG14:{"background": "url(img/cards_05.jpg) 93.4% 50% / 455% 331%", "display": "block"}, 
    NG15:{"background": "url(img/cards_05.jpg) 6.65% 94% / 455% 331%", "display": "block"}, 
    NG16:{"background": "url(img/cards_05.jpg) 64.5% 94% / 455% 331%", "display": "block"}, 
    NG17:{"background": "url(img/cards_05.jpg) 93.4% 94% / 455% 331%", "display": "block"}, 
    NG18:{"background": "url(img/cards_06.jpg) 6.65% 6% / 455% 331%", "display": "block"}, 
    NG19:{"background": "url(img/cards_06.jpg) 35.5% 6% / 455% 331%", "display": "block"}, 
    NG20:{"background": "url(img/cards_06.jpg) 64.5% 6% / 455% 331%", "display": "block"}, 
    NG21:{"background": "url(img/cards_06.jpg) 93.4% 6% / 455% 331%", "display": "block"}, 
    NG22:{"background": "url(img/cards_06.jpg) 6.65% 50% / 455% 331%", "display": "block"}, 
    NG23:{"background": "url(img/cards_06.jpg) 35.5% 50% / 455% 331%", "display": "block"}, 
    NG24:{"background": "url(img/cards_06.jpg) 64.5% 50% / 455% 331%", "display": "block"}, 
    NG25:{"background": "url(img/cards_06.jpg) 93.4% 50% / 455% 331%", "display": "block"}, 
    NG26:{"background": "url(img/cards_06.jpg) 6.65% 94% / 455% 331%", "display": "block"}, 
    NG27:{"background": "url(img/cards_06.jpg) 35.5% 94% / 455% 331%", "display": "block"}, 
    NG28:{"background": "url(img/cards_06.jpg) 64.5% 94% / 455% 331%", "display": "block"}, 
    NG29:{"background": "url(img/cards_06.jpg) 93.4% 94% / 455% 331%", "display": "block"}, 
    NG30:{"background": "url(img/cards_07.jpg) 35.5% 6% / 455% 331%", "display": "block"},
    ST:{"background": "url(img/cards_18.jpg) 64.5% 94% / 455% 331%", "display": "block"},  
    STLeader1:{"background": "url(img/cards_14.jpg) 64.5% 50% / 455% 331%", "display": "block"}, 
    STLeader2:{"background": "url(img/cards_14.jpg) 93.4% 50% / 455% 331%", "display": "block"}, 
    STLeader3:{"background": "url(img/cards_14.jpg) 6.65% 94% / 455% 331%", "display": "block"}, 
    STLeader4:{"background": "url(img/cards_14.jpg) 35.5% 94% / 455% 331%", "display": "block"}, 
    ST1:{"background": "url(img/cards_14.jpg) 64.5% 94% / 455% 331%", "display": "block"},  
    ST2:{"background": "url(img/cards_14.jpg) 93.4% 94% / 455% 331%", "display": "block"},  
    ST3:{"background": "url(img/cards_15.jpg) 6.65% 6% / 455% 331%", "display": "block"},  
    ST4:{"background": "url(img/cards_15.jpg) 35.5% 6% / 455% 331%", "display": "block"},  
    ST5:{"background": "url(img/cards_09.jpg) 6.65% 50% / 455% 331%", "display": "block"},  
    ST6:{"background": "url(img/cards_09.jpg) 35.5% 50% / 455% 331%", "display": "block"},  
    ST7:{"background": "url(img/cards_09.jpg) 64.5% 50% / 455% 331%", "display": "block"},  
    ST8:{"background": "url(img/cards_09.jpg) 93.4% 50% / 455% 331%", "display": "block"},  
    ST9:{"background": "url(img/cards_09.jpg) 6.65% 94% / 455% 331%", "display": "block"},  
    ST10:{"background": "url(img/cards_09.jpg) 35.5% 94% / 455% 331%", "display": "block"},  
    ST11:{"background": "url(img/cards_09.jpg) 64.5% 94% / 455% 331%", "display": "block"},  
    ST12:{"background": "url(img/cards_09.jpg) 93.4% 94% / 455% 331%", "display": "block"},  
    ST13:{"background": "url(img/cards_10.jpg) 6.65% 6% / 455% 331%", "display": "block"},  
    ST14:{"background": "url(img/cards_10.jpg) 35.5% 6% / 455% 331%", "display": "block"},  
    ST15:{"background": "url(img/cards_10.jpg) 64.5% 6% / 455% 331%", "display": "block"},  
    ST16:{"background": "url(img/cards_10.jpg) 93.4% 6% / 455% 331%", "display": "block"},  
    ST17:{"background": "url(img/cards_10.jpg) 6.65% 50% / 455% 331%", "display": "block"},  
    ST18:{"background": "url(img/cards_10.jpg) 35.5% 50% / 455% 331%", "display": "block"},  
    ST19:{"background": "url(img/cards_10.jpg) 64.5% 50% / 455% 331%", "display": "block"},  
    ST20:{"background": "url(img/cards_10.jpg) 93.4% 50% / 455% 331%", "display": "block"},  
    ST21:{"background": "url(img/cards_10.jpg) 6.65% 94% / 455% 331%", "display": "block"},  
    ST22:{"background": "url(img/cards_10.jpg) 35.5% 94% / 455% 331%", "display": "block"},  
    ST23:{"background": "url(img/cards_10.jpg) 64.5% 94% / 455% 331%", "display": "block"},  
    ST24:{"background": "url(img/cards_10.jpg) 93.4% 94% / 455% 331%", "display": "block"},  
    ST25:{"background": "url(img/cards_11.jpg) 6.65% 6% / 455% 331%", "display": "block"},  
    ST26:{"background": "url(img/cards_11.jpg) 35.5% 6% / 455% 331%", "display": "block"},  
    ST27:{"background": "url(img/cards_11.jpg) 64.5% 6% / 455% 331%", "display": "block"},  
    ST28:{"background": "url(img/cards_11.jpg) 93.4% 6% / 455% 331%", "display": "block"},  
    ST29:{"background": "url(img/cards_11.jpg) 6.65% 50% / 455% 331%", "display": "block"},  
    ST30:{"background": "url(img/cards_11.jpg) 35.5% 50% / 455% 331%", "display": "block"},  
    ST31:{"background": "url(img/cards_11.jpg) 64.5% 50% / 455% 331%", "display": "block"},  
    ST32:{"background": "url(img/cards_11.jpg) 93.4% 50% / 455% 331%", "display": "block"},  
    ST33:{"background": "url(img/cards_11.jpg) 6.65% 94% / 455% 331%", "display": "block"},  
    ST34:{"background": "url(img/cards_11.jpg) 35.5% 94% / 455% 331%", "display": "block"},  
    ST35:{"background": "url(img/cards_11.jpg) 64.5% 94% / 455% 331%", "display": "block"},  
    ST36:{"background": "url(img/cards_11.jpg) 93.4% 94% / 455% 331%", "display": "block"},
    ST37:{"background": "url(img/cards_12.jpg) 6.65% 6% / 455% 331%", "display": "block"},  
    MO:{"background": "url(img/cards_19.jpg) 64.5% 94% / 455% 331%", "display": "block"},  
    MOLeader1:{"background": "url(img/cards_12.jpg) 35.5% 6% / 455% 331%", "display": "block"}, 
    MOLeader2:{"background": "url(img/cards_12.jpg) 64.5% 6% / 455% 331%", "display": "block"}, 
    MOLeader3:{"background": "url(img/cards_12.jpg) 93.4% 6% / 455% 331%", "display": "block"}, 
    MOLeader4:{"background": "url(img/cards_12.jpg) 6.65% 50% / 455% 331%", "display": "block"}, 
    MO1:{"background": "url(img/cards_12.jpg) 64.5% 94% / 455% 331%", "display": "block"},  
    MO2:{"background": "url(img/cards_12.jpg) 93.4% 94% / 455% 331%", "display": "block"},  
    MO3:{"background": "url(img/cards_13.jpg) 6.65% 6% / 455% 331%", "display": "block"},  
    MO4:{"background": "url(img/cards_13.jpg) 35.5% 6% / 455% 331%", "display": "block"},  
    MO5:{"background": "url(img/cards_01.jpg) 93.4% 94% / 455% 331%", "display": "block"},  
    MO6:{"background": "url(img/cards_02.jpg) 6.65% 6% / 455% 331%", "display": "block"},  
    MO7:{"background": "url(img/cards_02.jpg) 35.5% 6% / 455% 331%", "display": "block"},  
    MO8:{"background": "url(img/cards_02.jpg) 64.5% 6% / 455% 331%", "display": "block"},  
    MO9:{"background": "url(img/cards_02.jpg) 93.4% 6% / 455% 331%", "display": "block"},  
    MO10:{"background": "url(img/cards_02.jpg) 6.65% 50% / 455% 331%", "display": "block"},  
    MO11:{"background": "url(img/cards_02.jpg) 35.5% 50% / 455% 331%", "display": "block"},  
    MO12:{"background": "url(img/cards_02.jpg) 64.5% 50% / 455% 331%", "display": "block"},  
    MO13:{"background": "url(img/cards_02.jpg) 93.4% 50% / 455% 331%", "display": "block"},  
    MO14:{"background": "url(img/cards_02.jpg) 6.65% 94% / 455% 331%", "display": "block"},  
    MO15:{"background": "url(img/cards_02.jpg) 35.5% 94% / 455% 331%", "display": "block"},  
    MO16:{"background": "url(img/cards_02.jpg) 64.5% 94% / 455% 331%", "display": "block"},  
    MO17:{"background": "url(img/cards_02.jpg) 93.4% 94% / 455% 331%", "display": "block"},  
    MO18:{"background": "url(img/cards_03.jpg) 6.65% 6% / 455% 331%", "display": "block"},  
    MO19:{"background": "url(img/cards_03.jpg) 35.5% 6% / 455% 331%", "display": "block"},  
    MO20:{"background": "url(img/cards_03.jpg) 64.5% 6% / 455% 331%", "display": "block"},  
    MO21:{"background": "url(img/cards_03.jpg) 93.4% 6% / 455% 331%", "display": "block"},  
    MO22:{"background": "url(img/cards_03.jpg) 6.65% 50% / 455% 331%", "display": "block"},  
    MO23:{"background": "url(img/cards_03.jpg) 35.5% 50% / 455% 331%", "display": "block"},  
    MO24:{"background": "url(img/cards_03.jpg) 64.5% 50% / 455% 331%", "display": "block"},  
    MO25:{"background": "url(img/cards_03.jpg) 93.4% 50% / 455% 331%", "display": "block"},  
    MO26:{"background": "url(img/cards_03.jpg) 6.65% 94% / 455% 331%", "display": "block"},  
    MO27:{"background": "url(img/cards_03.jpg) 35.5% 94% / 455% 331%", "display": "block"},  
    MO28:{"background": "url(img/cards_03.jpg) 64.5% 94% / 455% 331%", "display": "block"},  
    MO29:{"background": "url(img/cards_03.jpg) 93.4% 94% / 455% 331%", "display": "block"},  
    MO30:{"background": "url(img/cards_04.jpg) 6.65% 6% / 455% 331%", "display": "block"},  
    MO31:{"background": "url(img/cards_04.jpg) 35.5% 6% / 455% 331%", "display": "block"},  
    MO32:{"background": "url(img/cards_04.jpg) 64.5% 6% / 455% 331%", "display": "block"},  
    MO33:{"background": "url(img/cards_04.jpg) 93.4% 6% / 455% 331%", "display": "block"},  
    MO34:{"background": "url(img/cards_04.jpg) 6.65% 50% / 455% 331%", "display": "block"},  
    MO35:{"background": "url(img/cards_04.jpg) 35.5% 50% / 455% 331%", "display": "block"},  
    MO36:{"background": "url(img/cards_04.jpg) 64.5% 50% / 455% 331%", "display": "block"},
    MO37:{"background": "url(img/cards_04.jpg) 93.4% 50% / 455% 331%", "display": "block"}, 
    MO38:{"background": "url(img/cards_04.jpg) 6.65% 94% / 455% 331%", "display": "block"}, 
    MO39:{"background": "url(img/cards_04.jpg) 35.5% 94% / 455% 331%", "display": "block"} 
};

const factionCardAmounts = {"NR":28, "NG":30, "ST":37, "MO":39};            

const abilityDescriptions = {
    "NRLeader1" : "Ability: Doubles the strength of all your Siege units (unless a Commander's Horn is also present on that row).",
    "NRLeader2" : "Ability: Pick an Impenetrable Fog card from your deck and play it instantly.",
    "NRLeader3" : "Ability: Clear any weather effects (resulting from Biting Frost, Torrential Rain or Impenetrable Fog cards) in play.",
    "NRLeader4" : "Ability: Destroy your enemy's strongest Siege unit(s) if the combined strength of their Siege units is 10 or more.",
    "NGLeader1" : "Ability: Cancel your opponent's Leader Ability.",
    "NGLeader2" : "Ability: Pick a Torrential Rain card from your deck and play it instantly.",
    "NGLeader3" : "Ability: Look at 3 random cards from your opponent's hand.",
    "NGLeader4" : "Ability: Draw a card from your opponent's discard pile.",
    "STLeader1" : "Ability: Doubles the strength of all your Ranged units (unless a Commander's Horn is also present on that row).",
    "STLeader2" : "Ability: Pick a Biting Frost card from your deck and play it instantly.",
    "STLeader3" : "Ability: Draw an extra card at the beginning of the battle.",
    "STLeader4" : "Ability: Destroy your enemy's strongest Close Combat unit(s) if the combined strength of their Close Combat units is 10 or more.",
    "MOLeader1" : "Ability: Restore a card from your discard pile to your hand.",
    "MOLeader2" : "Ability: Double the strength of all your Close Combat units (unless a Commander's horn is also present on that row).",
    "MOLeader3" : "Ability: Pick any weather card from your deck and play it instantly.",
    "MOLeader4" : "Ability: Discard 2 cards and draw 1 card of your choice from your deck."
}

let cardsAvailable = {
    neutral1 : 3,
    neutral2 : 3,
    neutral3 : 3,
    neutral4 : 3,
    neutral5 : 3,
    neutral6 : 3,
    neutral7 : 3,
    neutral8 : 1,
    neutral9 : 1,
    neutral10 : 1,
    neutral11 : 1,
    neutral12 : 1,
    neutral13 : 1,
    neutral14 : 1,
    neutral15 : 1,
    neutral16 : 1,
    neutral17 : 1,
    NR1 : 1,
    NR2 : 1,
    NR3 : 1,
    NR4 : 1,
    NR5 : 2,
    NR6 : 1,
    NR7 : 1,
    NR8 : 1,
    NR9 : 1,
    NR10 : 1,
    NR11 : 1,
    NR12 : 1,
    NR13 : 1,
    NR14 : 1,
    NR15 : 1,
    NR16 : 1,
    NR17 : 3,
    NR18 : 1,
    NR19 : 1,
    NR20 : 1,
    NR21 : 1,
    NR22 : 3,
    NR23 : 1,
    NR24 : 1,
    NR25 : 3,
    NR26 : 1,
    NR27 : 1,
    NR28 : 3,
    NG1 : 1, 
    NG2 : 1,
    NG3 : 1,
    NG4 : 1,
    NG5 : 1,
    NG6 : 1,
    NG7 : 1,
    NG8 : 1,
    NG9 : 1,
    NG10 : 1,
    NG11 : 1,
    NG12 : 1,
    NG13 : 1,
    NG14 : 1,
    NG15 : 1,
    NG16 : 2,
    NG17 : 1,
    NG18 : 1,
    NG19 : 1,
    NG20 : 1,
    NG21 : 1,
    NG22 : 1,
    NG23 : 1,
    NG24 : 4,
    NG25 : 1,
    NG26 : 1,
    NG27 : 1,
    NG28 : 3,
    NG29 : 2,
    NG30 : 1,
    ST1 : 1,
    ST2 : 1,
    ST3 : 1,
    ST4 : 1,
    ST5 : 1,
    ST6 : 1,
    ST7 : 1,
    ST8 : 1,
    ST9 : 1,
    ST10 : 1,
    ST11 : 1,
    ST12 : 1,
    ST13 : 1,
    ST14 : 1,
    ST15 : 1,
    ST16 : 1,
    ST17 : 1,
    ST18 : 1,
    ST19 : 1,
    ST20 : 1,
    ST21 : 1,
    ST22 : 1,
    ST23 : 1,
    ST24 : 1,
    ST25 : 1,
    ST26 : 1,
    ST27 : 1,
    ST28 : 1,
    ST29 : 1,
    ST30 : 1,
    ST31 : 1,
    ST32 : 1,
    ST33 : 1,
    ST34 : 1,
    ST35 : 1,
    ST36 : 1,
    ST37 : 1,
    MO1 : 1,
    MO2 : 1,
    MO3 : 1,
    MO4 : 1,
    MO5 : 1,
    MO6 : 1,
    MO7 : 1,
    MO8 : 1,
    MO9 : 1,
    MO10 : 1,
    MO11 : 1,
    MO12 : 1,
    MO13 : 1,
    MO14 : 1,
    MO15 : 1,
    MO16 : 1,
    MO17 : 1,
    MO18 : 1,
    MO19 : 1,
    MO20 : 1,
    MO21 : 1,
    MO22 : 1,
    MO23 : 1,
    MO24 : 1,
    MO25 : 1,
    MO26 : 1,
    MO27 : 1,
    MO28 : 1,
    MO29 : 1,
    MO30 : 1,
    MO31 : 1,
    MO32 : 1,
    MO33 : 1,
    MO34 : 1,
    MO35 : 1,
    MO36 : 1,
    MO37 : 1,
    MO38 : 1,
    MO39 : 1
};

let cardsAdded = {};
Object.keys(cardsAvailable).forEach(cardId => cardsAdded[cardId]=0)

// Base power levels of every unit card (and decoy)
const cardPowers = {neutral1:0,
                neutral8:15,
                neutral9:15,
                neutral10:7,
                neutral11:7,
                neutral12:0,
                neutral13:7,
                neutral14:6,
                neutral15:5,
                neutral16:5,
                neutral17:2,
                NR1:10,
                NR2:10,
                NR3:10,
                NR4:10,
                NR5:8,
                NR6:6,
                NR7:6,
                NR8:6,
                NR9:6,
                NR10:6,
                NR11:6,
                NR12:5,
                NR13:5,
                NR14:5,
                NR15:5,
                NR16:5,
                NR17:5,
                NR18:5,
                NR19:4,
                NR20:4,
                NR21:4,
                NR22:4,
                NR23:2,
                NR24:1,
                NR25:1,
                NR26:1,
                NR27:1,
                NR28:1,
                NG1:10,
                NG2:10,
                NG3:10,
                NG4:10,
                NG5:10,
                NG6:10,
                NG7:10,
                NG8:9,
                NG9:7,
                NG10:6,
                NG11:6,
                NG12:6,
                NG13:6,
                NG14:5,
                NG15:5,
                NG16:5,
                NG17:4,
                NG18:4,
                NG19:4,
                NG20:4,
                NG21:3,
                NG22:3,
                NG23:3,
                NG24:3,
                NG25:2,
                NG26:2,
                NG27:2,
                NG28:2,
                NG29:1,
                NG30:0,
                ST1:10,
                ST2:10,
                ST3:10,
                ST4:10,
                ST5:10,
                ST6:6,
                ST7:6,
                ST8:6,
                ST9:6,
                ST10:6,
                ST11:6,
                ST12:6,
                ST13:6,
                ST14:5,
                ST15:5,
                ST16:5,
                ST17:5,
                ST18:5,
                ST19:5,
                ST20:5,
                ST21:5,
                ST22:5,
                ST23:5,
                ST24:4,
                ST25:4,
                ST26:3,
                ST27:3,
                ST28:3,
                ST29:3,
                ST30:2,
                ST31:2,
                ST32:2,
                ST33:2,
                ST34:1,
                ST35:0,
                ST36:0,
                ST37:0,
                MO1:10,
                MO2:10,
                MO3:10,
                MO4:8,
                MO5:6,
                MO6:6,
                MO7:6,
                MO8:6,
                MO9:6,
                MO10:6,
                MO11:6,
                MO12:5,
                MO13:5,
                MO14:5,
                MO15:5,
                MO16:5,
                MO17:5,
                MO18:5,
                MO19:4,
                MO20:4,
                MO21:4,
                MO22:4,
                MO23:4,
                MO24:4,
                MO25:4,
                MO26:4,
                MO27:2,
                MO28:2,
                MO29:2,
                MO30:2,
                MO31:2,
                MO32:2,
                MO33:2,
                MO34:2,
                MO35:2,
                MO36:2,
                MO37:1,
                MO38:1,
                MO39:1
            };

const baseDrawCount = 10;
const combatCards = ["neutral8", "neutral9", "neutral11", "neutral13", "neutral14", "neutral15", "neutral16", "neutral17", 
                     "NR1", "NR2", "NR3", "NR12", "NR13", "NR22", "NR23", "NR25", "NR26", "NR27", 
                     "NG1", "NG2", "NG12", "NG16", "NG18", "NG24", "NG27", "NG28", 
                     "ST3", "ST6", "ST8", "ST9", "ST10", "ST11", "ST12", "ST13", "ST14", "ST15", "ST16", "ST17", "ST18", 
                     "ST19", "ST20", "ST21", "ST22", "ST23", "ST26", "ST27", "ST28", "ST29",
                     "MO1", "MO2", "MO4", "MO6", "MO9", "MO10", "MO11", "MO12", "MO13", "MO14", "MO15", "MO16", "MO19",
                     "MO20", "MO21", "MO22", "MO23", "MO24", "MO25", "MO26", "MO28", "MO31", "MO32", "MO34", "MO35", 
                     "MO36", "MO37", "MO38", "MO39"];
const rangedCards = ["neutral10", "NR4", "NR6", "NR14", "NR15", "NR17", "NR20", "NR21", 
                     "NG4", "NG5", "NG6", "NG10", "NG11", "NG14", "NG17", "NG19", "NG21", "NG23", "NG25", "NG26", "NG29",
                     "ST1", "ST2", "ST4", "ST5", "ST7", "ST8", "ST9", "ST10", "ST11", "ST12", "ST13", "ST17", "ST18", "ST24",
                     "ST25", "ST26", "ST30", "ST31", "ST32", "ST33", "ST34", "ST35", "ST36", "ST37",
                     "MO3", "MO4", "MO18", "MO27", "MO28", "MO29", "MO30", "MO31", "MO33"];
const siegeCards =  ["NR5", "NR7", "NR8", "NR9", "NR10", "NR11", "NR18", "NR28", 
                     "NG3", "NG7", "NG13", "NG15", "NG22", "NG30",
                     "MO5", "MO7", "MO8", "MO17"];
const combatSpies = ["neutral12", "NR16", "NR19", "NG8", "NG9", "NG20"];
const siegeSpies = ["NR24"];
const unitCards = combatCards.concat(rangedCards).concat(siegeCards).concat(combatSpies).concat(siegeSpies);
const heroes = ["neutral1", "neutral3", "neutral8", "neutral9", "neutral10", "neutral11", "neutral12", 
                "NR1", "NR2", "NR3", "NR4",
                "NG1", "NG2", "NG3", "NG4",
                "ST1", "ST2", "ST3", "ST4",
                "MO1", "MO2", "MO3", "MO4"];
const medics = ["neutral10", "NR18", "NG2", "NG29", "NG30", "ST35", "ST36"];
const tightBonds = ["NR5", "NR17", "NR22", "NR25", "NG16", "NG24", "NG28"] 
const musterCategories = {
    "Arachas" : ["MO20", "MO21", "MO22"],
    "ArachasBehemoth" : ["MO8"],
    "Crone" : ["MO9", "MO10", "MO11"],
    "Vampire" : ["MO23", "MO24", "MO25", "MO26"],
    "Nekker" : ["MO34", "MO35", "MO36"],
    "Ghoul" : ["MO37", "MO38", "MO39"],
    "HavekarSmuggler" : ["ST14", "ST15", "ST16"],
    "DwarvernSkirmisher" : ["ST27", "ST28", "ST29"],
    "ElvenSkirmisher" : ["ST31", "ST32", "ST33"]
}
const arachasBehemoth = "MO8";
const musterIds = [].concat(...Object.values(musterCategories));
const moraleBoosters = ["NR28", "ST3", "ST5", "MO4"];
const decoy = "neutral1";
const commandersHorn = "neutral2";
const scorchId = "neutral3";
const bitingFrost = "neutral4";
const impenetrableFog = "neutral5";
const torrentialRain = "neutral6";
const clearWeather = "neutral7";
const villentretenmerth = "neutral13";
const dandelion = "neutral17";
const horns = [commandersHorn, dandelion];
const weatherCards = [bitingFrost, impenetrableFog, torrentialRain];

const rowIds = ["combatLane", "rangedLane", "siegeLane", "opCombatLane", "opRangedLane", "opSiegeLane"];
const hornIds = ['combatHorn','rangedHorn','siegeHorn', "opCombatHorn", "opRangedHorn", "opSiegeHorn"];
const boardPosIds = rowIds.concat(hornIds);
const powerIds = ["opSiegePower", "opRangedPower", "opCombatPower", "opTotalPower", "combatPower", "rangedPower", "siegePower", "totalPower"];
const pRows = rowIds.slice(0,3);
const opRows = rowIds.slice(3);

const modBase = {combatLane:{}, rangedLane:{}, siegeLane:{}, opCombatLane:{}, opRangedLane:{}, opSiegeLane:{}};
let tightBondMods = moraleMods = $.extend(true,{},modBase); // Deep clone