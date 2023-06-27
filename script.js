document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container');
  const numberInput = document.getElementById('number-input');
  const startButton = document.getElementById('start-button');
  const timerElement = document.getElementById('timer');
  const scoreElement = document.getElementById('score');
  
  let selectedNumber = null;
  let bubblesPopped = 0;
  let score = 0;
  let timer = 0;
  let timerInterval = null;
  
  startButton.addEventListener('click', startGame);
  
  function startGame() {
    selectedNumber = parseInt(numberInput.value);
    if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > 9) {
      alert('Please enter a valid number between 1 and 9.');
      return;
    }
  
    bubblesPopped = 0;
    score = 0;
    scoreElement.textContent = '';
    timer = getSelectedTime();
    timerElement.textContent = `Time: ${timer} seconds`;
    gameContainer.innerHTML = '';
  
    startButton.disabled = true;
    numberInput.disabled = true;
  
    timerInterval = setInterval(updateTimer, 1000);
    createBubbles();
  }
  
  function createBubbles() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = getRandomNumber(1, 9);
    bubble.style.left = getRandomPosition(550) + 'px';
    bubble.style.transform = `translateZ(${getRandomPosition(300)}px)`;
    bubble.addEventListener('click', popBubble);
    gameContainer.appendChild(bubble);
  
    if (timer > 0) {
      setTimeout(createBubbles, getRandomPosition(3000));
    }
  }
  
  function popBubble() {
    bubblesPopped++;
    if (parseInt(this.textContent) === selectedNumber) {
      score++;
    }
    this.classList.add('pop');
    this.removeEventListener('click', popBubble);
    this.addEventListener('animationend', () => {
      gameContainer.removeChild(this);
      if (bubblesPopped === 10 || timer === 0) {
        endGame();
      }
    });
  }
  
  function updateTimer() {
    if (timer === 0) {
      endGame();
      return;
    }
  
    timer--;
    timerElement.textContent = `Time: ${timer} seconds`;
  }
  
  function endGame() {
    clearInterval(timerInterval);
    gameContainer.innerHTML = '';
    startButton.disabled = false;
    numberInput.disabled = false;
    scoreElement.textContent = `Score: ${score}/10`;
    scoreElement.style.visibility = 'visible';
    scoreElement.style.opacity = '1';
  }
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
  }

  function getSelectedTime() {
    const timeSelect = document.getElementById('time-select');
    return parseInt(timeSelect.value);
  }
});
  
  

  
