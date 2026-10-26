/**
 * York Sunbury Search and Rescue - Dynamic Content Loader
 * Reads from /data/*.json files with graceful offline / file:// fallbacks.
 */

const YSSRData = {
  // Cache objects
  config: null,
  news: null,
  team: null,
  faq: null,
  stats: null,

  async fetchJSON(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn(`Could not fetch ${endpoint} (likely local file protocol or offline). Falling back to built-in data.`, err);
      return null;
    }
  },

  // Fallback defaults to ensure pages look rich even if browsed locally via file://
  defaults: {
    news: [
      {
        id: "sar-resolve-2025",
        title: "SAR Resolve 2025 Tests Multi-Agency Coordination as Rescue 11 Makes Full-Scale Debut",
        date: "2025-10-22",
        category: "Operations",
        author: "YSSR Operations & Media",
        featured: true,
        summary: "On October 18, York Sunbury Search and Rescue (YSSR) co-led SAR Resolve 2025, a large-scale multi-agency field exercise that simulated a complex lost person scenario.",
        content: "On October 18, York Sunbury Search and Rescue co-led SAR Resolve 2025, a large-scale field exercise testing coordination between municipal first responders, provincial emergency services, and neighboring ground search and rescue units. The exercise marked the full-scale operational debut of Rescue 11, YSSR's newest custom-outfitted command and response truck.",
        tag: "Exercise"
      },
      {
        id: "new-rescue-truck-rescue-11",
        title: "New Rescue Truck for Fredericton-area Volunteer Search and Rescue Team",
        date: "2025-08-24",
        category: "Equipment",
        author: "YSSR Board",
        featured: true,
        summary: "York Sunbury Search and Rescue proudly unveiled its newest response vehicle, Rescue 11, significantly enhancing rapid response and field logistics capabilities.",
        content: "Rescue 11 is built to tackle New Brunswick's demanding weather conditions and remote terrain, equipped with telecommunications gear, medical hypothermia evacuation tools, and mobile command capabilities.",
        tag: "Apparatus"
      },
      {
        id: "buy-50-50-tickets",
        title: "Support YSSR: New Brunswick GSAR Provincial 50/50 Draw",
        date: "2025-06-15",
        category: "Fundraising",
        author: "Fundraising Committee",
        featured: false,
        summary: "Support York Sunbury Search & Rescue while getting a chance to win the provincial jackpot through the NB Ground Search and Rescue 50/50 lottery.",
        content: "Proceeds directly fund critical training, vehicle maintenance, radio communications, and safety gear for volunteer searchers.",
        tag: "Fundraising"
      },
      {
        id: "fall-hiking-safety-essentials",
        title: "Never Hit The Trail Without The 10 Essentials: Autumn & Winter Safety",
        date: "2025-10-10",
        category: "Safety & Prevention",
        author: "AdventureSmart Committee",
        featured: false,
        summary: "Days are shorter and temperatures drop rapidly in New Brunswick forests. Learn the vital AdventureSmart checklist before stepping into the woods.",
        content: "Remember the three Ts: Trip Planning, Training, and Taking the Essentials. Even a short day-hike requires emergency preparations in NB woods.",
        tag: "AdventureSmart"
      }
    ],
    team: {
      executive: [
        { name: "Matt Pasqualetto", role: "President", bio: "Leads organizational governance, strategic partnerships with provincial authorities, and community commitment." },
        { name: "John Leslie", role: "Vice President", bio: "Assists the President, supports team operations, and helps coordinate inter-agency liaison." },
        { name: "Wayne MacKay", role: "Secretary", bio: "Manages records, official correspondence, documentation compliance, and general meeting proceedings." },
        { name: "Jeff Justason", role: "Treasurer", bio: "Stewards charitable financial records, budgeting, donation tracking, and CRA charitable filings." }
      ],
      committees: [
        { name: "Bradley Parker", role: "Search Commander", bio: "Oversees search incident management, search tactics, command post operations, and deployment readiness." },
        { name: "Shantelle Leslie", role: "Project Lifesaver Chair", bio: "Coordinates electronic search specialists, client enrollment, transmitter maintenance, and family outreach." },
        { name: "David Northrup", role: "AdventureSmart Chair", bio: "Leads community education workshops including Hug-a-Tree and Survive, Survive Outside, and youth safety." },
        { name: "Troy Coburn", role: "IT Committee Chair", bio: "Administers technology infrastructure, communications systems, data management, and digital services." },
        { name: "Jasmine Manz", role: "Membership Chair", bio: "Oversees new member intake, orientation nights, background checks, and active volunteer records." },
        { name: "Randy Firth", role: "Public Relations Chair", bio: "Coordinates media relations, community engagement, newsletter publications, and social media channels." },
        { name: "Zandra Rubinger", role: "Equipment Committee Chair", bio: "Manages specialized rescue gear, field supplies, tracking devices, radios, and emergency medical kits." },
        { name: "George Derrah", role: "Transportation Committee Chair", bio: "Supervises team emergency response vehicles including Rescue 11, mobile command assets, and drivers." },
        { name: "Jonathan Colbourne", role: "Training Committee Chair Alternate", bio: "Develops field exercises, navigation, tracking, survival skills, and first aid re-certifications." }
      ]
    },
    faq: [
      {
        question: "Do I have to wait until the next New Member Night recruitment event to join?",
        category: "recruitment",
        answer: "Yes, if you would like to be an operational searcher who gets deployed in the woods and on missing person tasks. Searcher training is scheduled in cohorts twice a year. However, if you are interested in volunteering in a non-operational role (such as IT, PR, fundraising, administration, or logistics), you can join at any time throughout the year!"
      },
      {
        question: "Can I volunteer, but not search in the woods?",
        category: "recruitment",
        answer: "Absolutely! A significant part of our team's success depends on non-operational volunteers. You can support YSSR through fundraising, vehicle & equipment maintenance, community events, IT & website management, administration, and training logistics."
      },
      {
        question: "How much does it cost to join?",
        category: "membership",
        answer: "New member dues are $40 for your first year, which includes an official YSSR uniform shirt. Annual membership dues in subsequent years are $20."
      },
      {
        question: "How fit do I need to be?",
        category: "operations",
        answer: "Operational functions of ground search and rescue can be physically demanding. Searchers may be required to traverse dense brush, steep ravines, wetlands, or night conditions carrying a field pack for several hours at a time."
      },
      {
        question: "What kind of time commitment is required?",
        category: "operations",
        answer: "We ask operational members to contribute at least 50 hours per year (with at least 25 hours in operations or training). This includes monthly general meetings, scheduled evening or weekend training exercises, and search callouts as your availability permits."
      },
      {
        question: "Are volunteers insured for injury?",
        category: "operations",
        answer: "Yes. Active volunteers have coverage through the Province of New Brunswick while participating in authorized operations and official training events."
      },
      {
        question: "How do I report someone missing?",
        category: "emergency",
        answer: "Immediately call 911 or your local police force (Fredericton Police Force or RCMP). There is NO waiting period required to report a missing person in Canada. The police will investigate and officially activate York Sunbury Search and Rescue."
      },
      {
        question: "Will I receive a charitable tax receipt for donations?",
        category: "donations",
        answer: "Yes. York Sunbury Search and Rescue is a registered Canadian charity. When you donate online through CanadaHelps, an official tax receipt is generated instantly for your income tax return."
      }
    ]
  },

  async loadNews() {
    if (!this.news) {
      const data = await this.fetchJSON('data/news.json');
      this.news = data || this.defaults.news;
    }
    return this.news;
  },

  async loadTeam() {
    if (!this.team) {
      const data = await this.fetchJSON('data/team.json');
      this.team = data || this.defaults.team;
    }
    return this.team;
  },

  async loadFAQ() {
    if (!this.faq) {
      const data = await this.fetchJSON('data/faq.json');
      this.faq = data || this.defaults.faq;
    }
    return this.faq;
  },

  // Render news cards on home page or news page
  renderNews(containerEl, items, isCompact = false) {
    if (!containerEl) return;
    if (!items || items.length === 0) {
      containerEl.innerHTML = '<p class="text-muted">No news articles found.</p>';
      return;
    }

    const displayItems = isCompact ? items.slice(0, 3) : items;

    containerEl.innerHTML = displayItems.map(item => `
      <article class="news-card">
        <div class="news-card-badge-wrap">
          <span class="news-category-badge">${escapeHTML(item.category || 'Update')}</span>
          <time class="news-date" datetime="${escapeHTML(item.date)}">${formatDate(item.date)}</time>
        </div>
        <div class="news-card-body">
          <h3 class="news-card-title">${escapeHTML(item.title)}</h3>
          <p class="news-card-excerpt">${escapeHTML(item.summary || item.content.substring(0, 140) + '...')}</p>
          <div style="margin-top:auto; padding-top: 1rem; display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="YSSRData.openNewsModal('${item.id}')">Read Full Story</button>
            ${item.link ? `
              <a href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-navy btn-sm" style="display:inline-flex; align-items:center; gap:0.35rem;" title="${item.link.includes('facebook.com') || item.link.includes('fb.watch') || item.link.includes('fb.com') ? 'View on Facebook' : 'Original Post'}">
                ${item.link.includes('facebook.com') || item.link.includes('fb.watch') || item.link.includes('fb.com') ? `
                  <svg viewBox="0 0 24 24" fill="currentColor" style="width:14px; height:14px;"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/></svg>
                  Facebook
                ` : `
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px; height:14px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  Post
                `}
              </a>
            ` : ''}
          </div>
        </div>
      </article>
    `).join('');
  },

  // Render team grid
  renderTeam(containerEl, teamData) {
    if (!containerEl) return;
    const { executive = [], committees = [] } = teamData;

    let html = `
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1.5rem; border-bottom: 2px solid var(--color-border); padding-bottom: 0.5rem;">Executive Board</h3>
        <div class="team-grid">
          ${executive.map(m => `
            <div class="team-card">
              <div class="team-avatar">${getInitials(m.name)}</div>
              <h4 class="team-name">${escapeHTML(m.name)}</h4>
              <div class="team-role">${escapeHTML(m.role)}</div>
              <p class="team-bio">${escapeHTML(m.bio || '')}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <div>
        <h3 style="margin-bottom: 1.5rem; border-bottom: 2px solid var(--color-border); padding-bottom: 0.5rem;">Operational &amp; Committee Leadership</h3>
        <div class="team-grid">
          ${committees.map(m => `
            <div class="team-card">
              <div class="team-avatar">${getInitials(m.name)}</div>
              <h4 class="team-name">${escapeHTML(m.name)}</h4>
              <div class="team-role">${escapeHTML(m.role)}</div>
              <p class="team-bio">${escapeHTML(m.bio || '')}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    containerEl.innerHTML = html;
  },

  // Render FAQ Accordion
  renderFAQ(containerEl, faqItems) {
    if (!containerEl) return;
    if (!faqItems || faqItems.length === 0) {
      containerEl.innerHTML = '<p class="text-muted">No FAQs found matching your criteria.</p>';
      return;
    }

    containerEl.innerHTML = faqItems.map((item, idx) => `
      <div class="faq-item ${idx === 0 ? 'open' : ''}">
        <button type="button" class="faq-question" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span>${escapeHTML(item.question)}</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="faq-answer">
          <p>${escapeHTML(item.answer)}</p>
        </div>
      </div>
    `).join('');

    // Rebind accordion triggers
    initAccordion(containerEl);
  },

  // Read full article in modal
  async openNewsModal(newsId) {
    const news = await this.loadNews();
    const article = news.find(n => n.id === newsId);
    if (!article) return;

    let modalOverlay = document.getElementById('newsModalOverlay');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'newsModalOverlay';
      modalOverlay.className = 'modal-overlay';
      modalOverlay.innerHTML = `
        <div class="modal-box">
          <button type="button" class="modal-close" onclick="document.getElementById('newsModalOverlay').classList.remove('active')">&times;</button>
          <div id="newsModalContent"></div>
        </div>
      `;
      document.body.appendChild(modalOverlay);
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
      });
    }

    const contentBox = document.getElementById('newsModalContent');
    contentBox.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span class="news-category-badge">${escapeHTML(article.category)}</span>
        <span style="font-size:0.88rem; color:var(--color-text-muted); margin-left: 0.5rem;">${formatDate(article.date)}</span>
      </div>
      <h2 style="margin-bottom: 0.75rem;">${escapeHTML(article.title)}</h2>
      <p style="font-weight:600; color:var(--color-sar-orange); margin-bottom: 1.25rem;">Author: ${escapeHTML(article.author || 'YSSR')}</p>
      <div style="font-size: 1.05rem; line-height: 1.75; color: var(--color-text-main);">
        <p style="white-space: pre-line;">${escapeHTML(article.content || article.summary)}</p>
      </div>
      ${article.link ? `
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--color-border);">
          <a href="${escapeHTML(article.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:0.5rem;">
            ${article.link.includes('facebook.com') || article.link.includes('fb.watch') || article.link.includes('fb.com') ? `
              <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px; height:16px;"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/></svg>
              View on Facebook
            ` : `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px; height:16px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              View Original Post
            `}
          </a>
        </div>
      ` : ''}
    `;

    modalOverlay.classList.add('active');
  }
};

// Utilities
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return dateStr;
}

function getInitials(name) {
  if (!name) return 'YS';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function initAccordion(container) {
  const items = container.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.onclick = () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    };
  });
}

// Auto-initialize components on page load
document.addEventListener('DOMContentLoaded', async () => {
  // News container
  const newsContainer = document.querySelector('[data-news-container]');
  if (newsContainer) {
    const isCompact = newsContainer.dataset.compact === 'true';
    const items = await YSSRData.loadNews();
    YSSRData.renderNews(newsContainer, items, isCompact);
  }

  // Team container
  const teamContainer = document.querySelector('[data-team-container]');
  if (teamContainer) {
    const teamData = await YSSRData.loadTeam();
    YSSRData.renderTeam(teamContainer, teamData);
  }

  // FAQ container
  const faqContainer = document.querySelector('[data-faq-container]');
  if (faqContainer) {
    const faqs = await YSSRData.loadFAQ();
    YSSRData.renderFAQ(faqContainer, faqs);
  }
});
