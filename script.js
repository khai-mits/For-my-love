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

// Web Audio API Synthesized Soft Tune
let audioCtx = null;
let isPlaying = false;
let timer = null;

function toggleMusic() {
  const btn = document.querySelector('.music-btn');
  if (!isPlaying) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    isPlaying = true;
    btn.innerHTML = '🔇 Stop Tune';
    playMelody();
  } else {
    if (timer) clearInterval(timer);
    if (audioCtx) audioCtx.close();
    isPlaying = false;
    btn.innerHTML = '🎵 Play Sweet Tune';
  }
}

function playNote(frequency, duration) {
  if (!audioCtx || !isPlaying) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.value = frequency;
  
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playMelody() {
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 392.00, 329.63, 293.66];
  let index = 0;
  timer = setInterval(() => {
    if (!isPlaying) return;
    playNote(notes[index], 0.6);
    index = (index + 1) % notes.length;
  }, 700);
}