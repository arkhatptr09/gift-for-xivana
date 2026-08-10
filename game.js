/* 35-second mobile collecting game */
document.addEventListener('DOMContentLoaded', () => {
  const stage = document.querySelector('#gameStage');
  if (!stage) return;

  const start = document.querySelector('#gameStart');
  const scoreEl = document.querySelector('#gameScore');
  const timeEl = document.querySelector('#gameTime');
  const message = stage.querySelector('.game-message');
  const cat = stage.querySelector('.game-cat');
  const reward = document.querySelector('#bouquetReward');

  let running = false;
  let score = 0;
  let time = 35;
  let spawn;
  let timer;
  let collisionLoop;

  // =========================
  // GERAKKAN KUCING
  // =========================

  const moveCat = (event) => {
    if (!running) return;

    const point = event.touches?.[0] || event;
    const bounds = stage.getBoundingClientRect();

    let x = point.clientX - bounds.left - cat.offsetWidth / 2;

    x = Math.max(
      0,
      Math.min(bounds.width - cat.offsetWidth, x)
    );

    cat.style.left = `${x}px`;
  };

  // =========================
  // COLLECT ITEM
  // =========================

  const collect = (element, bad) => {
    if (!running || !element || element.dataset.collected) return;

    element.dataset.collected = 'true';

    score = Math.max(0, score + (bad ? -2 : 1));
    scoreEl.textContent = String(score).padStart(2, '0');

    // Efek ketika tertangkap
    element.classList.add(
      bad ? 'item-hit-bad' : 'item-collected'
    );

    setTimeout(() => {
      element.remove();
    }, 120);
  };

  // =========================
  // CEK TABRAKAN
  // =========================

  const checkCollision = () => {
    if (!running) return;

    const catRect = cat.getBoundingClientRect();
    const items = stage.querySelectorAll('.game-item');

    items.forEach(item => {
      if (item.dataset.collected) return;

      const itemRect = item.getBoundingClientRect();

      const collision =
        catRect.left < itemRect.right &&
        catRect.right > itemRect.left &&
        catRect.top < itemRect.bottom &&
        catRect.bottom > itemRect.top;

      if (collision) {
        const bad = item.dataset.bad === 'true';
        collect(item, bad);
      }
    });
  };

  // =========================
  // STOP GAME
  // =========================

  const stop = () => {
    running = false;

    clearInterval(spawn);
    clearInterval(timer);
    cancelAnimationFrame(collisionLoop);

    const won = score >= 9;

    message.textContent = won
      ? 'A bouquet is on its way... 💐'
      : 'A lovely try. The cat saved the best ones.';

    start.textContent = 'Play again';

    if (won && reward) {
      setTimeout(() => reward.showModal(), 500);
    }
  };

  // =========================
  // BUAT ITEM
  // =========================

  const make = () => {
    if (!running) return;

    const badItems = ['💔', '🌧️', '💨'];
    const goodItems = ['🌹', '♥', '⭐', '🎀'];

    const bad = Math.random() < 0.28;

    const el = document.createElement('button');

    el.type = 'button';
    el.className = 'game-item';

    el.dataset.bad = bad ? 'true' : 'false';

    el.setAttribute(
      'aria-label',
      bad
        ? 'Avoid this storm'
        : 'Collect this treasure'
    );

    el.textContent = bad
      ? badItems[Math.floor(Math.random() * badItems.length)]
      : goodItems[Math.floor(Math.random() * goodItems.length)];

    // Posisi horizontal
    el.style.left = `${5 + Math.random() * 90}%`;

    // Kecepatan jatuh
    el.style.animationDuration =
      `${2.3 + Math.random() * 1.7}s`;

    stage.appendChild(el);

    // Hapus kalau sampai bawah
    el.addEventListener('animationend', () => {
      el.remove();
    });
  };

  // =========================
  // START GAME
  // =========================

  start?.addEventListener('click', () => {
    if (running) return;

    running = true;
    score = 0;
    time = 35;

    scoreEl.textContent = '00';
    timeEl.textContent = '35';

    message.textContent =
      'Geser kucing dan tangkap semua benda indah!';

    start.textContent = 'Playing...';

    // Bersihkan item lama
    stage
      .querySelectorAll('.game-item')
      .forEach(item => item.remove());

    // Posisi awal kucing
    cat.style.left = '50%';
    cat.style.transform = 'translateX(-50%)';

    // Spawn item
    spawn = setInterval(make, 530);

    // Timer
    timer = setInterval(() => {
      time--;

      timeEl.textContent =
        String(time).padStart(2, '0');

      if (time <= 0) {
        stop();
      }
    }, 1000);

    // Collision loop
    const collision = () => {
      checkCollision();

      if (running) {
        collisionLoop = requestAnimationFrame(collision);
      }
    };

    collisionLoop = requestAnimationFrame(collision);
  });

  // =========================
  // MOBILE TOUCH
  // =========================

  stage.addEventListener('pointerdown', event => {
    if (!running) return;

    event.preventDefault();

    moveCat(event);

    if (stage.setPointerCapture) {
      try {
        stage.setPointerCapture(event.pointerId);
      } catch (error) {}
    }
  });

  stage.addEventListener('pointermove', event => {
    if (!running) return;

    event.preventDefault();
    moveCat(event);
  });

  stage.addEventListener('pointerup', event => {
    if (stage.releasePointerCapture) {
      try {
        stage.releasePointerCapture(event.pointerId);
      } catch (error) {}
    }
  });

  // =========================
  // CLOSE REWARD
  // =========================

  document
    .querySelectorAll('.close-reward')
    .forEach(button => {
      button.addEventListener('click', () => {
        reward?.close();
      });
    });
});
