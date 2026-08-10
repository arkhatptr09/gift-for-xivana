/* Ambient canvas and GSAP scroll reveals */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#atmosphere');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, items = [];

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    items = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.4,
      v: Math.random() * 0.22 + 0.04,
      a: Math.random() * 0.35 + 0.08
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    items.forEach(p => {
      p.y -= p.v;
      p.x += Math.sin(p.y * 0.01) * 0.18;
      if (p.y < 0) p.y = height;
      ctx.fillStyle = `rgba(216, 177, 90, ${p.a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };

  window.addEventListener('resize', resize);
  resize();
  draw();

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.story-card, .photo, .timeline-card').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
    gsap.to('.hero-orbit', { rotate: 360, duration: 70, repeat: -1, ease: 'none' });
  }
});
