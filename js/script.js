// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add scroll reveal animation
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.experience-card, .project-card, .skill-category');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        loader.classList.add('fade-out');
    }, 1000);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.classList.add('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
}

document.querySelector('.nav-content').appendChild(darkModeToggle);

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    
    scrollProgress.style.width = `${(scrolled / scrollable) * 100}%`;
});

// Blog Integration with Medium
async function fetchMediumPosts() {
    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@tusharathare18');
        const data = await response.json();
        
        const blogGrid = document.querySelector('.blog-grid');
        blogGrid.innerHTML = ''; // Clear existing content
        
        data.items.slice(0, 3).forEach(post => {
            // Extract the first image from the content if thumbnail is not available
            let imageUrl = post.thumbnail;
            if (!imageUrl || imageUrl === '') {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = post.content;
                const firstImage = tempDiv.querySelector('img');
                imageUrl = firstImage ? firstImage.src : 'path/to/default-image.jpg'; // Add a default image path
            }

            const blogCard = `
                <div class="blog-card">
                    <div class="blog-image-container">
                        <img src="${imageUrl}" alt="${post.title}" class="blog-image">
                    </div>
                    <div class="blog-content">
                        <p class="blog-date">${new Date(post.pubDate).toLocaleDateString()}</p>
                        <h3>${post.title}</h3>
                        <a href="${post.link}" target="_blank" class="project-link">Read More</a>
                    </div>
                </div>
            `;
            blogGrid.innerHTML += blogCard;
        });
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
    }
}

// Call the function when the page loads
fetchMediumPosts();

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = width;
        }
    });
};

window.addEventListener('scroll', animateSkillBars);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        typeWriter(heroTitle, heroTitle.textContent);
    }
});

// Add particle background
particlesJS('particles-js', {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#007bff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.3,
            random: false
        },
        size: {
            value: 2,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#007bff',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            }
        }
    },
    retina_detect: true
}); 