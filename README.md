# ISNAD — إسناد · Website

**Front end: React** (Vite, React Router, Tailwind CSS 4, Motion) ·
**Back end: Laravel 13** (API, database, email).

One project, one command to run. Laravel serves the page and the API; React draws the whole interface.

---

## التشغيل على ويندوز (بالعربي)

**المتطلبات:** PHP 8.3+ و Composer و Node.js (كلها موجودة عندك عبر Herd و Node).

1. افتح مجلد المشروع (الذي فيه `artisan`)، واكتب `cmd` في شريط العنوان.
2. مرة واحدة فقط:
   ```
   composer run setup
   ```
3. شغّل الموقع:
   ```
   php artisan serve
   ```
4. افتح: **http://127.0.0.1:8000**

**أثناء تعديل ملفات React** شغّل في نافذة ثانية:
```
npm run dev
```
فتظهر تعديلاتك فورًا في المتصفح. وعندما تنتهي نفّذ `npm run build`.

**لقراءة رسائل النماذج:**
```
php artisan isnad:inquiries
php artisan isnad:inquiries --show=1
```

---

## 1. How it fits together

```
Browser ──► Laravel (routes/web.php) ──► resources/views/app.blade.php
                                          └─ embeds site content (JSON) + loads React
React (resources/js) ──► renders every page, routes with React Router
React forms ──► POST /api/inquiries/partner | /api/inquiries/contact (routes/api.php)
                 └─ Laravel validates → saves to database → emails a copy (optional)
```

| Endpoint | What it does |
|---|---|
| `GET /api/content` | All public site content as JSON (also embedded in the page) |
| `POST /api/inquiries/partner` | Partnership form → `inquiries` table (+ email) |
| `POST /api/inquiries/contact` | Contact form → `inquiries` table (+ email) |
| `GET /sitemap.xml` | Sitemap for search engines |

Forms show "received" **only after Laravel confirms the message was stored**. Validation errors
come back as 422 JSON and appear under the right fields. Spam protection: honeypot + 5 requests/minute.

---

## 2. Where to change things

### Content (no React knowledge needed)
| What | File |
|---|---|
| Impact numbers & dashboard | `resources/content/impact.php` |
| Story timeline | `resources/content/timeline.php` |
| Programs (status Past / Active / Planned) | `resources/content/programs.php` |
| Sponsorship amounts, cost breakdown | `resources/content/sponsorship.php` |
| Team members | `resources/content/team.php` + photos in `public/images/team/` |
| Partnership cards | `resources/content/partnership.php` |
| Student stories (consent required) | `resources/content/testimonials.php` |
| Gallery | `resources/content/gallery.php` + `public/images/` |
| News & updates | `resources/content/updates.php` |
| Reports (PDFs) | `resources/content/reports.php` + `public/reports/` |
| Homepage images & lists | `resources/content/home.php` |
| Navigation | `resources/content/navigation.php` |

Edit, save, refresh — Laravel sends the new content to React automatically.

### Settings
| What | File |
|---|---|
| PayPal link, email, phone, WhatsApp, social links, notification email | `.env` (see `.env.example`) |
| Defaults for the above, logo paths | `config/isnad.php` |
| Email sending (SMTP) | `.env` → `MAIL_*` |

### Design & code (React)
| What | File |
|---|---|
| **Colours, fonts, corner radius** | `resources/css/theme.css` |
| Global styles | `resources/css/app.css` |
| Pages | `resources/js/pages/*.jsx` |
| Reusable components | `resources/js/components/` (`PillButton`, `NetworkSphere`, `Donate`, `Forms`, `Timeline`, `Metric`…) |
| Routes (page addresses) | `resources/js/App.jsx` **and** the `$known` list in `routes/web.php` |
| PayPal link builder | `resources/js/lib/donation.js` |
| API client | `resources/js/lib/api.js` |

After changing anything in `resources/js` or `resources/css`, run `npm run build` (or keep `npm run dev` running).

---

## 3. Donations (PayPal)

The site never collects payment details. Every sponsor button opens PayPal in a new tab.
`PAYPAL_DONATION_URL` is set to ISNAD's existing PayPal donate link. It's a hosted-button link, so
`PAYPAL_APPEND_AMOUNT=false` and donors are told which amount to enter on PayPal.

## 4. Emails for form messages

Messages are always saved in the database. To also receive them by email, set in `.env`:

```
ISNAD_FORMS_NOTIFY_EMAIL=isnadgazaeducation@gmail.com
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=isnadgazaeducation@gmail.com
MAIL_PASSWORD=your-gmail-app-password
MAIL_FROM_ADDRESS=isnadgazaeducation@gmail.com
```
(For Gmail, create an "App password" in your Google account security settings.)

## 5. Deploying

Any PHP 8.3+ host: upload the project, point the web root to `public/`, then

```bash
composer install --no-dev --optimize-autoloader
cp .env.example .env   # set APP_ENV=production, APP_DEBUG=false, APP_URL=https://your-domain
php artisan key:generate
php artisan migrate --force
npm ci && npm run build
php artisan config:cache && php artisan route:cache
```

## 6. Content accuracy

- Monthly figures are **capacity per period** and never added together; workshop participation is separate.
- "Unique students reached" shows **In verification** until a de-duplicated total exists.
- **4 locations** and **3 moves** are derived from the story — please confirm (`resources/content/impact.php`).
- No registration status, tax-deductibility, partners, testimonials or financial figures are claimed.
- Photos used are ISNAD's own (from the previous site). Stock photos from the old site were not used.
