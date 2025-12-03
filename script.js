const letter = document.getElementById("letter");
const heartsContainer = document.getElementById("hearts");
const particlesContainer = document.getElementById("particles");
const sparklesContainer = document.getElementById("sparkles");
const bgHeartsContainer = document.getElementById("bg-hearts");
const burstContainer = document.getElementById("burst");
const envelope = document.getElementById("envelope");

function openLetter(){
  letter.classList.add("show");
  envelope.classList.add("open"); // flap rotates
  createHearts();
  createParticles();
  createSparkles();
  createBgHeartsSmall();
  createBgHeartsBurst();
  createHeartBurst(); // magical burst
}

function closeLetter(){
  letter.classList.remove("show");
  envelope.classList.remove("open");
  heartsContainer.innerHTML='';
  particlesContainer.innerHTML='';
  sparklesContainer.innerHTML='';
  bgHeartsContainer.innerHTML='';
  burstContainer.innerHTML='';
}

// Background floating hearts
function createBgHeartsSmall(count=30){
  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.className = "bg-heart";
    h.style.left = Math.random()*100+"%";
    h.style.animationDuration = 5+Math.random()*5+"s";
    h.style.animationDelay = Math.random()*5+"s";
    bgHeartsContainer.appendChild(h);
  }
}

// Regular floating hearts
function createHearts(count=15){
  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = Math.random()*80 + 10 + "%";
    h.style.animationDuration = 3 + Math.random()*2 + "s";
    heartsContainer.appendChild(h);
  }
}

// Particles
function createParticles(count=25){
  for(let i=0;i<count;i++){
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random()*100 + "%";
    p.style.top = Math.random()*50 +10 + "%";
    p.style.animationDuration = 3 + Math.random()*2 + "s";
    particlesContainer.appendChild(p);
  }
}

// Sparkles
function createSparkles(count=15){
  for(let i=0;i<count;i++){
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = Math.random()*90 +5 + "%";
    s.style.top = Math.random()*80 +5 + "%";
    s.style.animationDuration = 2 + Math.random()*2 + "s";
    sparklesContainer.appendChild(s);
  }
}

// Big heart burst from flap center with glow & float
function createHeartBurst(count=15){
  const rect = envelope.getBoundingClientRect();
  const centerX = rect.left + rect.width/2;
  const centerY = rect.top + rect.height/2;

  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.className = "heart-burst";
    h.style.left = centerX + "px";
    h.style.top = centerY + "px";
    h.style.transform = `translate(0px,0px) scale(0)`;
    burstContainer.appendChild(h);

    const angle = Math.random()*2*Math.PI;
    const distance = 100 + Math.random()*50;
    const dx = Math.cos(angle)*distance;
    const dy = Math.sin(angle)*distance;

    h.animate([
      {transform: "translate(0px,0px) scale(0)", opacity:1, filter:"drop-shadow(0 0 4px #ff5c85) drop-shadow(0 0 6px #ff9bb3)"},
      {transform:`translate(${dx}px,${dy}px) scale(1.5)`, opacity:1, filter:"drop-shadow(0 0 6px #ff5c85) drop-shadow(0 0 8px #ff9bb3)"},
      {transform:`translate(${dx}px,${dy-50}px) scale(1)`, opacity:0, filter:"drop-shadow(0 0 2px #ff5c85) drop-shadow(0 0 4px #ff9bb3)"}
    ],{
      duration: 1400 + Math.random()*400,
      easing:"ease-out",
      fill:"forwards"
    });

    setTimeout(()=>h.remove(), 1800);
  }
}

// Initialize background hearts on load
createBgHeartsSmall();
