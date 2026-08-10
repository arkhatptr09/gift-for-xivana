/* Memory gallery generator */
document.addEventListener('DOMContentLoaded', () => {
  const polaroidsEl = document.querySelector('#polaroids');

  if (!polaroidsEl) return;

  const photos = [
    {
      src: 'photo-02.jfif',
      caption: 'our little moment'
    },
    {
      src: 'photo-03.jfif',
      caption: 'one of my favorites'
    },
    {
      src: 'photo-04.jfif',
      caption: 'just us'
    },
    {
      src: 'photo-05.jfif',
      caption: 'a memory worth keeping'
    },
    {
      src: 'photo-06.jfif',
      caption: 'another little moment'
    }
  ];

  const rotations = [-5, 3, -2, 5, -4];

  polaroidsEl.innerHTML = photos.map((photo, i) => `
    <article 
      class="polaroid" 
      style="transform: rotate(${rotations[i]}deg)"
    >
      <img 
        src="${photo.src}" 
        alt="${photo.caption}"
        loading="lazy"
      >
      <p>${photo.caption}</p>
    </article>
  `).join('');
});
