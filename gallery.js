/* Memory gallery generator — replace gradient placeholders with your image URLs. */
document.addEventListener('DOMContentLoaded', () => {
  const photo=(id, cls='photo')=>`<div class="${cls}">${id}</div>`;
  document.querySelector('#polaroids').innerHTML=Array.from({length:5},(_,i)=>`<article class="polaroid" style="transform:rotate(${[-5,3,-2,5,-4][i]}deg)">${photo(`PHOTO_${i+2}`)}<p>a little moment</p></article>`).join('');
});
