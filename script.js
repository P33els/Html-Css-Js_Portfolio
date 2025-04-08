// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('section');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const scrollUpBtn = document.querySelector('.scroll-up');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const closeBtn = document.querySelector('.close-btn');

    // Typing animation text array
    const typingTextArray = ["Web Developer", "Graphic Designer", "Freelancer"];
    
    // Mobile Navigation Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile nav when clicking nav items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Close hamburger menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Close mobile nav when clicking close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

    // Active navigation based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.querySelector('a').classList.remove('active');
            if(item.querySelector('a').getAttribute('href').slice(1) === current) {
                item.querySelector('a').classList.add('active');
            }
        });
        
        // Show/hide scroll-up button
        if(window.scrollY > 500) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    });

    // Scroll to top when clicking the scroll-up button
    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // Show all projects if filter is 'all'
                if(filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 200);
                } 
                // Show only projects that match the filter
                else {
                    if(card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('show');
                        }, 200);
                    } else {
                        card.classList.remove('show');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Contact form submission
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if(name && email && subject && message) {
                // Simulate form submission
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                
                // Reset form after submission
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                    contactForm.classList.remove('hidden');
                }, 5000);
            }
        });
    }

    // Typing animation
    const typedTextSpan = document.querySelector(".typed-text");
    const cursor = document.querySelector(".cursor");

    let typingDelay = 150;
    let erasingDelay = 100;
    let newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < typingTextArray[textArrayIndex].length) {
            if(!cursor.classList.contains("typing")) cursor.classList.add("typing");
            typedTextSpan.textContent += typingTextArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursor.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursor.classList.contains("typing")) cursor.classList.add("typing");
            typedTextSpan.textContent = typingTextArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursor.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= typingTextArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if(typingTextArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    // Animate on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('show');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on initial load
    
    // Initialize AOS (Animate on Scroll) library if included
    if(typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Add Parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    
    if(heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Custom cursor functionality
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button, input, textarea').forEach((element) => {
        element.addEventListener('mouseenter', () => {
            customCursor.classList.add('hover');
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                customCursor.classList.add('input-hover');
            }
        });
        element.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hover', 'input-hover');
        });
    });

    // Remove theme toggle functionality
    // const themeToggle = document.querySelector('.theme-toggle');
    // const themeIcon = themeToggle.querySelector('i');
    // const body = document.body;

    // function toggleTheme() {
    //     body.classList.toggle('dark-mode');
    //     if (body.classList.contains('dark-mode')) {
    //         localStorage.setItem('theme', 'dark');
    //         themeIcon.classList.remove('fa-moon');
    //         themeIcon.classList.add('fa-sun');
    //     } else {
    //         localStorage.setItem('theme', 'light');
    //         themeIcon.classList.remove('fa-sun');
    //         themeIcon.classList.add('fa-moon');
    //     }
    // }

    // const savedTheme = localStorage.getItem('theme');
    // if (savedTheme === 'dark') {
    //     body.classList.add('dark-mode');
    //     themeIcon.classList.remove('fa-moon');
    //     themeIcon.classList.add('fa-sun');
    // } else {
    //     body.classList.remove('dark-mode');
    //     themeIcon.classList.remove('fa-sun');
    //     themeIcon.classList.add('fa-moon');
    // }

    // if (themeToggle) {
    //     themeToggle.addEventListener('click', toggleTheme);
    // }
});

// Current date and time display
function updateDateTime() {
    const dateTimeElement = document.getElementById('current-datetime');
    if(dateTimeElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        dateTimeElement.textContent = now.toLocaleString('en-US', options)
            .replace(',', '')
            .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
    }
    setTimeout(updateDateTime, 1000);
}

// Initialize updateDateTime on load
if(document.getElementById('current-datetime')) {
    updateDateTime();
}

// Intersection Observer for revealing elements
const revealOnScroll = () => {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    };
    
    const observer = new IntersectionObserver(revealCallback, observerOptions);
    const elements = document.querySelectorAll('.reveal');
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

revealOnScroll();

// Initialize external libraries
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper.js if included and needed
    if (typeof Swiper !== 'undefined') {
        const projectSwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }
    
    // Initialize Lightbox for project images if included
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }
});

// Add dark/light mode toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if(document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Responsive navigation menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.classList.remove('no-scroll');
    });
});