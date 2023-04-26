const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const bgclouds = document.querySelector('.bgclouds');
const press = document.querySelector('.press');
const logo = document.querySelector('.logo');
const btn = document.querySelector('#refresh');


const som_HIT = new Audio();
som_HIT.src = './efeitos/efeitos_hit.wav';


const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');
const milisecondsEl = document.querySelector('#miliseconds');

let interval;
let minutes = 00;
let seconds = 00;
let miliseconds = 00;
let itsPaused = true; // Era false




function startTimer() {
    interval = setInterval(() =>{
        if(itsPaused){
            miliseconds += 10;
            

            if (miliseconds === 1000) {
                seconds++;
                miliseconds = 0;
            }

            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }

            minutesEl.textContent = formatTime(minutes);
            secondsEl.textContent = formatTime(seconds);
            milisecondsEl.textContent = miliseconds;
        }
    }, 10  );
}

function formatTime(time) {
    return time < 10 ? `0${time}`: time;
}

function formatMilliseconds(time) {
    return time <100 ? time.padStart(3, "0") : time;
}

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

function newGame() {
    if (press.style.display = 'flex'){
    return logo.style.display = 'none';
    }
    
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    const bgcloudsPosition = bgclouds.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  
    press.style.display = 'none'; // Pra sumir durante o jogo
       

    //console.log(marioPosition);
    
    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        clouds.style.animation = "none";
        clouds.style.left = `${cloudsPosition}px`;
        
        bgclouds.style.animation = "none";
        bgclouds.style.left = `${bgcloudsPosition}px`;

        //mario.style.animation = "none";
        //mario.style.bottom = `${marioPosition}px`; // Pra congelar na altura da colisão

        mario.src = './images/gameovermario.png';
        mario.style.width = '150px';
        mario.style.marginLeft = '50px';

        logo.style.display = 'none';

        som_HIT.play();

        press.style.display = 'flex';

        itsPaused = (!itsPaused)

        startTimer = startTimer;

        clearInterval(loop);
    }

}, 10);

/////////////////////////////////////////////////////////////////////

document.onload = startTimer();
document.addEventListener('keydown', jump);
document.addEventListener('keydown', newGame);

btn.addEventListener("click", () =>{ //Botão REFRESH pra recomeçar o jogo.
    location.reload()
})

