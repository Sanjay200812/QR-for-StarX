"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  UserPlus,
  Globe,
  Image as ImageIcon,
} from "lucide-react";
import { starxConfig } from "@/config/starx";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { TopControls } from "@/components/TopControls";
import { BrandHeader } from "@/components/BrandHeader";
import { SocialCard } from "@/components/SocialCard";
import { ContactSelectorModal, ContactModalType } from "@/components/ContactSelectorModal";
import { QRModal } from "@/components/QRModal";
import { PosterModal } from "@/components/PosterModal";
import { Toast } from "@/components/Toast";
import { Footer } from "@/components/Footer";
import { generateVCard } from "@/lib/vcard";
import {
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
  WhatsAppIcon,
} from "@/components/BrandIcons";

export default function Home() {
  const [contactModalType, setContactModalType] = useState<ContactModalType>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Computed location search link
  const locationSearchUrl =
    starxConfig.locationUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      starxConfig.location
    )}`;

  // Mailto link with prefilled subject and body
  const emailMailtoUrl = `mailto:${starxConfig.email}?subject=${encodeURIComponent(
    starxConfig.emailSubject
  )}&body=${encodeURIComponent(starxConfig.emailBody)}`;

  const handleSaveContact = () => {
    generateVCard();
    setToastMessage("Contact card downloaded!");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Card entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.55,
      },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-between px-3 sm:px-4 py-3 sm:py-6 overflow-x-hidden">
      {/* Real StarX Concert Background & Cinematic Lighting */}
      <BackgroundEffects />

      {/* Centered Mobile-First Content Frame (Max 440px-460px) */}
      <div className="relative w-full max-w-[440px] sm:max-w-[460px] flex flex-col items-center z-10">
        {/* Top Control Bar: Share & QR */}
        <TopControls
          onOpenQR={() => setIsQRModalOpen(true)}
          onShowToast={showToast}
        />

        {/* Brand Header: Official StarX Live Logo */}
        <BrandHeader />

        {/* Subtle Central Backdrop Panel */}
        <div className="w-full bg-black/25 backdrop-blur-[2px] rounded-3xl p-1.5 sm:p-2 border border-white/[0.04] mt-3 sm:mt-4 shadow-2xl shadow-black/40">
          {/* Vertical Social & Action Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col space-y-2.5 sm:space-y-3"
          >
            {/* 1. Instagram */}
            {starxConfig.instagram?.url && (
              <motion.div variants={cardItemVariants}>
                <SocialCard
                  title={`${starxConfig.instagram.platform} - ${starxConfig.instagram.displayName}`}
                  subtitle={starxConfig.instagram.username}
                  href={starxConfig.instagram.url}
                  ariaLabel="Open StarX Live on Instagram"
                  iconContainerClass="bg-gradient-to-tr from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 border-[#e1306c]/30 text-[#f77737]"
                  icon={<InstagramIcon className="w-5 h-5" />}
                />
              </motion.div>
            )}

            {/* 2. Facebook */}
            {starxConfig.facebook?.url && (
              <motion.div variants={cardItemVariants}>
                <SocialCard
                  title={`${starxConfig.facebook.platform} - ${starxConfig.facebook.displayName}`}
                  subtitle={starxConfig.facebook.username}
                  href={starxConfig.facebook.url}
                  ariaLabel="Open StarX Live Facebook page"
                  iconContainerClass="bg-[#1877F2]/15 border-[#1877F2]/30 text-[#1877F2]"
                  icon={<FacebookIcon className="w-5 h-5" />}
                />
              </motion.div>
            )}

            {/* 3. YouTube */}
            {starxConfig.youtube?.url && (
              <motion.div variants={cardItemVariants}>
                <SocialCard
                  title={`${starxConfig.youtube.platform} - ${starxConfig.youtube.displayName}`}
                  subtitle={starxConfig.youtube.username}
                  href={starxConfig.youtube.url}
                  ariaLabel="Open StarX Live YouTube channel"
                  iconContainerClass="bg-[#FF0000]/15 border-[#FF0000]/30 text-[#FF0000]"
                  icon={<YouTubeIcon className="w-5 h-5" />}
                />
              </motion.div>
            )}

            {/* 4. Official Poster */}
            <motion.div variants={cardItemVariants}>
              <SocialCard
                title="Official Poster"
                subtitle="View & Download"
                onClick={() => setIsPosterModalOpen(true)}
                ariaLabel="View and download StarX Live official poster"
                iconContainerClass="bg-accent/15 border-accent/30 text-accent"
                icon={<ImageIcon className="w-5 h-5" />}
              />
            </motion.div>

            {/* 5. WhatsApp */}
            <motion.div variants={cardItemVariants}>
              <SocialCard
                title="WhatsApp"
                subtitle={`${starxConfig.whatsapp[0]?.display || ""} / ${
                  starxConfig.whatsapp[1]?.display || ""
                }`}
                onClick={() => setContactModalType("whatsapp")}
                ariaLabel="Contact StarX Live on WhatsApp"
                iconContainerClass="bg-[#25D366]/15 border-[#25D366]/30 text-[#25D366]"
                icon={<WhatsAppIcon className="w-5 h-5" />}
              />
            </motion.div>

            {/* 5. Call Us */}
            <motion.div variants={cardItemVariants}>
              <SocialCard
                title="Call Us"
                subtitle={`${starxConfig.phones[0]?.display || ""} / ${
                  starxConfig.phones[1]?.display || ""
                }`}
                onClick={() => setContactModalType("call")}
                ariaLabel="Call StarX Live"
                iconContainerClass="bg-white/[0.08] border-white/20 text-white"
                icon={<Phone className="w-5 h-5" />}
              />
            </motion.div>

            {/* 6. Email */}
            {starxConfig.email && (
              <motion.div variants={cardItemVariants}>
                <SocialCard
                  title="Email"
                  subtitle={starxConfig.email}
                  href={emailMailtoUrl}
                  ariaLabel="Email StarX Live"
                  iconContainerClass="bg-accent/15 border-accent/30 text-accent"
                  icon={<Mail className="w-5 h-5" />}
                />
              </motion.div>
            )}

            {/* 7. Location */}
            {starxConfig.location && (
              <motion.div variants={cardItemVariants}>
                <SocialCard
                  title="Location"
                  subtitle={starxConfig.location}
                  href={locationSearchUrl}
                  ariaLabel="Open StarX Live location in Google Maps"
                  iconContainerClass="bg-rose-500/15 border-rose-500/30 text-rose-400"
                  icon={<MapPin className="w-5 h-5" />}
                />
              </motion.div>
            )}

            {/* 8. Optional Website (Conditional) */}
            {Boolean(starxConfig.websiteUrl && starxConfig.websiteUrl.trim() !== "") && (
              <motion.div variants={cardItemVariants}>
                <SocialCard
                  title="Website"
                  subtitle="Official Website"
                  href={starxConfig.websiteUrl}
                  ariaLabel="Visit StarX Live official website"
                  iconContainerClass="bg-sky-500/15 border-sky-500/30 text-sky-400"
                  icon={<Globe className="w-5 h-5" />}
                />
              </motion.div>
            )}

            {/* 9. Save Contact (.vcf) */}
            <motion.div variants={cardItemVariants}>
              <SocialCard
                title="Save Contact"
                subtitle="Add StarX Live to your contacts"
                onClick={handleSaveContact}
                ariaLabel="Download StarX Live contact vCard"
                iconContainerClass="bg-amber-500/15 border-amber-500/30 text-amber-400"
                icon={<UserPlus className="w-5 h-5" />}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Multi-number Selector Modal / Bottom Sheet (WhatsApp & Call) */}
      <ContactSelectorModal
        type={contactModalType}
        isOpen={contactModalType !== null}
        onClose={() => setContactModalType(null)}
      />

      {/* Dynamic QR Code Modal */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />

      {/* Official Poster Modal */}
      <PosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Floating Action Toast */}
      <Toast
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />
    </main>
  );
}
