# Developer Guide - BROWSE 2026

This document helps future developers update and maintain the BROWSE 2026 website safely.

## 1) Project Type

- Static website
- No build pipeline
- Main stack: HTML + CSS + Vanilla JavaScript

## 2) Key Files You Must Know

- `index.html`: Main landing page
- `events.html`: Events support page
- `css/styles.css`: Main style system and responsive behavior
- `js/script.js`: Main interactions (navbar, countdown, modal system, animations)
- `js/eventsData.js`: Event modal data source
- `js/links.js`: Centralized links handler

## 3) Links Handler (Important)

All external links are managed in `js/links.js`.

### How it works

- A map object named `BROWSE_LINKS` stores URLs.
- Anchors in HTML use `data-link="someKey"`.
- On load, script finds `a[data-link]` and injects the matching URL into `href`.

### Example

In HTML:

```html
<a href="#" data-link="registerForm" target="_blank">Register</a>
```

In `js/links.js`:

```js
registerForm: 'https://forms.gle/...'
```

### Rules for future updates

- Do not hardcode external URLs directly in HTML when `data-link` can be used.
- Add new URL keys only in `js/links.js`, then reference them with `data-link`.
- Keep key names descriptive and stable.

## 4) Event Data Source (Important)

All event modal content is in `js/eventsData.js` under `window.events`.

Each event uses a key like `ev1`, `ev2`, etc.

### Event object structure

```js
{
  icon: '<i class="..."></i>',
  tag: 'SHORT TAG',
  name: 'EVENT NAME',
  sub: 'Subtitle',
  color: '#hex',
  rules: ['rule 1', 'rule 2'],
  info: [
    { icon: 'fa-users', label: 'Team Size', val: '3 members' }
  ],
  student: 'Name - Number\\nName - Number',
  faculty: 'Name\\nNumber'
}
```

### Rules for future updates

- Keep event keys in sync with HTML `data-event` attributes.
- Preserve required fields used by modal rendering in `js/script.js`.
- If adding a new event card in HTML, also add a matching event object in `js/eventsData.js`.

## 5) How Modal Binding Works

In `js/script.js`:

- Click listeners are attached to elements with `data-event`.
- `openModal(eventKey)` reads data from `window.events[eventKey]`.
- Modal sections are then populated from event object fields.

If modal opens with empty content, first verify:

- `js/eventsData.js` loaded before `js/script.js`
- Correct `data-event` key in HTML
- Event object exists for that key

## 6) Script Include Order

For pages using both links and event modal data, keep this order:

1. `js/eventsData.js`
2. `js/links.js`
3. `js/script.js`

`index.html` currently follows this order near the bottom of the file.

## 7) Common Update Tasks

### Change registration form link

- Edit `registerForm` in `js/links.js`

### Change brochure link

- Edit `brochure` in `js/links.js`

### Change department URLs

- Edit `deptCse`, `deptIse`, `deptAids`, `deptAiml` in `js/links.js`

### Update event rules/coordinators

- Edit the relevant event block in `js/eventsData.js`

### Change countdown target date/time

- Edit `target` in `updateCountdown()` inside `js/script.js`

## 8) Styling Guidance

- Primary stylesheet for main page is `css/styles.css`.
- Verify mobile breakpoints after style edits (`992px`, `768px`, `480px` areas are commonly used).
- Avoid duplicating conflicting rules in multiple media blocks unless necessary.

## 9) QA Checklist Before Release

- Check all `data-link` anchors open correct URLs
- Open each event tile and validate modal content
- Verify layout on desktop and mobile widths
- Confirm no console errors in browser dev tools
- Confirm hero, about, register, and footer alignment

## 10) Recommended Workflow

1. Update content data files first (`js/links.js`, `js/eventsData.js`).
2. Update HTML only for structure/UI changes.
3. Adjust CSS last for visual polish.
4. Re-test all sections after each change set.
