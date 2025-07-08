document.addEventListener('DOMContentLoaded', function () {
    const bgImages = [
        'images/bg/1.jpg',
        'images/bg/2.jpg',
        'images/bg/3.jpg',
        'images/bg/4.jpg',
        'images/bg/5.jpg',
        'images/bg/6.jpg',
        'images/bg/7.jpg',
        'images/bg/8.jpg',
        'images/bg/9.jpg',
    ];

    let currentIndex = 0;
    const bg1 = document.querySelector('.bg1');
    const bg2 = document.querySelector('.bg2');
    let isBg1Active = true;

    function forceZoomAfterRender(element) {
        element.classList.remove('zoom');
        requestAnimationFrame(() => {
            void element.offsetWidth;
            element.classList.add('zoom');
        });
    }

    // Load first image
    const imgFirst = new Image();
    imgFirst.src = bgImages[0];
    imgFirst.onload = () => {
        bg1.style.backgroundImage = `url('${bgImages[0]}')`;

        // 1. Set base transform explicitly
        bg1.style.transform = 'scale(1) translate3d(0, 0, 0)';

        // 2. Fade in
        bg1.classList.add('active');

        // 3. Wait for next frame THEN apply zoom class
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                bg1.classList.add('zoom');
            });
        });
    };

    function setNextBackground(index) {
        const nextImg = bgImages[index];
        const activeBg = isBg1Active ? bg1 : bg2;
        const inactiveBg = isBg1Active ? bg2 : bg1;

        const img = new Image();
        img.src = nextImg;
        img.onload = () => {
            // Set next image
            inactiveBg.style.backgroundImage = `url('${nextImg}')`;

            // Prepare fade in
            inactiveBg.classList.add('active');
            forceZoomAfterRender(inactiveBg);

            // Fade out current
            activeBg.classList.remove('active', 'zoom');

            // Swap flags
            isBg1Active = !isBg1Active;
        };
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % bgImages.length;
        setNextBackground(currentIndex);
    }, 7500);



    // Typing effect for services
    const services = [
        "Pre-Weddings",
        "Baby Showers",
        "Corporate Events",
        "Property Shoots",
        "Maternity Shoots",
        "Engagements",
        "Haldi & Mehendi"
    ];
    let typeElem = document.getElementById('typewrite');
    if (typeElem) {
        let serviceIndex = 0, charIndex = 0, isDeleting = false, waitTime = 1300;

        function typeServices() {
            let current = services[serviceIndex];
            if (!isDeleting) {
                typeElem.innerHTML = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    isDeleting = true;
                    setTimeout(typeServices, waitTime);
                } else {
                    setTimeout(typeServices, 65 + Math.random() * 50);
                }
            } else {
                typeElem.innerHTML = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    serviceIndex = (serviceIndex + 1) % services.length;
                    setTimeout(typeServices, 260);
                } else {
                    setTimeout(typeServices, 25 + Math.random() * 30);
                }
            }
        }
        typeElem.innerHTML = "";
        typeServices();
    }

});


function animateCount(el, target, duration) {
    let start = 0;
    const end = parseFloat(target);
    const decimalPlaces = String(target).includes('.') ? 1 : 0;
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = start + range * progress;
        el.textContent = value.toFixed(decimalPlaces);
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = end.toFixed(decimalPlaces);
        }
    }

    requestAnimationFrame(update);
}

function animateCount(el, target, duration = 1200) {
    let start = 0;
    const end = parseFloat(target);
    const decimalPlaces = target.includes('.') ? 1 : 0;
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = start + range * progress;
        el.textContent = value.toFixed(decimalPlaces);
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = end.toFixed(decimalPlaces);
        }
    }

    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = el.getAttribute('data-target');
                animateCount(el, target);
                observer.unobserve(el); // only once
            }
        });
    }, {
        threshold: 0.5 // trigger when 50% visible
    });

    statNumbers.forEach(el => observer.observe(el));
});




// window.addEventListener('scroll', function () {
//     const statsSection = document.querySelector('.about-stats');
//     if (statsSection && !statsAnimated && isInViewport(statsSection)) {
//         statsAnimated = true;
//         document.querySelectorAll('.stat-number').forEach(el => {
//             animateCount(el, el.getAttribute('data-target'), 1200);
//         });
//     }
// });
// // In case stats are in view on first load
// window.addEventListener('DOMContentLoaded', function () {
//     const statsSection = document.querySelector('.about-stats');
//     if (statsSection && isInViewport(statsSection)) {
//         statsAnimated = true;
//         document.querySelectorAll('.stat-number').forEach(el => {
//             animateCount(el, el.getAttribute('data-target'), 1200);
//         });
//     }
// });

// Simple auto-scroll carousel (looping, smooth swipe-like movement)
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("galleryCarousel");
    if (!carousel) return;

    const slides = Array.from(carousel.children);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // Common setup
    carousel.style.display = "flex";
    carousel.style.overflowX = "auto";
    carousel.style.scrollSnapType = "x mandatory";
    carousel.style.scrollBehavior = "smooth";
    carousel.style.webkitOverflowScrolling = "touch";
    carousel.style.msOverflowStyle = "none";
    carousel.style.scrollbarWidth = "none";

    const style = document.createElement("style");
    style.innerHTML = `
        #galleryCarousel::-webkit-scrollbar {
            display: none;
        }
    `;
    document.head.appendChild(style);

    slides.forEach((slide) => {
        slide.style.scrollSnapAlign = "start";
        slide.style.flex = "0 0 auto";
    });

    const clonedSlides = slides.map(slide => slide.cloneNode(true));
    clonedSlides.forEach(clone => {
        const img = clone.querySelector('img');
        if (img) img.loading = 'lazy';
        carousel.appendChild(clone);
    });

    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 18;
    const totalSlides = slides.length;
    let intervalId;
    let resumeTimeout;

    function slideOnce() {
        currentIndex++;

        if (currentIndex >= totalSlides) {
            currentIndex = 0;
            carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            carousel.scrollTo({
                left: currentIndex * slideWidth,
                behavior: "smooth",
            });
        }
    }

    function startAutoSlide() {
        intervalId = setInterval(slideOnce, 2000);
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    function resetAutoSlideAfterDelay() {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            startAutoSlide();
        }, 3000); // delay after interaction
    }

    // Start auto-slide on all devices
    startAutoSlide();

    if (isMobile) {
        // Only mobile: pause/resume auto-scroll on interaction
        carousel.addEventListener("touchstart", stopAutoSlide, { passive: true });
        carousel.addEventListener("touchend", resetAutoSlideAfterDelay, { passive: true });
        carousel.addEventListener("scroll", () => {
            stopAutoSlide();
            resetAutoSlideAfterDelay();
        });
    } else {
        // Only desktop: pause on hover
        carousel.addEventListener("mouseenter", stopAutoSlide);
        carousel.addEventListener("mouseleave", startAutoSlide);
    }
});




function updateAboutTitle() {
    const h2 = document.querySelector('.about-title h2');
    if (!h2) return;

    if (window.innerWidth >= 768) {
        h2.innerHTML = 'More <br/> about <br/> us.';
    } else {
        h2.innerText = 'More about us.';
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateAboutTitle);

// Run on window resize
window.addEventListener('resize', updateAboutTitle);





document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("show");
            navToggle.classList.toggle("active"); // This triggers the X icon
        });
        // Hide menu after clicking a link (optional)
        navLinks.querySelectorAll("a").forEach(link =>
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                navToggle.classList.remove("active");
            })
        );
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("carouselTrack");
    const carousel = document.querySelector(".reviews-carousel");
    let cards = Array.from(track.children);
    let perPage = 2; // Default to 2 cards
    let cardWidth = 0; // Will be calculated
    let page = 0;

    function updateVars() {
        cards = Array.from(track.children).filter(card => !card.classList.contains('clone'));
        perPage = window.innerWidth < 700 ? 1 : 2;
        cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || 28);
        // Set carousel container width to fit exactly perPage cards
        carousel.style.maxWidth = `${cardWidth * perPage}px`;
        carousel.style.width = `${cardWidth * perPage}px`;
    }

    function cloneSlides() {
        Array.from(track.querySelectorAll('.clone')).forEach(el => el.remove());
        for (let i = 0; i < perPage; i++) {
            let clone = cards[i % cards.length].cloneNode(true); // Ensure enough clones
            clone.classList.add('clone');
            track.appendChild(clone);
        }
    }

    function slideTo(pg, animate = true) {
        updateVars();
        cloneSlides();
        track.style.transition = animate ? 'transform 0.55s cubic-bezier(.68,0,.32,1)' : 'none';
        track.style.transform = `translateX(-${pg * cardWidth}px)`;
    }

    let intervalId;
    function startCarousel() {
        intervalId = setInterval(() => {
            updateVars();
            let maxPage = cards.length;
            page++;
            slideTo(page, true);
            if (page >= maxPage) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    page = 0;
                    slideTo(page, false);
                }, 550); // Match transition duration
            }
        }, 3500);
    }

    function stopCarousel() {
        clearInterval(intervalId);
    }

    window.addEventListener("resize", function () {
        stopCarousel();
        updateVars();
        page = 0;
        slideTo(page, false);
        startCarousel();
    });

    // Pause on hover
    track.addEventListener('mouseenter', stopCarousel);
    track.addEventListener('mouseleave', startCarousel);

    // Initialize
    updateVars();
    cloneSlides();
    slideTo(page, false);
    startCarousel();
});

document.getElementById('quoteForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Get form values
    const name = document.getElementById('yourName').value.trim();
    const phone = document.getElementById('yourPhone').value.trim();
    const email = document.getElementById('yourEmail').value.trim();
    const dropdown = document.getElementById('yourDropdown').value;
    const location = document.getElementById('yourLocation').value.trim();

    const mail = "shivameharfilms2@gmail.com";
    const subject = encodeURIComponent("Quote Request from " + name);
    const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${dropdown}\nLocation: ${location}`
    );
    window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
});

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("bwVideo");

    if (video) {
        // Force loop if browser doesn't respect attribute
        video.addEventListener("ended", function () {
            video.currentTime = 0;
            video.play();
        });

        // Try to play again in case autoplay is blocked
        video.play().catch((e) => {
            console.warn("Video autoplay blocked:", e);
        });
    }
});
