/* 35-second collecting game. */
document.addEventListener('DOMContentLoaded', () => {
  const stage = document.querySelector('#gameStage');
  const start = document.querySelector('#gameStart');
  const scoreEl = document.querySelector('#gameScore');
  const timeEl = document.querySelector('#gameTime');
  const message = stage.querySelector('.game-message');
  const cat = stage.querySelector('.game-cat');

  let running = false;
  let score = 0;
  let time = 35;
  let spawn;
  let timer;

  const stop = () => {
    running = false;
    clearInterval(spawn);
    clearInterval(timer);
    message.textContent = score >= 9 
      ? 'A bouquet for you — you did it! 💐' 
      : 'A lovely try. The cat saved the best ones.';
    start.textContent = 'Play again';
  };

  const make = () => {
    const bad = Math.random() < 0.28;
    const el = document.createElement('span');
    el.className = 'game-item';
    el.textContent = bad 
      ? ['💔', '🌧️', '💨'][Math.floor(Math.random() * 3)] 
      : ['🌹', '♥', '⭐', '🎀'][Math.floor(Math.random() * 4)];
    el.style.left = `${6 + Math.random() * 84}%`;
    el.style.animationDuration = `${2.3 + Math.random() * 1.7}s`;

    el.addEventListener('pointerenter', () => {
      if (!running) return;
      score = Math.max(0, score + (bad ? -2 : 1));
      scoreEl.textContent = String(score).padStart(2, '0');
      el.remove();
    });

    el.addEventListener('animationend', () => el.remove());
    stage.append(el);
  };

  start.addEventListener('click', () => {
    if (running) return;
    running = true;
    score = 0;
    time = 35;
    scoreEl.textContent = '00';
    timeEl.textContent = '35';
    message.textContent = 'Move your cursor and catch the good things.';

    spawn = setInterval(make, 530);
    timer = setInterval(() => {
      time--;
      timeEl.textContent = String(time).padStart(2, '0');
      if (time <= 0) stop();
    }, 1000);
  });

  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    cat.style.left = `${Math.max(0, Math.min(r.width - 55, e.clientX - r.left - 25))}px`;
  });
});