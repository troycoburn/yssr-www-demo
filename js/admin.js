/**
 * York Sunbury Search and Rescue - Visual Content Manager
 * Empowers non-technical committee chairs and volunteers to update news, team, and FAQs
 * without writing any code or dealing with syntax errors.
 */

const YSSRAdmin = {
  currentTab: 'news',
  activeNewsIndex: -1,
  activeTeamIndex: -1,
  activeFaqIndex: -1,
  activeWishlistIndex: -1,

  data: {
    news: [],
    team: { executive: [], committees: [] },
    faq: [],
    wishlist: [],
    config: {}
  },

  async init() {
    // Load existing data
    this.data.news = (await YSSRData.loadNews()) || [];
    this.data.team = (await YSSRData.loadTeam()) || { executive: [], committees: [] };
    this.data.faq = (await YSSRData.loadFAQ()) || [];
    this.data.wishlist = (await YSSRData.loadWishlist()) || [];

    this.renderNewsList();
    this.renderTeamList();
    this.renderFaqList();
    this.renderWishlistList();
    this.setupEvents();
  },

  setupEvents() {
    // Tabs
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.admin-tab-pane').forEach(p => p.style.display = 'none');
        btn.classList.add('active');
        const target = btn.getAttribute('data-tab');
        document.getElementById(`tab-${target}`).style.display = 'block';
        this.currentTab = target;
      });
    });

    // News Form
    const newsForm = document.getElementById('newsEditForm');
    if (newsForm) {
      newsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveNewsPost();
      });
    }

    // Team Form
    const teamForm = document.getElementById('teamEditForm');
    if (teamForm) {
      teamForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveTeamMember();
      });
    }

    // FAQ Form
    const faqForm = document.getElementById('faqEditForm');
    if (faqForm) {
      faqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveFaqItem();
      });
    }

    // Wishlist Form
    const wishlistForm = document.getElementById('wishlistEditForm');
    if (wishlistForm) {
      wishlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveWishlistItem();
      });
    }
  },

  /* ================== NEWS MANAGEMENT ================== */
  renderNewsList() {
    const listEl = document.getElementById('adminNewsList');
    if (!listEl) return;

    listEl.innerHTML = this.data.news.map((item, idx) => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border); background: ${this.activeNewsIndex === idx ? 'var(--color-sar-orange-light)' : '#ffffff'};">
        <div>
          <strong>${escapeHTML(item.title)}</strong>
          <div style="font-size:0.8rem; color:var(--color-text-muted);">${item.date} • ${item.category}${item.link ? ' • 🔗 Linked' : ''}</div>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="YSSRAdmin.editNews(${idx})">Edit</button>
          <button type="button" class="btn btn-secondary btn-sm" style="color:var(--color-danger-red);" onclick="YSSRAdmin.deleteNews(${idx})">Delete</button>
        </div>
      </div>
    `).join('');
  },

  editNews(idx) {
    this.activeNewsIndex = idx;
    const item = this.data.news[idx];
    document.getElementById('newsTitle').value = item.title;
    document.getElementById('newsDate').value = item.date;
    document.getElementById('newsCategory').value = item.category;
    document.getElementById('newsSummary').value = item.summary;
    document.getElementById('newsContent').value = item.content || item.summary;
    const linkEl = document.getElementById('newsLink');
    if (linkEl) linkEl.value = item.link || '';
    document.getElementById('newsFormHeading').innerText = 'Edit Article';
    this.renderNewsList();
  },

  resetNewsForm() {
    this.activeNewsIndex = -1;
    document.getElementById('newsEditForm').reset();
    document.getElementById('newsDate').value = new Date().toISOString().split('T')[0];
    const linkEl = document.getElementById('newsLink');
    if (linkEl) linkEl.value = '';
    document.getElementById('newsFormHeading').innerText = 'Add New Article';
    this.renderNewsList();
  },

  saveNewsPost() {
    const title = document.getElementById('newsTitle').value.trim();
    const date = document.getElementById('newsDate').value;
    const category = document.getElementById('newsCategory').value;
    const summary = document.getElementById('newsSummary').value.trim();
    const content = document.getElementById('newsContent').value.trim();
    const linkEl = document.getElementById('newsLink');
    const link = linkEl ? linkEl.value.trim() : '';

    const existing = this.activeNewsIndex >= 0 ? this.data.news[this.activeNewsIndex] : null;

    const postObj = {
      id: existing ? existing.id : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      date,
      category,
      author: existing ? (existing.author || "York Sunbury Search & Rescue") : "York Sunbury Search & Rescue",
      featured: existing ? !!existing.featured : false,
      summary,
      content,
      tag: category,
      ...(link ? { link } : {})
    };

    if (this.activeNewsIndex >= 0) {
      this.data.news[this.activeNewsIndex] = postObj;
    } else {
      this.data.news.unshift(postObj);
    }

    this.renderNewsList();
    this.resetNewsForm();
    this.showStatus('News article successfully saved in local editor session!');
  },

  deleteNews(idx) {
    if (confirm(`Are you sure you want to delete "${this.data.news[idx].title}"?`)) {
      this.data.news.splice(idx, 1);
      this.renderNewsList();
      this.resetNewsForm();
    }
  },

  /* ================== TEAM MANAGEMENT ================== */
  renderTeamList() {
    const listEl = document.getElementById('adminTeamList');
    if (!listEl) return;

    const allMembers = [
      ...this.data.team.executive.map((m, i) => ({ ...m, group: 'executive', origIdx: i })),
      ...this.data.team.committees.map((m, i) => ({ ...m, group: 'committees', origIdx: i }))
    ];

    listEl.innerHTML = allMembers.map((m, idx) => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border);">
        <div>
          <strong>${escapeHTML(m.name)}</strong> - <span style="color:var(--color-sar-orange);">${escapeHTML(m.role)}</span>
          <div style="font-size:0.8rem; color:var(--color-text-muted); text-transform: capitalize;">${m.group}</div>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="YSSRAdmin.deleteTeamMember('${m.group}', ${m.origIdx})">Delete</button>
        </div>
      </div>
    `).join('');
  },

  saveTeamMember() {
    const name = document.getElementById('teamName').value.trim();
    const role = document.getElementById('teamRole').value.trim();
    const group = document.getElementById('teamGroup').value;
    const bio = document.getElementById('teamBio').value.trim();

    const memberObj = { name, role, bio };

    if (group === 'executive') {
      this.data.team.executive.push(memberObj);
    } else {
      this.data.team.committees.push(memberObj);
    }

    document.getElementById('teamEditForm').reset();
    this.renderTeamList();
    this.showStatus('Team member successfully added!');
  },

  deleteTeamMember(group, origIdx) {
    if (confirm('Delete this team member entry?')) {
      this.data.team[group].splice(origIdx, 1);
      this.renderTeamList();
    }
  },

  /* ================== FAQ MANAGEMENT ================== */
  renderFaqList() {
    const listEl = document.getElementById('adminFaqList');
    if (!listEl) return;

    listEl.innerHTML = this.data.faq.map((item, idx) => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border);">
        <div>
          <strong>${escapeHTML(item.question)}</strong>
          <div style="font-size:0.8rem; color:var(--color-text-muted);">${item.category}</div>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button type="button" class="btn btn-secondary btn-sm" style="color:var(--color-danger-red);" onclick="YSSRAdmin.deleteFaq(${idx})">Delete</button>
        </div>
      </div>
    `).join('');
  },

  saveFaqItem() {
    const question = document.getElementById('faqQuestion').value.trim();
    const category = document.getElementById('faqCategory').value;
    const answer = document.getElementById('faqAnswer').value.trim();

    this.data.faq.push({ question, category, answer });
    document.getElementById('faqEditForm').reset();
    this.renderFaqList();
    this.showStatus('FAQ item saved!');
  },

  deleteFaq(idx) {
    if (confirm('Delete this FAQ entry?')) {
      this.data.faq.splice(idx, 1);
      this.renderFaqList();
    }
  },

  /* ================== WISHLIST MANAGEMENT ================== */
  renderWishlistList() {
    const listEl = document.getElementById('adminWishlistList');
    if (!listEl) return;

    listEl.innerHTML = this.data.wishlist.map((item, idx) => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border); background: ${this.activeWishlistIndex === idx ? 'var(--color-sar-orange-light)' : '#ffffff'};">
        <div>
          <strong>${escapeHTML(item.title)}</strong>
          <div style="font-size:0.8rem; color:var(--color-sar-orange); font-weight:700;">${escapeHTML(item.cost)}</div>
          <div style="font-size:0.82rem; color:var(--color-text-muted);">${escapeHTML(item.description ? item.description.substring(0, 80) + '...' : '')}</div>
        </div>
        <div style="display:flex; gap:0.5rem; flex-shrink:0; margin-left:1rem;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="YSSRAdmin.editWishlist(${idx})">Edit</button>
          <button type="button" class="btn btn-secondary btn-sm" style="color:var(--color-danger-red);" onclick="YSSRAdmin.deleteWishlistItem(${idx})">Delete</button>
        </div>
      </div>
    `).join('');
  },

  editWishlist(idx) {
    this.activeWishlistIndex = idx;
    const item = this.data.wishlist[idx];
    document.getElementById('wishlistTitle').value = item.title;
    document.getElementById('wishlistCost').value = item.cost;
    document.getElementById('wishlistDescription').value = item.description;
    document.getElementById('wishlistFormHeading').innerText = 'Edit Wishlist Item';
    this.renderWishlistList();
  },

  resetWishlistForm() {
    this.activeWishlistIndex = -1;
    document.getElementById('wishlistEditForm').reset();
    document.getElementById('wishlistFormHeading').innerText = 'Add Wishlist Item';
    this.renderWishlistList();
  },

  saveWishlistItem() {
    const title = document.getElementById('wishlistTitle').value.trim();
    const cost = document.getElementById('wishlistCost').value.trim();
    const description = document.getElementById('wishlistDescription').value.trim();

    const existing = this.activeWishlistIndex >= 0 ? this.data.wishlist[this.activeWishlistIndex] : null;

    const itemObj = {
      id: existing && existing.id ? existing.id : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      cost,
      description
    };

    if (this.activeWishlistIndex >= 0) {
      this.data.wishlist[this.activeWishlistIndex] = itemObj;
    } else {
      this.data.wishlist.push(itemObj);
    }

    this.renderWishlistList();
    this.resetWishlistForm();
    this.showStatus('Wishlist item saved in local editor session!');
  },

  deleteWishlistItem(idx) {
    if (confirm(`Are you sure you want to delete "${this.data.wishlist[idx].title}" from the wishlist?`)) {
      this.data.wishlist.splice(idx, 1);
      this.renderWishlistList();
      this.resetWishlistForm();
    }
  },

  /* ================== EXPORT / DOWNLOAD / CLIPBOARD ================== */
  exportData(type) {
    let payload;
    let filename;

    if (type === 'news') {
      payload = JSON.stringify(this.data.news, null, 2);
      filename = 'news.json';
    } else if (type === 'team') {
      payload = JSON.stringify(this.data.team, null, 2);
      filename = 'team.json';
    } else if (type === 'faq') {
      payload = JSON.stringify(this.data.faq, null, 2);
      filename = 'faq.json';
    } else if (type === 'wishlist') {
      payload = JSON.stringify(this.data.wishlist, null, 2);
      filename = 'wishlist.json';
    }

    // Trigger download
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showStatus(`Downloaded <strong>${filename}</strong>! Replace this file inside the <code>data/</code> folder.`);
  },

  copyToClipboard(type) {
    let payload;
    if (type === 'news') payload = JSON.stringify(this.data.news, null, 2);
    else if (type === 'team') payload = JSON.stringify(this.data.team, null, 2);
    else if (type === 'faq') payload = JSON.stringify(this.data.faq, null, 2);
    else if (type === 'wishlist') payload = JSON.stringify(this.data.wishlist, null, 2);

    navigator.clipboard.writeText(payload).then(() => {
      this.showStatus(`Copied updated <strong>${type}.json</strong> data to clipboard! Paste it directly into GitHub.`);
    }).catch(() => {
      alert('Could not copy automatically. You can use the Download button instead.');
    });
  },

  showStatus(msg) {
    const alertBox = document.getElementById('adminStatusMessage');
    if (alertBox) {
      alertBox.innerHTML = msg;
      alertBox.style.display = 'block';
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 5000);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  YSSRAdmin.init();
});
