# Abdiwakil & Associates Advocates: Website

Website for a law firm in Upperhill, Nairobi. Plain HTML, CSS and JavaScript with no build step, deployed on Netlify.

Live site: https://wakiliwebsite.netlify.app/

## Features

- Responsive layout with a mobile menu
- Practice areas, firm profile, how-we-work steps and FAQ
- Enquiry form (Formspree) with inline success and error messages, consent checkbox and spam honeypot
- Tap-to-call, email and WhatsApp links with a pre-filled message, plus an embedded Google Map
- SEO basics: meta description, Open Graph tags, `LegalService` structured data, sitemap and robots.txt
- Accessibility: skip link, keyboard-friendly menu, visible focus states, reduced-motion support
- Privacy Policy and Terms & Disclaimer pages, and a custom 404 page
- Security headers and caching rules in `netlify.toml`

## Project structure

```
index.html        Main page
privacy.html      Privacy policy (draft for the firm to review)
terms.html        Terms and disclaimer (draft for the firm to review)
404.html          Not-found page
css/style.css     All styles
js/main.js        Mobile menu and form handling
images/           hero-lawyer.png, about-lawyer.jpg, office-consultation.jpg
favicon.svg  robots.txt  sitemap.xml  netlify.toml
```

## Before going live: checklist

- [ ] Put the photos in `images/` (`hero-lawyer.png`, `about-lawyer.jpg`). Compress them or convert to WebP, keeping each under about 200 KB.
- [ ] Add the advocate's year of admission, education and LSK details in the About section (see the TODO comment in `index.html`).
- [ ] Replace the Gmail address with a firm-domain email once a domain is set up.
- [ ] Connect a custom domain in Netlify, then update the URLs in `index.html`, `sitemap.xml`, `robots.txt` and the `canonical` tags.
- [ ] Have the advocate review `privacy.html` and `terms.html`.
- [ ] Add testimonials only if they are real, permitted by the client and compliant with Law Society of Kenya advertising rules.
- [ ] Test the enquiry form end to end and check the Formspree inbox.
- [ ] Claim a Google Business Profile for the firm's Upperhill address.

## Notes

- The Content-Security-Policy in `netlify.toml` only allows Google Fonts, Google Maps and Formspree. If you add another third-party service (analytics, a chat widget), add it to the policy.
- No JavaScript framework or build tools are needed. Open `index.html` in a browser, or deploy the folder as is.
