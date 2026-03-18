/* Core Team + Contact Content Manager */
(function () {
    const defaultRole = 'Student Coordinator';

    // Edit this object to modify Core Team and Get in Touch content.
    const coreTeamData = {
        patrons: [
            { name: 'Prof. Shivakumaraiah', role: 'CEO' },
            { name: 'Prof. S V Dinesh', role: 'Principal' }
        ],
        leadership: [
            { name: 'Prof. R Aparna', role: 'President · HOD, ISE' },
            { name: 'Prof. N R Sunitha', role: 'Vice-President · HOD, CSE' }
        ],
        studentCoordinators: [
            { name: 'Tushar M Sagur', role: defaultRole, phone: '+91 99724 01255' },
            { name: 'Abrar Azeem', role: defaultRole, phone: '+91 88677 37265' },
            { name: 'Tarun R', role: defaultRole, phone: '+91 99729 09371' }
        ],
        contact: {
            locationLines: [
                'Siddaganga Institute of Technology',
                'B.H. Road, Tumakuru-572103',
                'Karnataka, India'
            ],
            emailLabel: 'browse@sit.ac.in',
            emailHref: 'mailto:browse@sit.ac.in',
            websiteLabel: 'browse.sit.ac.in',
            websiteHref: 'http://browse.sit.ac.in'
        }
    };

    function esc(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderPeople(containerId, list, fallbackRole) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const safeList = Array.isArray(list) ? list : [];
        container.innerHTML = safeList
            .filter(item => item && item.name)
            .map(item => {
                const name = esc(String(item.name).trim());
                const role = esc(String(item.role || fallbackRole || '').trim());
                return `
                    <div class="coord-person">
                        <div class="coord-cname">${name}</div>
                        <div class="coord-crole">${role}</div>
                    </div>
                `;
            })
            .join('');
    }

    function renderContactSection(data) {
        const locationBody = document.getElementById('contactLocationBody');
        const studentsBody = document.getElementById('contactStudentCoordinatorsBody');
        const emailWebBody = document.getElementById('contactEmailWebBody');

        if (locationBody) {
            const lines = Array.isArray(data.contact.locationLines) ? data.contact.locationLines : [];
            locationBody.innerHTML = lines.map(line => esc(line)).join('<br>');
        }

        if (studentsBody) {
            const coordinators = Array.isArray(data.studentCoordinators) ? data.studentCoordinators : [];
            studentsBody.innerHTML = coordinators
                .filter(item => item && item.name)
                .map(item => {
                    const name = esc(item.name);
                    const rawPhone = String(item.phone || '').trim();
                    const phone = esc(rawPhone);
                    const tel = rawPhone.replace(/[^\d+]/g, '');
                    return `
                        <div class="contact-student-item">
                            <span class="contact-student-name">${name}</span>
                            ${phone ? `<a class="contact-student-phone" href="tel:${esc(tel)}">${phone}</a>` : ''}
                        </div>
                    `;
                })
                .join('');
        }

        if (emailWebBody) {
            const emailLabel = esc(data.contact.emailLabel || 'browse@sit.ac.in');
            const emailHref = esc(data.contact.emailHref || 'mailto:browse@sit.ac.in');
            const websiteLabel = esc(data.contact.websiteLabel || 'browse.sit.ac.in');
            const websiteHref = esc(data.contact.websiteHref || 'http://browse.sit.ac.in');
            emailWebBody.innerHTML = `
                <a href="${emailHref}">${emailLabel}</a><br>
                <a href="${websiteHref}" target="_blank" rel="noopener noreferrer">${websiteLabel}</a>
            `;
        }
    }

    function renderAll(data) {
        renderPeople('corePatrons', data.patrons, 'Patron');
        renderPeople('coreLeads', data.leadership, 'Lead');
        renderPeople('coreStudentCoordinators', data.studentCoordinators, defaultRole);
        renderContactSection(data);
    }

    // Expose for quick runtime updates from console/other scripts.
    window.CORE_TEAM_DATA = coreTeamData;
    window.renderCoreTeamData = function renderCoreTeamData() {
        renderAll(window.CORE_TEAM_DATA);
    };

    window.updateCoreStudentCoordinators = function updateCoreStudentCoordinators(list) {
        if (!Array.isArray(list)) {
            console.warn('updateCoreStudentCoordinators expects an array of { name, role, phone }.');
            return;
        }
        window.CORE_TEAM_DATA.studentCoordinators = list;
        renderAll(window.CORE_TEAM_DATA);
    };

    renderAll(coreTeamData);
})();
