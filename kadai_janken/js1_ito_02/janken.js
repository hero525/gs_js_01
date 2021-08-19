'use strict';

const game = () => {
  let pScore = 0;
  let cScore = 0;

  //openning
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  // music :zawazawa
  const bgm1 = document.querySelector("#bgm1");       // <audio>
  const btn  = document.querySelector("#btn-play");   // <button>

  btn.addEventListener("click", ()=>{
    // pausedがtrue=>停止, false=>再生中
    if( ! bgm1.paused ){
      btn.innerHTML = '<i class="fas fa-play">Play zawa</i>';  
      bgm1.pause();
    }
    else{
      btn.innerHTML = '<i class="fas fa-pause">Pause zawa</i>';  
      bgm1.play();
    }
  });
  // event再生終了時
   bgm1.addEventListener("ended", ()=>{
    btn.innerHTML = '<i class="fas fa-play"></i>';  
  });

  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
    
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach(option => {
      option.addEventListener("click", function() {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          compareHands(this.textContent, computerChoice);
          
          playerHand.src = `./imgs/${this.textContent}.png`;
          computerHand.src = `./imgs/${computerChoice}.png`;
        }, 2000);
        
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");
    //Tie
    if (playerChoice === computerChoice){
      winner.textContent = "この手はなんの為についている……?";
      return;
    }
    //Rock
    if (playerChoice === "rock"){
      if (computerChoice === "scissors"){
        winner.textContent = "すべてを捩じ伏せ……オレは勝つ！！！";
        pScore++;
        updateScore();
        return;
      } else{
        winner.textContent = "手痛く負けたときこそ…胸を張れっ…！";
        cScore++;
        updateScore();
        return;
      }
    }
    //Paper
    if (playerChoice === "paper"){
      if (computerChoice === "scissors"){
        winner.textContent = "手痛く負けたときこそ…胸を張れっ…！";
        cScore++;
        updateScore();
        return;
      } else{
        winner.textContent = "すべてを捩じ伏せ……オレは勝つ！！！";
        pScore++;
        updateScore();
        return;
      }
    }
    //Scissors
    if (playerChoice === "scissors"){
      if (computerChoice === "rock"){
        winner.textContent = "手痛く負けたときこそ…胸を張れっ…！";
        cScore++;
        updateScore();
        return;
      } else{
        winner.textContent = "すべてを捩じ伏せ……オレは勝つ！！！";
        pScore++;
        updateScore();
        return;
      }
    }
  };


  startGame();
  playMatch();
};

  game();
