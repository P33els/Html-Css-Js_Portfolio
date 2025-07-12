document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    emailjs.init("uHidXclMbCdJQEhD7");

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('section');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const scrollUpBtn = document.querySelector('.scroll-up');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const closeBtn = document.querySelector('.close-btn');

    const typingTextArray = ["Web Developer", "Graphic Designer", "Freelancer"];
    
    if (document.querySelector('.typed-text')) {
        const typed = new Typed('.typed-text', {
            strings: typingTextArray,
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }

    const animateSkills = () => {
        const skillItems = document.querySelectorAll('.skill-logo-item, .skill-tag');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 100);
        });
    };

    const skillsSection = document.querySelector('#skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            
            emailjs.sendForm('service_qchttvv', 'template_rj7ghnf', contactForm)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showFormMessage('Message sent successfully! Thank you for contacting me.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showFormMessage('Failed to send message. Please try again later.', 'error');
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                });
        });
    }

    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            formMessage.style.opacity = '0';
            
            setTimeout(() => {
                formMessage.style.transition = 'opacity 0.3s ease';
                formMessage.style.opacity = '1';
            }, 10);
            
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 300);
            }, 5000);
        }
    }
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

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
        
        if(window.scrollY > 500) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    });

    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if(filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 200);
                } 
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
    checkIfInView();
    
    if(typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    const heroSection = document.querySelector('.hero');
    
    if(heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

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


    const githubUsername = "P33els";
    const githubProjectsContainer = document.getElementById('github-projects');

    async function fetchGitHubRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`);
            const repos = await response.json();

            repos.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.classList.add('project-card');
                repoCard.innerHTML = `
                    <div class="project-info">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || "No description available."}</p>
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank" class="project-link">
                                <i class="fas fa-external-link-alt"></i> View Repository
                            </a>
                        </div>
                    </div>
                `;
                githubProjectsContainer.appendChild(repoCard);
            });
        } catch (error) {
            console.error("Error fetching GitHub repositories:", error);
            githubProjectsContainer.innerHTML = `<p style="text-align: center; color: var(--text-color);">Unable to load projects.</p>`;
        }
    }

    fetchGitHubRepos();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectSections = document.querySelectorAll('.projects-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            projectSections.forEach(section => {
                if (section.getAttribute('data-category') === filter) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });
});

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

if(document.getElementById('current-datetime')) {
    updateDateTime();
}

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

document.addEventListener('DOMContentLoaded', function() {
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
    
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }
});

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

