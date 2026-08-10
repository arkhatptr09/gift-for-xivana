/* Relationship counter and monthly-anniversary surprise */
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('#loader');
  if (loader) setTimeout(() => loader.classList.add('done'), 2100);

  document.querySelectorAll('[data-scroll]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const envelope = document.querySelector('#envelope');
  const paper = document.querySelector('#letterPaper');
  envelope?.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => paper?.classList.add('show'), 500);
  });

  const counter = document.querySelector('#counter');
  const date = document.querySelector('#startDate');
  const anniversaryNote = document.querySelector('#anniversaryNote');
  const anniversaryCountdown = document.querySelector('#anniversaryCountdown');
  const anniversaryDialog = document.querySelector('#anniversarySurprise');
  const surpriseSeconds = document.querySelector('#surpriseSeconds');
  const surpriseCountdown = document.querySelector('#surpriseCountdown');
  const surpriseMessage = document.querySelector('#surpriseMessage');

  let surpriseTimer;
  let activeSurpriseKey = '';

  const formatDate = value => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(value);
  const pad = value => String(value).padStart(2, '0');
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const safeMonthlyDate = (year, month, day) => new Date(year, month, Math.min(day, daysInMonth(year, month)), 0, 0, 0, 0);

  const nextMonthlyAnniversary = (start, now) => {
    let candidate = safeMonthlyDate(now.getFullYear(), now.getMonth(), start.getDate());
    if (candidate <= now) candidate = safeMonthlyDate(now.getFullYear(), now.getMonth() + 1, start.getDate());
    return candidate;
  };

  const revealAnniversary = key => {
    clearInterval(surpriseTimer);
    if (surpriseCountdown) surpriseCountdown.hidden = true;
    if (surpriseMessage) {
      surpriseMessage.hidden = false;
      surpriseMessage.classList.add('revealed');
    }
    localStorage.setItem('lastMonthlySurprise', key);

    for (let i = 0; i < 28; i++) {
      const heart = document.createElement('i');
      heart.className = 'anniversary-confetti';
      heart.textContent = i % 3 ? '♥' : '✦';
      heart.style.setProperty('--x', `${(Math.random() - 0.5) * 640}px`);
      heart.style.setProperty('--y', `${-120 - Math.random() * 520}px`);
      heart.style.setProperty('--delay', `${Math.random() * 0.7}s`);
      document.body.append(heart);
      setTimeout(() => heart.remove(), 2600);
    }
  };

  const beginSurprise = target => {
    const key = target.toISOString();
    if (activeSurpriseKey === key || localStorage.getItem('lastMonthlySurprise') === key) return;
    activeSurpriseKey = key;

    if (surpriseCountdown) surpriseCountdown.hidden = false;
    if (surpriseMessage) {
      surpriseMessage.hidden = true;
      surpriseMessage.classList.remove('revealed');
    }
    anniversaryDialog?.showModal();

    const countDown = () => {
      const seconds = Math.max(0, Math.ceil((target - new Date()) / 1000));
      if (surpriseSeconds) surpriseSeconds.textContent = seconds;
      if (seconds === 0) revealAnniversary(key);
    };

    countDown();
    surpriseTimer = setInterval(countDown, 200);
  };

  const updateDates = () => {
    if (!date?.value) return;
    const start = new Date(`${date.value}T00:00:00`);
    const now = new Date();
    if (Number.isNaN(start.getTime())) return;

    const elapsed = Math.max(0, Math.floor((now - start) / 1000));
    const values = [
      Math.floor(elapsed / 31536000),             // Years
      Math.floor((elapsed % 31536000) / 2592000),  // Months
      Math.floor((elapsed % 2592000) / 86400),     // Days
      Math.floor((elapsed % 86400) / 3600),        // Hours
      Math.floor((elapsed % 3600) / 60),           // Minutes
      elapsed % 60                                 // Seconds
    ];

    counter?.querySelectorAll('b').forEach((element, index) => {
      element.textContent = pad(values[index]);
    });

    const next = nextMonthlyAnniversary(start, now);
    const remaining = Math.max(0, next - now);

    if (anniversaryNote) anniversaryNote.textContent = `Check this website again on ${formatDate(next)}, okay?`;

    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    if (anniversaryCountdown) {
      anniversaryCountdown.textContent = `Monthly surprise in ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    if (remaining <= 10000) beginSurprise(next);
  };

  date?.addEventListener('change', () => { activeSurpriseKey = ''; updateDates(); });
  updateDates();
  setInterval(updateDates, 1000);

  document.querySelector('.close-anniversary')?.addEventListener('click', () => anniversaryDialog?.close());
  anniversaryDialog?.addEventListener('close', () => clearInterval(surpriseTimer));

  const wishButton = document.querySelector('#wishButton');
  const wishNote = document.querySelector('#wishNote');
  wishButton?.addEventListener('click', () => {
    wishNote?.classList.add('show');
    for (let i = 0; i < 18; i++) {
      const heart = document.createElement('i');
      heart.textContent = '♥';
      heart.style.cssText = 'position:fixed;left:50%;top:50%;z-index:20;color:#c75c74;pointer-events:none;font-size:22px;transition:1.5s ease-out;';
      document.body.append(heart);
      requestAnimationFrame(() => {
        heart.style.transform = `translate(${(Math.random() - 0.5) * 550}px, ${(Math.random() - 0.8) * 520}px) rotate(${Math.random() * 240}deg)`;
        heart.style.opacity = '0';
      });
      setTimeout(() => heart.remove(), 1600);
    }
  });

/* =====================================================
   SECRET UNIVERSE — 7 CLICKS ON CAT
===================================================== */

let taps = 0;

const secret =
  document.querySelector('#secret');

const secretHeart =
  document.querySelector('#secretHeart');

const secretIntroText =
  document.querySelector('#secretIntroText');

const secretText =
  document.querySelector('#secretText');

const secretExtra =
  document.querySelector('#secretExtra');

const secretEnding =
  document.querySelector('#secretEnding');

const secretReturn =
  document.querySelector('#secretReturn');

const secretStars =
  document.querySelector('#secretStars');

const secretParticles =
  document.querySelector('#secretParticles');


/* =====================================================
   CAT SECRET
===================================================== */

document
  .querySelectorAll('[data-cat]')
  .forEach(cat => {

    cat.addEventListener('click', () => {

      taps++;

      /* Cute cat reaction */

      cat.animate(
        [
          {
            transform:
              'rotate(0deg) scale(1)'
          },

          {
            transform:
              'rotate(-8deg) scale(1.08)'
          },

          {
            transform:
              'rotate(8deg) scale(1.08)'
          },

          {
            transform:
              'rotate(0deg) scale(1)'
          }
        ],
        {
          duration: 420
        }
      );


      /* Secret unlocked */

      if (taps === 7) {

        secret?.showModal();

        startSecretUniverse();

      }

    });

  });


/* =====================================================
   SECRET STORY
===================================================== */

const secretStory = [

  {
    text:
      'Somewhere in this universe...',
    time: 2600
  },

  {
    text:
      'there is a place that belongs <em>only to us.</em>',
    time: 3200
  },

  {
    text:
      'And somehow...',
    time: 1900
  },

  {
    text:
      '<em>I found you.</em>',
    time: 3200,

    heart: true
  },

  {
    text:
      'Out of all the people I could have met...',
    time: 2700
  },

  {
    text:
      'all the places I could have been...',
    time: 2700
  },

  {
    text:
      'and all the stories I could have lived...',
    time: 2900
  },

  {
    text:
      '<em>I\'m glad mine led me to you.</em>',
    time: 3500
  },

  {
    text:
      'Maybe the universe had a million different ways to write my story...',
    time: 3600
  },

  {
    text:
      'but somehow, it gave me <em>you.</em>',
    time: 3400
  },

  {
    text:
      'And honestly...',
    time: 1900
  },

  {
    text:
      'that\'s the universe <em>I want to stay in.</em>',
    time: 3500
  },

  {
    text:
      'Because somewhere between all the random conversations, silly moments, little memories, and ordinary days...',
    time: 4200
  },

  {
    text:
      'you became something <em>extraordinary</em> to me.',
    time: 3500
  },

  {
    text:
      '<em>You are my favorite part of this little universe. 🤍</em>',
    time: 4200
  }

];


let secretRunning = false;


/* =====================================================
   WAIT
===================================================== */

const secretWait =
  ms =>
    new Promise(
      resolve =>
        setTimeout(
          resolve,
          ms
        )
    );


/* =====================================================
   SHOW TEXT
===================================================== */

function secretShowText(
  element,
  text
) {

  if (!element) return;

  element.innerHTML = text;

  element.classList.remove(
    'fade'
  );

  requestAnimationFrame(() => {

    element.classList.add(
      'show'
    );

  });

}


/* =====================================================
   HIDE TEXT
===================================================== */

function secretHideText(
  element
) {

  if (!element) return;

  element.classList.remove(
    'show'
  );

  element.classList.add(
    'fade'
  );

}


/* =====================================================
   HEART
===================================================== */

function revealSecretHeart() {

  secretHeart?.classList.add(
    'show'
  );

}


/* =====================================================
   PARTICLE BURST
===================================================== */

function secretParticleBurst(
  amount = 180
) {

  if (!secretParticles)
    return;

  const ctx =
    secretParticles.getContext(
      '2d'
    );

  const width =
    secretParticles.width =
      window.innerWidth;

  const height =
    secretParticles.height =
      window.innerHeight;


  const particles = [];


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;

    const speed =
      Math.random() *
      8 +
      2;


    particles.push({

      x:
        width / 2,

      y:
        height / 2,

      vx:
        Math.cos(angle) *
        speed,

      vy:
        Math.sin(angle) *
        speed,

      size:
        Math.random() *
        3 +
        1,

      opacity:
        1

    });

  }


  function animateParticles() {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    particles.forEach(
      particle => {

        particle.x +=
          particle.vx;

        particle.y +=
          particle.vy;

        particle.vx *= .98;

        particle.vy *= .98;

        particle.opacity -= .015;


        ctx.globalAlpha =
          Math.max(
            0,
            particle.opacity
          );

        ctx.fillStyle =
          Math.random() > .3
            ? '#ff9fbe'
            : '#ffffff';


        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fill();

      }
    );


    if (
      particles.some(
        particle =>
          particle.opacity > 0
      )
    ) {

      requestAnimationFrame(
        animateParticles
      );

    } else {

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

    }

  }


  animateParticles();

}


/* =====================================================
   STAR FIELD
===================================================== */

function startSecretStars() {

  if (!secretStars)
    return;


  const ctx =
    secretStars.getContext(
      '2d'
    );


  secretStars.width =
    window.innerWidth;

  secretStars.height =
    window.innerHeight;


  const stars = [];


  for (
    let i = 0;
    i < 350;
    i++
  ) {

    stars.push({

      x:
        Math.random() *
        secretStars.width,

      y:
        Math.random() *
        secretStars.height,

      size:
        Math.random() *
        1.5,

      alpha:
        Math.random()

    });

  }


  function drawStars() {

    ctx.clearRect(
      0,
      0,
      secretStars.width,
      secretStars.height
    );


    stars.forEach(
      star => {

        const pulse =
          .55 +
          Math.sin(
            Date.now() * .002 +
            star.alpha * 10
          ) * .25;


        ctx.globalAlpha =
          pulse;

        ctx.fillStyle =
          '#ffffff';


        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          star.size,
          0,
          Math.PI * 2
        );

        ctx.fill();

      }
    );


    requestAnimationFrame(
      drawStars
    );

  }


  drawStars();

}


/* =====================================================
   PLAY SECRET
===================================================== */

async function startSecretUniverse() {

  if (secretRunning)
    return;

  secretRunning = true;


  /* Reset */

  secretHeart?.classList.remove(
    'show'
  );

  secretEnding?.classList.remove(
    'active'
  );

  if (secretExtra) {

    secretExtra.classList.remove(
      'show'
    );

  }


  startSecretStars();


  await secretWait(900);


  /* INTRO */

  secretShowText(
    secretIntroText,
    secretStory[0].text
  );


  await secretWait(
    secretStory[0].time
  );


  secretHideText(
    secretIntroText
  );


  await secretWait(700);


  /* MAIN STORY */

  for (
    let i = 1;
    i < secretStory.length;
    i++
  ) {

    const scene =
      secretStory[i];


    secretShowText(
      secretText,
      scene.text
    );


    if (scene.heart) {

      revealSecretHeart();

      secretParticleBurst(
        220
      );

    }


    await secretWait(
      scene.time
    );


    secretHideText(
      secretText
    );


    await secretWait(650);

  }


  /* EXTRA MESSAGE */

  if (secretExtra) {

    secretExtra.innerHTML = `

      Maybe this was all the universe
      needed to do:

      bring two people together,
      let them make little memories,
      and quietly turn them into something
      neither of them expected.

      <span class="secret-quote">

        “I'm happiest in the universe
        where you're in it.”

      </span>

    `;


    secretExtra.classList.add(
      'show'
    );

  }


  await secretWait(
    5000
  );


  secretExtra?.classList.remove(
    'show'
  );


  await secretWait(
    800
  );


  /* ENDING */

  secretEnding?.classList.add(
    'active'
  );


  secretParticleBurst(
    180
  );

}


/* =====================================================
   CLOSE SECRET
===================================================== */

const closeSecret =
  document.querySelector(
    '.close-secret'
  );


closeSecret?.addEventListener(
  'click',
  () => {

    secret?.close();

    secretRunning =
      false;

    secretHeart?.classList.remove(
      'show'
    );

    secretEnding?.classList.remove(
      'active'
    );

  }
);


/* =====================================================
   RETURN BUTTON
===================================================== */

secretReturn?.addEventListener(
  'click',
  () => {

    secret?.close();

    secretRunning =
      false;

    secretHeart?.classList.remove(
      'show'
    );

    secretEnding?.classList.remove(
      'active'
    );

  }
);


/* =====================================================
   RESET WHEN DIALOG CLOSES
===================================================== */

secret?.addEventListener(
  'close',
  () => {

    secretRunning =
      false;

    secretHeart?.classList.remove(
      'show'
    );

    secretEnding?.classList.remove(
      'active'
    );

    secretHideText(
      secretIntroText
    );

    secretHideText(
      secretText
    );

    secretExtra?.classList.remove(
      'show'
    );

  }
);

  

  const finalHeart = document.querySelector('#finalHeart');
  if (finalHeart) {
    finalHeart.onclick = () => {
      document.querySelector('#continued')?.classList.add('show');
      for (let i = 0; i < 45; i++) {
        const petal = document.createElement('i');
        petal.textContent = '♥';
        petal.style.cssText = 'position:fixed;z-index:12;left:50%;top:65%;color:#c75c74;pointer-events:none;transition:1.8s;';
        document.body.append(petal);
        requestAnimationFrame(() => {
          petal.style.transform = `translate(${(Math.random() - 0.5) * 1000}px, ${-Math.random() * 800}px) rotate(${Math.random() * 360}deg)`;
          petal.style.opacity = '0';
        });
        setTimeout(() => petal.remove(), 1900);
      }
    };
  }
});
