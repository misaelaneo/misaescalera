# Personal Portfolio Website PRD

**Product:** Personal Portfolio Website  
**Version:** 0.1  
**Primary Use:** Starting point for Claude Code to structure, scaffold, and build the portfolio  
**Format:** Scrollable, section-based personal website  

---

## 1. Product Overview

The personal portfolio website will be a scrollable, section-based experience that presents the portfolio owner’s professional identity, work history, media interests, personal background, and contact options.

The site should feel polished, modern, personal, and easy to navigate. It should not feel like a generic resume page. It should act as a living portfolio that combines professional credibility with personality and taste.

The website will include four primary content sections:

1. **Home**
2. **Work**
3. **Media Journal**
4. **About**

A persistent left-side icon navigation will allow users to jump between these sections, contact the portfolio owner, and toggle between light and dark mode.

---

## 2. Product Goals

The website should:

- Clearly communicate who the portfolio owner is.
- Present professional background in a polished resume-style format.
- Showcase career progression through a scrollable update feed.
- Provide an area for personal reviews, thoughts, books, movies, shows, podcasts, quotes, and poems.
- Give visitors a more personal understanding of the portfolio owner through the About section.
- Make it easy for visitors to contact the portfolio owner from anywhere on the site.
- Support both light and dark modes.
- Be responsive, accessible, and easy to update.

---

## 3. Target Audience

Primary users include:

- Recruiters
- Hiring managers
- Potential collaborators
- Professional contacts
- Peers in the portfolio owner’s industry
- People discovering the portfolio from LinkedIn, resume links, social platforms, or direct referrals

Secondary users include:

- Friends and personal connections
- Event organizers
- People interested in the portfolio owner’s media reviews, taste, and thinking

---

## 4. Site Structure

The site should be treated as a single-page scrollable portfolio with major vertical sections.

```text
/
├── Home section
├── Work section
├── Media Journal section
├── About section
└── Persistent navigation
```

Each major section should have a stable anchor ID for navigation.

Recommended section IDs:

```text
#home
#work
#journal
#about
#contact
```

---

## 5. Core Experience Principles

The experience should be:

- **Scrollable:** Users should be able to move vertically through the full portfolio.
- **Section-based:** Each major area should feel distinct and intentional.
- **Icon-driven:** Navigation should use icons only by default.
- **Personal but professional:** The site should show both career credibility and personality.
- **Easy to scan:** Use clear headings, cards, chips, grids, and timelines.
- **Easy to contact:** Contact actions should be available in multiple places.
- **Accessible:** Icon-only navigation and interactive controls must include accessible labels and keyboard support.
- **Theme-aware:** The site must support light and dark modes.

---

# Functional Requirements

---

## FR1: Home Section

The portfolio website shall include a **Home section** that serves as the first thing users see when they land on the site.

The Home section should introduce the portfolio owner, display a rotating set of professional titles, provide quick access to LinkedIn and contact actions, and include a scrollable feed of career updates.

---

### FR1.1 Home Hero

The Home section shall begin with a hero area.

The hero area shall include:

- Portfolio owner’s full name
- A vertical carousel of professional titles
- Professional profile logo links
- A prominent contact button or email button, styled in the site's green accent color

Suggested structure:

```text
[Full Name]
[Vertical rotating title carousel]

[LinkedIn icon] [Optional social/professional icons] [Contact CTA]
```

The user should understand who the portfolio owner is and what kind of work they do within a few seconds of landing on the site.

---

### FR1.2 Vertical Title Carousel

The hero shall include a vertical carousel that rotates through professional titles, roles, or descriptors.

Example title values:

```text
Product Designer
Frontend Developer
Creative Technologist
UX Researcher
Builder
Strategist
```

Requirements:

- Carousel should animate vertically.
- Animation should be smooth and lightweight.
- Carousel should not distract from the portfolio owner’s name.
- Titles should be easy to edit from a data file or configuration object.
- Reduced-motion settings should be respected for users who prefer less animation.

---

### FR1.3 Professional Profile Links

Below the hero text, the site shall display logo-based links to professional profiles.

Required link:

- LinkedIn

Optional links:

- GitHub
- Behance
- Dribbble
- Medium
- X / Twitter
- Instagram
- YouTube
- Personal email

Each link shall:

- Use a recognizable icon or logo.
- Open external profiles in a new tab.
- Include accessible labels.
- Include hover and focus states.

Example accessibility labels:

```text
aria-label="Visit LinkedIn profile"
aria-label="Visit GitHub profile"
```

---

### FR1.4 Contact CTA

The Home hero shall include a prominent contact button styled with the site's green accent color (see Section 10, Grove palette).

Possible labels:

```text
Contact Me
Email Me
Get in Touch
Let’s Connect
```

The contact button may:

- Open a global contact modal.
- Scroll to a contact form.
- Open a `mailto:` link.

Recommended default:

```text
Open a global contact modal.
```

The CTA should be visually distinct from the social icons.

---

### FR1.5 Career Progression Update Feed

As the user scrolls within the Home section, the site shall show a feed of updates based on the portfolio owner’s career progression and professional background.

This feed should feel like a curated professional timeline, not a full resume.

Each feed item should include:

- Date or time period
- Update title
- Short description
- Optional image, logo, icon, or visual
- Optional link to a project, company, certificate, article, or external source

Example feed item:

```text
2026 — Launched personal portfolio website
Designed and developed a scrollable portfolio experience to showcase selected work, career milestones, and personal interests.
```

Recommended ordering:

```text
Reverse chronological, newest first.
```

---

### FR1.6 Home Acceptance Criteria

FR1 is complete when:

- The site opens to the Home section.
- The Home hero displays the portfolio owner’s full name.
- A vertical carousel rotates through multiple professional titles.
- LinkedIn and selected profile icons appear below the title area.
- The LinkedIn icon links to the correct LinkedIn profile.
- A green-accented contact CTA is visible in the hero.
- The contact CTA opens a contact modal, scrolls to a contact form, or opens email.
- Scrolling reveals a career progression update feed.
- Feed items include dates, titles, and descriptions.
- The Home section works on desktop, tablet, and mobile.
- Interactive elements are keyboard accessible.

---

## FR2: Work Section

The portfolio website shall include a **Work section** that presents the portfolio owner’s professional background in a resume-style format.

The Work section should be clean, scannable, and structured around credibility: profile image, resume, LinkedIn, summary, experience, skills, education, volunteering/public events, technical stack, and contact form.

---

### FR2.1 Work Section Layout

The Work section shall follow this order:

```text
1. Profile area
2. Biography / professional summary
3. Experience
4. Skills
5. Education
6. Volunteering and public events
7. Technical stack / software
8. Contact form
```

---

### FR2.2 Profile Area

At the top of the Work section, the site shall display a profile-focused area.

This area shall include:

- A vertical portrait or profile image
- A link to view or download the resume
- A link to LinkedIn

Suggested structure:

```text
[Vertical portrait image]

[View Resume] [LinkedIn]
```

Requirements:

- Profile image should be vertically oriented.
- Resume link should open a PDF or downloadable file.
- LinkedIn link should open in a new tab.
- Links should include accessible labels and hover/focus states.

---

### FR2.3 Biography / Professional Summary

Below the profile area, the Work section shall include a biography or professional summary.

The summary should explain:

- Who the portfolio owner is professionally
- What kind of work they do
- Main strengths or focus areas
- Industries, teams, or problems they are interested in
- What makes their background unique

Recommended length:

```text
75–150 words
```

Suggested placeholder:

```text
I am a [role/title] with experience in [areas of expertise]. My work focuses on [core focus], combining [skill area] with [skill area] to create [type of outcome]. I have worked across [industries/companies/projects], with a strong interest in [professional interest or mission].
```

---

### FR2.4 Experience

The Work section shall include an Experience subsection.

Each experience item shall include:

- Company name
- Role/title
- Start date
- End date or present status
- Optional location or remote status
- Short description
- Optional bullet points for achievements
- Optional company logo
- Optional company or project link

Suggested format:

```text
Company Name
Role Title
Month Year – Month Year

Short description of role and responsibilities.

Key contributions:
- Contribution or achievement
- Contribution or achievement
- Contribution or achievement
```

Recommended display:

```text
Vertical timeline with company entries.
```

Recommended ordering:

```text
Reverse chronological, newest first.
```

---

### FR2.5 Skills

The Work section shall include a Skills subsection.

Skills shall be displayed as a chip-style grid.

Example:

```text
Product Strategy
UX Design
Frontend Development
React
Design Systems
Figma
User Research
Data Visualization
Prototyping
Content Strategy
```

Requirements:

- Skills should appear as individual chips, pills, or badges.
- The grid should wrap naturally across screen sizes.
- The style should be consistent with the rest of the site.
- Skills should be easy to edit from a data file or configuration object.

---

### FR2.6 Education

The Work section shall include an Education subsection.

Each education item shall include:

- Institution name
- Degree, certification, or program
- Field of study
- Dates attended or completion year
- Optional honors, coursework, or relevant activities

Suggested format:

```text
Institution Name
Degree or Program — Field of Study
Year – Year

Optional short note about focus, coursework, honors, or relevant activities.
```

---

### FR2.7 Volunteering and Public Events

The Work section shall include a Volunteering and Public Events subsection.

This section may include:

- Volunteer work
- Community involvement
- Speaking events
- Public events
- Workshops
- Panels
- Conferences
- Mentorship
- Guest lectures

Each item may include:

- Event, organization, or initiative name
- Role or contribution
- Date
- Short description
- Optional link
- Optional image or logo

Suggested format:

```text
Event or Organization Name
Role / Contribution
Date

Brief description of involvement and impact.
```

---

### FR2.8 Technical Stack / Software

The Work section shall include a Technical Stack or Software subsection.

This section should list tools, platforms, frameworks, software, and systems the portfolio owner uses professionally.

Suggested categories:

```text
Design
Development
Productivity
Analytics
AI
Collaboration
```

Example:

```text
Design:
Figma, FigJam, Adobe Illustrator, Photoshop

Development:
React, Next.js, JavaScript, TypeScript, HTML, CSS

Collaboration:
Notion, Slack, Jira, Linear, Google Workspace
```

Recommended display:

```text
Categorized chip or icon grid.
```

---

### FR2.9 Work Contact Form

At the bottom of the Work section, the site shall include a simple contact form.

The form shall include:

```text
Name
Email
Message
Send button
```

The form shall send an email to the portfolio owner’s personal inbox.

The email should include:

- Sender name
- Sender email
- Message content
- Optional timestamp
- Optional source section

Example email format:

```text
New portfolio contact form submission

Name: [Sender Name]
Email: [Sender Email]

Message:
[Sender Message]

Submitted from: Work section
Timestamp: [Date and Time]
```

Requirements:

- Name, email, and message are required.
- Email field must validate email format.
- Form must show success state after submission.
- Form must show error state if sending fails.
- Form must include basic spam protection.
- The sender’s email should be used as the reply-to value.
- Email service credentials must not be exposed in frontend code.

Recommended implementation:

```text
Frontend form → serverless API route → email service → personal inbox
```

Possible email services:

```text
Resend
SendGrid
Postmark
EmailJS
Netlify Forms
Vercel serverless function
Custom backend endpoint
```

---

### FR2.10 Work Acceptance Criteria

FR2 is complete when:

- The Work section exists as the second main section.
- The top area includes a vertical portrait or profile image.
- The section includes a working resume link.
- The section includes a working LinkedIn link.
- A professional summary appears below the profile area.
- Experience entries include companies, roles, and timelines.
- Experience entries are ordered reverse chronologically.
- Skills are displayed in a chip-style grid.
- Education appears below Skills.
- Volunteering and public events appear below Education.
- Technical stack/software appears below Volunteering and Public Events.
- A simple contact form appears at the bottom.
- Contact form includes name, email, message, and send button.
- Submitting the form sends an email to the portfolio owner’s inbox.
- Form success, error, and validation states are implemented.
- The section is responsive and accessible.

---

## FR3: Media Journal Section

The portfolio website shall include a **Media Journal section** where the portfolio owner can share books, movies, shows, podcasts, quotes, poems, reviews, and personal thoughts.

The section should act as a curated consumption timeline and give visitors insight into the portfolio owner’s taste, curiosity, and thinking style.

Recommended navigation label:

```text
Journal
```

Recommended section title:

```text
Media Journal
```

---

### FR3.1 Media Journal Hero

The Media Journal section shall begin with a hero area.

The hero area shall include:

- Section title
- Short description
- Favorite quote, poem excerpt, or personal reflection
- Supporting image
- Optional attribution

Suggested structure:

```text
Media Journal

A living archive of what I’m reading, watching, listening to, and thinking about.

[Featured quote, poem excerpt, or reflection]

[Supporting image]
```

The hero should feel more personal and editorial than the Work section.

---

### FR3.2 Year-Based Media Grid

Below the hero, the Media Journal shall display entries in a grid format organized by year.

Example layout:

```text
2026
[Book Card] [Movie Card] [Podcast Card] [Show Card]

2025
[Book Card] [Movie Card] [Podcast Card] [Show Card]

2024
[Book Card] [Movie Card] [Podcast Card]
```

Recommended ordering:

```text
Years newest first.
Items within each year newest first.
```

---

### FR3.3 Filter Controls

The Media Journal shall include filter controls that allow users to filter entries by media type.

Required filters:

```text
All
Books
Movies
Shows
Podcasts
```

Optional filters:

```text
Essays
Articles
Poems
Quotes
Albums
Games
Courses
Favorites
Recommended
Currently Reading
Currently Watching
Currently Listening
```

Recommended MVP filters:

```text
All
Books
Movies
Shows
Podcasts
Favorites
```

Requirements:

- Filters should be visible near the top of the grid.
- Selected filter should have a clear active state.
- Filtering should happen without navigating away from the section.
- Filters should be keyboard accessible.
- Mobile filters may use horizontal scroll chips.

---

### FR3.4 Media Cards

Each media entry shall be represented by a card.

Each card should include:

- Title
- Media type
- Year consumed, completed, or reviewed
- Cover image, poster, thumbnail, or placeholder visual
- Creator, author, director, host, or source
- Short personal note or review snippet
- Optional rating
- Optional tags
- Optional favorite/recommended badge

Example book card:

```text
Book

The Creative Act
Rick Rubin
Read in 2025

A thoughtful meditation on creativity, attention, and the discipline of noticing.
```

Example movie card:

```text
Movie

Aftersun
Charlotte Wells
Watched in 2024

Quiet, devastating, and emotionally precise. One of the strongest films I’ve seen about memory.
```

---

### FR3.5 Review / Thought Detail View

Users shall be able to view more detailed thoughts for each media item.

This may be implemented as:

```text
Expandable card
Modal
Side drawer
Individual detail page
```

Recommended MVP:

```text
Expandable card.
```

Expanded detail may include:

- Overview
- Personal thoughts
- Key takeaway
- Favorite line, scene, moment, or idea
- Recommendation status
- Tags
- External link

Suggested structure:

```text
Overview:
What is this book, movie, show, or podcast?

My thoughts:
What stood out?

Key takeaway:
What did I learn, feel, or question?

Would I recommend it?
Yes / No / Depends
```

---

### FR3.6 Media Content Types

Required content types:

```text
Book
Movie
Show
Podcast
```

Optional content types:

```text
Essay
Article
Poem
Quote
Album
Video
Course
Game
Exhibition
Event
```

Each content type should have a consistent label or icon.

---

### FR3.7 Suggested Media Data Model

Each Media Journal entry should support:

```text
id
title
type
creator
year
dateCompleted
image
summary
review
tags
rating
recommended
favorite
externalUrl
featured
```

Example:

```text
Title: The Creative Act
Type: Book
Creator: Rick Rubin
Year: 2025
Date completed: March 2025
Tags: Creativity, Art, Process
Summary: A calming and generous book about creative attention.
Rating: 4.5/5
Recommended: true
Favorite: false
Featured: false
```

---

### FR3.8 Media Journal Acceptance Criteria

FR3 is complete when:

- The portfolio includes a third section titled Media Journal or equivalent.
- The section includes a hero area with a description.
- The hero supports a quote, poem excerpt, or personal reflection.
- The hero includes a supporting image.
- Media entries are displayed in a grid.
- The grid is organized by year headers.
- Newest years appear first.
- Visitors can filter entries by media type.
- Required filters include Books, Movies, Shows, and Podcasts.
- Each card includes title, type, creator/source, year, and short note.
- Each card supports an image, poster, cover, or placeholder.
- Visitors can expand or open an item to read more detailed thoughts.
- The section works on desktop, tablet, and mobile.
- Cards and filters are keyboard accessible.

---

## FR4: About Section

The portfolio website shall include an **About section** that gives visitors a more personal understanding of the portfolio owner.

This section should be the final major content section of the scrollable portfolio. It should feel warm, human, and approachable while still matching the rest of the site.

---

### FR4.1 About Section Layout

The About section shall follow this order:

```text
1. Personal photo
2. Brief personal introduction
3. Hobbies / interests chips
4. Languages spoken
5. Favorite tech, tools, equipment, or daily-use items
6. Contact card
```

---

### FR4.2 Personal Photo

At the top of the About section, the site shall display a photo of the portfolio owner.

Requirements:

- Image should be clear and high quality.
- Image should be responsive.
- Image should visually match the rest of the site.
- Image may be a vertical portrait, rounded image card, or editorial-style image block.

Recommended default:

```text
Large vertical portrait or image card paired with intro text.
```

---

### FR4.3 Brief Personal Introduction

The About section shall include a short personal introduction.

This introduction should be less formal than the professional summary in the Work section.

It may include:

- Name
- Location or general region
- Personal interests
- Values
- Creative interests
- Background
- What the portfolio owner enjoys outside of work

Recommended length:

```text
75–150 words
```

Suggested placeholder:

```text
I’m [Name], a [role/title] based in [location]. Outside of my professional work, I’m interested in [interest], [interest], and [interest]. I enjoy exploring how technology, creativity, and culture shape the way people live and work.
```

---

### FR4.4 Hobbies / Interests

The About section shall include hobbies or interests displayed as chips, pills, or tags.

Suggested heading:

```text
Outside of Work
```

Example chips:

```text
Reading
Film
Photography
Travel
Fitness
Cooking
Music
Podcasts
Design
Coffee
Basketball
Writing
```

Requirements:

- Chips should wrap naturally across screen sizes.
- Chips should be easy to scan.
- Hobbies should add personality without overwhelming the section.
- Styling should align with the Skills chip grid from the Work section.

---

### FR4.5 Languages Spoken

The About section shall include a Languages subsection.

Each language entry may include:

- Language name
- Proficiency level
- Optional icon or note

Example:

```text
English — Fluent
Spanish — Native
French — Conversational
Portuguese — Beginner
```

Recommended display:

```text
Small chip or card format with proficiency labels.
```

---

### FR4.6 Things I Use

The About section shall include a section for favorite tech, tools, equipment, software, or daily-use items.

Recommended heading:

```text
Things I Use
```

Alternative headings:

```text
Daily Tools
Setup
My Toolkit
Favorite Gear
Daily Stack
```

Each item should be displayed as a tile or card.

Each tile may include:

- Item name
- Category
- Short description
- Optional image or icon
- Optional external link
- Optional reason why the item is useful

Example tiles:

```text
MacBook Pro
Primary work machine for design, development, and writing.

Figma
Used for interface design, prototyping, and design systems.

Notion
Used for notes, planning, writing, and organizing projects.

Sony Headphones
Daily focus tool for deep work and travel.

Kindle
Used for reading books and saving highlights.
```

Supported item categories:

```text
Hardware
Software
Apps
Desk setup
Bookshelf items
Productivity tools
Creative tools
Everyday carry items
```

Recommended responsive layout:

```text
Desktop: 3–4 tiles per row
Tablet: 2 tiles per row
Mobile: 1 tile per row
```

---

### FR4.7 About Contact Card

The About section shall end with a simple contact card.

The contact card shall include:

```text
Name
Email
Message
Send button
```

The form shall send an email to the portfolio owner’s personal inbox.

The email should include:

- Sender name
- Sender email
- Message content
- Optional timestamp
- Optional source section

Example email format:

```text
New message from portfolio About section

Name: [Sender Name]
Email: [Sender Email]

Message:
[Sender Message]

Submitted from: About section
Timestamp: [Date and Time]
```

Requirements:

- Name, email, and message are required.
- Email field must validate email format.
- Form must show success state after submission.
- Form must show error state if sending fails.
- Form must include basic spam protection.
- Sender email should be used as reply-to.
- Email service credentials must not be exposed in frontend code.

---

### FR4.8 About Acceptance Criteria

FR4 is complete when:

- The portfolio includes an About section as the final major content section.
- The About section is vertically scrollable.
- A personal photo is displayed.
- A brief personal introduction is included.
- Hobbies or interests are displayed in chip/pill format.
- Languages spoken are displayed clearly.
- Favorite tech, tools, equipment, or daily-use items are displayed as tiles/cards.
- Item tiles include at least item name and short description.
- The section ends with a simple contact card.
- Contact card includes name, email, message, and send button.
- Submitting the contact card sends an email to the portfolio owner’s inbox.
- Form success, error, and validation states are implemented.
- The section works on desktop, tablet, and mobile.
- Interactive elements are keyboard accessible.

---

## FR5: Persistent Icon-Based Navigation

The portfolio website shall include a **persistent left-aligned vertical navigation bar** that allows visitors to move between the four main sections quickly and easily.

The navigation should feel similar to an Instagram-style sidebar: minimal, icon-driven, fixed in place, and always available while the user scrolls.

---

### FR5.1 Navigation Overview

The site shall use a fixed vertical navigation rail positioned on the left side of the screen on desktop.

The navigation shall include:

```text
Home
Work
Journal
About
Contact
Light / Dark Mode Toggle
```

Icons should be visible by default. Text labels should only appear when users hover over or focus on an icon.

Suggested structure:

```text
Top / Middle:
[Home Icon]
[Work Icon]
[Journal Icon]
[About Icon]

Bottom:
[Contact Icon]
[Light/Dark Mode Toggle]
```

---

### FR5.2 Navigation Items

Required navigation items:

| Section | Icon Example | Behavior |
|---|---|---|
| Home | House icon | Scrolls to Home section |
| Work | Briefcase icon | Scrolls to Work section |
| Journal | Book, bookmark, or grid icon | Scrolls to Media Journal section |
| About | User/profile icon | Scrolls to About section |
| Contact | Mail, message, or paper plane icon | Opens contact modal or scrolls to contact form |
| Theme | Sun/moon icon | Toggles light/dark mode |

Recommended section IDs:

```text
#home
#work
#journal
#about
```

---

### FR5.3 Icon-Only Default State

The navigation shall display only icons by default.

Text labels should appear on:

- Hover
- Keyboard focus

Example interactions:

```text
[House Icon] hover/focus → Home
[Briefcase Icon] hover/focus → Work
[Book Icon] hover/focus → Journal
[User Icon] hover/focus → About
[Mail Icon] hover/focus → Contact
[Moon Icon] hover/focus → Dark Mode
```

Requirements:

- Labels must not rely on hover only.
- Labels should also appear on keyboard focus.
- All icons must have accessible labels for screen readers.

---

### FR5.4 Active Section State

The navigation shall visually indicate which section the user is currently viewing.

Examples:

```text
Home icon active while user is in Home section.
Work icon active while user is in Work section.
Journal icon active while user is in Media Journal section.
About icon active while user is in About section.
```

Possible active state treatments:

```text
Icon color change
Background highlight
Side indicator line
Filled icon state
Subtle glow
```

The active state should be clear but not distracting.

---

### FR5.5 Persistent Contact Access

The navigation shall include a persistent contact action so visitors can contact the portfolio owner from anywhere on the site.

Recommended icon options:

```text
Mail icon
Message icon
Paper plane icon
Chat bubble icon
```

The contact action may:

- Open a global contact modal.
- Scroll to the final About contact card.
- Scroll to the Work contact form.
- Open a `mailto:` link.

Recommended default:

```text
Open a global contact modal.
```

The global contact modal should include:

```text
Name
Email
Message
Send button
```

It should send a message to the portfolio owner’s personal inbox.

---

### FR5.6 Light / Dark Mode Toggle

The navigation shall include a light/dark mode toggle.

The toggle should be available at all times from the navigation rail.

Possible icons:

```text
Sun icon
Moon icon
System icon
```

Required behavior:

```text
User clicks toggle.
Site switches between light and dark mode.
Preference is saved.
Site remembers preference on return visits.
```

Recommended default behavior:

```text
Use system preference initially.
Allow manual override.
Store selected preference locally.
```

MVP behavior:

```text
Two-state toggle: light and dark.
```

Future enhancement:

```text
Three-state toggle: light, dark, system.
```

---

### FR5.7 Desktop Sidebar Layout

On desktop, the navigation rail shall be fixed to the left side of the viewport.

Suggested desktop dimensions:

```text
Width: 64–88px
Icon size: 20–28px
Minimum click target: 44px by 44px
```

The main content area must include enough left margin or padding so the navigation does not overlap page content.

Suggested layout:

```text
Left Navigation Rail

Top:
[Optional logo or initials]

Main:
[Home]
[Work]
[Journal]
[About]

Bottom:
[Contact]
[Theme Toggle]
```

---

### FR5.8 Mobile Navigation

On smaller screens, the navigation must remain usable and should not block content.

Recommended mobile behavior:

```text
Convert the left sidebar into a fixed bottom icon navigation bar.
```

Mobile example:

```text
[Home] [Work] [Journal] [About] [Contact] [Mode]
```

Requirements:

- Mobile nav should remain icon-based.
- Tap targets should be large enough for touch.
- The nav should not block important content or forms.
- Tooltips may be replaced with accessible labels and active states on mobile.

---

### FR5.9 Navigation Interaction

When a user selects a navigation icon, the site shall smoothly scroll to the selected section.

Recommended behavior:

```text
Click Home icon → scroll to Home section.
Click Work icon → scroll to Work section.
Click Journal icon → scroll to Media Journal section.
Click About icon → scroll to About section.
Click Contact icon → open contact modal.
Click Theme icon → toggle light/dark mode.
```

Scroll behavior should be smooth but not slow.

---

### FR5.10 Navigation Accessibility

The icon-only navigation must be fully accessible.

Each icon button or link shall include:

```text
Accessible label
Keyboard focus state
Tooltip on hover
Tooltip on focus
Visible active state
Sufficient color contrast
Minimum touch target size
```

Example labels:

```text
aria-label="Go to Home section"
aria-label="Go to Work section"
aria-label="Go to Media Journal section"
aria-label="Go to About section"
aria-label="Open contact form"
aria-label="Toggle dark mode"
```

The navigation should be usable with:

- Mouse
- Keyboard
- Touch
- Screen reader

---

### FR5.11 Navigation Acceptance Criteria

FR5 is complete when:

- A vertical navigation bar appears on the left side of the screen on desktop.
- The navigation remains fixed while the user scrolls.
- The navigation uses icons only by default.
- Text labels appear on hover.
- Text labels appear on keyboard focus.
- The navigation includes Home, Work, Journal, and About section links.
- The navigation includes a persistent contact action.
- The navigation includes a light/dark mode toggle.
- The active section is visually indicated.
- Clicking a section icon scrolls to the correct section.
- The contact icon opens a contact modal or scrolls to a contact form.
- The theme toggle changes the site theme.
- The selected theme preference is saved.
- The navigation works with mouse, keyboard, touch, and screen readers.
- The layout adapts appropriately on mobile.
- The navigation does not overlap or obstruct main content.

---

# Global Requirements

---

## 6. Responsive Design

The site shall work across desktop, tablet, and mobile.

Recommended breakpoints:

```text
Mobile: < 768px
Tablet: 768px – 1023px
Desktop: >= 1024px
Large desktop: >= 1440px
```

Responsive behavior:

- Desktop uses left fixed navigation rail.
- Mobile uses bottom icon navigation.
- Grids collapse from multi-column to single-column.
- Images resize without distortion.
- Contact forms remain easy to use on small screens.
- Text remains readable without horizontal scrolling.

---

## 7. Accessibility Requirements

The site shall follow basic accessibility best practices.

Requirements:

- Semantic HTML structure.
- Proper heading hierarchy.
- Alt text for meaningful images.
- Keyboard navigability.
- Visible focus states.
- Sufficient color contrast in light and dark modes.
- Accessible labels for icon-only buttons.
- Contact forms with labels and validation messages.
- Reduced-motion support for users who prefer less animation.
- No critical information available only through hover.

Target:

```text
Lighthouse Accessibility score: 90+
```

---

## 8. Performance Requirements

The site should feel fast and lightweight.

Requirements:

- Optimize images.
- Lazy-load non-critical images.
- Avoid heavy animation libraries unless necessary.
- Keep JavaScript bundle size reasonable.
- Use responsive image sizes.
- Respect reduced-motion settings.

Target:

```text
Initial load under 3 seconds on a typical connection.
Lighthouse Performance score: 90+ where practical.
```

---

## 9. SEO Requirements

The site shall include basic SEO support.

Requirements:

- Page title.
- Meta description.
- Open Graph title, description, and image.
- Semantic HTML.
- Descriptive section headings.
- Sitemap if the framework supports it.
- Robots.txt if deployed publicly.

Suggested title:

```text
[Name] — Personal Portfolio
```

Suggested meta description:

```text
Portfolio of [Name], featuring professional experience, selected work, media reviews, personal background, and contact information.
```

---

## 10. Theme Requirements

The site shall support light and dark mode, with a **minimal, glassmorphism-influenced** visual style: translucent/frosted surfaces (`backdrop-filter: blur(...)`), soft borders, subtle shadows, and generous whitespace. Glassmorphism should be used for cards, modals, and the nav rail — not applied so heavily that it hurts readability or contrast (see accessibility contrast requirements in Section 7).

Requirements:

- Default to system preference.
- Allow manual toggle.
- Store preference locally.
- Ensure all components support both themes.
- Maintain sufficient contrast in both themes.
- Theme should apply globally to all sections.

Recommended CSS approach:

```text
CSS variables for colors, surfaces, borders, and text.
```

Example tokens:

```text
--color-background
--color-surface
--color-text-primary
--color-text-secondary
--color-border
--color-accent
```

### 10.1 Grove Color Palette

Action buttons and card backgrounds (contact CTA, form submit buttons, active nav state, highlighted cards) shall use the **Grove** palette:

```text
#2A5D09 — Deep green   (darkest)
#69AB3C — Mid green
#AED36C — Light green
#E9EBED — Off-white / light gray
```

The accent color shall adapt per theme so it stays legible against its background:

```text
Light mode accent (--color-accent): #2A5D09 (deep green)
  → strong contrast against light backgrounds and #E9EBED surfaces.

Dark mode accent (--color-accent): #69AB3C or #AED36C (mid/light green)
  → lighter green pops against dark backgrounds; deep green would be too low-contrast.
```

`--color-surface` may use `#E9EBED` (or a tint of it) in light mode; dark mode should use a dark neutral (not part of Grove) with the same green accents layered on top.

This replaces the "red CTA" convention referenced elsewhere — all contact/action buttons use the theme-appropriate Grove green instead of red.

---

## 11. Contact Form Requirements

The site may include multiple contact entry points:

- Home contact CTA (green accent)
- Work section contact form
- About section contact card
- Navigation contact icon
- Optional global contact modal

All contact forms should send to the same personal inbox.

Required fields:

```text
Name
Email
Message
```

Required states:

```text
Idle
Submitting
Success
Error
Validation error
```

Required backend behavior:

- Send email to portfolio owner’s inbox.
- Include sender name, sender email, and message.
- Use sender email as reply-to.
- Do not expose private credentials in frontend code.
- Include basic spam protection.

Selected implementation:

```text
Frontend form component
EmailJS (client-side email service — free tier: 200 emails/mo)
Public key (safe to expose; not a secret)
```

Suggested environment variables:

```text
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
CONTACT_EMAIL_TO=misaelaneo@gmail.com
```

**Decision note (2026-07-08):** Chose EmailJS over Resend so the site can stay on GitHub Pages — EmailJS sends email entirely client-side via a public key (not a secret, safe to expose), so no serverless function or alternate hosting is required. GitHub Pages only serves static files and cannot run server-side code, which ruled out Resend's serverless-API-route approach for now.

**Future consideration:** EmailJS's free tier caps at 200 emails/month. If usage after launch approaches or exceeds that limit, revisit migrating to Vercel or Netlify (both support custom domains and serverless functions) and switch to Resend per the original recommended architecture (§11 "Recommended implementation" pattern: frontend form → serverless API route → email service → inbox). The custom domain (`misaescalera.com`, currently set via the GitHub Pages `CNAME` file) can be repointed at that time.

---

## 12. Analytics Requirements

The site should optionally track important user interactions.

Suggested events:

```text
section_viewed_home
section_viewed_work
section_viewed_journal
section_viewed_about
resume_clicked
linkedin_clicked
contact_opened
contact_form_submitted
contact_form_error
theme_toggled
journal_filter_used
journal_item_opened
external_link_clicked
```

Analytics should be privacy-conscious and should not block rendering.

---

## 13. Content Management Requirements

Portfolio content should be easy to update.

Recommended approach:

```text
Use local data files for MVP.
```

Suggested data files:

```text
/src/data/profile.ts
/src/data/careerUpdates.ts
/src/data/experience.ts
/src/data/skills.ts
/src/data/education.ts
/src/data/publicEvents.ts
/src/data/techStack.ts
/src/data/mediaJournal.ts
/src/data/about.ts
/src/data/thingsIUse.ts
```

Future enhancement:

```text
Move content to a CMS or markdown collection if updates become frequent.
```

---

# Suggested Technical Structure for Claude Code

---

## 14. Recommended App Structure

Recommended structure for a React, Next.js, Astro, or similar component-based build:

```text
src/
├── app/ or pages/
│   └── main page
├── components/
│   ├── navigation/
│   │   ├── NavigationRail.tsx
│   │   ├── NavIconButton.tsx
│   │   └── ThemeToggle.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   └── ContactModal.tsx
│   ├── home/
│   │   ├── HomeSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TitleCarousel.tsx
│   │   ├── SocialLinks.tsx
│   │   └── CareerFeed.tsx
│   ├── work/
│   │   ├── WorkSection.tsx
│   │   ├── ProfileCard.tsx
│   │   ├── ProfessionalSummary.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── SkillChips.tsx
│   │   ├── EducationList.tsx
│   │   ├── PublicEventsList.tsx
│   │   └── TechStackGrid.tsx
│   ├── journal/
│   │   ├── MediaJournalSection.tsx
│   │   ├── JournalHero.tsx
│   │   ├── JournalFilters.tsx
│   │   ├── YearMediaGrid.tsx
│   │   ├── MediaCard.tsx
│   │   └── MediaDetail.tsx
│   ├── about/
│   │   ├── AboutSection.tsx
│   │   ├── AboutIntro.tsx
│   │   ├── HobbyChips.tsx
│   │   ├── LanguageList.tsx
│   │   └── ThingsIUseGrid.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Chip.tsx
│       ├── Section.tsx
│       ├── Tooltip.tsx
│       └── Modal.tsx
├── data/
│   ├── profile.ts
│   ├── careerUpdates.ts
│   ├── experience.ts
│   ├── skills.ts
│   ├── education.ts
│   ├── publicEvents.ts
│   ├── techStack.ts
│   ├── mediaJournal.ts
│   ├── about.ts
│   └── thingsIUse.ts
├── hooks/
│   ├── useActiveSection.ts
│   ├── useTheme.ts
│   └── useReducedMotion.ts
├── lib/
│   ├── email.ts
│   ├── analytics.ts
│   └── validation.ts
└── styles/
    ├── globals.css
    └── tokens.css
```

---

## 15. Suggested TypeScript Content Models

### 15.1 Profile

```ts
export type Profile = {
  name: string;
  titles: string[];
  location?: string;
  email: string;
  resumeUrl: string;
  portraitUrl: string;
  linkedInUrl: string;
  socialLinks: SocialLink[];
};

export type SocialLink = {
  label: string;
  url: string;
  icon: string;
};
```

---

### 15.2 Career Update

```ts
export type CareerUpdate = {
  id: string;
  dateLabel: string;
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  linkLabel?: string;
};
```

---

### 15.3 Experience

```ts
export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  location?: string;
  description: string;
  achievements?: string[];
  logoUrl?: string;
  companyUrl?: string;
};
```

---

### 15.4 Education

```ts
export type EducationItem = {
  id: string;
  institution: string;
  credential: string;
  field?: string;
  startYear?: string;
  endYear?: string;
  description?: string;
};
```

---

### 15.5 Public Event

```ts
export type PublicEvent = {
  id: string;
  title: string;
  organization?: string;
  role: string;
  dateLabel: string;
  description: string;
  linkUrl?: string;
  imageUrl?: string;
};
```

---

### 15.6 Tech Stack Item

```ts
export type TechStackItem = {
  id: string;
  name: string;
  category: 'Design' | 'Development' | 'Productivity' | 'Analytics' | 'AI' | 'Collaboration' | 'Other';
  icon?: string;
};
```

---

### 15.7 Media Journal Entry

```ts
export type MediaType =
  | 'Book'
  | 'Movie'
  | 'Show'
  | 'Podcast'
  | 'Essay'
  | 'Article'
  | 'Poem'
  | 'Quote'
  | 'Album'
  | 'Game'
  | 'Course'
  | 'Other';

export type MediaJournalEntry = {
  id: string;
  title: string;
  type: MediaType;
  creator?: string;
  year: number;
  dateCompleted?: string;
  imageUrl?: string;
  summary: string;
  review?: string;
  keyTakeaway?: string;
  favoriteQuote?: string;
  tags?: string[];
  rating?: number;
  recommended?: boolean;
  favorite?: boolean;
  externalUrl?: string;
  featured?: boolean;
};
```

---

### 15.8 About Content

```ts
export type AboutContent = {
  intro: string;
  photoUrl: string;
  hobbies: string[];
  languages: LanguageItem[];
  thingsIUse: ThingIUse[];
};

export type LanguageItem = {
  language: string;
  proficiency: string;
};

export type ThingIUse = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string;
  externalUrl?: string;
};
```

---

# Non-Functional Requirements

---

## 16. Browser Support

The site should support modern browsers:

- Chrome
- Safari
- Firefox
- Edge
- Mobile Safari
- Chrome for Android

---

## 17. Security and Privacy

Requirements:

- Site must use HTTPS in production.
- Email API keys must be stored in environment variables.
- Contact forms must not expose private credentials.
- Spam protection should be included.
- Analytics should be privacy-conscious.
- Do not display the personal inbox address unless intentionally desired.

---

## 18. Out of Scope for MVP

The following are not required for the first build:

- User accounts
- Login/authentication
- CMS integration
- Blog publishing system
- Comments on Media Journal entries
- Newsletter signup
- Ecommerce
- Advanced animations
- Multi-language site support
- Admin dashboard

---

## 19. Recommended MVP Scope

The first version should include:

```text
Home section
Work section
Media Journal section
About section
Persistent left icon navigation
Mobile bottom navigation
Light/dark mode toggle
Global contact modal
Work contact form
About contact card
Data-driven content files
Responsive design
Accessible labels and keyboard states
Basic SEO metadata
```

---

## 20. Claude Code Build Instructions

Use this PRD to scaffold the portfolio as a component-driven, data-driven site.

Initial build priorities:

1. Create the main page with four section anchors:

```text
#home
#work
#journal
#about
```

2. Create persistent navigation:

```text
Desktop: left vertical icon rail
Mobile: bottom icon nav
```

3. Build global theme support:

```text
Light mode
Dark mode
Local storage preference
System preference fallback
```

4. Build reusable UI components:

```text
Button
Card
Chip
Tooltip
Modal
Section wrapper
Contact form
```

5. Build each section as a separate component:

```text
HomeSection
WorkSection
MediaJournalSection
AboutSection
```

6. Keep content in data files:

```text
profile.ts
careerUpdates.ts
experience.ts
skills.ts
education.ts
publicEvents.ts
techStack.ts
mediaJournal.ts
about.ts
thingsIUse.ts
```

7. Implement contact handling:

```text
Contact form component
Shared validation
Serverless email endpoint
Success and error states
```

8. Implement Media Journal filters:

```text
All
Books
Movies
Shows
Podcasts
Favorites
```

9. Implement active section detection:

```text
Highlight current section in nav while scrolling.
```

10. Test responsive behavior:

```text
Desktop left rail
Mobile bottom nav
Single-column cards on mobile
Readable spacing
No content overlap
```

---

## 21. Launch Checklist

Before launch:

- [ ] Home hero displays correct name.
- [ ] Title carousel works.
- [ ] LinkedIn link works.
- [ ] Contact CTA works (correct green shade per theme).
- [ ] Career update feed has real entries.
- [ ] Work portrait displays correctly.
- [ ] Resume link works.
- [ ] Work experience timeline is complete.
- [ ] Skills chips are accurate.
- [ ] Education section is complete.
- [ ] Volunteering/public events section is complete.
- [ ] Technical stack/software section is complete.
- [ ] Work contact form sends email correctly.
- [ ] Media Journal hero has quote/reflection and image.
- [ ] Media Journal grid is grouped by year.
- [ ] Media Journal filters work.
- [ ] Media cards expand or open details.
- [ ] About photo displays correctly.
- [ ] About intro is complete.
- [ ] Hobbies chips are complete.
- [ ] Languages are complete.
- [ ] Things I Use tiles are complete.
- [ ] About contact card sends email correctly.
- [ ] Navigation links scroll to correct sections.
- [ ] Active nav state works.
- [ ] Contact nav action works.
- [ ] Light/dark mode toggle works.
- [ ] Theme preference is saved.
- [ ] Mobile navigation works.
- [ ] All forms have validation states.
- [ ] Keyboard navigation works.
- [ ] Screen reader labels are included for icon buttons.
- [ ] Images have alt text.
- [ ] SEO title and meta description are set.
- [ ] Open Graph preview is set.
- [ ] Site is deployed with HTTPS.

---

## 22. Open Questions / Placeholders

These should be filled in during implementation:

```text
Portfolio owner full name: Misael Escalera
Primary title: Product Manager
Title carousel values: TBD (parked)
LinkedIn URL: linkedin.com/in/misaelescalera
Resume URL: TBD (parked)
Personal inbox destination: misaelaneo@gmail.com
Preferred email provider: EmailJS (client-side, keeps GitHub Pages hosting; revisit Resend + Vercel/Netlify if usage exceeds 200 emails/mo free tier — see §11 decision note)
Career update entries: TBD — content to be added to /src/data/careerUpdates.ts
Experience entries: TBD — content to be added to /src/data/experience.ts
Skills list: TBD — content to be added to /src/data/skills.ts
Education entries: TBD — content to be added to /src/data/education.ts
Volunteering/public event entries: TBD — content to be added to /src/data/publicEvents.ts
Technical stack/software list: TBD — content to be added to /src/data/techStack.ts
Media Journal entries: TBD — content to be added to /src/data/mediaJournal.ts
Favorite quote or poem excerpt: TBD (parked)
About section intro: TBD — content to be added to /src/data/about.ts
Hobbies list: TBD — content to be added to /src/data/about.ts
Languages spoken: TBD — content to be added to /src/data/about.ts
Things I Use list: TBD — content to be added to /src/data/thingsIUse.ts
Preferred visual style: Minimal with glassmorphism (translucent/frosted surfaces, soft blur, subtle borders)
Preferred color palette: Grove — #2A5D09 / #69AB3C / #AED36C / #E9EBED (see Section 10.1 for light/dark accent mapping)
```

---

## 23. Product Summary

The portfolio should tell a clear story:

```text
Home: Who I am and how my career is progressing.
Work: What I have done professionally.
Media Journal: What I consume, think about, and review.
About: Who I am personally.
Navigation: How users move, contact me, and control the experience.
```

The final product should feel like a modern personal operating system: part portfolio, part resume, part journal, and part personal profile.
