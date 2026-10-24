<div align="center">

# ISNAD — Gaza Student Support Initiative

**The official website of ISNAD (إسناد), a student-support initiative in Gaza, Palestine.**

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.4-777BB4?logo=php&logoColor=white)](https://php.net)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](Dockerfile)

[**Live site**](https://isnad-vw0w.onrender.com/) · [Report an issue](https://github.com/ShahdAl-Khaldi/Isnad-Website/issues)

![ISNAD homepage](screenshot.jpg)

</div>

---

## Overview

ISNAD supports students in Gaza with study spaces, learning resources, practical training and a supportive community. This repository is the organization's public website: it presents the initiative's programs, lets visitors sponsor a student or propose a partnership, and collects contact messages.

I designed and built the project on my own, end to end: the Laravel backend and API, the React front end, the content structure and the deployment.

## Features

- **Five pages**: Home, About, Sponsor a Student, Contact and Privacy Policy, with a proper "not found" page.
- **Contact and partnership forms** that are validated on the server, saved to the database, and then emailed to the team.
- **Instant first load**: Laravel embeds all site content in the page, so React renders immediately without waiting for an API call.
- **Editable content**: all text, programs, images and lists live in plain PHP files under `resources/content/`, so updating the site doesn't require touching components.
- **Light and dark themes**, with the visitor's choice remembered.
- **Donations** through a configurable PayPal link.
- **SEO**: page titles and descriptions, Open Graph tags, `sitemap.xml`, permanent redirects for old URLs and real `404` status codes for unknown pages.

## How it works

```
Browser ──► Laravel
             ├── GET /{page}            → one HTML shell + site content (window.__ISNAD__)
             │                            React (resources/js) renders the page
             ├── GET  /api/content       → the same content as JSON
             ├── POST /api/inquiries/contact   ┐ validated (Form Requests),
             ├── POST /api/inquiries/partner   ┘ rate-limited, saved, then emailed
             └── GET  /sitemap.xml
```

### Reliable form handling

Each message is **stored in the database first**, and the visitor only sees a success message once it has really been saved. The notification email is sent afterwards; if email fails, the message is still safe and the error is logged for the site owner.

Other protections on the forms:

- Validation with dedicated **Form Request** classes, returning `422` JSON errors to the React forms.
- **Rate limiting**: 5 submissions per minute per visitor (`throttle:5,1`).
- A hidden **honeypot field** to block simple spam bots.

## Tech stack

| Layer | Technology |
|-------|------------|
| Backend | PHP 8.4, Laravel 13 |
| Front end | React 19, React Router, Motion, Lucide icons |
| Styling | Tailwind CSS 4, Manrope and IBM Plex Sans Arabic fonts |
| Build | Vite |
| Database | SQLite (any Laravel-supported database works) |
| Deployment | Docker on Render |

## Getting started

**Requirements:** PHP 8.4+, Composer, Node.js 20+ and npm.

```bash
git clone https://github.com/ShahdAl-Khaldi/Isnad-Website.git
cd Isnad-Website

# Installs dependencies, creates .env, generates the app key,
# runs migrations and builds the front end
composer run setup

# Start the development servers
composer run dev
```

Then open <http://localhost:8000>.

## Configuration

Set these in `.env` (see `.env.example`):

| Variable | Purpose |
|----------|---------|
| `ISNAD_CONTACT_EMAIL` | Public contact email shown on the site |
| `ISNAD_CONTACT_PHONE` | Public phone number |
| `ISNAD_WHATSAPP` | WhatsApp number for the contact button (digits only) |
| `ISNAD_FORMS_NOTIFY_EMAIL` | Where form submissions are emailed (leave empty to only save them) |
| `PAYPAL_DONATION_URL` | PayPal donation link |
| `ISNAD_INSTAGRAM_URL`, `ISNAD_LINKEDIN_URL`, … | Social media links |
| `MAIL_*` | Mail server settings used for notification emails |

## Editing the content

All site content is in `resources/content/`:

| File | What it controls |
|------|------------------|
| `home.php` | Homepage hero image and highlights |
| `programs.php`, `services.php` | Programs and services |
| `impact.php`, `reports.php` | Impact numbers and reports |
| `partnership.php` | Partnership options |
| `gallery.php` | Photo gallery |
| `contact.php` | Contact topics and details |

Images go in `public/images/`.

## Deployment

The project ships with a `Dockerfile` and a `render.yaml` blueprint. The container installs dependencies, builds the front end, runs migrations on start and serves the app.

To deploy on [Render](https://render.com), create a new Blueprint from this repository and set `APP_KEY` and `APP_URL` in the environment settings.

## Project structure

```
app/
├── Http/Controllers/Api/   # ContentController, InquiryController
├── Http/Requests/          # ContactRequest, PartnerInquiryRequest
├── Mail/                   # InquiryReceived notification
├── Models/                 # Inquiry, User
└── Support/                # Content loader and SiteData
resources/
├── content/                # Editable site content
├── js/                     # React app: pages, components, lib
└── views/                  # HTML shell and email template
routes/
├── web.php                 # Pages, sitemap and redirects
└── api.php                 # Content and form endpoints
```

## Author

**Shahd Al-Khaldi** — Backend developer (Laravel)

- GitHub: [@ShahdAl-Khaldi](https://github.com/ShahdAl-Khaldi)
- Email: shahedalkaldi123456@gmail.com
