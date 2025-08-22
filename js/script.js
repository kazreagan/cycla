// Set year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth-scroll (native CSS also enabled by most browsers; this is for wider support)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
        const targetId=a.getAttribute('href').substring(1);
        const el=document.getElementById(targetId);
        if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});} 
    })
})

// Active nav state on scroll
const sections=[...document.querySelectorAll('section.section')];
const links=[...document.querySelectorAll('.nav-links a')];
const setActive=()=>{
    const pos=window.scrollY+120;
    let current=sections[0]?.id;
    sections.forEach(s=>{if(pos>=s.offsetTop) current=s.id});
    links.forEach(l=>l.classList.toggle('active', l.getAttribute('href')==='#'+current));
};
window.addEventListener('scroll',setActive);setActive();

// Mobile menu functionality (basic structure)
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});


// Lightbox functionality
const images = Array.from(document.querySelectorAll('#galleryGrid img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.getElementById('closeBtn');
let currentIndex = 0;

function showLightbox(idx) {
    currentIndex = idx;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    lightbox.classList.add('active');
}
images.forEach((img, idx) => {
    img.addEventListener('click', () => showLightbox(idx));
});
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showLightbox(currentIndex);
});
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showLightbox(currentIndex);
});
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});
// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
});
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') closeBtn.click();
});
