// Birthday Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Initialize elements
    const mainButton = document.getElementById("mainButton");
    const landingPage = document.getElementById("landingPage");
    const cakeSection = document.getElementById("cakeSection");
    const messagesSection = document.getElementById("messagesSection");
    const birthdayAudio = document.getElementById("birthdayAudio");
    const messageCards = document.querySelectorAll(".message-card");

    // Audio context for fallback music
    let audioContext;
    let isPlaying = false;

    // Birthday melody notes (Happy Birthday tune)
    const melody = [
        { note: 261.63, duration: 500 }, // C4 - Hap-
        { note: 261.63, duration: 250 }, // C4 - py
        { note: 293.66, duration: 500 }, // D4 - Birth-
        { note: 261.63, duration: 500 }, // C4 - day
        { note: 349.23, duration: 500 }, // F4 - to
        { note: 329.63, duration: 1000 }, // E4 - you
        { note: 261.63, duration: 500 }, // C4 - Hap-
        { note: 261.63, duration: 250 }, // C4 - py
        { note: 293.66, duration: 500 }, // D4 - Birth-
        { note: 261.63, duration: 500 }, // C4 - day
        { note: 392.0, duration: 500 }, // G4 - to
        { note: 349.23, duration: 1000 }, // F4 - you
        { note: 261.63, duration: 500 }, // C4 - Hap-
        { note: 261.63, duration: 250 }, // C4 - py
        { note: 523.25, duration: 500 }, // C5 - Birth-
        { note: 440.0, duration: 500 }, // A4 - day
        { note: 349.23, duration: 500 }, // F4 - dear
        { note: 329.63, duration: 500 }, // E4 - Van-
        { note: 293.66, duration: 1000 }, // D4 - ness
    ];

    // Initialize Web Audio API
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
        }
    }

    // Play a single note
    function playNote(frequency, duration, startTime = 0) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(
            frequency,
            audioContext.currentTime + startTime,
        );
        oscillator.type = "triangle";

        gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime);
        gainNode.gain.linearRampToValueAtTime(
            0.1,
            audioContext.currentTime + startTime + 0.01,
        );
        gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + startTime + duration / 1000,
        );

        oscillator.start(audioContext.currentTime + startTime);
        oscillator.stop(audioContext.currentTime + startTime + duration / 1000);
    }

    // Play the birthday melody
    function playBirthdayMelody() {
        initAudio();

        let currentTime = 0;

        melody.forEach((note, index) => {
            playNote(note.note, note.duration, currentTime);
            currentTime += (note.duration + 100) / 1000; // Add small pause between notes
        });
    }

    // Auto-play birthday music on page load
    function autoPlayMusic() {
        // Set the audio source explicitly
        birthdayAudio.src = "audio/hbd.mp3";
        birthdayAudio.volume = 0.3;
        birthdayAudio.loop = true;

        const playPromise = birthdayAudio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("🎵 Birthday music is playing from MP3!");
                })
                .catch((error) => {
                    console.log(
                        "🎵 Autoplay blocked or MP3 failed, using Web Audio API fallback",
                    );
                    console.log("Error:", error);
                    setTimeout(playBirthdayMelody, 1000);
                });
        }
    }

    // Start auto-play after a short delay
    setTimeout(autoPlayMusic, 500);

    // Main button click handler
    mainButton.addEventListener("click", function () {
        // Add click animation
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
            this.style.transform = "";
        }, 150);

        // Smooth scroll to cake section
        cakeSection.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        // Show cake section with animation
        setTimeout(() => {
            cakeSection.classList.add("show");
        }, 800);

        // Create extra confetti
        createExtraConfetti();
    });

    // Scroll animations for message cards
    function handleScrollAnimations() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        messageCards.forEach((card, index) => {
            const cardTop = card.offsetTop;
            const cardHeight = card.offsetHeight;

            // Check if card is in viewport
            if (scrollTop + windowHeight > cardTop + cardHeight / 3) {
                setTimeout(() => {
                    card.classList.add("visible");
                }, index * 200); // Stagger animations
            }
        });
    }

    // Scroll event listener
    window.addEventListener("scroll", handleScrollAnimations);

    // Initial check for scroll animations
    handleScrollAnimations();

    // Create extra confetti effect
    function createExtraConfetti() {
        const colors = [
            "#E3F2FD",
            "#BBDEFB",
            "#90CAF9",
            "#64B5F6",
            "#42A5F5",
            "#FFFFFF",
        ];

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createConfettiPiece(
                    colors[Math.floor(Math.random() * colors.length)],
                );
            }, i * 100);
        }
    }

    function createConfettiPiece(color) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.width = Math.random() * 8 + 4 + "px";
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "1000";
        confetti.style.animation = `confetti-fall ${Math.random() * 2 + 3}s linear forwards`;

        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", function (e) {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            mainButton.click();
        }
        if (e.key === "m" || e.key === "M") {
            if (!isPlaying) {
                playBirthdayMelody();
                isPlaying = true;
                setTimeout(() => {
                    isPlaying = false;
                }, 15000);
            }
        }
    });

    // Random balloon movement
    function animateBalloons() {
        const balloons = document.querySelectorAll(".balloon");
        balloons.forEach((balloon) => {
            const randomX = Math.random() * 90;
            const randomDelay = Math.random() * 3;
            balloon.style.left = randomX + "%";
            balloon.style.animationDelay = `-${randomDelay}s`;
        });
    }

    // Initialize balloon animation
    animateBalloons();

    // Re-animate balloons every 15 seconds
    setInterval(animateBalloons, 15000);

    // Profile image hover effect
    const profileImage = document.getElementById("profileImage");
    profileImage.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1) rotate(5deg)";
    });

    profileImage.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1) rotate(0deg)";
    });

    // Create periodic star effects
    function createHeartEffect() {
        const heart = document.createElement("div");
        heart.innerHTML = "⭐";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "100vh";
        heart.style.fontSize = Math.random() * 15 + 10 + "px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "5";
        heart.style.animation = "float 6s ease-out forwards";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 3000);
    }

    function createTwinkleStars() {
        for (let i = 0; i < 20; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.top = Math.random() * 100 + "vh";
            star.style.left = Math.random() * 100 + "vw";
            star.style.animationDelay = Math.random() * 5 + "s";
            document.body.appendChild(star);
        }
    }
    createTwinkleStars();

    // Create heart effects every 4 seconds
    setInterval(createHeartEffect, 4000);

    // Console birthday message
    console.log(`
    🎉🎂🎉🎂🎉🎂🎉🎂🎉🎂🎉
    
         HAPPY BIRTHDAY VANNESS!
         
    🎉 Semoga hari ini penuh kebahagiaan! 🎉
    🎵 Music is playing automatically! 🎵
    
    🎉🎂🎉🎂🎉🎂🎉🎂🎉🎂🎉
    `);

    // Initialize Intersection Observer for better scroll animations
    if ("IntersectionObserver" in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, observerOptions);

        messageCards.forEach((card) => {
            observer.observe(card);
        });
    }
});

// Simple configuration for easy editing
const BirthdayConfig = {
    recipientName: "Vanness",
    profileImageAlt: "Vanness - Birthday Boy",
    welcomeMessage: "Semoga hari ini penuh kebahagiaan!",
    buttonText: "Klik di sini",
    cakeTitle: "Happy Birthday Vanness! 🎉",
    scrollHint: "Ada ucapan-ucapan untuk Vanness baca!",

    // Birthday messages can be edited here
    messages: [
        {
            title: "🎂 Ucapan #1",
            content:
                "Selamat ulang tahun, Vanness! Semoga tahun ini membawa lebih banyak kebahagiaan dan kesuksesan untukmu. Terima kasih telah menjadi teman yang luar biasa!",
        },
        {
            title: "🎉 Ucapan #2",
            content:
                "Happy birthday to someone who lights up every room they enter! Semoga hari spesialmu dipenuhi dengan tawa, cinta, dan momen-momen indah yang tak terlupakan.",
        },
        // Add more messages as needed
    ],
};

// Function to update content dynamically
function updateBirthdayContent() {
    // Update welcome card
    const welcomeTitle = document.querySelector(".welcome-card h2");
    if (welcomeTitle) {
        welcomeTitle.textContent = BirthdayConfig.welcomeMessage;
    }

    // Update button text
    const mainButton = document.getElementById("mainButton");
    if (mainButton) {
        mainButton.textContent = BirthdayConfig.buttonText;
    }

    // Update cake title
    const cakeTitle = document.querySelector(".cake-title");
    if (cakeTitle) {
        cakeTitle.textContent = BirthdayConfig.cakeTitle;
    }

    // Update scroll hint
    const scrollHint = document.querySelector(".scroll-hint");
    if (scrollHint) {
        scrollHint.textContent = BirthdayConfig.scrollHint;
    }
}

updateBirthdayContent();
