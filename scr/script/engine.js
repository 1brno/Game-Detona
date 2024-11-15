const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    values:{
        gameVelocity: 900,
        hitPosition:0,
        result:0,
        currentTime:60,
    },

    actions:{
        timerId: null, /*setInterval(randomSqaure,1000)*/ 
        countDownTimerid:setInterval(countDown, 1000),
    },
};


function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0 ) {
        clearInterval(state.actions.countDownTimerid);
        clearInterval(state.actions.timerId);
        alert("Gamer Over! Seu Resultado foi:" + state.values.result);

    }
}


function playSound(audioName){
    let audio = new Audio(`./scr/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}


function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent =  state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
       
        });
    });
}

function init() {
    moveEnemy();
    addListenerHitBox();
}



init();