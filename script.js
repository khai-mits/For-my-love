// Floating Hearts Generator
function createHeart() {
  const container = document.getElementById('heartsContainer');
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.innerHTML = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 500);

// Gift Unwrapping Trigger
function openGift() {
  const letter = document.getElementById('hiddenLetter');
  const giftIcon = document.getElementById('giftIcon');
  if (letter.style.display === 'block') return;
  
  giftIcon.style.transform = 'scale(1.3) rotate(-15deg)';
  setTimeout(() => {
    giftIcon.innerHTML = '🧸✨';
    letter.style.display = 'block';
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 }
    });
  }, 200);
}

// Mini Quiz Handler
function answerQuiz(isCorrect) {
  const result = document.getElementById('quizResult');
  if (isCorrect) {
    result.style.display = 'block';
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.9 } });
  } else {
    alert("Nice try! Choose the right one! 😉");
  }
}

// Custom Audio Player for MP3
const backgroundMusic = new Audio('song.mp3'); // Matches your uploaded file name
backgroundMusic.loop = true; // Loops the song continuously
let isPlaying = false;

function toggleMusic() {
  const btn = document.querySelector('.music-btn');
  if (!isPlaying) {
    backgroundMusic.play().then(() => {
      isPlaying = true;
      btn.innerHTML = '🔇 Stop Tune';
    }).catch(error => {
      console.log("Audio play blocked or file missing:", error);
      alert("Make sure 'song.mp3' is uploaded correctly in your repository!");
    });
  } else {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Resets song to the beginning
    isPlaying = false;
    btn.innerHTML = '🎵 Play Sweet Tune';
  }
}
