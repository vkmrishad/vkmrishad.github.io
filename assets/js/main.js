document.addEventListener('DOMContentLoaded', () => {
  // Central document links configuration
  const DOC_LINKS = {
    resume: "https://drive.google.com/file/d/1wsomirz6UqtAG6v7sOaKhUnvz0Fc1r9-/view",
    coverLetter: "https://drive.google.com/file/d/1gLnlRiBPbePY3jIam0GFqPpcN5sf7N7e/view"
  };

  // Set links dynamically across mobile header and desktop actions bar
  document.querySelectorAll('.resume-link').forEach(el => el.href = DOC_LINKS.resume);
  document.querySelectorAll('.cover-letter-link').forEach(el => el.href = DOC_LINKS.coverLetter);

  // 0. Theme Toggle & System Preference Logic
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      document.body.setAttribute('data-theme', 'light');
      themeToggleBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-moon';
      });
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      document.body.setAttribute('data-theme', 'dark');
      themeToggleBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-sun';
      });
      localStorage.setItem('theme', 'dark');
    }
  }

  // Determine starting theme (default is dark mode)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // Toggle button click listeners
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.body.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  });

  // 1. Preloader Handler (Skipped if already loaded in this session)
  const preloader = document.getElementById('preloader');
  const sessionPreloaderKey = 'preloader-loaded-vkmrishad';

  function revealAboutHero() {
    const avatar = document.querySelector('#hero_sec .person-avatar');
    const h1 = document.querySelector('#hero_sec h1.reveal-left');
    if (avatar) avatar.classList.add('revealed');
    if (h1) h1.classList.add('revealed');
  }

  function revealAboutDetails() {
    document.querySelectorAll('#about_sec .section-title.reveal-left, #about_sec .hero-desc.reveal').forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 10);
    });
  }

  if (preloader) {
    if (sessionStorage.getItem(sessionPreloaderKey)) {
      preloader.style.display = 'none';
      // Trigger typing animation and reveals almost instantly
      setTimeout(() => {
        startTypingAnimation();
        revealAboutHero();
      }, 200);
    } else {
      const hidePreloader = () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600);
        sessionStorage.setItem(sessionPreloaderKey, 'true');

        // Start typing animation and reveals immediately as preloader starts fading out
        startTypingAnimation();
        revealAboutHero();
      };

      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', hidePreloader);
      } else {
        hidePreloader();
      }
    }
  } else {
    // Fallback if preloader is not in DOM
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => {
        startTypingAnimation();
        revealAboutHero();
      });
    } else {
      startTypingAnimation();
      revealAboutHero();
    }
  }

  // 2. Typing Animation Logic (Types Hello! and contains a blinking cursor at the end)
  function startTypingAnimation() {
    const typedEl = document.getElementById('typed-text');
    if (!typedEl) return;

    const textToType = "Hello! I am Mohammed Rishad, Senior Software Engineer.<br>I am from India🇮🇳.<br>Currently working at Chronext, Residing in Köln, Germany🇩🇪.";
    const speed = 15; // ms per character

    let i = 0;
    typedEl.innerHTML = '';

    // Create wrapper spans to separate content and cursor cleanly
    const contentSpan = document.createElement('span');
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typing-cursor';
    cursorSpan.innerHTML = '|';

    typedEl.appendChild(contentSpan);
    typedEl.appendChild(cursorSpan);

    let revealedAbout = false;

    function type() {
      if (i < textToType.length) {
        if (textToType.charAt(i) === '<') {
          // Detect HTML tags (like <br>) and output them instantly
          const tagEnd = textToType.indexOf('>', i);
          if (tagEnd !== -1) {
            contentSpan.innerHTML += textToType.substring(i, tagEnd + 1);
            i = tagEnd + 1;
          } else {
            contentSpan.innerHTML += textToType.charAt(i);
            i++;
          }
        } else if (textToType.substring(i, i + 6) === '&nbsp;') {
          contentSpan.innerHTML += '&nbsp;';
          i += 6;
        } else {
          contentSpan.innerHTML += textToType.charAt(i);
          i++;
        }

        // Trigger about details reveal at the middle of typing
        if (i >= textToType.length / 2 && !revealedAbout) {
          revealedAbout = true;
          revealAboutDetails();
        }

        setTimeout(type, speed);
      } else {
        // Fallback safety check
        if (!revealedAbout) {
          revealedAbout = true;
          revealAboutDetails();
        }
      }
    }

    type();
  }

  // 3. Mobile Header & Sidebar Menu Drawer
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (sidebar.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close sidebar on clicking link
    sidebar.querySelectorAll('.sidebar-nav a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close sidebar on clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // 4. Smooth Scrolling with Offset adjustments for Mobile Nav Header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // If link is just "#" or "#body"
      if (targetId === '#body' || targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = window.innerWidth <= 1180 ? 70 : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Scrollspy Observer to update Active Sidebar Nav Links
  const sections = document.querySelectorAll('section, body');
  const scrollspyOptions = {
    root: null,
    // Triggers when section is roughly in upper half of viewport
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const scrollspyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let id = entry.target.getAttribute('id');
        if (entry.target.tagName.toLowerCase() === 'body') {
          id = 'body';
        }

        if (id) {
          // Map hero_sec and about_sec to body since the "About" link targets #body
          let targetId = id;
          if (id === 'hero_sec' || id === 'about_sec') {
            targetId = 'body';
          }

          document.querySelectorAll('.sidebar-nav li').forEach(li => {
            li.classList.remove('active');
            const a = li.querySelector('a');
            if (a && a.getAttribute('href') === `#${targetId}`) {
              li.classList.add('active');
            }
          });
        }
      }
    });
  }, scrollspyOptions);

  sections.forEach(sec => scrollspyObserver.observe(sec));

  // 6. IntersectionObserver for Skill Bar Fills & Percentage Count-up Animations
  const skillItems = document.querySelectorAll('.skill-item');
  const skillObserverOptions = {
    threshold: 0.15
  };

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-bar-fill');
        const pctEl = entry.target.querySelector('.skill-percentage');
        const targetPct = parseInt(entry.target.getAttribute('data-percent'), 10);

        if (bar && pctEl) {
          // Fill progress bar width
          bar.style.width = targetPct + '%';

          // Animate the percentage number count-up
          let current = 0;
          const duration = 1200; // Total ms for animation
          const stepTime = 30; // Frequency of update
          const steps = duration / stepTime;
          const increment = targetPct / steps;

          const counter = setInterval(() => {
            current += increment;
            if (current >= targetPct) {
              pctEl.textContent = targetPct + '%';
              clearInterval(counter);
            } else {
              pctEl.textContent = Math.floor(current) + '%';
            }
          }, stepTime);
        }

        // Stop observing once animated
        skillObserver.unobserve(entry.target);
      }
    });
  }, skillObserverOptions);

  skillItems.forEach(item => skillObserver.observe(item));

  // 7. Scroll Reveal Observer (Fade Up & Reveal sections)
  // Exclude elements inside #about_sec because their reveals are triggered explicitly on page load
  const revealElements = document.querySelectorAll('section:not(#about_sec) .reveal, section:not(#about_sec) .reveal-left, section:not(#about_sec) .reveal-right, section:not(#about_sec) .reveal-scale, footer.reveal');
  const revealObserverOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);
        delay += 60; // Stagger effect
        revealObserver.unobserve(el);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => revealObserver.observe(el));
});
