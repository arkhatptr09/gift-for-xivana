/* Single song controller */
document.addEventListener('DOMContentLoaded', () => {
  const play = document.querySelector('#musicPlay');
  const record = document.querySelector('#record');
  const audio = document.querySelector('#audio');
  const title = document.querySelector('#trackTitle');
  const progress = document.querySelector('#progress');

  if (!play || !audio) return;

  const song = {
    title: 'Beautiful (feat. Camila Cabello)',
    src: 'Beautiful (feat. Camila Cabello).mp3'
  };

  audio.src = song.src;

  if (title) {
    title.textContent = song.title;
  }

  // Tombol play / pause
  play.addEventListener('click', () => {
    if (audio.paused) {
      audio.play()
        .then(() => {
          play.textContent = '⏸';
          record?.classList.add('playing');
        })
        .catch(() => {
          play.textContent = '▶';
        });
    } else {
      audio.pause();
      play.textContent = '▶';
      record?.classList.remove('playing');
    }
  });

  // Tunggu sampai durasi lagu terbaca
  audio.addEventListener('loadedmetadata', () => {
    if (progress) {
      progress.min = 0;
      progress.max = audio.duration;
      progress.value = 0;
    }
  });

  // Progress bergerak mengikuti lagu
  audio.addEventListener('timeupdate', () => {
    if (progress) {
      progress.value = audio.currentTime;
    }
  });

  // Kalau slider digeser, lagu ikut berpindah
  progress?.addEventListener('input', () => {
    audio.currentTime = progress.value;
  });

  // Lagu selesai
  audio.addEventListener('ended', () => {
    play.textContent = '▶';
    record?.classList.remove('playing');

    if (progress) {
      progress.value = 0;
    }
  });
});
