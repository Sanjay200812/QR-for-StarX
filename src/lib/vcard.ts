import { starxConfig } from "@/config/starx";

export function generateVCard(): void {
  const vcardLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${starxConfig.brandName}`,
    `N:Live;StarX;;;`,
    `ORG:${starxConfig.brandName}`,
    `TITLE:${starxConfig.categoryLabel}`,
    `NOTE:${starxConfig.tagline} ${starxConfig.genreText}`,
  ];

  // Add Phones
  if (starxConfig.phones[0]) {
    vcardLines.push(`TEL;TYPE=CELL,VOICE,PREF:${starxConfig.phones[0].value}`);
  }
  if (starxConfig.phones[1]) {
    vcardLines.push(`TEL;TYPE=CELL,VOICE:${starxConfig.phones[1].value}`);
  }

  // Add Email
  if (starxConfig.email) {
    vcardLines.push(`EMAIL;TYPE=INTERNET,PREF:${starxConfig.email}`);
  }

  // Add Location
  vcardLines.push(`ADR;TYPE=WORK:;;Hyderabad;Telangana;;India`);

  // Add Social Profiles & Website
  if (starxConfig.instagram?.url) {
    vcardLines.push(`X-SOCIALPROFILE;type=instagram:${starxConfig.instagram.url}`);
  }
  if (starxConfig.youtube?.url) {
    vcardLines.push(`X-SOCIALPROFILE;type=youtube:${starxConfig.youtube.url}`);
  }
  if (starxConfig.facebook?.url) {
    vcardLines.push(`X-SOCIALPROFILE;type=facebook:${starxConfig.facebook.url}`);
  }

  if (starxConfig.websiteUrl) {
    vcardLines.push(`URL:${starxConfig.websiteUrl}`);
  } else if (starxConfig.instagram?.url) {
    vcardLines.push(`URL:${starxConfig.instagram.url}`);
  }

  vcardLines.push("END:VCARD");

  const vcardContent = vcardLines.join("\r\n");
  const blob = new Blob([vcardContent], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "StarX-Live.vcf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
