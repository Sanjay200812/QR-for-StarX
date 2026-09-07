export interface SocialAccount {
  label: string;
  username: string;
  url: string;
}

export interface ContactNumber {
  display: string;
  value: string;
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
}

export const starxConfig: StarXConfig = {
  brandName: "StarX Live",

  tagline: "Lost in the noise, Found in the sound",

  genreText: "Classic • Rock • Western",

  categoryLabel: "ROCK BAND",

  location: "Hyderabad, Telangana, India",

  // Official StarX Live Logo (with transparency)
  logoUrl: "/images/starx/starx-logo.png",

  // Official StarX Live Concert Stage Background
  backgroundImage: "/images/starx/starx-background.webp",

  // Official Desktop / PC View Background
  backgroundPcImage: "/images/starx/starx-pc-background.webp",

  instagram: {
    label: "Instagram",
    username: "@starxliveband",
    url: "https://www.instagram.com/starxliveband/",
  },

  facebook: {
    label: "Facebook",
    username: "StarX Live",
    url: "https://www.facebook.com/share/19CGxzsqPj/",
  },

  youtube: {
    label: "YouTube",
    username: "@starxlive",
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
};
