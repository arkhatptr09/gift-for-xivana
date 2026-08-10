/* Core interactions and personalization controls. */
document.addEventListener('DOMContentLoaded', () => {

  // Loader
  setTimeout(() => document.querySelector('#loader').classList.add('done'), 2100);

  // Smooth Scroll
  document.querySelectorAll('[data-scroll]').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelector(b.dataset.scroll).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Letter Envelope
  const envelope = document.querySelector('#envelope');
  const paper = document.querySelector('#letterPaper');
  envelope.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => paper.classList.add('show'), 500);
  });

  // Book Page Navigation
  const book = document.querySelector('#bookPage');
  let page = 1;
  const renderBook = dir => {
    page = Math.max(1, Math.min(20, page + dir));
    book.classList.add('turn');
    setTimeout(() => {
      book.innerHTML = `<span>${String(page).padStart(2, '0')} / 20</span><h3>PAGE_${String(page).padStart(2, '0')}_TITLE</h3><p>PAGE_${String(page).padStart(2, '0')}_TEXT</p>`;
      book.classList.remove('turn');
    }, 280);
  };
  document.querySelector('.prev').onclick = () => renderBook(-1);
  document.querySelector('.next').onclick = () => renderBook(1);

  // Time Counter
  const counter = document.querySelector('#counter');
  const date = document.querySelector('#startDate');
  function tick() {
    const start = new Date(`${date.value}T00:00:00`);
    const now = new Date();
    let seconds = Math.max(0, Math.floor((now - start) / 1000));
    let vals = [
      Math.floor(seconds / 31557600),
      Math.floor(seconds % 31557600 / 2629800),
      Math.floor(seconds % 2629800 / 86400),
      Math.floor(seconds % 86400 / 3600),
      Math.floor(seconds % 3600 / 60),
      seconds % 60
    ];
    counter.querySelectorAll('b').forEach((el, i) => el.textContent = String(vals[i]).padStart(2, '0'));
  }
  date.onchange = tick;
  tick();
  setInterval(tick, 1000);

  // Timeline
  document.querySelector('#timeline').innerHTML = [
    ['THE DAY WE MET', 'TIMELINE_DESCRIPTION_01'],
    ['OUR FAVORITE AFTERNOON', 'TIMELINE_DESCRIPTION_02'],
    ['THE PROMISE', 'TIMELINE_DESCRIPTION_03']
  ].map((x, i) => `<article class="timeline-card"><small>DATE_0${i + 1}</small><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('');

  // Secret Modal (Cat Taps)
  let taps = 0;
  const secret = document.querySelector('#secret');
  document.querySelectorAll('[data-cat]').forEach(cat => {
    cat.addEventListener('click', () => {
      taps++;
      cat.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-8deg)' },
        { transform: 'rotate(8deg)' },
        { transform: 'rotate(0deg)' }
      ], { duration: 420 });

      if (taps === 7) secret.showModal();
    });
  });
  document.querySelector('.close-secret').onclick = () => secret.close();

  // Final Heart Effect
  document.querySelector('#finalHeart').onclick = () => {
    document.querySelector('#continued').classList.add('show');
    for (let i = 0; i < 45; i++) {
      const p = document.createElement('i');
      p.textContent = '♥';
      p.style.cssText = `position:fixed;z-index:12;left:50%;top:65%;color:#c75c74;pointer-events:none;transition:1.8s;`;
      document.body.append(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate(${(Math.random() - .5) * 1000}px,${-Math.random() * 800}px) rotate(${Math.random() * 360}deg)`;
        p.style.opacity = 0;
      });

      setTimeout(() => p.remove(), 1900);
    }
  };

});