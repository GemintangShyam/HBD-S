// --- KONFIGURASI SURAT ---
const letterText = `Happy 17th Birthday, Selvi! 🌻

Selamat datang di level 17! 
Hari ini spesial banget karena dunia menyambutmu yang semakin dewasa.

Semoga di usia ini, hari-harimu sehangat matahari dan selembut kebahagiaan kecil. Jangan lupa bahagia, sehat selalu, dan tercapai semua cita-citamu.

You are amazing, never forget that! 🌟`;

const wishes = [
    { 
        text: "Wish 1: Semoga tugas, drama, dan overthinking bisa lewat semua.", 
        img: "images/download (2).jpg" 
    },
    { 
        text: "Wish 2: Semoga kamu selalu punya alasan buat bangga sama diri sendiri.", 
        img: "images/download.gif" 
    },
    { 
        text: "Wish 3: Semoga selalu dikelilingi hal-hal baik, sekecil apa pun itu.", 
        img: "images/download.jpg" 
    },
    { 
        text: "Wish 4: Semoga semua capekmu pelan-pelan kebayar sama hal yang bikin kamu senyum.", 
        img: "images/star1.png" 
    },
    { 
        text: "Wish 5: Semoga kamu selalu punya orang yang mau denger cerita kamu.", 
        img: "images/star2.png" 
    }
];

// --- VARIABLES ---
const envelopeScreen = document.getElementById('envelope-screen');
const envelopeWrapper = document.querySelector('.envelope-wrapper');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggle'); // Tombolnya
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');
const typewriterElement = document.getElementById('typewriter-text');
const wishModal = document.getElementById('wish-modal');
const wishResult = document.getElementById('wish-result');
const wishImage = document.getElementById('wish-image');

// --- 1. FUNGSI BUKA AMPLOP ---
function openEnvelope() {
    envelopeWrapper.classList.add('open');
    
    // Coba play musik
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        // Kalau berhasil play, ubah tampilan tombol jadi mode 'sedang main'
        musicIcon.src = "images/mute.png";
        musicText.innerText = "PAUSE";
    }).catch(error => {
        console.log("Audio autoplay blocked");
        // Kalau keblokir, biarkan tetap tombol Play
    });

    setTimeout(() => {
        envelopeScreen.style.transform = "translateY(-100vh)";
        mainContent.classList.add('visible');
        setTimeout(typeWriter, 1000);
    }, 1500); 
}

// --- 2. FUNGSI MUSIK (ICON SWAP) ---
function playMusic() {
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        // Kalau lagu main, icon berubah jadi PAUSE
        musicIcon.src = "images/mute.png"; 
    }).catch(error => {
        console.log("Audio autoplay blocked");
        // Kalau keblokir, icon tetep PLAY
        musicIcon.src = "images/high-volume.png";
    });
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        // Ganti icon jadi PAUSE, ganti teks jadi PAUSE
        musicIcon.src = "images/mute.png"; 
        musicText.innerText = "PAUSE";
    } else {
        bgMusic.pause();
        // Ganti icon jadi PLAY, ganti teks jadi PLAY
        musicIcon.src = "images/high-volume.png";
        musicText.innerText = "PLAY SONG";
    }
}

// --- 3. EFEK KETIK SURAT ---
let i = 0;
function typeWriter() {
    if (i < letterText.length) {
        const char = letterText.charAt(i);
        if (char === "\n") {
            typewriterElement.innerHTML += "<br>";
        } else {
            typewriterElement.innerHTML += char;
        }
        i++;
        setTimeout(typeWriter, 50); 
    }
}

// --- 4. WISH MODAL (UPDATE: CLICK OUTSIDE) ---
function openWishModal() {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    wishResult.innerText = randomWish.text;
    wishImage.src = randomWish.img;
    wishImage.style.display = "block";
    wishModal.style.display = "flex";
}

function closeWishModal() {
    wishModal.style.display = "none";
}

// TAMBAHAN: Tutup modal kalau klik di luar kotak (overlay)
window.onclick = function(event) {
    if (event.target == wishModal) {
        closeWishModal();
    }
}

// --- 5. ANIMASI BACKGROUND ---
function createFloatingElements() {
    const container = document.getElementById('heartsContainer');
    const symbols = ['🌻', '💛', '⭐', '🎈']; 
    
    setInterval(() => {
        const el = document.createElement('div');
        el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.position = 'fixed';
        el.style.left = Math.random() * 95 + 'vw'; 
        el.style.bottom = '-50px';
        el.style.fontSize = (Math.random() * 20 + 15) + 'px';
        el.style.animation = `floatUp ${Math.random() * 3 + 4}s linear forwards`;
        el.style.opacity = '0.7';
        el.style.zIndex = '0'; 
        
        el.addEventListener('animationend', () => {
            el.remove();
        });

        container.appendChild(el);
    }, 1000); 
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes floatUp {
    to { transform: translateY(-110vh) rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);

createFloatingElements();