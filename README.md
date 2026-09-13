# StarX Live – Official Social & Contact Link Page

A mobile-first, high-performance digital social and contact card website for **StarX Live** (Hyderabad, India). Built to load instantly upon scanning a QR code with authentic rock-concert artwork, official band branding, multi-number contact selectors, dynamic QR generation, native sharing, and vCard contact saving.

---

## 🚀 Quick Start

### 1. Development Mode
To start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Production Build
To create an optimized production build:
```bash
npm run build
npm start
```

---

## 🖼️ Official Brand Assets

The website uses StarX Live's official brand imagery stored in `/public/images/starx/`:
- **Official Logo**: `/public/images/starx/starx-logo.png` (Transparent circular emblem with 3D red star, guitars, drums, Charminar skyline, and distressed typography)
- **Concert Stage Background (Mobile)**: `/public/images/starx/starx-background.webp` (Concert spotlights, Charminar, and live band silhouette)
- **Concert Stage Background (Desktop)**: `/public/images/starx/starx-pc-background.webp` (Widescreen cinematic composition)

---

## 🛠️ How to Customize & Maintain

All band links, contact numbers, and media paths are centralized in **one single configuration file**:

📁 `src/config/starx.ts`

### 1. How to Edit Contact Information & Social Links
Open `src/config/starx.ts` and modify the values:
```typescript
export const starxConfig = {
  brandName: "StarX Live",
  tagline: "Lost in the noise, Found in the sound",
  location: "Hyderabad, Telangana, India",

  // Official Logo & Background Paths
  logoUrl: "/images/starx/starx-logo.png",
  backgroundImage: "/images/starx/starx-background.webp",
  backgroundPcImage: "/images/starx/starx-pc-background.webp",

  // Edit Instagram
  instagram: {
    label: "Instagram",
    username: "@starxliveband",
    url: "https://www.instagram.com/starxliveband/",
  },

  // Edit Facebook (e.g. when permanent vanity URL is available)
  facebook: {
    label: "Facebook",
    username: "StarX Live",
    url: "https://www.facebook.com/share/19CGxzsqPj/",
  },

  // Edit YouTube
  youtube: {
    label: "YouTube",
    username: "@starxlive",
    url: "https://youtube.com/@starxlive",
  },

  // Edit WhatsApp & Phone Numbers
  whatsapp: [
    { display: "7337253898", value: "917337253898" },
    { display: "9390754569", value: "919390754569" },
  ],
  phones: [
    { display: "7337253898", value: "+917337253898" },
    { display: "9390754569", value: "+919390754569" },
  ],

  // Edit Email
  email: "starxliveofficial@gmail.com",
};
```

### 2. How to Add the Official Website
By default, `websiteUrl` is set to `""` (the Website card remains hidden).
Once the domain is ready, simply add it:
```typescript
websiteUrl: "https://starxlive.com",
```
The "Website" card will automatically appear in the list.

---

## ⚡ Features & Architecture

- **Official StarX Live Assets**: Transparent circular hero crest logo and concert stage backgrounds.
- **Layered Readability**: Smooth darkening gradient and soft vignette ensures social buttons remain 100% readable over stage graphics.
- **Instant QR Scan Access**: Zero external database dependencies or slow tracking blocking initial render.
- **Interactive Multi-Number Selectors**:
  - **WhatsApp**: Tap to choose between Number 1 (7337253898) or Number 2 (9390754569) to start a clean, direct WhatsApp chat.
  - **Call Us**: Tap to choose direct dialer action for either number.
- **Dynamic In-App QR Modal**: Generates a high-contrast QR code pointing to the live URL of wherever the site is deployed (`window.location.href`).
- **Native Web Share**: Uses Web Share API on mobile devices and provides seamless clipboard copy with toast feedback on desktop.
- **vCard (.vcf) Generator**: Downloads `StarX-Live.vcf` on demand to add all StarX Live contacts, emails, and social profiles directly to phone address books.
- **Mobile-First & iPhone Safe Areas**: Optimized touch targets (48px+), responsive safe area insets (`env(safe-area-inset-bottom)`), and centered desktop presentation.

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Next.js is automatically detected; click **"Deploy"**.
5. Your StarX Live link page will be live instantly with global CDN performance!
