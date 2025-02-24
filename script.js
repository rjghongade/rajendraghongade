document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality with smooth transition
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark');
    }
    
    // Smooth theme transition
    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        // Add transition class
        body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(!isDark);
        
        // Remove transition after animation
        setTimeout(() => {
            body.style.transition = '';
        }, 500);
    });
    
    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        icon.style.transition = 'transform 0.3s ease';
        icon.style.transform = 'rotate(180deg)';
        
        setTimeout(() => {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            icon.style.transform = '';
        }, 150);
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close sidebar on mobile after clicking
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    // Enhanced mobile menu toggle with animation
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        
        // Animate toggle button
        toggleBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            toggleBtn.style.transform = '';
        }, 300);
    });
    
    // Smooth sidebar closing
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !toggleBtn.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    // Add scroll reveal animation to sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
});