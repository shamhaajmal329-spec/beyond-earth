const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const navPanel = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const playButton = document.getElementById('playGame');
const startMissionButton = document.getElementById('startMission');
const gameScreen = document.getElementById('game-screen');
const gameIntro = document.getElementById('game-intro');
const finalScreen = document.getElementById('final-screen');
const roundLabel = document.getElementById('roundLabel');
const categoryLabel = document.getElementById('categoryLabel');
const questionCategory = document.getElementById('questionCategory');
const questionText = document.getElementById('questionText');
const answerGrid = document.getElementById('answers');
const feedbackPanel = document.getElementById('feedbackPanel');
const feedbackText = document.getElementById('feedbackText');
const feedbackIcon = document.getElementById('feedbackIcon');
const innovationPanel = document.getElementById('innovationPanel');
const innovationStatus = document.getElementById('innovationStatus');
const innovationCompany = document.getElementById('innovationCompany');
const innovationTitle = document.getElementById('innovationTitle');
const innovationText = document.getElementById('innovationText');
const innovationDiscovered = document.getElementById('innovationDiscovered');
const continueButton = document.getElementById('continueButton');

const rounds = [
  {
    round: 'ROUND 01 / 03',
    category: 'THE FLIGHT',
    question: 'Which company focuses on commercial suborbital spaceflight using a spaceplane system?',
    answers: ['A � Virgin Galactic', 'B � Blue Origin', 'C � Orion Span'],
    correct: 'A',
    company: 'VIRGIN GALACTIC',
    title: 'AIR-LAUNCH SPACEPLANE',
    explanation: 'Virgin Galactic focuses on commercial suborbital spaceflight. Its approach uses a carrier aircraft to carry the spaceplane to high altitude before the spaceplane continues its journey toward space.',
    continueText: 'CONTINUE TO ROUND 02 ?',
    correctFeedback: '? CORRECT � VIRGIN GALACTIC'
  },
  {
    round: 'ROUND 02 / 03',
    category: 'THE ROCKET',
    question: 'Which company developed New Shepard, a reusable system designed for suborbital human spaceflight?',
    answers: ['A � Virgin Galactic', 'B � Blue Origin', 'C � Orion Span'],
    correct: 'B',
    company: 'BLUE ORIGIN',
    title: 'REUSABLE ROCKET TECHNOLOGY',
    explanation: 'Blue Origin developed New Shepard as a reusable suborbital launch system. Reusability is an important innovation because launch hardware can be designed for repeated missions.',
    continueText: 'CONTINUE TO ROUND 03 ?',
    correctFeedback: '? CORRECT � BLUE ORIGIN'
  },
  {
    round: 'ROUND 03 / 03',
    category: 'THE HOTEL',
    question: 'Which company proposed Aurora Station, a concept for a commercial space habitat?',
    answers: ['A � Virgin Galactic', 'B � Blue Origin', 'C � Orion Span'],
    correct: 'C',
    company: 'ORION SPAN',
    title: 'AURORA STATION',
    explanation: 'Orion Span proposed Aurora Station as a concept for a private commercial space station designed to provide an orbital accommodation experience.',
    continueText: 'COMPLETE MISSION ?',
    correctFeedback: '? CORRECT � ORION SPAN'
  }
];

let currentRound = 0;

function setupMenu() {
  if (!menuToggle || !navPanel) return;

  menuToggle.addEventListener('click', () => {
    const open = navPanel.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
}

function startMission() {
  if (!gameScreen || !gameIntro) return;

  gameIntro.style.display = 'none';
  gameScreen.classList.add('active');
  gameScreen.style.display = 'block';
  gameScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
  currentRound = 0;
  showRound(currentRound);
}

function showRound(roundIndex) {
  const data = rounds[roundIndex];

  if (!data) return;

  roundLabel.textContent = data.round;
  categoryLabel.textContent = data.category;
  questionCategory.textContent = data.category;
  questionText.textContent = data.question;

  answerGrid.innerHTML = '';

  data.answers.forEach((answerText, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-button';
    button.dataset.answer = String.fromCharCode(65 + index);
    button.textContent = answerText;
    button.addEventListener('click', () => chooseAnswer(button, data));
    answerGrid.appendChild(button);
  });

  feedbackPanel.classList.remove('hidden');
  feedbackPanel.classList.remove('correct');
  feedbackText.textContent = 'Choose an answer';
  feedbackIcon.textContent = '?';

  innovationPanel.classList.remove('active');
  innovationPanel.style.display = 'none';
  continueButton.textContent = data.continueText;
  continueButton.onclick = null;
}

function chooseAnswer(button, data) {
  const selected = button.dataset.answer;
  const allButtons = Array.from(answerGrid.children);

  allButtons.forEach((btn) => {
    btn.disabled = true;
  });

  if (selected === data.correct) {
    button.classList.add('correct');
    feedbackText.textContent = data.correctFeedback;
    feedbackIcon.textContent = '?';
    feedbackPanel.classList.add('correct');

    innovationStatus.textContent = '? MISSION COMPLETE';
    innovationCompany.textContent = data.company;
    innovationTitle.textContent = data.title;
    innovationText.textContent = data.explanation;
    innovationDiscovered.textContent = data.company === 'ORION SPAN' ? 'FINAL INNOVATION DISCOVERED ?' : 'INNOVATION DISCOVERED ?';

    innovationPanel.style.display = 'block';
    innovationPanel.classList.add('active');
    continueButton.textContent = data.continueText;

    continueButton.onclick = () => {
      if (currentRound < rounds.length - 1) {
        currentRound += 1;
        showRound(currentRound);
      } else {
        finishMission();
      }
    };
  } else {
    button.classList.add('wrong');
    feedbackText.textContent = 'NOT QUITE � TRY AGAIN';
    feedbackIcon.textContent = '�';

    setTimeout(() => {
      button.classList.remove('wrong');
      allButtons.forEach((btn) => {
        btn.disabled = false;
      });
    }, 500);
  }
}

function finishMission() {
  if (!gameScreen || !finalScreen) return;

  gameScreen.classList.remove('active');
  gameScreen.style.display = 'none';
  finalScreen.classList.add('active');
  finalScreen.style.display = 'flex';
  finalScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function activateNavigation() {
  navLinks.forEach((link) => {
    const target = link.getAttribute('href');
    const currentSection = target && target.startsWith('#') ? document.querySelector(target) : null;

    if (currentSection && isInViewport(currentSection)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
}

setupMenu();

if (playButton) {
  playButton.addEventListener('click', (event) => {
    event.preventDefault();
    const intro = document.getElementById('game-intro');
    if (intro) intro.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (startMissionButton) {
  startMissionButton.addEventListener('click', startMission);
}

window.addEventListener('scroll', activateNavigation);
// --- ROCKET ORBIT LOGIC ---
    // Calculate center of Earth (assuming Earth is at canvas center)
    const earthCenterX = canvas.width / 2;
    const earthCenterY = canvas.height / 2;

    // Calculate rocket coordinates
    const rocketX = earthCenterX + orbitRadius * Math.cos(rocketAngle);
    const rocketY = earthCenterY + orbitRadius * Math.sin(rocketAngle);

    // Draw Rocket (Simple representation)
    ctx.beginPath();
    ctx.arc(rocketX, rocketY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Increment angle so it revolves on the next frame
    rocketAngle += orbitSpeed;
