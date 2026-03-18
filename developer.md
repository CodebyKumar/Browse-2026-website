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
- `js/core-team.js`: Core Team + Contact content data source

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
3. `js/core-team.js`
4. `js/script.js`

`index.html` currently follows this order near the bottom of the file.

## 7) Core Team + Contact Data Source (Important)

Core Team leadership and Get in Touch content are now JS-driven via `js/core-team.js`.

### How it works

- `coreTeamData` stores:
  - `patrons`
  - `leadership`
  - `studentCoordinators` (name, role, phone)
  - `contact` (location lines, email/web labels and links)
- `core-team.js` renders into these HTML target IDs:
  - `corePatrons`
  - `coreLeads`
  - `coreStudentCoordinators`
  - `contactLocationBody`
  - `contactStudentCoordinatorsBody`
  - `contactEmailWebBody`

### Rules for future updates

- Do not hardcode patrons, leadership, or coordinator rows in `index.html`.
- Do not hardcode Get in Touch location/coordinator/email-web body text in `index.html`.
- Edit only the `coreTeamData` object in `js/core-team.js` for these content changes.
- Keep target IDs in `index.html` unchanged unless you also update renderer IDs in `js/core-team.js`.

### Runtime helper APIs

- `window.CORE_TEAM_DATA`: data object exposed for quick inspection/update.
- `window.renderCoreTeamData()`: re-renders all Core Team + Contact blocks.
- `window.updateCoreStudentCoordinators(list)`: updates only student coordinators and re-renders.

## 8) Common Update Tasks

### Change registration form link

- Edit `registerForm` in `js/links.js`

### Change brochure link

- Edit `brochure` in `js/links.js`

### Change department URLs

- Edit `deptCse`, `deptIse`, `deptAids`, `deptAiml` in `js/links.js`

### Update event rules/coordinators

- Edit the relevant event block in `js/eventsData.js`

### Update patrons / president / vice-president

- Edit `coreTeamData.patrons` and `coreTeamData.leadership` in `js/core-team.js`

### Update student coordinators in Core Team + Contact

- Edit `coreTeamData.studentCoordinators` in `js/core-team.js`
- `phone` values are automatically shown in Get in Touch under STUDENT COORDINATORS

### Update contact location / email / website text

- Edit `coreTeamData.contact` in `js/core-team.js`

### Change countdown target date/time

- Edit `target` in `updateCountdown()` inside `js/script.js`

## 9) Styling Guidance

- Primary stylesheet for main page is `css/styles.css`.
- Verify mobile breakpoints after style edits (`992px`, `768px`, `480px` areas are commonly used).
- Avoid duplicating conflicting rules in multiple media blocks unless necessary.

### Hero text block controls (current)

The following hero lines are controlled by these selectors in `css/styles.css`:

- `NATIONAL LEVEL TECHNICAL SYMPOSIUM` -> `.hero-tagline`
- `ORGANISED BY` -> `.hero-organizers-label`
- `CSE, ISE, AI&DS AND CSE(AI&ML)` -> `.hero-organizers-highlight`
- `07 APRIL 2026 · SIT, TUMAKURU` -> `.hero-date`

Markup source is in `index.html` under `#home`:

- `.hero-tagline`
- `.hero-organizers`
- `.hero-organizers-label`
- `.hero-organizers-highlight`
- `.hero-date`

Important: there is a late-file override block near the end of `css/styles.css` (`Final visual alignment: hero date + about stats cards`) that can override earlier `.hero-date` styles. Always check final cascade outcome after editing hero date color/size.

### Mobile navbar institute title

`Siddaganga Institute of Technology` in the navbar uses `.brand-title`.
Mobile sizes are set at:

- `@media (max-width: 768px)`
- `@media (max-width: 480px)`

If mobile font size changes seem ignored, search for later `.brand-title` rules in the file and adjust the last effective one.

### Contact number rendering behavior (current)

- Core contact section numbers are rendered in `js/core-team.js` from `coreTeamData.studentCoordinators[].phone`.
- Event modal coordinator numbers are rendered in `js/script.js` (`renderCoordinatorList`).
- In both places, numbers are displayed as provided in data text and turned into clickable `tel:` links by stripping non-numeric separators.
- CSS styling for clickable numbers is shared through `.contact-student-phone` in `css/styles.css`.

## 10) QA Checklist Before Release

- Check all `data-link` anchors open correct URLs
- Open each event tile and validate modal content
- Validate Core Team renders patrons, leadership, and student coordinators from JS data
- Validate Get in Touch values render from `js/core-team.js` (location, coordinators, email/web)
- Verify layout on desktop and mobile widths
- Confirm no console errors in browser dev tools
- Confirm hero, about, register, and footer alignment

## 11) Recommended Workflow

1. Update content data files first (`js/links.js`, `js/eventsData.js`, `js/core-team.js`).
2. Update HTML only for structure/UI changes.
3. Adjust CSS last for visual polish.
4. Re-test all sections after each change set.
