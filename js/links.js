/* BROWSE 2026 — Centralized Links */

(function applyCentralizedLinks() {
    const BROWSE_LINKS = {
        registerForm: 'https://forms.gle/AJjoC4Zme3sCG2JHA',
        brochure: 'https://drive.google.com/file/d/1y6k1ut-QDxwT8L7Gky0SC9iIGaXXAvJT/view?usp=sharing',
        browseWebsite: 'http://browse.sit.ac.in',
        browseEmail: 'mailto:browse@sit.ac.in',
        sitWebsite: 'http://sit.ac.in',
        deptCse: 'http://sit.ac.in/html/department.php?deptid=6',
        deptIse: 'http://www.sit.ac.in/html/department.php?deptid=11',
        deptAids: 'http://sit.ac.in/html/department.php?deptid=21',
        deptAiml: 'http://sit.ac.in/html/department.php?deptid=30'
    };

    window.BROWSE_LINKS = BROWSE_LINKS;

    document.querySelectorAll('a[data-link]').forEach((anchor) => {
        const linkKey = anchor.dataset.link;
        const url = BROWSE_LINKS[linkKey];
        if (!url) return;
        anchor.setAttribute('href', url);
    });
})();
