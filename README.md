# BROWSE 2026 Website

Official website for BROWSE 2026, a national-level technical symposium hosted at Siddaganga Institute of Technology, Tumakuru.

## Overview

This is a static frontend project (no build step) built with HTML, CSS, and vanilla JavaScript.

The site includes:

- Hero section with countdown and CTA links
- About, schedule, branches, coordinators, and contact sections
- Event tiles with modal-based event details
- Centralized link handling through a single JavaScript file
- Responsive layout for desktop and mobile

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome (CDN)
- Google Fonts (Bruno Ace SC, Exo 2, Space Mono)

## Project Structure

```
Browse_2026/
├── index.html
├── events.html
├── README.md
├── developer.md
├── server.py
├── assets/
│   └── images/
├── css/
│   ├── styles.css
│   ├── style.css
│   ├── chatbot.css
│   ├── branch-animations.css
│   ├── events-animations.css
│   ├── robot-animation.css
│   └── cse-background.css
└── js/
	├── script.js
	├── links.js
	├── eventsData.js
	├── chatbot.js
	├── branch-animations.js
	├── events-animations.js
	├── robot-animation.js
	└── cse-background.js
```

## Quick Start

1. Clone or download the project.
2. Open `index.html` directly in a browser, or run a local server.
3. Optional local server:

```bash
python3 server.py
```

## Content Update Guide

### 1. Update links in one place

All external URLs are centralized in:

- `js/links.js`

Every anchor with `data-link="..."` in HTML gets its `href` from this map automatically. To change registration form, brochure, website, or department links, edit only `js/links.js`.

### 2. Update event modal content

All event modal content is defined in:

- `js/eventsData.js`

Each event key (`ev1`, `ev2`, etc.) contains icon, title, subtitle, rules, info chips, and coordinator details.

### 3. Keep script load order

On pages that show event modals and mapped links (like `index.html`), scripts should load in this order:

1. `js/eventsData.js`
2. `js/links.js`
3. `js/script.js`

This ensures data is available before UI binding happens.

## Maintainer Notes

- Prefer editing `js/links.js` instead of hardcoding URLs in HTML.
- Prefer editing `js/eventsData.js` instead of hardcoding modal content in HTML.
- Use `css/styles.css` as the primary stylesheet for the main landing page layout.
- After making updates, verify desktop and mobile views.

## Browser Support

Tested for modern versions of:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## License

For educational and institutional event usage.