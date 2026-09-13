export interface SocialAccount {
  platform: string;
  displayName: string;
  username: string;
  url: string;
}

export interface ContactNumber {
  display: string;
  value: string;
}

export interface PosterConfig {
  image: string;
  filename: string;
}

export interface StarXConfig {
  brandName: string;
  tagline: string;
  genreText: string;
  categoryLabel: string;
  location: string;
  instagram: SocialAccount;
  facebook: SocialAccount;
  youtube: SocialAccount;
  whatsapp: ContactNumber[];
  phones: ContactNumber[];
  email: string;
  websiteUrl: string;
  locationUrl: string;
  logoUrl: string;
  backgroundImage: string;
  backgroundPcImage?: string;
  whatsappMessage: string;
  emailSubject: string;
  emailBody: string;
  poster: PosterConfig;
}

export const starxConfig: StarXConfig = {
  brandName: "StarX Live",

  tagline: "Music heals.",

  genreText: "Rock • Classic • Western • Live",

  categoryLabel: "ROCK BAND",

  location: "Hyderabad, Telangana, India",

  // Official StarX Live Logo (with transparency)
  logoUrl: "/images/starx/logo-no-bg.png",

  // Official StarX Live Concert Stage Background
  backgroundImage: "/images/starx/starx-background.webp",

  // Official Desktop / PC View Background
  backgroundPcImage: "/images/starx/starx-pc-background.webp",

  instagram: {
    platform: "Instagram",
    displayName: "StarX Live Band",
    username: "@starxliveband",
    url: "https://www.instagram.com/starxliveband/",
  },

  facebook: {
    platform: "Facebook",
    displayName: "StarX LiveBand",
    username: "@starxliveband",
    url: "https://www.facebook.com/starxliveband",
  },

  youtube: {
    platform: "YouTube",
    displayName: "StarX Live Band",
    username: "@starxliveband",
    url: "https://youtube.com/@starxlive",
  },

  whatsapp: [
    {
      display: "7337253898",
      value: "917337253898",
    },
    {
      display: "9390754569",
      value: "919390754569",
    },
  ],

  phones: [
    {
      display: "7337253898",
      value: "+917337253898",
    },
    {
      display: "9390754569",
      value: "+919390754569",
    },
  ],

  email: "starxliveofficial@gmail.com",

  websiteUrl: "",

  locationUrl: "",

  whatsappMessage: "Hi StarX Live, I'd like to know more about your live performances.",

  emailSubject: "StarX Live Enquiry",

  emailBody: "Hi StarX Live,\n\nI'd like to know more about your live performances.",

  poster: {
    image: "/images/starx/starx-poster.jpg",
    filename: "StarX-Live-Poster.jpg",
  },
};
