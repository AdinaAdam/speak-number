const messageElement = document.getElementById('msg');

const randomNumber = getRandomNumber();

console.log('Number:',randomNumber);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// ? Start recognition and game
recognition.start();

// ?Capture user speak
function onSpeak(e){
  const msg = e.results[0][0].transcript;

  // console.log(msg);
  writeMessage(msg);
  checkNumber(msg);
}

// ? Write what user speaks
function writeMessage(msg){
  messageElement.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
  `;
}

// ? Check message to be a number
function checkNumber(msg){
  const number = parseInt(msg);

  // ? Check if is valid number
  if(Number.isNaN(number)){
    messageElement.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }

  // ? Check if number is in range 1-100
  if(number > 100 || number < 1){
    messageElement.innerHTML 
    += `<div>Number must be between 1 and 100</div>`;
    return;
  }

  // ? check number
  if(number === randomNumber){
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number!<br><br>
      It was ${number}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (number > randomNumber){
    messageElement.innerHTML += '<div>GO LOWER </div>'; 
  } else{
    messageElement.innerHTML += '<div> GO HIGHER</div>';
  }
}

// ?Generate random number
function getRandomNumber(){
  return Math.floor(Math.random() * 100) +1;
}

// ?Speak result
recognition.addEventListener('result', onSpeak);

// ? end speach recognition service
recognition.addEventListener('end', () => recognition.start());

// ?play again button - functional
document.body.addEventListener('click', (e) => {
  if(e.target.id === 'play-again'){
    window.location.reload();
  }
});

