const chapters=[...document.querySelectorAll('.chapter')];
const progress=document.getElementById('progress');
const label=document.getElementById('chapterLabel');
let current=0;

chapters.forEach((_,i)=>{const dot=document.createElement('button');dot.setAttribute('aria-label',`Go to part ${i+1}`);dot.addEventListener('click',()=>show(i));progress.append(dot)});
function show(index){current=Math.max(0,Math.min(index,chapters.length-1));chapters.forEach((c,i)=>c.classList.toggle('active',i===current));[...progress.children].forEach((d,i)=>d.classList.toggle('active',i===current));label.innerHTML=`Part ${current+1} of 7 <span>•</span> ${chapters[current].dataset.title}`;window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-next]').forEach(button=>button.addEventListener('click',()=>show(current+1)));
document.getElementById('replay').addEventListener('click',()=>show(0));show(0);

// Open the invitation and start the music when she taps the envelope.
document.getElementById('openEnvelope').addEventListener('click', async () => {
  document.getElementById('openEnvelope').classList.add('hidden');
  document.getElementById('invitation').classList.remove('hidden');

  const audio = document.getElementById('audio');
  const musicButton = document.getElementById('musicButton');

  try {
    await audio.play();
    musicButton.classList.add('playing');
    musicButton.querySelector('em').textContent = 'Blue - Yung Kai';
  } catch {
    musicButton.classList.remove('playing');
    musicButton.querySelector('em').textContent = 'Tap to play';
  }
});
// Edit these four messages to personalise the No-click sequence.
const noButton = document.getElementById('noButton');
const invitation = document.getElementById('invitation');
const yesButton = document.getElementById('yesButton');
const noWords = ['Are you sure? 🥺', 'Really? 👉🏻👈🏻', 'Think again sayangg 🤭', 'Baby is getting a little sad now 🥺'];
let noCount = 0;
const finalNoMessage = document.createElement('p');
finalNoMessage.className = 'script no-final-message hidden';
finalNoMessage.textContent = 'Okay fine… I think we both know the answer already 🤭 💜';
finalNoMessage.setAttribute('role', 'status');
invitation.append(finalNoMessage);
noButton.textContent = 'NO';
noButton.setAttribute('aria-live', 'polite');
yesButton.textContent = '♥ YES ♡';
noButton.addEventListener('click', () => {
  noCount = Math.min(noCount + 1, 5);
  invitation.dataset.noStep = String(noCount);
  if (noCount < 5) {
    noButton.textContent = noWords[noCount - 1];
  } else {
    noButton.classList.add('hidden');
    finalNoMessage.classList.remove('hidden');
    yesButton.focus();
  }
});
document.getElementById('replay').addEventListener('click', () => {
  noCount = 0;
  delete invitation.dataset.noStep;
  noButton.textContent = 'NO';
  noButton.classList.remove('hidden');
  finalNoMessage.classList.add('hidden');
  invitation.classList.add('hidden');
  document.getElementById('openEnvelope').classList.remove('hidden');
});

const bingoButtons=[...document.querySelectorAll('#bingoGrid button')];const score=document.getElementById('score');
bingoButtons.forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('done');score.textContent=bingoButtons.filter(x=>x.classList.contains('done')).length}));

document.getElementById('openSecret').addEventListener('click',e=>{e.currentTarget.classList.add('hidden');document.querySelector('.lock').textContent='♥';document.getElementById('secretCopy').classList.remove('hidden');document.querySelector('.after-secret').classList.add('visible')});

const target=new Date('2026-09-26T12:00:00+08:00').getTime();
function updateCountdown(){let gap=Math.max(0,target-Date.now());const vals=[Math.floor(gap/86400000),Math.floor(gap/3600000)%24,Math.floor(gap/60000)%60,Math.floor(gap/1000)%60];document.querySelectorAll('#countdown b').forEach((el,i)=>el.textContent=String(vals[i]).padStart(2,'0'))}updateCountdown();setInterval(updateCountdown,1000);

const audio=document.getElementById('audio');const music=document.getElementById('musicButton');
music.addEventListener('click',async()=>{try{if(audio.paused){await audio.play();music.classList.add('playing');music.querySelector('em').textContent='Blue - Yung Kai'}else{audio.pause();music.classList.remove('playing');music.querySelector('em').textContent='Blue - Yung Kai'}}catch{music.querySelector('em').textContent='Add your song'}});

const stars=document.getElementById('stars');for(let i=0;i<24;i++){const s=document.createElement('span');s.className='star';s.textContent=i%3?'♡':'✦';s.style.left=Math.random()*98+'%';s.style.top=Math.random()*98+'%';s.style.animationDelay=Math.random()*8+'s';stars.append(s)}

// Acceptance stays in Part 1; only Continue moves to the itinerary.
const thankYou = document.getElementById('thankYou');
const introHeading = chapters[0].querySelector('h1');
const introSubtitle = chapters[0].querySelector('.script');
const introBadge = chapters[0].querySelector('.eyebrow');
yesButton.addEventListener('click', () => {
  [invitation, introHeading, introSubtitle, introBadge].forEach(el => el.classList.add('hidden'));
  thankYou.classList.remove('hidden');
  document.getElementById('thankYouHeading').focus();
  window.scrollTo({top:0, behavior:'smooth'});
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (let i = 0; i < 36; i++) {
      const piece = document.createElement('span');
      piece.className = 'celebration-piece';
      piece.setAttribute('aria-hidden', 'true');
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = ['#ff5eaa', '#9a6cff', '#63a8ff'][i % 3];
      piece.style.animationDelay = Math.random() * 0.8 + 's';
      document.body.append(piece);
      setTimeout(() => piece.remove(), 4500);
    }
  }
});
document.getElementById('replay').addEventListener('click', () => {
  thankYou.classList.add('hidden');
  [introHeading, introSubtitle, introBadge].forEach(el => el.classList.remove('hidden'));
});
