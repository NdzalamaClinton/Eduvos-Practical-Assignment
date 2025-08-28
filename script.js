
//  Header behavior and mobile menu 
(function(){
  const toggle = document.getElementById('navToggle');
  const list = document.getElementById('navList');

  // Toggle menu on button click
  toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent it from immediately closing
    const open = list.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      list.classList.contains('is-open') &&
      !list.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      list.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  //  Close menu when a nav link is clicked
  list.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (list.classList.contains('is-open')) {
        list.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

// Basic slider (vanilla JS)
(function(){
  const slider = document.querySelector('[data-slider]');
  if(!slider) return;
  const track = slider.querySelector('[data-slides]');
  const slides = Array.from(track.children);
  const prev = slider.querySelector('[data-prev]');
  const next = slider.querySelector('[data-next]');
  const dotsWrap = document.querySelector('[data-dots]');
  let index = 0;

  function renderDots(){
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = i === index ? 'is-active' : '';
      b.setAttribute('aria-label', 'Go to slide ' + (i+1));
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
    });
  }
  function goTo(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    renderDots();
  }
  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') goTo(index - 1);
    if(e.key === 'ArrowRight') goTo(index + 1);
  });
  renderDots();
})();

// Form validation including the optional local storage
(function(){
  const form = document.getElementById('applyForm');
  const success = document.getElementById('successMsg');
  if(!form) return;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function setErr(name, msg){
    const el = form.querySelector('[data-error-for="' + name + '"]');
    if(el) el.textContent = msg || '';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let ok = true;
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const course = form.course.value;
    const mode = form.querySelector('input[name="mode"]:checked');

    setErr('fullName',''); setErr('email',''); setErr('course',''); setErr('mode','');

    if(!fullName){ setErr('fullName','Please enter your full name'); ok = false; }
    if(!email || !emailRe.test(email)){ setErr('email','Enter a valid email'); ok = false; }
    if(!course){ setErr('course','Select a course'); ok = false; }
    if(!mode){ setErr('mode','Choose a study mode'); ok = false; }

    if(!ok) return;

    try{
      const payload = { fullName, email, course, mode: mode.value, ts: Date.now() };
      localStorage.setItem('eduvos_enquiry', JSON.stringify(payload));
    }catch(_){}

    success.style.display = 'inline-block';
    form.reset();
  });
})();

// Footer yea
document.getElementById('year').textContent = new Date().getFullYear();
