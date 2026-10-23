/**
 * York Sunbury Search and Rescue - Main Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNavLinks');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target) && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Announcement Banner Dismissal
  const banner = document.getElementById('recruitmentBanner');
  const bannerClose = document.getElementById('dismissBannerBtn');
  if (banner && bannerClose) {
    if (localStorage.getItem('yssr_banner_dismissed') === 'true') {
      banner.style.display = 'none';
    }
    bannerClose.addEventListener('click', () => {
      banner.style.display = 'none';
      localStorage.setItem('yssr_banner_dismissed', 'true');
    });
  }

  // Contact Form Submission (Client-side interactive handling)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formFeedback = document.getElementById('formFeedback');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = contactForm.querySelector('#contactName')?.value.trim();
      const email = contactForm.querySelector('#contactEmail')?.value.trim();
      const subject = contactForm.querySelector('#contactSubject')?.value.trim();
      const message = contactForm.querySelector('#contactMessage')?.value.trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.innerHTML = `
            <div style="background-color: var(--color-danger-bg); color: var(--color-danger-red); padding: 1rem; border-radius: var(--radius-md); margin-top: 1rem; font-weight: 600;">
              Please fill in all required fields (Name, Email, and Message).
            </div>
          `;
        }
        return;
      }

      // Friendly simulated delivery or mailto transition
      if (submitBtn) submitBtn.disabled = true;
      if (formFeedback) {
        formFeedback.innerHTML = `
          <div style="background-color: var(--color-forest-light); color: var(--color-forest); padding: 1.25rem; border-radius: var(--radius-md); margin-top: 1rem;">
            <h4 style="color: var(--color-forest); margin-bottom: 0.25rem;">Thank You, ${name}!</h4>
            <p style="margin-bottom: 0.5rem;">Your message regarding "<strong>${subject || 'General Inquiry'}</strong>" has been received. Our volunteer coordinator will respond to <strong>${email}</strong> as soon as possible.</p>
            <p style="font-size: 0.88rem; margin-bottom: 0;"><em>Reminder: For lost person emergencies, please dial 911 immediately.</em></p>
          </div>
        `;
      }
      contactForm.reset();
      if (submitBtn) submitBtn.disabled = false;
    });
  }

  // News Filtering & Search Setup (for news.html)
  const newsSearchInput = document.getElementById('newsSearchInput');
  const newsCategoryButtons = document.querySelectorAll('[data-news-category]');
  if (newsSearchInput || newsCategoryButtons.length > 0) {
    let currentCategory = 'all';
    let currentSearch = '';

    const filterNews = async () => {
      const container = document.querySelector('[data-news-container]');
      if (!container) return;
      const allNews = await YSSRData.loadNews();

      const filtered = allNews.filter(item => {
        const matchesCategory = currentCategory === 'all' || 
          item.category.toLowerCase().includes(currentCategory.toLowerCase()) ||
          (item.tag && item.tag.toLowerCase().includes(currentCategory.toLowerCase()));

        const matchesSearch = !currentSearch ||
          item.title.toLowerCase().includes(currentSearch) ||
          item.summary.toLowerCase().includes(currentSearch) ||
          (item.content && item.content.toLowerCase().includes(currentSearch));

        return matchesCategory && matchesSearch;
      });

      YSSRData.renderNews(container, filtered, false);
    };

    if (newsSearchInput) {
      newsSearchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        filterNews();
      });
    }

    newsCategoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        newsCategoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-news-category');
        filterNews();
      });
    });
  }

  // FAQ Filtering Setup (for join.html)
  const faqCategoryButtons = document.querySelectorAll('[data-faq-category]');
  if (faqCategoryButtons.length > 0) {
    faqCategoryButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        faqCategoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-faq-category');
        const container = document.querySelector('[data-faq-container]');
        const allFaqs = await YSSRData.loadFAQ();

        const filtered = cat === 'all' ? allFaqs : allFaqs.filter(f => f.category === cat);
        YSSRData.renderFAQ(container, filtered);
      });
    });
  }
});
