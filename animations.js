/* Ambient canvas and optional GSAP reveals. */
document.addEventListener('DOMContentLoaded', () => {
  const c = document.querySelector('#atmosphere');
  const x = c.getContext('2d');

  let w;
  let h;
  let items = [];

  const resize = () => {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
    items = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + .4,
      v: Math.random() * .22 + .04,
      a: Math.random() * .35 + .08
    }));
  };

  const draw = () => {
    x.clearRect(0, 0, w, h);
    items.forEach(p => {
      p.y -= p.v;
      p.x += Math.sin(p.y * .01) * .18;
      if (p.y < 0) p.y = h;
      x.fillStyle = `rgba(216,177,90,${p.a})`;
      x.beginPath();
      x.arc(p.x, p.y, p.r, 0, 7);
      x.fill();
    });
    requestAnimationFrame(draw);
  };

  addEventListener('resize', resize);
  resize();
  draw();

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.story-card,.photo,.timeline-card').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 35,
        duration: .8,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%'
        }
      });
    });

    gsap.to('.hero-orbit', {
      rotate: 360,
      duration: 70,
      repeat: -1,
      ease: 'none'
    });
  }
});