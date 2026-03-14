/* BROWSE 2026 — Main JS */

// ── Navbar scroll effect ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile hamburger ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});
document.querySelectorAll('.nav-mobile a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ── Countdown to April 7, 2026 ────────────────────────
function updateCountdown() {
    const target = new Date('2026-04-07T09:00:00+05:30');
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
        ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '00';
        });
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');
    document.getElementById('cd-days').textContent = pad(days);
    document.getElementById('cd-hours').textContent = pad(hours);
    document.getElementById('cd-mins').textContent = pad(minutes);
    document.getElementById('cd-secs').textContent = pad(seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── Scroll animation (IntersectionObserver) ───────────
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            fadeObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
fadeEls.forEach(el => fadeObs.observe(el));

// ── Particle canvas background ────────────────────────
const canvas = document.createElement('canvas');
canvas.id = 'bgCanvas';
canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let W, H, particles;

function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 1.2 + 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '0,245,255' : '26,106,255';
}

Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x = W;
    if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H;
    if (this.y > H) this.y = 0;
};

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
};

function initParticles() {
    resizeCanvas();
    const count = Math.floor((W * H) / 12000);
    particles = Array.from({ length: count }, () => new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', initParticles);

// Modal System
const overlay = document.getElementById('modalOverlay');
const modalBox = document.getElementById('modalBox');
const closeBtn = document.getElementById('modalCloseBtn');

function normalizeCoordinators(raw, role = 'student') {
    if (Array.isArray(raw)) return raw;
    if (typeof raw !== 'string' || !raw.trim()) return [];

    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);

    // Legacy faculty format: first line name, second line phone.
    if (role === 'faculty' && lines.length >= 2 && !lines[0].includes(' - ')) {
        return [{ name: lines[0], contact: lines.slice(1).join(' / ') }];
    }

    return lines.map(line => {
        const [namePart, ...contactParts] = line.split(' - ');
        return {
            name: (namePart || '').trim(),
            contact: contactParts.join(' - ').trim(),
        };
    });
}

function renderCoordinatorList(items) {
    return items.map(item => `
      <div class="mc-entry">
        <div class="mc-name">${item.name || ''}</div>
        ${item.contact ? `<div class="mc-phone">${item.contact}</div>` : ''}
      </div>
    `).join('');
}

function openModal(evKey) {
    const evData = window.events ? window.events[evKey] : null;
    if (!evData || !modalBox || !overlay) return;

    modalBox.style.setProperty('--modal-event', evData.color || 'var(--neon-cyan)');

    const iconLg = modalBox.querySelector('.modal-icon-lg');
    if (iconLg) iconLg.innerHTML = evData.icon;

    const tagEl = modalBox.querySelector('.modal-ev-tag');
    if (tagEl) tagEl.textContent = evData.tag;

    const nameEl = modalBox.querySelector('.modal-ev-name');
    if (nameEl) nameEl.textContent = evData.name;

    const subEl = modalBox.querySelector('.modal-ev-sub');
    if (subEl) subEl.textContent = evData.sub;

    // Rules
    const rulesList = modalBox.querySelector('.modal-rules-list');
    if (rulesList) rulesList.innerHTML = evData.rules.map(r => `<li>${r}</li>`).join('');

    // Info chips
    const infoChips = modalBox.querySelector('.modal-info-chips');
    if (infoChips) {
        infoChips.innerHTML = evData.info.map(i =>
            `<div class="mi-chip"><i class="fas ${i.icon}"></i> <strong>${i.label}:</strong> ${i.val}</div>`
        ).join('');
    }

    // Coordinators
    const grid = modalBox.querySelector('.modal-coords-grid');
    if (grid) {
        const studentList = normalizeCoordinators(
            evData.studentCoordinators || evData.student,
            'student'
        );
        const facultyList = normalizeCoordinators(
            evData.facultyCoordinators || evData.faculty,
            'faculty'
        );

        const studentLines = renderCoordinatorList(studentList);
        const facultyLines = renderCoordinatorList(facultyList);

        grid.innerHTML = `
        <div class="mc-block">
          <div class="mc-label">Student Coordinators</div>
          ${studentLines}
        </div>
        <div class="mc-block">
          <div class="mc-label">Faculty Coordinator</div>
          ${facultyLines}
        </div>`;
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Attach listeners safely
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Event tile click handlers
document.querySelectorAll('[data-event]').forEach(el => {
    el.addEventListener('click', (e) => {
        // Prevent multiple triggers if both tile and button have data-event
        e.stopPropagation();
        openModal(el.dataset.event);
    });
});