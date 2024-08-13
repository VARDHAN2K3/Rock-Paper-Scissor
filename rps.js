let Score=JSON.parse(localStorage.getItem('Score')) ||
    {
        booyah:0,
        defeated:0,
        tie:0
    };
document.querySelector('.js-score').innerHTML=`Booyah:${Score.booyah}, Defeated:${Score.defeated}, Tie:${Score.tie}`;

//onclick buttons
document.querySelector('.js-rock-btn').addEventListener('click',()=>{
    playGame('rock');//rock button
});

document.querySelector('.js-paper-btn').addEventListener('click',()=>{
    playGame('paper');//paper button
});

document.querySelector('.js-scissor-btn').addEventListener('click',()=>{
    playGame('scissor');//scissor button
});
document.querySelector('.reset-btn').addEventListener('click',()=>{
    if(Score.booyah || Score.defeated || Score.tie){
        document.querySelector('.js-reset-confirm-div').classList.add('reset-confirm-div')
        document.querySelector('.js-reset-confirm-div').innerHTML = `
            <div class="reset-confirm">
            <div>Do you want to reset!</div>
            <div class="reset-btn-div">
                <button class="reset-confirm-btn js-reset-confirm-btn">YES</button>
                <button class="reset-confirm-btn js-reset-confirm-btn">NO</button>
            </div>
            <div class="cancle-btn js-reset-confirm-btn">x</div>
            </div>
        `;
        document.querySelectorAll('.js-reset-confirm-btn').forEach(btn =>{
            btn.addEventListener('click',() => {
                if(btn.innerHTML === 'YES'){
                    Score.booyah=0;
                    Score.defeated=0;//reset button
                    Score.tie=0;
                    localStorage.removeItem('Score');
                    document.querySelector('.js-results').innerHTML='';//cleaning results
                    document.querySelector('.js-moves-results').innerHTML='';//cleaning moves results
                    document.querySelector('.js-score').innerHTML=`Booyah:${Score.booyah}, Defeated:${Score.defeated}, Tie:${Score.tie}`;
                    document.querySelector('.js-reset-confirm-div').innerHTML = `
                        <div class="reset-confirm">
                        <div class="txt-reset">Your score is Successfully reset!</div>
                        <div>Tap 'OK' to go back!</div>
                        <div class="reset-btn-div">
                            <button class="reset-confirm-btn js-reset-confirm-btn">OK</button>
                        </div>
                        </div>
                    `;
                    let okBtn = document.querySelector('.js-reset-confirm-btn')
                    okBtn.addEventListener('click',() => {
                        if(okBtn.innerHTML === 'OK'){
                            removePopUp();
                        }
                    });
                }else if(btn.innerHTML === 'NO' || btn.innerHTML === 'x'){
                    removePopUp();
                }
            });
        });
    }
});


const autoPlay=document.querySelector('.auto-play-btn');
let intervalId;//auto play button
autoPlay.addEventListener('click',()=>{
    autoPlayGame();
});
//keydowns
document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r' || event.key === 'R'){
        playGame('rock');
    }else if(event.key === 'p' || event.key === 'P'){
        playGame('paper');
    }else if(event.key === 's' || event.key === 'S'){
        playGame('scissor');
    }else if(event.key === 'a' || event.key === 'A'){
        autoPlayGame();
    }
});

//autoplay function
function autoPlayGame(){
    if(autoPlay.innerText === 'Auto Play'){
        autoPlay.innerText='Stop';
        intervalId=setInterval(()=>{
            playGame(computer());
        },1000);
    }else if(autoPlay.innerText === 'Stop'){
        autoPlay.innerText='Auto Play';
        clearInterval(intervalId);
    }
}

function removePopUp(){
    document.querySelector('.js-reset-confirm-div').classList.remove('reset-confirm-div')
    document.querySelector('.js-reset-confirm-div').innerHTML = '';
}
//computer move
function computer(){
    let computerMove='';
    const randomnum=Math.random();
    if(randomnum > 0 && randomnum < 1/3){
        computerMove="rock";
    }else if(randomnum > 1/3 && randomnum < 2/3){
        computerMove='paper';
    }else if(randomnum > 2/3 && randomnum < 1){
        computerMove='scissor';
    }
    return computerMove;
}

//playing game
function playGame(playerMove){
    const computerMove=computer();
    let results;
    if(playerMove === 'rock'){
        if(computerMove === 'rock'){
            results='Tie!';
        }else if(computerMove === 'paper'){
            results='Defeated';
        }else{
            results='Booyah';
        }
    }else if(playerMove === 'paper'){
        if(computerMove === 'rock'){
            results='Booyah';
        }else if(computerMove === 'paper'){
            results='Tie!';
        }else{
            results='Defeated';
        }
    }else{
        if(computerMove === 'rock'){
            results='Defeated';
        }else if(computerMove === 'paper'){
            results='Booyah';
        }else{
            results='Tie!';
        }
    }
    if(results === 'Booyah'){
        Score.booyah++;
    }else if(results === 'Defeated'){
        Score.defeated++;
    }else if(results === 'Tie!'){
        Score.tie++;
    }
    
    localStorage.setItem('Score',JSON.stringify(Score));
    //results
    document.querySelector('.js-results').innerHTML=`${results}`;
    //moves results
    document.querySelector('.js-moves-results').innerHTML=`You <img src="${playerMove}-emoji.png" class="move-img"> <img src="${computerMove}-emoji.png" class="move-img">Computer`;
    //score
    document.querySelector('.js-score').innerHTML=`Booyah:${Score.booyah}, Defeated:${Score.defeated}, Tie:${Score.tie}`;
}
