/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores,roundScore,activePlayer;
scores = [0,0];
roundScore=0;
activePlayer=0;
//random function gives randoom number between o to 1
document.getElementById('score-0').textContent= '0';
document.getElementById('score-1').textContent= '0';
document.getElementById('current-0').textContent= '0';
document.getElementById('current-1').textContent= '0';


// document.querySelector('#current-' + activePlayer).textContent = dice;
//To change HTML innerHTML is used in textcontent that can not happen
// document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'</em>';

// document.querySelector('.dice').style.display ='none';
document.querySelector('.btn-roll').addEventListener('click',function(){
    // Random Number
    let dice = Math.floor((Math.random()*6)+1);
    //Display the Result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display='block';
    diceDOM.src ='dice-' + dice +'.png';
    
    //Update the round score if the rolled number was not a 1
    if(dice !== 1){
        //Add Score
        roundScore += dice;
        document.getElementById('current-'+activePlayer).textContent =roundScore;
    } else {
        //Next Player
        roundScore =0;
        document.getElementById('current-0').textContent ='0';
        document.getElementById('current-1').textContent ='0';
        
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player--panel').classList.toggle('active');
        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player--panel').classList.add('active');
        document.querySelector('.dice').style.display ='none';
    }
});