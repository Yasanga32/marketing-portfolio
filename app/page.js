"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { portfolioItems, categories, contentTypes } from "../data/portfolio";

export default function Home() {
  // Navigation tabs: 'about', 'services', 'samples', 'pricing'
  const [activeTab, setActiveTab] = useState("samples");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  // Portfolio filters
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("posts"); // default show posts

  // Selected item for lightbox (posts, reels, video_ads)
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Brand-specific premium template showcase gallery states
  const [brandGalleryItem, setBrandGalleryItem] = useState(null);
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);

  const getBrandTemplates = (category) => {
    switch (category) {
      case "cake":
        return [
          { title: "Sweet Creations Signature", tagline: "Artisanal 3-Tier Custom Cakes", desc: "Crafting beautiful edible art for weddings and milestones.", accent: "🎂 CUSTOM CAKES", metric: "+45% Bookings", layout: "editorial", colors: ["#FFF9F9", "#FFF0F0", "#FFB6C1"] },
          { title: "Satisfying Drip", tagline: "Caramel Drizzle Macro", desc: "Watch our slow-motion drip technique on warm chocolate fudge.", accent: "🤤 SATISFYING", metric: "120k+ Views", layout: "macro", colors: ["#FFFDF6", "#FAF0D7", "#C68B59"] },
          { title: "Organic & Healthy", tagline: "Gluten-Free & Vegan Delights", desc: "Made with premium oat flour, coconut sugar, and fresh raspberries.", accent: "🌱 ALLERGY FRIENDLY", metric: "Zero Guilt", layout: "modern", colors: ["#F7FCF7", "#EAF7EB", "#A3E635"] },
          { title: "Chef's Recommendation", tagline: "Raspberry Vanilla Velvet", desc: "Our award-winning sponge with custom vanilla bean buttercream frosting.", accent: "🏆 AWARD WINNER", metric: "+60% CTR", layout: "spotlight", colors: ["#FFF5F5", "#FFE3E3", "#E11D48"] },
          { title: "Pre-order Now", tagline: "Reserve Your Dessert Box", desc: "Limited weekly slots for gourmet macaron and eclair packages.", accent: "📅 LIMITED PRE-ORDER", metric: "Booked in 4 hours", layout: "cta", colors: ["#FFFDF5", "#FEF3C7", "#D97706"] },
          { title: "Client Highlight", tagline: "An Unforgettable Wedding", desc: "\"The floral cake was the highlight of our reception! Unbelievably moist!\"", accent: "⭐ 5-STAR REVIEW", metric: "Loved by Guests", layout: "testimonial", colors: ["#FCFDFD", "#F0FDFA", "#0D9488"] },
          { title: "Sponge Masterclass", tagline: "Behind the Frosting", desc: "Curating textures and layers. A sneak peek into Jordan's baking lab.", accent: "🎬 IN THE LAB", metric: "+85% Shares", layout: "manifesto", colors: ["#FAF5FF", "#F3E8FF", "#8B5CF6"] },
          { title: "Artisanal Frosting Tips", tagline: "Symmetrical Piping Guides", desc: "Top 3 tips for creating crisp rose petals with piping tips.", accent: "💡 BAKING SECRETS", metric: "12k Saves", layout: "list", colors: ["#F9FAFB", "#F3F4F6", "#374151"] },
          { title: "Gourmet Macarons", tagline: "French Delicacy Assortment", desc: "Indulgent ganache filling made with premium organic chocolate.", accent: "✨ LUXURY TREATS", metric: "+50% Impulse Orders", layout: "split", colors: ["#FFF5FA", "#FDF2F8", "#DB2777"] },
          { title: "Our Core Promise", tagline: "Sweetness Tailored For You", desc: "Every recipe is calibrated for taste balance. Never excessively sweet.", accent: "❤️ OUR PROMISE", metric: "100% Satisfaction", layout: "manifesto", colors: ["#FFFDF6", "#FEF3C7", "#B45309"] }
        ];
      case "salon":
        return [
          { title: "Aura Luxury Balayage", tagline: "Elevated Hair Artistry", desc: "Flawless hand-painted highlights customized for booking luxury treatments.", accent: "💇‍♀️ SIGNATURE STYLE", metric: "+60% Booking Rate", layout: "editorial", colors: ["#FCFBF9", "#F7F5F0", "#C5A880"] },
          { title: "Before / After Shine", tagline: "The Glamour Transformation", desc: "Instant cellular shine boost with our signature hydrating argan treatment.", accent: "✨ BEFORE / AFTER", metric: "210k+ Views", layout: "macro", colors: ["#FAF6F0", "#F5ECE1", "#D97706"] },
          { title: "Bridal VIP Package", tagline: "Pre-Wedding Trial & Makeup", desc: "Includes on-site premium airbrushing, styling, and complimentary champagne.", accent: "💍 BRIDAL SPECIAL", metric: "4.8/5 Rated", layout: "spotlight", colors: ["#FFF9F9", "#FFF0F0", "#E11D48"] },
          { title: "Master Stylist Sarah", tagline: "8+ Years of Color Expertise", desc: "Specializes in cool-blonde color corrections and geometric custom cuts.", accent: "⭐ MASTER STYLIST", metric: "Fully Booked", layout: "spotlight", colors: ["#FBFBFB", "#F5F5F5", "#1F2937"] },
          { title: "Luxury Spa Massage", tagline: "Argan Oil Head Spa", desc: "Relieve stress with our deep scalp steam, custom mask, and manual massage.", accent: "💆‍♀️ PURE RELAXATION", metric: "100% Restorative", layout: "modern", colors: ["#F0FDF4", "#DCFCE7", "#16A34A"] },
          { title: "Happy Client Story", tagline: "\"Absolutely perfect balayage! Sarah is a true hair magician!\"", accent: "💬 CLIENT REVIEW", metric: "99% Retention", layout: "testimonial", colors: ["#F9FAFB", "#F3F4F6", "#4B5563"] },
          { title: "Hair Care Tip #1", tagline: "Maintaining Cool Blonde", desc: "Use purple shampoo once a week and rinse with cold water to lock moisture.", accent: "💡 PROFESSIONAL TIP", metric: "15k Saves", layout: "list", colors: ["#EEF2FF", "#E0E7FF", "#4F46E5"] },
          { title: "Book Thursday Spot", tagline: "Weekend Slots Open", desc: "Reserve your stylist. Enjoy complimentary tea and custom scalp diagnostic.", accent: "📅 ONLINE CMS", metric: "Fast Checkouts", layout: "cta", colors: ["#FFF9F9", "#FFF0F0", "#8B0A0A"] },
          { title: "Stylist Manifesto", tagline: "Your Hair Is Your Crown", desc: "We design tailored frames for your face, tailored for effortless daily wear.", accent: "👑 OUR PHILOSOPHY", metric: "Modern Editorial", layout: "manifesto", colors: ["#FCFBF9", "#F7F5F0", "#C5A880"] },
          { title: "Hydra-Facial Glow", tagline: "Instant Deep Vacuum Cleansing", desc: "3-step extraction and peptide infusion for immediate event-ready skin.", accent: "🌟 FRESH GLOW", metric: "+40% Conversion", layout: "split", colors: ["#F0FDFA", "#CCFBF1", "#0D9488"] }
        ];
      case "light":
        return [
          { title: "Lumia Halo Pendant", tagline: "Architectural Ambiance", desc: "Suspended brass pendant casts a deep warm glow for curated dining rooms.", accent: "💡 MODERN LUXURY", metric: "3x Contractor Leads", layout: "editorial", colors: ["#111827", "#030712", "#D97706"] },
          { title: "Smart Dimming Sync", tagline: "Lutron & Hue Integration", desc: "Transition from bright task lighting to relaxing warm gold in one tap.", accent: "📱 SMART LIGHTING", metric: "+55% Sales Value", layout: "modern", colors: ["#0F172A", "#020617", "#3B82F6"] },
          { title: "Pendant Cluster Spacing", tagline: "The Dining Room Guide", desc: "Hang 30-36 inches above the table. Space fixtures 24 inches apart.", accent: "📐 DESIGN SYSTEM", metric: "12k Saves", layout: "list", colors: ["#1F2937", "#111827", "#9CA3AF"] },
          { title: "Commercial Grade B2B", tagline: "Dialux File Support", desc: "Complete architectural specifications and localized engineering files.", accent: "🏢 ARCHITECTURAL B2B", metric: "Trusted by Pros", layout: "spotlight", colors: ["#0F172A", "#020617", "#0D9488"] },
          { title: "Satisfying ASMR Click", tagline: "Tactile Brass Dimmer Switch", desc: "Solid machined metal buttons designed for responsive, tactile luxury.", accent: "🎬 UNWRAPPING", metric: "75k+ Views", layout: "macro", colors: ["#1F2937", "#111827", "#D97706"] },
          { title: "Designer's Review", tagline: "\"Lumia fixtures transformed our office lobby. Absolute masterpiece!\"", accent: "⭐ 5-STAR REVIEW", metric: "98% Positive", layout: "testimonial", colors: ["#1F2937", "#111827", "#F9FAFB"] },
          { title: "Copper Accent Sconce", tagline: "Geometric Wall Sculpture", desc: "Hand-brushed finish that patinates beautifully. Warm double-beam projection.", accent: "✨ HAND-CRAFTED", metric: "Limited Release", layout: "split", colors: ["#1E1B4B", "#0F0E36", "#EC4899"] },
          { title: "Instant Quote Calculator", tagline: "Measure Your Lumens", desc: "Input room length and height to get complete driver/lumens checklist.", accent: "📅 ONLINE APP", metric: "3x Faster Sales", layout: "cta", colors: ["#022C22", "#064E3B", "#10B981"] },
          { title: "Lumia Brand Creed", tagline: "Sculpting Shadow & Space", desc: "We believe a fixture should be as striking off as it is warm on.", accent: "👑 BRAND MANIFESTO", metric: "Sophisticated", layout: "manifesto", colors: ["#111827", "#030712", "#D97706"] },
          { title: "Pendant Brass Detail", tagline: "Polished Core Structure", desc: "Close-up macro of organic grain lines and durable custom mounts.", accent: "🔍 MACRO DETAIL", metric: "+45% Engagement", layout: "macro", colors: ["#111827", "#030712", "#D97706"] }
        ];
      case "clothing":
        return [
          { title: "Urban Thread Hoodie", tagline: "Loopback Heavyweight Streetwear", desc: "Boxy fit, dense organic weave. Designed for high aesthetic comfort.", accent: "👕 STREETWEAR", metric: "+85% CTR Boost", layout: "editorial", colors: ["#F9FAFB", "#F3F4F6", "#4B5563"] },
          { title: "Sand Organic Canvas Chinos", tagline: "Minimalist Earth Tones", desc: "Toughened weave with relaxed taper. Crafted from GOTS-certified crop cotton.", accent: "🌱 ECO-FRIENDLY", metric: "100% Sustainable", layout: "modern", colors: ["#FAF7F2", "#EFEAE0", "#854D0E"] },
          { title: "Street Styling Reel Look", tagline: "Combining Summer Basics", desc: "Combine our linen shirt with cream shorts and high-top sneakers.", accent: "👔 STYLIST MATRIX", metric: "340k+ Views", layout: "split", colors: ["#F3F4F6", "#E5E7EB", "#1F2937"] },
          { title: "Linen Trend Spotlight", tagline: "Effortless Summer Drapes", desc: "Ultra-breathable linen blends designed for hot metropolitan climates.", accent: "✨ SEASON SELECT", metric: "Best Seller", layout: "spotlight", colors: ["#FFFDFA", "#FAF5EE", "#B45309"] },
          { title: "Customer Review", tagline: "\"Incredibly soft texture. Best box-cut hoodie I own hands down!\"", accent: "⭐ VERIFIED BUY", metric: "+28% Order Value", layout: "testimonial", colors: ["#F9FAFB", "#F3F4F6", "#111827"] },
          { title: "Our Circular Pledge", tagline: "Recycled Ocean Polyester", desc: "100% paperless receipts, soy ink printings, and carbon-neutral freight shipping.", accent: "❤️ RECYCLABLE", metric: "Zero Plastic", layout: "manifesto", colors: ["#ECFDF5", "#D1FAE5", "#059669"] },
          { title: "Size Selection Guide", tagline: "Tailored vs Oversized Tapers", desc: "Detailed breakdown of chest drops and shoulder seams across standard sizes.", accent: "📏 SIZE CONCIERGE", metric: "98% Fit Accuracy", layout: "list", colors: ["#F9FAFB", "#F3F4F6", "#6B7280"] },
          { title: "Order Summer Pack", tagline: "Free Shipping on Outfits", desc: "Get 3 basics and a hat. Bundle discount automatically applied at checkout.", accent: "📅 HEADLESS SHOPIFY", metric: "Ships Instantly", layout: "cta", colors: ["#FFF9F9", "#FFF0F0", "#8B0A0A"] },
          { title: "Textured Knit Close-Up", tagline: "Waffle Stitch Macro Structure", desc: "Premium organic knit weave showing rich dual-tone yarns.", accent: "🔍 TEXTURE MACRO", metric: "+65% Conversions", layout: "macro", colors: ["#F9FAFB", "#F3F4F6", "#374151"] },
          { title: "Urban Living Concept", tagline: "Slow City Aesthetics", desc: "Relaxed shapes tailored for flexible home offices and street walks.", accent: "👑 CONCEPT CORE", metric: "Lighthouse 98/100", layout: "manifesto", colors: ["#FAF7F2", "#EFEAE0", "#4B5563"] }
        ];
      case "fitness":
        return [
          { title: "FitLife Core Values", tagline: "Unlock Your Ultimate Strength", desc: "Premium gym facilities and certified trainers helping you build sustainable lifestyle habits.", accent: "🏋️‍♂️ SHRED SEASON", metric: "+75% Signups", layout: "editorial", colors: ["#FFF5F5", "#FFEBEB", "#DC2626"] },
          { title: "12-Week Transformation", tagline: "Before / After Results", desc: "Real progress from dedicated members. Guided routines, macro coaching, and pure dedication.", accent: "🔥 TRANSFORMATION", metric: "280k+ Views", layout: "macro", colors: ["#FEF3C7", "#FFFBEB", "#D97706"] },
          { title: "Macro Nutrition Plan", tagline: "Calculate Your Protein Intake", desc: "Get high-protein, calorie-calibrated recipes tailored to fuel your muscle recovery.", accent: "🌱 MEAL PREP", metric: "15k Saves", layout: "list", colors: ["#ECFDF5", "#D1FAE5", "#059669"] },
          { title: "Certified Trainer Consultation", tagline: "1-on-1 Personal Training", desc: "Our specialists create optimized gym plans based on your body composition diagnostics.", accent: "⭐ EXPERT TRAINERS", metric: "Fully Booked", layout: "spotlight", colors: ["#F8FAFC", "#F1F5F9", "#0F172A"] },
          { title: "High Intensity Spin Class", tagline: "Cardio Vibe Revolution", desc: "Immersive beat-sync lighting, upbeat coaches, and high-energy calorie burning classes.", accent: "🚴‍♀️ SPIN STUDIO", metric: "100% Energetic", layout: "modern", colors: ["#FAF5FF", "#F3E8FF", "#7C3AED"] },
          { title: "Client Success Story", tagline: "\"Lost 12kg and doubled my deadlift strength! Best trainers ever!\"", accent: "💬 MEMBER STORY", metric: "98% Success", layout: "testimonial", colors: ["#FCFDFD", "#F0FDFA", "#0D9488"] },
          { title: "Gym Workout Tip #1", tagline: "Perfecting Your Squat Depth", desc: "Keep heels anchored, engage core, and break parallel safely. Tap to watch video guide.", accent: "💡 EXPERT TIP", metric: "25k Saves", layout: "list", colors: ["#EFF6FF", "#DBEAFE", "#2563EB"] },
          { title: "Grab Your Gym Pass", tagline: "Limited Summer Slots Open", desc: "First session free. Includes full access, body fat scan, and custom macro calculator.", accent: "📅 ONLINE APP", metric: "Check-in Live", layout: "cta", colors: ["#FFF5F5", "#FFEBEB", "#991B1B"] },
          { title: "Trainer Creed", tagline: "Consistency Beats Intensity", desc: "We believe in sustainable habits over short-term quick fixes. Train hard, recover smart.", accent: "👑 PHILOSOPHY", metric: "Motivational", layout: "manifesto", colors: ["#FFF8F1", "#FFEEDD", "#EA580C"] },
          { title: "Active recovery day", tagline: "Foam Rolling Guide", desc: "Reduce muscle soreness, increase mobility, and target tight hamstrings with foam rolling.", accent: "🧘‍♀️ RECOVERY", metric: "+45% Engagement", layout: "split", colors: ["#ECFDF5", "#D1FAE5", "#059669"] }
        ];
      default:
        return [];
    }
  };

  // --- INTERACTIVE WEBSITES STATE ---
  const [webCartCount, setWebCartCount] = useState(0);
  const [webSelectedSlot, setWebSelectedSlot] = useState(null);
  const [webLightsOn, setWebLightsOn] = useState(false);
  const [webClothingColor, setWebClothingColor] = useState("cream");

  // --- INTERACTIVE AI CHATBOT STATE ---
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");

  // Default suggested questions based on selected business category
  const getAISuggestedQuestions = (category) => {
    switch (category) {
      case "cake":
        return [
          "What cake flavor is best for 50 guests?",
          "Do you offer gluten-free custom cakes?",
          "How far in advance should I order a wedding cake?"
        ];
      case "salon":
        return [
          "Which stylist is best for blonde balayage?",
          "What is the difference between hydra-facial and standard?",
          "Do you have wedding day makeup packages?"
        ];
      case "light":
        return [
          "How many lumens do I need for a 15sqm dining room?",
          "Do your pendant lights support smart dimming?",
          "Do you offer installation services?"
        ];
      case "clothing":
        return [
          "What goes well with a beige linen shirt?",
          "What is your sizing guide for streetwear hoodies?",
          "Are your clothing materials organic?"
        ];
      case "fitness":
        return [
          "Can you create a custom 4-day workout plan?",
          "How much protein do I need daily?",
          "How do I book a personal trainer session?"
        ];
      default:
        return [
          "How can you boost our social media reach?",
          "What is the timeline for a Next.js website build?",
          "How does your AI chatbot integration work?"
        ];
    }
  };

  // Reset chat messages when category or type changes
  useEffect(() => {
    const defaultGreeting = {
      sender: "bot",
      text: getAIGreeting(activeCategory),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([defaultGreeting]);
  }, [activeCategory, activeType]);

  const getAIGreeting = (category) => {
    switch (category) {
      case "cake":
        return "Hi there! I am the Sweet Creations AI assistant. Tell me about your upcoming party, and I will help you design the perfect dessert menu! 🎂";
      case "salon":
        return "Welcome to Aura Salon Consult! I can help you analyze your hair style needs and pair you with the best specialist. What style are you looking for? 💇‍♀️";
      case "light":
        return "Greetings from Lumia Smart Assistant. Let me help you calculate spacing and brightness specs for your home lighting. Which room are we designing? 💡";
      case "clothing":
        return "Hello! I am your Urban Thread personal fashion assistant. I can curate complete lookbooks tailored to your shape and preferences. What style is your vibe? 👔";
      case "fitness":
        return "Hi! I am the FitLife AI coach. I can help you custom design workout plans and pair you with a certified nutritionist. What is your fitness goal? 🏋️‍♂️";
      default:
        return "Hello! Ask me any question, and I'll simulate a custom business AI assistant response for you.";
    }
  };

  const handleAskAI = (question) => {
    if (!question.trim()) return;

    // Add user message
    const userMsg = {
      sender: "user",
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setCustomQuestion("");
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      let botResponse = "";
      const q = question.toLowerCase();

      // Simple keyword matching for demo
      if (activeCategory === "cake") {
        if (q.includes("flavor") || q.includes("guests") || q.includes("size")) {
          botResponse = "For 50 guests, a 3-tier custom cake is perfect (10\", 8\", and 6\" tiers). I highly recommend our Vanilla Velvet with Raspberry coulis filling or rich Salted Caramel Chocolate! Would you like a flavor tasting box?";
        } else if (q.includes("gluten") || q.includes("allergy") || q.includes("vegan")) {
          botResponse = "Yes, absolutely! We bake delicious gluten-free, vegan, and dairy-free cakes in a dedicated kitchen section. All our signature flavors can be adapted with organic oat-based recipes.";
        } else if (q.includes("advance") || q.includes("order") || q.includes("time")) {
          botResponse = "For custom wedding cakes, we recommend booking 2-3 months in advance. For birthday and celebration cakes, 1-2 weeks is usually sufficient. Let me know the date to check our calendar!";
        } else {
          botResponse = "That sounds delicious! I have forwarded your customization request to our head pastry chef, who will outline the recipe structure for you.";
        }
      } else if (activeCategory === "salon") {
        if (q.includes("stylist") || q.includes("blonde") || q.includes("balayage")) {
          botResponse = "For blonde balayage and color corrections, our Master Stylist, Sarah, is highly recommended. She has 8+ years of color expertise. Would you like to check her slot availability for this Thursday?";
        } else if (q.includes("facial") || q.includes("hydra") || q.includes("skin")) {
          botResponse = "Our Hydra-Facial uses a specialized 3-step vacuum-infusion nozzle to deep clean and hydrate. The standard facial is manual steam and mask. Hydra-Facial is recommended for instant event glow!";
        } else if (q.includes("wedding") || q.includes("makeup") || q.includes("package")) {
          botResponse = "Yes! We offer a VIP Bridal Package including pre-wedding trial styling, hair design, professional airbrush makeup, and champagne service. We also send stylists to venues.";
        } else {
          botResponse = "Great question! That service is customizable. I've noted down your style profile for our stylist to review during your consultation.";
        }
      } else if (activeCategory === "light") {
        if (q.includes("lumen") || q.includes("dining") || q.includes("measure")) {
          botResponse = "For a 15sqm dining room, we recommend a total of 3000-4500 lumens. A suspended cluster of 3 Lumia pendants (approx 1200lm each) centered over the dining table provides beautiful task and ambient light.";
        } else if (q.includes("dimming") || q.includes("smart") || q.includes("app")) {
          botResponse = "Yes! All Lumia fixtures use standard Triac or 0-10V dimmable drivers, fully compatible with Philips Hue, Lutron Caseta, and Apple HomeKit smart dimmer switches.";
        } else if (q.includes("installation") || q.includes("install") || q.includes("electric")) {
          botResponse = "We offer complete professional electrical installation within the metropolitan area. All our jobs are covered by a 2-year workmanship warranty and local electrical safety certificates.";
        } else {
          botResponse = "Our fixtures are designed to fit that application beautifully. I've calculated the beam-angle spreads and saved the recommendation to your catalog folder.";
        }
      } else if (activeCategory === "clothing") {
        if (q.includes("beige") || q.includes("shirt") || q.includes("match")) {
          botResponse = "A beige linen shirt pairs beautifully with our Sand Organic Canvas Chinos or Off-White Utility Shorts. Finish the outfit with white leather sneakers for a premium summer look!";
        } else if (q.includes("sizing") || q.includes("hoodie") || q.includes("size")) {
          botResponse = "Our streetwear hoodies run slightly oversized (box-cut fit). If you prefer a tailored fit, size down one step. If you want the authentic modern loose style, order your normal size!";
        } else if (q.includes("organic") || q.includes("material") || q.includes("fabric")) {
          botResponse = "Absolutely. 100% of our thread line is GOTS-certified organic cotton and recycled ocean plastic polyester. We print using non-toxic water-based inks.";
        } else {
          botResponse = "Excellent choice. That item has high customer reviews for fit and comfort. I've added it to your custom stylist lookbook!";
        }
      } else if (activeCategory === "fitness") {
        if (q.includes("workout") || q.includes("plan") || q.includes("routine")) {
          botResponse = "For your goals, I recommend a 4-day Upper/Lower split focusing on progressive overload. I can generate a complete exercise chart with sets and reps. Would you like that?";
        } else if (q.includes("diet") || q.includes("nutrition") || q.includes("protein")) {
          botResponse = "To build lean muscle, aim for 1.6 to 2.2 grams of protein per kilogram of body weight. I can calculate your exact daily macros and build a sample meal prep schedule!";
        } else if (q.includes("class") || q.includes("membership") || q.includes("booking")) {
          botResponse = "Yes! You can book high-intensity spinning, powerlifting, or yoga classes directly through our member portal. We have open slots this evening at 6 PM.";
        } else {
          botResponse = "Excellent fitness goal! I have logged your profile details for our personal trainers to customize your routine during your first gym orientation.";
        }
      } else {
        botResponse = "Thank you for asking! We specialize in crafting tailor-made customer assistant chatbots like this for local businesses. It reduces support loads and boosts sales. Can we build one for you?";
      }

      const botMsg = {
        sender: "bot",
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  // --- INTERACTIVE POS STATE ---
  const [posCart, setPosCart] = useState([]);
  const [posReceipt, setPosReceipt] = useState(null);

  // Available items for POS based on selected business category
  const getPOSItems = (category) => {
    switch (category) {
      case "cake":
        return [
          { id: 'pos-c1', name: 'Chocolate Fudge Gateau', price: 35.00 },
          { id: 'pos-c2', name: 'Red Velvet Custom Slice', price: 6.50 },
          { id: 'pos-c3', name: 'Strawberry Macarons (Box)', price: 18.00 },
          { id: 'pos-c4', name: 'Eclair Assortment', price: 12.00 }
        ];
      case "salon":
        return [
          { id: 'pos-s1', name: 'Balayage & Hair Treatment', price: 145.00 },
          { id: 'pos-s2', name: 'Gentleman Cut & Beard Groom', price: 45.00 },
          { id: 'pos-s3', name: 'Luxury Head Massage Spa', price: 65.00 },
          { id: 'pos-s4', name: 'Organic Argan Hair Serum', price: 29.90 }
        ];
      case "light":
        return [
          { id: 'pos-l1', name: 'Lumia Halo Pendant (Brass)', price: 289.00 },
          { id: 'pos-l2', name: 'Linear LED Brass Sconce', price: 149.00 },
          { id: 'pos-l3', name: 'Smart Dimmer Control Panel', price: 89.00 },
          { id: 'pos-l4', name: 'Accent Warm Spot Bulb (Pack)', price: 34.00 }
        ];
      case "clothing":
        return [
          { id: 'pos-k1', name: 'Heavyweight Loopback Hoodie', price: 85.00 },
          { id: 'pos-k2', name: 'Relaxed Fit Canvas Pant', price: 75.00 },
          { id: 'pos-k3', name: 'Organic Cotton T-Shirt (White)', price: 32.00 },
          { id: 'pos-k4', name: 'Corduroy Bucket Hat', price: 28.00 }
        ];
      case "fitness":
        return [
          { id: 'pos-f1', name: '10-Session Class Pass Package', price: 49.00 },
          { id: 'pos-f2', name: '1-on-1 Personal Training Session', price: 65.00 },
          { id: 'pos-f3', name: 'Whey Protein Shake (Post-Workout)', price: 6.50 },
          { id: 'pos-f4', name: 'FitLife Shaker Bottle & Towel Set', price: 18.00 }
        ];
      default:
        return [
          { id: 'pos-g1', name: 'Digital Growth Consult', price: 150.00 },
          { id: 'pos-g2', name: '10x Social Post Design Package', price: 450.00 },
          { id: 'pos-g3', name: 'Video Ad Production Run', price: 800.00 },
          { id: 'pos-g4', name: 'POS Customization Work', price: 1200.00 }
        ];
    }
  };

  const handlePOSAddToCart = (item) => {
    setPosCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handlePOSUpdateQty = (itemId, change) => {
    setPosCart(prev => {
      return prev.map(i => {
        if (i.id === itemId) {
          const newQty = i.qty + change;
          return newQty > 0 ? { ...i, qty: newQty } : null;
        }
        return i;
      }).filter(Boolean);
    });
  };

  const handlePOSCheckout = () => {
    if (posCart.length === 0) return;
    const subtotal = posCart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    setPosReceipt({
      id: Math.floor(100000 + Math.random() * 900000),
      items: [...posCart],
      subtotal,
      tax,
      total,
      time: new Date().toLocaleString()
    });

    setPosCart([]);
  };

  // --- PRICING CALCULATOR STATE ---
  const [calcItems, setCalcItems] = useState({
    posts: true,
    reels: true,
    video: false,
    website: false,
    ai: false,
    pos: false
  });

  const calculateTotalEstimate = () => {
    let base = 0;
    if (calcItems.posts) base += 299;
    if (calcItems.reels) base += 399;
    if (calcItems.video) base += 599;
    if (calcItems.website) base += 1299;
    if (calcItems.ai) base += 799;
    if (calcItems.pos) base += 999;

    // Apply discount if multiple items selected
    const count = Object.values(calcItems).filter(Boolean).length;
    let discount = 0;
    if (count >= 5) discount = 0.20; // 20% off
    else if (count >= 3) discount = 0.10; // 10% off

    return {
      subtotal: base,
      discount: Math.round(base * discount),
      total: Math.round(base * (1 - discount))
    };
  };

  const getCalculatorWhatsAppMsg = () => {
    const list = [];
    if (calcItems.posts) list.push("Social Posts ($299)");
    if (calcItems.reels) list.push("Insta Reels ($399)");
    if (calcItems.video) list.push("Video Ads ($599)");
    if (calcItems.website) list.push("Next.js Website ($1299)");
    if (calcItems.ai) list.push("AI Chatbot ($799)");
    if (calcItems.pos) list.push("POS Config ($999)");

    const price = calculateTotalEstimate();
    const message = `Hello Aura Team! I am interested in building a digital marketing bundle:
${list.map(i => `- ${i}`).join("\n")}
Estimated cost: $${price.total}/mo (Discount: $${price.discount})
Let's coordinate a strategy call!`;

    return encodeURIComponent(message);
  };

  // --- FLOATING WHATSAPP CHAT WIDGET STATE ---
  const [waChatOpen, setWaChatOpen] = useState(false);
  const [waMessage, setWaMessage] = useState("");

  const handleSendWaChat = () => {
    if (!waMessage.trim()) return;
    const phone = "1234567890"; // Placeholder Business number
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`;
    window.open(url, "_blank");
    setWaMessage("");
    setWaChatOpen(false);
  };

  // Portfolio items filtering logic
  const filteredPortfolio = portfolioItems.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesType = item.type === activeType;
    return matchesCategory && matchesType;
  });

  const closeTransientUi = () => {
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    setTypeDropdownOpen(false);
    setBrandGalleryItem(null);
    setSelectedMedia(null);
  };

  const scrollAfterTabChange = (target = "content") => {
    if (target === "none") return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (target === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        document.getElementById("main-content-anchor")?.scrollIntoView({ behavior: "smooth" });
      });
    });
  };

  const navigateToTab = (tabId, target = "content") => {
    closeTransientUi();
    setActiveTab(tabId);
    scrollAfterTabChange(target);
  };

  return (
    <div className="min-h-dvh flex flex-col relative bg-[var(--background)] text-[var(--foreground)]">
      {/* Decorative Blur Blobs */}
      <div className="fixed top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[50vw] h-[50vw] rounded-full bg-red-800/5 blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[50vw] h-[50vw] rounded-full bg-red-900/5 blur-[120px] pointer-events-none animate-pulse-slow"></div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--background)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button
            onClick={() => navigateToTab("samples", "top")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {/* Logo Image */}
            <Image
              src="/assets/logo.png"
              alt="Ceylon Clicks Logo"
              width={44}
              height={44}
              className="object-contain rounded-xl"
              priority
            />
            <div>
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-[var(--foreground)] to-slate-500 bg-clip-text text-transparent">Ceylon Clicks</span>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {[
              { id: "about", label: "About Us" },
              { id: "services", label: "Services" },
              { id: "samples", label: "Work Samples" },
              { id: "pricing", label: "Plans & Pricing" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigateToTab(tab.id, window.innerWidth < 768 ? "content" : "none")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[var(--card-bg)] text-[var(--brand-main)] border border-[var(--brand-main)]/20 shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--brand-main)] hover:bg-[var(--card-bg)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--brand-main)] hover:bg-[var(--card-bg)] focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--card-bg)]/95 backdrop-blur-xl transition-all duration-300">
            <nav className="flex flex-col p-4 gap-2">
              {[
                { id: "about", label: "About Us" },
                { id: "services", label: "Services" },
                { id: "samples", label: "Work Samples" },
                { id: "pricing", label: "Plans & Pricing" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => navigateToTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[var(--brand-main)]/5 to-[var(--brand-hover)]/5 text-[var(--brand-main)] border border-[var(--brand-main)]/10 shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--brand-main)] hover:bg-[var(--background)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Showcase Section */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--brand-main)]/10 bg-[var(--brand-main)]/5 text-[var(--brand-main)] text-xs font-semibold tracking-wider uppercase">
            <span>✨</span> Next-Gen Marketing & Dev Agency
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-[var(--foreground)] leading-tight">
            We build campaigns
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigateToTab("pricing")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--brand-main)] to-[var(--brand-hover)] text-white font-bold hover:opacity-95 shadow-xl shadow-red-950/10 transition-all duration-300 transform hover:scale-[1.02]"
            >
              See Our Packages
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Anchor */}
      <div id="main-content-anchor" className="w-full h-1 scroll-mt-24"></div>

      {/* Dynamic Tab Panels */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- ABOUT TAB PANEL --- */}
        {activeTab === "about" && (
          <div className="space-y-16 animate-fadeIn">
            {/* Founders introduction */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--foreground)]">
                  Meet the Founders
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[var(--brand-main)] to-[var(--brand-hover)] rounded-full"></div>
                <p className="text-[var(--foreground)] leading-relaxed text-lg font-medium">
                  We are two close friends who started this agency because we saw local businesses struggling with average marketing. One of us lives and breathes **creative content and branding strategy**, while the other is a **full-stack developer** specializing in high-speed web apps and interactive POS database systems.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  By uniting creative design with engineering muscle, we build campaigns and platforms that look beautiful and perform technically. No generic templates, no outsourcing — just custom code, data-driven pipelines, and striking content that scale your business.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="p-4 rounded-2xl glass-panel border-l-2 border-l-[var(--brand-main)]">
                    <span className="font-display font-bold text-lg text-[var(--foreground)] block">Alex Mercer</span>
                    <span className="text-xs text-[var(--brand-main)] uppercase tracking-widest font-semibold block mb-2">Creative Director</span>
                    <p className="text-[var(--text-secondary)] text-xs">Handles high-converting social designs, viral reel scripts, and custom brand visual identities.</p>
                  </div>
                  <div className="p-4 rounded-2xl glass-panel border-l-2 border-l-[var(--brand-hover)]">
                    <span className="font-display font-bold text-lg text-[var(--foreground)] block">Jordan Vance</span>
                    <span className="text-xs text-[var(--brand-hover)] uppercase tracking-widest font-semibold block mb-2">Technical Lead</span>
                    <p className="text-[var(--text-secondary)] text-xs">Builds React/NextJS frontends, MongoDB pipelines, custom AI chat agents, and POS client registers.</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5 relative">
                {/* Visual graphic in place of founder image */}
                <div className="aspect-[4/3] sm:aspect-square rounded-3xl bg-gradient-to-tr from-[var(--card-bg)] via-[var(--background)] to-[var(--card-bg)] border border-[var(--border-color)] p-8 flex flex-col justify-between shadow-2xl relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--brand-main)]/5 rounded-full blur-3xl group-hover:bg-[var(--brand-main)]/10 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--brand-hover)]/5 rounded-full blur-3xl group-hover:bg-[var(--brand-hover)]/10 transition-all duration-500"></div>
                  
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-[var(--text-secondary)]">// OUR WORK PHILOSOPHY</span>
                    <span className="text-xl">🤝</span>
                  </div>
                  
                  <div className="space-y-4 relative z-10">
                    <h3 className="font-display font-bold text-2xl text-[var(--foreground)]">We bridge the gap between Code & Creative</h3>
                    <p className="text-[var(--text-secondary)] text-sm">
                      We operate like a dedicated extension of your company. Your success is our portfolio.
                    </p>
                  </div>

                  <div className="flex gap-2 text-xs font-mono text-[var(--brand-main)] bg-[var(--brand-main)]/5 border border-[var(--brand-main)]/10 rounded-xl p-3 items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                    <span>Ready to deploy for local & online brands</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "Client Average ROI", value: "10.4x", color: "from-cyan-400 to-blue-500" },
                { label: "Campaigns Run", value: "120+", color: "from-blue-400 to-violet-500" },
                { label: "Active Brands Scaled", value: "24", color: "from-violet-400 to-pink-500" },
                { label: "Client Satisfaction", value: "100%", color: "from-pink-400 to-orange-500" }
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl glass-panel text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <span className={`font-display font-black text-3xl sm:text-5xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent block mb-1`}>
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Workflow steps */}
            <div className="space-y-8">
              <div className="text-center max-w-lg mx-auto">
                <h3 className="font-display font-bold text-2xl text-white">Our 3-Step Growth Engine</h3>
                <p className="text-slate-400 text-sm mt-2">How we work with you to elevate your business</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { step: "01", title: "Creative Audit & Vibe Check", desc: "We review your brand assets, audience, competitors, and goals. We map out content grids that speak directly to buyers." },
                  { step: "02", title: "Develop & Automate", desc: "We shoot/design social assets and program lightning-fast sites, custom AI bots to capture pre-sales, and connect point-of-sale setups." },
                  { step: "03", title: "Launch & Iterate", desc: "We push live, activate target ads, monitor live traffic/transactions, and deliver weekly metrics showing what actually drives sales." }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl glass-panel relative group">
                    <span className="font-display font-extrabold text-5xl text-slate-800 group-hover:text-slate-700 transition-colors duration-300 block mb-4">
                      {item.step}
                    </span>
                    <h4 className="font-display font-bold text-lg text-white mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- SERVICES TAB PANEL --- */}
        {activeTab === "services" && (
          <div className="space-y-12 animate-fadeIn">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--foreground)]">Our Agency Capabilities</h2>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base">We custom-build everything. No template builders, no shortcuts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "✍️",
                  title: "Social Media Posts",
                  sub: "Organic Creative & Carousels",
                  desc: "Custom graphic posts, grids, and multi-slide carousels tailored to your specific aesthetic. Designed to hook attention in busy feeds.",
                  tags: ["Photoshop", "Brand Guidelines", "Visual Grid Planning"],
                  accent: "border-t-[var(--brand-main)]"
                },
                {
                  icon: "🎥",
                  title: "Instagram Reels",
                  sub: "Viral Video Assets",
                  desc: "Fast-paced, satisfying, and trend-focused vertical video assets. Complete with trending sound curation, subtitles, and captions.",
                  tags: ["Color Grading", "Hook Strategy", "Trending Audio"],
                  accent: "border-t-[var(--brand-hover)]"
                },
                {
                  icon: "📣",
                  title: "Video Ads & Creatives",
                  sub: "Paid Ad Campaigns",
                  desc: "Targeted marketing video ads focused entirely on conversions. Engineered for Meta (FB/IG), TikTok, and YouTube platforms.",
                  tags: ["Motion Design", "A/B Testing Hook", "Direct Call-to-Action"],
                  accent: "border-t-red-500"
                },
                {
                  icon: "🌐",
                  title: "Websites & Web Apps",
                  sub: "Headless Next.js Development",
                  desc: "High-performance React/Next.js storefronts and portfolio portals. Fully responsive, SEO-ready, and lightning-fast loading speeds.",
                  tags: ["Next.js", "React", "MongoDB / SQL", "REST/GraphQL APIs"],
                  accent: "border-t-red-600"
                },
                {
                  icon: "🤖",
                  title: "AI Integration Tools",
                  sub: "Customer Assistants & Automation",
                  desc: "Intelligent chatbot assistants trained on your business data. Capture leads, book appointments, and answer complex pre-sales questions.",
                  tags: ["ChatGPT API", "Lead Collection", "Auto Scheduling"],
                  accent: "border-t-red-750"
                },
                {
                  icon: "💳",
                  title: "POS Systems Config",
                  sub: "Checkout & Inventory Systems",
                  desc: "Structured point-of-sale setups. Sync retail counters or table booking with automated stocks, commissions, and digital receipts.",
                  tags: ["Inventory Sync", "Stylist Commissions", "Digital Receipts"],
                  accent: "border-t-red-900"
                }
              ].map((service, idx) => (
                <div key={idx} className={`p-6 rounded-2xl glass-panel glass-panel-hover border-t-2 ${service.accent} flex flex-col justify-between h-full`}>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <h3 className="font-display font-bold text-lg text-[var(--foreground)] leading-tight">{service.title}</h3>
                        <span className="text-xs text-[var(--text-secondary)] font-medium">{service.sub}</span>
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{service.desc}</p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-[var(--border-color)] space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map((t, i) => (
                        <span key={i} className="text-[10px] font-mono bg-[var(--background)] px-2 py-0.5 rounded text-[var(--text-secondary)]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => navigateToTab("pricing")}
                      className="w-full py-2 rounded-xl bg-[var(--background)] hover:bg-[var(--border-color)] text-xs font-semibold text-[var(--foreground)] hover:text-[var(--brand-main)] border border-[var(--border-color)] transition-colors"
                    >
                      View Pricing Options →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SAMPLES TAB PANEL (PORTFOLIO FILTER) --- */}
        {activeTab === "samples" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Filter controls heading & Dropdown selectors */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-5" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h2 className="font-display font-extrabold text-2xl" style={{ color: 'var(--foreground)' }}>Live Visual Showcase</h2>
                <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Select filters to interact with real marketing &amp; development mockups</p>
              </div>

              {/* Dropdowns filters container — always one row */}
              <div className="flex flex-row gap-2 w-full sm:w-auto z-30">
                
                {/* Business Category Filter Selector */}
                <div className="relative flex-1 sm:flex-none sm:w-48">
                  <button
                    onClick={() => {
                      setCategoryDropdownOpen(!categoryDropdownOpen);
                      setTypeDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 transition-all"
                    style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                  >
                    <span className="truncate">{categories.find(c => c.id === activeCategory)?.name}</span>
                    <svg className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Backdrop Click Dismiss */}
                  {categoryDropdownOpen && (
                    <div className="fixed inset-0 z-20" onClick={() => setCategoryDropdownOpen(false)} />
                  )}

                  {/* Dropdown Content */}
                  {categoryDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1.5 z-30 rounded-xl border backdrop-blur-xl shadow-xl overflow-hidden animate-fadeIn" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategory(cat.id);
                            setCategoryDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-xs font-semibold transition-all"
                          style={{
                            background: activeCategory === cat.id ? 'var(--background)' : 'transparent',
                            color: activeCategory === cat.id ? 'var(--brand-main)' : 'var(--text-secondary)'
                          }}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Deliverable Type Filter Selector */}
                <div className="relative flex-1 sm:flex-none sm:w-48">
                  <button
                    onClick={() => {
                      setTypeDropdownOpen(!typeDropdownOpen);
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 transition-all"
                    style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                  >
                    <span className="truncate">{contentTypes.find(t => t.id === activeType)?.name}</span>
                    <svg className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${typeDropdownOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Backdrop Click Dismiss */}
                  {typeDropdownOpen && (
                    <div className="fixed inset-0 z-20" onClick={() => setTypeDropdownOpen(false)} />
                  )}

                  {/* Dropdown Content */}
                  {typeDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1.5 z-30 rounded-xl border backdrop-blur-xl shadow-xl overflow-hidden animate-fadeIn" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                      {contentTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => {
                            setActiveType(type.id);
                            setTypeDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-xs font-semibold transition-all"
                          style={{
                            background: activeType === type.id ? 'var(--background)' : 'transparent',
                            color: activeType === type.id ? 'var(--brand-main)' : 'var(--text-secondary)'
                          }}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Filter Result Summary */}
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Showing <span className="font-bold" style={{ color: 'var(--brand-main)' }}>{filteredPortfolio.length}</span> samples for <span className="font-semibold" style={{ color: 'var(--foreground)' }}>"{categories.find(c => c.id === activeCategory)?.name}"</span> filtered by <span className="font-semibold" style={{ color: 'var(--foreground)' }}>"{contentTypes.find(t => t.id === activeType)?.name}"</span>
            </div>

            {/* Portfolio Grid Rendering */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPortfolio.length > 0 ? (
                filteredPortfolio.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl overflow-hidden flex flex-col justify-between group shadow-lg border"
                    style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    
                    {/* Visual Media Showcase Area */}
                    <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden border-b" style={{ background: '#0f172a', borderColor: 'var(--border)' }}>
                      
                      {/* TYPE: Social Media Posts */}
                      {item.type === 'posts' && item.image && (
                        <div className="relative w-full h-full cursor-zoom-in group/media" onClick={() => setSelectedMedia(item)}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/media:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                          <div className="absolute inset-0 bg-slate-950/20 group-hover/media:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
                            <span className="bg-slate-950/80 backdrop-blur-md text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-800 text-slate-200 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300">
                              🔍 Click to Zoom Post
                            </span>
                          </div>
                        </div>
                      )}

                      {/* TYPE: Instagram Reels (Simulated Phone View) */}
                      {item.type === 'reels' && item.image && (
                        <div className="relative w-[180px] h-[320px] rounded-2xl border-4 border-slate-800 shadow-2xl bg-black overflow-hidden scale-90 sm:scale-100 cursor-zoom-in group/reel" onClick={() => setSelectedMedia(item)}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover brightness-90 group-hover/reel:scale-105 transition-transform duration-500"
                            sizes="180px"
                          />
                          {/* Insta Reels Interface simulation overlay */}
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-[10px] space-y-1 text-white">
                            <span className="font-bold">@{item.category === 'cake' ? 'sweetcreations' : item.category === 'salon' ? 'aurasalon' : item.category === 'light' ? 'lumialight' : 'urbanthread'}</span>
                            <p className="text-[9px] text-slate-200 line-clamp-2">{item.description}</p>
                            <div className="flex items-center gap-1 text-[8px] text-cyan-400 font-mono">
                              <span>🎵 Original Audio - {item.category}</span>
                            </div>
                          </div>
                          <div className="absolute right-2 bottom-12 flex flex-col gap-3 text-white text-[10px] items-center">
                            <div className="flex flex-col items-center"><span>❤️</span><span className="text-[8px]">1.2k</span></div>
                            <div className="flex flex-col items-center"><span>💬</span><span className="text-[8px]">48</span></div>
                            <div className="flex flex-col items-center"><span>✈️</span></div>
                          </div>
                          {/* Play overlay button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center border border-slate-800 shadow-lg group-hover/reel:scale-110 transition-transform">
                              <span className="text-white text-xs pl-0.5">▶</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TYPE: Video Ads (Simulated Media Player) */}
                      {item.type === 'video_ads' && item.image && (
                        <div className="relative w-full h-full cursor-zoom-in group/video" onClick={() => setSelectedMedia(item)}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          {/* Simulated media player controls */}
                          <div className="absolute inset-x-0 bottom-0 bg-slate-950/90 border-t border-slate-850 p-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-cyan-400">▶</span>
                              <span>0:15 / 0:30</span>
                            </div>
                            <div className="flex-1 mx-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div className="w-1/2 h-full bg-cyan-500 rounded-full"></div>
                            </div>
                            <span>1080p HD</span>
                          </div>
                          {/* Pulse Play Icon */}
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 group-hover/video:bg-slate-950/45 transition-colors duration-300">
                            <div className="w-14 h-14 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover/video:scale-110 transition-transform duration-300">
                              <span className="text-xl pl-1">▶</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TYPE: Websites (Interactive Mini-Webpage Mockup) */}
                      {item.type === 'websites' && (
                        <div className="w-full h-full p-4 flex flex-col justify-between bg-slate-950 font-sans select-none overflow-hidden relative">
                          
                          {/* Browser Mockup Header */}
                          <div className="flex items-center justify-between bg-slate-900 rounded-xl px-3 py-1.5 border border-slate-800 text-[10px] text-slate-400">
                            <div className="flex gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                            </div>
                            <span className="bg-slate-950 px-4 py-0.5 rounded-md border border-slate-850 font-mono text-[9px] truncate max-w-[200px]">
                              {item.category === 'cake' ? 'sweetcreations.com' : item.category === 'salon' ? 'aurasalon.com' : item.category === 'light' ? 'lumialight.com' : item.category === 'clothing' ? 'urbanthread.com' : 'fitlifegym.com'}
                            </span>
                            <span className="text-slate-600">⚡ Secure</span>
                          </div>

                          {/* Render Specific Interactive Mockup Page */}
                          <div className="flex-1 mt-3 rounded-2xl overflow-y-auto border border-slate-900 bg-slate-900/20 p-3 relative text-xs">
                            
                            {/* CAKE SHOP MOCKUP PAGE */}
                            {item.category === 'cake' && (
                              <div className="space-y-3 font-display">
                                <div className="flex justify-between items-center text-rose-300 border-b border-rose-950/20 pb-1">
                                  <span className="font-bold text-xs">🍰 Sweet Creations</span>
                                  <span className="bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full text-[9px] font-mono">
                                    🛒 Cart ({webCartCount})
                                  </span>
                                </div>
                                <div className="text-center py-2 bg-gradient-to-r from-rose-900/10 to-pink-900/10 rounded-xl border border-rose-900/10">
                                  <span className="text-[10px] font-bold text-pink-300 block">Summer Special 🍓</span>
                                  <span className="text-[9px] text-slate-400">Artisanal Berry Gateau - $45</span>
                                  <button
                                    onClick={() => setWebCartCount(prev => prev + 1)}
                                    className="mt-1.5 px-3 py-1 bg-pink-500 text-slate-950 font-extrabold text-[9px] rounded-lg block mx-auto hover:opacity-90 active:scale-95"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* SALON BOOKING MOCKUP PAGE */}
                            {item.category === 'salon' && (
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-amber-200/90 border-b border-amber-950/20 pb-1 font-display">
                                  <span className="font-bold text-xs">✨ AURA BEAUTY</span>
                                  <span className="text-[9px] text-slate-400 font-mono">Stylist: Sarah (Master)</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-300 block text-center">Select Available Slot:</span>
                                <div className="grid grid-cols-3 gap-1">
                                  {["10:00 AM", "12:30 PM", "3:00 PM"].map((slot) => (
                                    <button
                                      key={slot}
                                      onClick={() => setWebSelectedSlot(slot)}
                                      className={`py-1 text-[9px] font-bold rounded-lg text-center transition-all ${
                                        webSelectedSlot === slot
                                          ? "bg-amber-400 text-slate-950"
                                          : "bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800"
                                      }`}
                                    >
                                      {slot}
                                    </button>
                                  ))}
                                </div>
                                {webSelectedSlot && (
                                  <div className="text-center text-[9px] text-emerald-400 font-semibold animate-pulse">
                                    ✓ Selected: {webSelectedSlot} - Click Book to reserve
                                  </div>
                                )}
                              </div>
                            )}

                            {/* LIGHTING CONTROL SHOWROOM MOCKUP PAGE */}
                            {item.category === 'light' && (
                              <div className="space-y-3 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-center text-cyan-300 border-b border-cyan-950/20 pb-1 font-display">
                                  <span className="font-bold text-xs">💡 LUMIA SHOWROOM</span>
                                  <span className="text-[9px] text-slate-500 font-mono">v1.2 Smart Home</span>
                                </div>
                                <div className={`flex-1 rounded-xl p-3 border transition-colors flex flex-col items-center justify-center text-center gap-1.5 ${
                                  webLightsOn
                                    ? "bg-amber-950/10 border-amber-500/30 text-amber-200"
                                    : "bg-slate-950/60 border-slate-900 text-slate-400"
                                }`}>
                                  <span className="text-[24px]">{webLightsOn ? "💡" : "🔌"}</span>
                                  <span className="text-[10px] font-bold block">
                                    Showroom: {webLightsOn ? "Warm Amber Light (2700K)" : "Lights Off"}
                                  </span>
                                  <button
                                    onClick={() => setWebLightsOn(prev => !prev)}
                                    className={`px-3 py-1 text-[9px] rounded-lg font-bold transition-all ${
                                      webLightsOn ? "bg-amber-400 text-slate-950" : "bg-slate-900 text-slate-300 border border-slate-800"
                                    }`}
                                  >
                                    {webLightsOn ? "Turn Off" : "Turn On"}
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* CLOTHING BRAND MOCKUP PAGE */}
                            {item.category === 'clothing' && (
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-slate-100 border-b border-slate-900 pb-1 font-display">
                                  <span className="font-bold text-xs">👕 URBAN THREAD</span>
                                  <span className="text-[9px] font-mono text-cyan-400">GOTS Organic</span>
                                </div>
                                <div className="flex gap-3 items-center">
                                  {/* Color block */}
                                  <div className={`w-12 h-12 rounded-xl transition-all border ${
                                    webClothingColor === 'cream'
                                      ? "bg-amber-50 border-amber-200"
                                      : webClothingColor === 'sage'
                                        ? "bg-emerald-900/60 border-emerald-500/30"
                                        : "bg-indigo-900/60 border-indigo-500/30"
                                  }`} />
                                  <div className="flex-1 space-y-1">
                                    <span className="font-bold text-[10px] text-white block">Heavyweight Tee</span>
                                    <span className="text-[9px] text-slate-400 block">$32.00 | Color: {webClothingColor}</span>
                                    <div className="flex gap-1.5 mt-1">
                                      {['cream', 'sage', 'indigo'].map(c => (
                                        <button
                                          key={c}
                                          onClick={() => setWebClothingColor(c)}
                                          className={`w-3.5 h-3.5 rounded-full border ${
                                            c === 'cream' ? 'bg-amber-50' : c === 'sage' ? 'bg-emerald-800' : 'bg-indigo-800'
                                          } ${webClothingColor === c ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-slate-950' : ''}`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* FITNESS CLUB MOCKUP PAGE */}
                            {item.category === 'fitness' && (
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-rose-400 border-b border-rose-950/20 pb-1 font-display">
                                  <span className="font-bold text-xs">💪 FITLIFE CLUB</span>
                                  <span className="text-[9px] text-slate-400 font-mono">Members: Active</span>
                                </div>
                                <div className="text-center py-2 bg-gradient-to-r from-red-950/15 to-orange-950/15 rounded-xl border border-red-900/10">
                                  <span className="text-[10px] font-bold text-rose-300 block">Class Pass Deal 🏋️‍♂️</span>
                                  <span className="text-[9px] text-slate-400">10 Gym Credits - Only $49</span>
                                  <button
                                    onClick={() => setWebCartCount(prev => prev + 1)}
                                    className="mt-1.5 px-3 py-1 bg-red-500 text-slate-950 font-extrabold text-[9px] rounded-lg block mx-auto hover:opacity-90 active:scale-95"
                                  >
                                    Buy Class Pass
                                  </button>
                                </div>
                              </div>
                            )}

                          </div>
                          
                          <div className="text-[9px] text-slate-500 text-center mt-2 border-t border-slate-900/60 pt-2 font-mono">
                            ⚡ Built with Next.js, React, & Tailwind CSS
                          </div>
                        </div>
                      )}

                      {/* TYPE: AI Tools (Interactive Active Chatbot Assistant) */}
                      {item.type === 'ai_tools' && (
                        <div className="w-full h-full p-3 flex flex-col justify-between bg-slate-950 font-sans overflow-hidden">
                          
                          {/* Chat Header */}
                          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-[10px] text-slate-950 font-display">
                                🤖
                              </div>
                              <div>
                                <span className="font-bold text-[10px] text-white block leading-tight">
                                  {item.category === 'cake' ? 'SweetBot AI' : item.category === 'salon' ? 'AuraHair Consultant' : item.category === 'light' ? 'Lumia Planner' : 'ThreadStylist'}
                                </span>
                                <span className="text-[8px] text-cyan-400 flex items-center gap-1 font-semibold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span> Online Advisor
                                </span>
                              </div>
                            </div>
                            <span className="text-[8px] font-mono text-slate-500">// LIVE SIMULATOR</span>
                          </div>

                          {/* Chat History View */}
                          <div className="flex-1 my-2 overflow-y-auto space-y-2 p-2 rounded-xl bg-slate-900/20 border border-slate-900 text-[10px]">
                            {chatMessages.map((msg, i) => (
                              <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-2.5 py-1.5 rounded-xl max-w-[85%] leading-normal ${
                                  msg.sender === 'user'
                                    ? 'bg-cyan-500 text-slate-950 font-semibold rounded-br-none'
                                    : 'bg-slate-900 text-slate-200 rounded-bl-none border border-slate-800'
                                }`}>
                                  {msg.text}
                                </div>
                                <span className="text-[7px] text-slate-600 mt-0.5">{msg.time}</span>
                              </div>
                            ))}
                            
                            {isTyping && (
                              <div className="flex items-center gap-1 text-[8px] text-slate-400 bg-slate-900/50 px-2 py-1.5 rounded-xl max-w-[50px] border border-slate-900">
                                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                              </div>
                            )}
                          </div>

                          {/* Predefined prompt buttons */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {getAISuggestedQuestions(item.category).map((q, i) => (
                              <button
                                key={i}
                                onClick={() => handleAskAI(q)}
                                disabled={isTyping}
                                className="text-[8px] bg-slate-900 hover:bg-slate-850 text-slate-300 px-2 py-1 rounded-lg border border-slate-800 truncate max-w-[200px]"
                              >
                                {q}
                              </button>
                            ))}
                          </div>

                          {/* Custom Chat Input Box */}
                          <form onSubmit={(e) => { e.preventDefault(); handleAskAI(customQuestion); }} className="flex gap-1.5">
                            <input
                              type="text"
                              value={customQuestion}
                              onChange={(e) => setCustomQuestion(e.target.value)}
                              placeholder="Type custom question..."
                              disabled={isTyping}
                              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2 text-[9px] text-white focus:outline-none focus:border-cyan-500"
                            />
                            <button
                              type="submit"
                              disabled={isTyping}
                              className="px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg text-slate-950 font-bold text-[9px]"
                            >
                              Send
                            </button>
                          </form>

                        </div>
                      )}

                      {/* TYPE: POS Systems (Interactive Checkout cash register panel) */}
                      {item.type === 'pos_systems' && (
                        <div className="w-full h-full p-3 flex bg-slate-950 font-sans gap-3 overflow-hidden text-[9px]">
                          
                          {/* Products Catalogue */}
                          <div className="w-3/5 flex flex-col justify-between">
                            <div className="font-bold text-[9px] text-white border-b border-slate-900 pb-1 flex justify-between items-center">
                              <span>📦 CATALOG</span>
                              <span className="text-[7px] text-cyan-400 font-mono">TAP TO SELL</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 my-1.5 overflow-y-auto max-h-[140px]">
                              {getPOSItems(item.category).map((product) => (
                                <button
                                  key={product.id}
                                  onClick={() => handlePOSAddToCart(product)}
                                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-left border border-slate-800 flex flex-col justify-between h-[52px]"
                                >
                                  <span className="font-semibold text-slate-200 line-clamp-2 leading-tight">{product.name}</span>
                                  <span className="text-cyan-400 font-mono mt-1">${product.price.toFixed(2)}</span>
                                </button>
                              ))}
                            </div>
                            <span className="text-[7px] text-slate-500 font-mono">// POS CLIENT EMULATOR v2.4</span>
                          </div>

                          {/* Cart & Receipt calculation side panel */}
                          <div className="w-2/5 flex flex-col justify-between bg-slate-900/40 border border-slate-900 rounded-xl p-2">
                            <div className="font-bold text-white border-b border-slate-900 pb-1 text-center">
                              🧾 BILLING
                            </div>
                            
                            {/* Receipt content or items list */}
                            <div className="flex-1 my-1.5 overflow-y-auto max-h-[110px] space-y-1">
                              {posReceipt ? (
                                <div className="text-[8px] space-y-1.5 bg-slate-950 p-2 rounded-lg font-mono border border-slate-900 text-slate-300">
                                  <div className="text-center font-bold text-cyan-400 border-b border-slate-900 pb-0.5">SALE SUCCESS</div>
                                  <div className="text-[7px] text-slate-500">No: #{posReceipt.id}</div>
                                  <div className="border-b border-slate-950/20 py-0.5">
                                    {posReceipt.items.map(i => (
                                      <div key={i.id} className="flex justify-between text-[7px]">
                                        <span>{i.qty}x {i.name.substring(0, 10)}</span>
                                        <span>${(i.price * i.qty).toFixed(1)}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex justify-between font-bold text-[7px] text-white">
                                    <span>TOTAL:</span>
                                    <span>${posReceipt.total.toFixed(2)}</span>
                                  </div>
                                  <button
                                    onClick={() => setPosReceipt(null)}
                                    className="w-full py-0.5 bg-cyan-500 text-slate-950 font-bold text-[7px] rounded mt-1 font-sans"
                                  >
                                    New Sale
                                  </button>
                                </div>
                              ) : posCart.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-center text-slate-600 text-[8px] font-mono py-6">
                                  Cart is empty.<br />Click catalog items.
                                </div>
                              ) : (
                                posCart.map((cartItem) => (
                                  <div key={cartItem.id} className="flex justify-between items-center gap-1 bg-slate-950/50 p-1.5 rounded-lg border border-slate-900">
                                    <div className="flex-1 min-w-0">
                                      <span className="font-semibold text-slate-300 block truncate leading-none mb-0.5">{cartItem.name}</span>
                                      <span className="text-[7px] text-slate-500 font-mono">${cartItem.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button onClick={() => handlePOSUpdateQty(cartItem.id, -1)} className="w-4 h-4 bg-slate-900 border border-slate-800 rounded flex items-center justify-center font-bold text-slate-400">-</button>
                                      <span className="font-mono text-white text-[8px] min-w-[8px] text-center">{cartItem.qty}</span>
                                      <button onClick={() => handlePOSUpdateQty(cartItem.id, 1)} className="w-4 h-4 bg-slate-900 border border-slate-800 rounded flex items-center justify-center font-bold text-slate-400">+</button>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>

                            {/* POS checkout actions */}
                            {!posReceipt && (
                              <button
                                onClick={handlePOSCheckout}
                                disabled={posCart.length === 0}
                                className={`w-full py-1.5 rounded-lg font-bold text-center transition-all ${
                                  posCart.length > 0
                                    ? 'bg-emerald-500 text-slate-950 hover:opacity-90 active:scale-95 shadow-md shadow-emerald-500/10'
                                    : 'bg-slate-950 text-slate-600 border border-slate-850 cursor-not-allowed'
                                }`}
                              >
                                Checkout (${posCart.reduce((a,c)=>a+(c.price*c.qty), 0).toFixed(2)})
                              </button>
                            )}
                          </div>

                        </div>
                      )}

                    </div>

                    {/* Metadata Card Footer details */}
                    <div className="p-5 space-y-4" style={{ background: 'var(--card)' }}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div className="min-w-0 w-full sm:flex-1 sm:pr-1">
                          <span className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: 'var(--brand-main)' }}>
                            {categories.find(c => c.id === item.category)?.name}
                          </span>
                          <h3 className="portfolio-card-title font-display font-bold text-base sm:text-lg mt-0.5 transition-colors" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                        </div>
                        <span className="self-start px-2 py-0.5 rounded-lg text-[9px] font-bold font-mono whitespace-nowrap" style={{ background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }}>
                          {item.metrics}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                      <div className="pt-2 flex flex-wrap gap-1.5" style={{ borderTop: '1px solid var(--border)' }}>
                        {item.features.map((feature, i) => (
                          <span key={i} className="text-[9px] px-2 py-1 rounded-md font-mono" style={{ background: 'var(--background)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                            ✓ {feature}
                          </span>
                        ))}
                      </div>

                      {item.samples && item.samples.length > 0 && (
                        <button
                          onClick={() => {
                            setBrandGalleryItem(item);
                            setActiveTemplateIndex(0);
                          }}
                          className="w-full mt-2 py-2.5 rounded-xl text-xs font-semibold border text-center flex items-center justify-center gap-1.5 shadow-sm transition-all text-white bg-[var(--brand-main)] border-[var(--brand-main)] md:bg-transparent md:text-[var(--brand-main)] md:hover:bg-[var(--brand-main)] md:hover:text-white"
                        >
                          View All Samples
                          <span className="text-[10px]">→</span>
                        </button>
                      )}
                    </div>

                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-16 rounded-3xl border border-dashed space-y-3" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                  <span className="text-3xl block">📁</span>
                  <span className="font-semibold block text-sm" style={{ color: 'var(--text-secondary)' }}>No items match your criteria.</span>
                  <p className="text-xs max-w-xs mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Try switching filters. Our Next.js and POS templates are designed for multiple combinations!
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* --- PLANS & PRICING TAB PANEL --- */}
        {activeTab === "pricing" && (
          <div className="space-y-16 animate-fadeIn">
          <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl" style={{ color: 'var(--foreground)' }}>Growth Agency Plans</h2>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>Custom tailored packages. Select individual additions or check our pre-built packs.</p>
            </div>

            {/* Structured plans grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                name: "Local Starter Pack",
                  price: "499",
                  term: "/mo",
                  desc: "Ideal for bakeries, local salons, and clothing boutiques looking for high-end styling and social presence.",
                  features: [
                    "8 Custom Social Media Posts / mo",
                    "4 Satisfying Reels / video shorts / mo",
                    "Custom Hashtags & Scheduling Plan",
                    "1 Landing Page Website (Basic Config)",
                    "Basic WhatsApp Lead Widget Setups",
                    "Support turnaround: 48 Hours"
                  ],
                  popular: false,
                  btn: "Get Started Local"
                },
                {
                  name: "Growth Accelerator",
                  price: "999",
                  term: "/mo",
                  desc: "Perfect for scaling local businesses wanting modern websites and AI automations to drive conversion booking rates.",
                  features: [
                    "15 Custom Social Media Posts / mo",
                    "8 Satisfying Reels / video shorts / mo",
                    "4 Video Ad Creatives (Meta/TikTok ads)",
                    "1 Headless Next.js Website & Portfolio",
                    "Active AI Chatbot Concierge Config",
                    "Support turnaround: 24 Hours"
                  ],
                  popular: true,
                  btn: "Accelerate Growth"
                },
                {
                  name: "Enterprise Operator",
                  price: "1999",
                  term: "/mo",
                  desc: "Complete digital engineering package incorporating customized database connections, e-commerce, and point-of-sale registers.",
                  features: [
                    "Unlimited Social Creative Support",
                    "12 Satisfying Reels / Video Ads / mo",
                    "Headless Next.js Storefront (Shopify / DB)",
                    "AI Smart Spacing & Booking Assistants",
                    "Retail POS Config (Commissions & Inventory)",
                    "Priority Developer Support (Slack Chat)"
                  ],
                  popular: false,
                  btn: "Scale Enterprise"
                }
              ].map((pack, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl flex flex-col justify-between h-full relative shadow-md transition-all hover:shadow-lg"
                  style={{
                    background: 'var(--card)',
                    border: pack.popular ? '2px solid var(--brand-main)' : '1px solid var(--border)'
                  }}
                >
                  {pack.popular && (
                    <span className="absolute top-0 right-8 transform -translate-y-1/2 font-black text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow-lg text-white" style={{ background: 'linear-gradient(to right, var(--brand-main), var(--brand-hover))' }}>
                      🌟 MOST POPULAR
                    </span>
                  )}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-extrabold text-xl block" style={{ color: 'var(--foreground)' }}>{pack.name}</h3>
                      <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>{pack.desc}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-light" style={{ color: 'var(--text-secondary)' }}>$</span>
                      <span className="text-5xl font-black font-display tracking-tight" style={{ color: 'var(--foreground)' }}>{pack.price}</span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{pack.term}</span>
                    </div>

                    <ul className="space-y-3.5 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                      {pack.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs" style={{ color: 'var(--foreground)' }}>
                          <span className="font-bold text-sm" style={{ color: 'var(--brand-main)' }}>✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hello Aura Team! I am interested in signing up for the "${pack.name}" ($${pack.price}${pack.term}). Let's schedule a strategy run.`);
                      window.open(`https://wa.me/1234567890?text=${msg}`, "_blank");
                    }}
                    className="w-full py-4 rounded-2xl font-bold mt-8 text-center transition-all hover:opacity-90 active:scale-95"
                    style={{
                      background: pack.popular ? 'var(--brand-main)' : 'var(--background)',
                      color: pack.popular ? '#fff' : 'var(--foreground)',
                      border: pack.popular ? 'none' : '1px solid var(--border)'
                    }}
                  >
                    {pack.btn}
                  </button>
                </div>
              ))}
            </div>

            {/* Interactive Pricing Estimator Calculator */}
            <div className="rounded-3xl border p-6 sm:p-8 space-y-6 max-w-4xl mx-auto" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <div className="text-center sm:text-left">
                <h3 className="font-display font-extrabold text-xl" style={{ color: 'var(--foreground)' }}>Aura Interactive Package Calculator</h3>
                <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Select the services you need, and we'll calculate a bundled quote with multi-service discounts.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'posts', label: "Social Media Graphic Posts", desc: "Custom carousels & banners", price: 299 },
                  { key: 'reels', label: "Instagram Reels & Shorts", desc: "TikTok/IG short video editing", price: 399 },
                  { key: 'video', label: "Professional Video Ads", desc: "Paid media video ads", price: 599 },
                  { key: 'website', label: "Headless Next.js Website", desc: "Custom React UI, CMS, database readiness", price: 1299 },
                  { key: 'ai', label: "Intelligent AI Chatbot", desc: "Automated pre-sales & slot booking", price: 799 },
                  { key: 'pos', label: "Tailored POS System Setup", desc: "Tip splitting, inventory tracking setup", price: 999 }
                ].map((item) => (
                  <label
                    key={item.key}
                    className="p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none"
                    style={{
                      background: calcItems[item.key] ? 'rgba(103,7,7,0.05)' : 'var(--background)',
                      borderColor: calcItems[item.key] ? 'var(--brand-main)' : 'var(--border)',
                      color: 'var(--foreground)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={calcItems[item.key]}
                        onChange={() => setCalcItems(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className="rounded w-4 h-4"
                        style={{ accentColor: 'var(--brand-main)' }}
                      />
                      <div>
                        <span className="font-bold text-xs sm:text-sm block" style={{ color: 'var(--foreground)' }}>{item.label}</span>
                        <span className="text-[10px] font-medium block" style={{ color: 'var(--text-secondary)' }}>{item.desc}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-bold" style={{ color: 'var(--brand-main)' }}>${item.price}/mo</span>
                  </label>
                ))}
              </div>

              {/* Estimate total display */}
              {(() => {
                const price = calculateTotalEstimate();
                return (
                  <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="text-center sm:text-left">
                      <span className="text-[10px] font-mono uppercase tracking-widest font-semibold block" style={{ color: 'var(--text-secondary)' }}>MONTHLY ESTIMATE</span>
                      <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-1">
                        <span className="text-2xl font-light" style={{ color: 'var(--text-secondary)' }}>$</span>
                        <span className="text-4xl sm:text-5xl font-black font-display tracking-tight" style={{ color: 'var(--foreground)' }}>{price.total}</span>
                        <span className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>/mo</span>
                      </div>
                      {price.discount > 0 && (
                        <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                          🎉 Multi-service discount applied: Saved ${price.discount}/mo ({(Object.values(calcItems).filter(Boolean).length >= 5) ? '20%' : '10%'} off)
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        window.open(`https://wa.me/1234567890?text=${getCalculatorWhatsAppMsg()}`, "_blank");
                      }}
                      disabled={Object.values(calcItems).filter(Boolean).length === 0}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                      style={{
                        background: Object.values(calcItems).filter(Boolean).length > 0 ? 'var(--brand-main)' : 'var(--background)',
                        color: Object.values(calcItems).filter(Boolean).length > 0 ? '#fff' : 'var(--text-secondary)',
                        border: Object.values(calcItems).filter(Boolean).length > 0 ? 'none' : '1px solid var(--border)',
                        cursor: Object.values(calcItems).filter(Boolean).length === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <span>💬 Request Quote via WhatsApp</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

      </main>

      {/* Media Lightbox Zoom Modal */}
      {brandGalleryItem && (() => {
        const templates = getBrandTemplates(brandGalleryItem.category);
        const hasSamples = brandGalleryItem.samples && brandGalleryItem.samples.length > 0;
        const itemsCount = hasSamples ? brandGalleryItem.samples.length : templates.length;
        const currentItem = hasSamples ? brandGalleryItem.samples[activeTemplateIndex] : (templates[activeTemplateIndex] || {});
        const colors = !hasSamples ? (currentItem.colors || ["#FAF5FF", "#F3E8FF", "#8B5CF6"]) : ["#FAF5FF", "#F3E8FF", "#8B5CF6"];
        
        return (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
            onClick={() => setBrandGalleryItem(null)}
          >
            {/* Sticky Screen close button for mobile & desktop */}
            <button
              onClick={() => setBrandGalleryItem(null)}
              className="fixed top-4 right-4 z-[60] w-10 h-10 rounded-full bg-slate-900/90 border border-slate-800 text-white flex items-center justify-center text-2xl font-bold shadow-xl transition-all active:scale-95 hover:bg-slate-950"
              title="Close Gallery"
            >
              &times;
            </button>

            <div
              className="max-w-5xl w-full rounded-3xl border shadow-2xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden relative max-h-[88vh] md:max-h-none animate-scaleUp"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* Left Panel: High Fidelity Interactive Mockup Canvas */}
              <div
                className="w-full md:w-3/5 p-6 flex flex-col items-center justify-center relative min-h-[440px] md:min-h-[520px]"
                style={{
                  background: 'radial-gradient(circle, var(--background) 0%, var(--card) 100%)',
                  backgroundImage: 'radial-gradient(rgba(103,7,7,0.03) 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              >
                {/* Mobile Preview Badge */}
                <div className="absolute top-4 left-4 px-2 py-0.5 rounded-md text-[9px] font-mono tracking-widest font-extrabold uppercase border animate-pulse" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', background: 'var(--card)' }}>
                  {hasSamples ? "✨ Premium Live Gallery" : "📱 Interactive Showcase"}
                </div>

                {hasSamples ? (
                  /* Show Real Sample Image Directly (No Phone Shell) */
                  <div className="relative w-full max-w-sm sm:max-w-md h-[360px] sm:h-[420px] rounded-2xl border border-slate-800 bg-slate-950/80 shadow-2xl overflow-hidden flex flex-col select-none group">
                    <div className="flex-1 relative w-full h-full">
                      <Image
                        src={currentItem.image}
                        alt={currentItem.caption || brandGalleryItem.title}
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                    {/* Caption Bar */}
                    <div className="w-full bg-slate-950 border-t border-slate-900 px-4 py-3 flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-4">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider text-white bg-red-600 mb-1">
                          ✨ LIVE WORK
                        </span>
                        <p className="text-[11px] font-semibold text-slate-100 truncate">
                          {currentItem.caption}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold text-slate-400 bg-slate-900 border border-slate-800">
                        {brandGalleryItem.type === 'posts' ? 'Graphic Post' : brandGalleryItem.type === 'reels' ? 'Reel Video' : 'Video Ad'}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Simulated Phone Shell Container (For Style Templates) */
                  <div className="relative w-64 h-[400px] rounded-[36px] border-8 border-slate-900 shadow-2xl overflow-hidden flex flex-col bg-slate-950">
                    
                    {/* Phone Speaker Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-b-xl z-20"></div>

                    {/* Template Custom Live Render Screen */}
                    <div
                      className="flex-1 p-5 flex flex-col justify-between relative transition-all duration-500 select-none overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`
                      }}
                    >
                      {/* Header: Logo & Options */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{currentItem.icon || "✨"}</span>
                          <span className="text-[8px] font-mono font-black tracking-wider uppercase text-slate-800">
                            {brandGalleryItem.title.split(" ")[0]}
                          </span>
                        </div>
                        <span className="text-[9px] font-black text-slate-700 select-none">•••</span>
                      </div>

                      {/* Main Layout Area based on dynamic style */}
                      <div className="flex-1 flex flex-col justify-center py-4 space-y-3">
                        {/* Sub-badge accent */}
                        <span className="inline-block self-start px-2 py-0.5 rounded-full text-[7px] font-mono font-bold tracking-wider text-white shadow-sm" style={{ background: colors[2] }}>
                          {currentItem.accent}
                        </span>

                        {/* Main Big Headline */}
                        <h4 className="font-display font-black text-lg leading-tight tracking-tight text-slate-900">
                          {currentItem.title}
                        </h4>

                        {/* Accent highlight line */}
                        <div className="w-10 h-1.5 rounded" style={{ background: colors[2] }}></div>

                        {/* Tagline / Subtitle */}
                        <p className="text-[10px] font-bold text-slate-800 leading-snug">
                          {currentItem.tagline}
                        </p>

                        {/* Short Description */}
                        <p className="text-[8px] text-slate-600 leading-relaxed font-medium">
                          {currentItem.desc}
                        </p>
                      </div>

                      {/* Bottom: Simulated Engagement Stats */}
                      <div className="pt-2 border-t border-slate-900/10 flex items-center justify-between">
                        <div className="flex gap-2 text-slate-600 text-[10px]">
                          <span>❤️</span>
                          <span>💬</span>
                          <span>➔</span>
                        </div>
                        <div className="px-2 py-1 rounded-md text-[7px] font-mono font-black text-white shadow-sm" style={{ background: 'var(--brand-main)' }}>
                          Book Now →
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Left/Right Fast Arrow Buttons for swipe mockup */}
                <div className="absolute inset-x-4 flex justify-between pointer-events-none">
                  <button
                    disabled={activeTemplateIndex === 0}
                    onClick={() => setActiveTemplateIndex(p => p - 1)}
                    className="w-9 h-9 rounded-full bg-white/90 shadow hover:bg-white flex items-center justify-center text-slate-800 font-bold text-sm pointer-events-auto transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                  >
                    ←
                  </button>
                  <button
                    disabled={activeTemplateIndex === itemsCount - 1}
                    onClick={() => setActiveTemplateIndex(p => p + 1)}
                    className="w-9 h-9 rounded-full bg-white/90 shadow hover:bg-white flex items-center justify-center text-slate-800 font-bold text-sm pointer-events-auto transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Right Panel: Template Navigation & Custom strategy form */}
              <div
                className="w-full md:w-2/5 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l space-y-6"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider block" style={{ color: 'var(--brand-main)' }}>
                      {hasSamples ? "Premium Client Deliverables" : "Interactive Design Suite"}
                    </span>
                    <h3 className="font-display font-extrabold text-xl leading-tight" style={{ color: 'var(--foreground)' }}>
                      {brandGalleryItem.title}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-2xl text-xs space-y-2 border" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] tracking-wider uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                        {hasSamples ? "Selected Sample" : "Selected Template"}
                      </span>
                      <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold text-white bg-slate-900">
                        {activeTemplateIndex + 1} of {itemsCount}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs" style={{ color: 'var(--foreground)' }}>
                      {hasSamples ? currentItem.caption : currentItem.title}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed text-[11px]">
                      {hasSamples 
                        ? `Real work example for our ${brandGalleryItem.title} campaign. This shows high-fidelity layout, optimized design components, and premium styling.` 
                        : currentItem.desc}
                    </p>
                    <div className="pt-2 flex items-center justify-between border-t" style={{ borderColor: 'var(--border)' }}>
                      <span className="font-semibold text-[10px]" style={{ color: 'var(--text-secondary)' }}>Target Impact:</span>
                      <span className="font-mono font-extrabold text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {hasSamples ? brandGalleryItem.metrics : currentItem.metric}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail pagination selectors grid */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold tracking-wider uppercase block" style={{ color: 'var(--text-secondary)' }}>
                      Explore Brand Suite ({itemsCount} {hasSamples ? 'Samples' : 'Templates'})
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {hasSamples ? (
                        brandGalleryItem.samples.map((sample, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveTemplateIndex(idx)}
                            className="aspect-square rounded-xl border relative overflow-hidden transition-all group/thumb hover:scale-105"
                            style={{
                              borderColor: activeTemplateIndex === idx ? 'var(--brand-main)' : 'var(--border)',
                              borderWidth: activeTemplateIndex === idx ? '2px' : '1px'
                            }}
                          >
                            <Image
                              src={sample.image}
                              alt={sample.caption || `Sample ${idx + 1}`}
                              fill
                              sizes="60px"
                              className="object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                            />
                            <div className={`absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold ${
                              activeTemplateIndex === idx 
                                ? 'bg-red-950/40 text-white font-extrabold' 
                                : 'bg-black/50 text-slate-300 opacity-0 group-hover/thumb:opacity-100 transition-opacity'
                            }`}>
                              {String(idx + 1).padStart(2, '0')}
                            </div>
                          </button>
                        ))
                      ) : (
                        templates.map((t, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveTemplateIndex(idx)}
                            className="aspect-square rounded-lg border font-mono text-[10px] font-bold flex items-center justify-center transition-all"
                            style={{
                              borderColor: activeTemplateIndex === idx ? 'var(--brand-main)' : 'var(--border)',
                              background: activeTemplateIndex === idx ? 'rgba(103,7,7,0.08)' : 'var(--card)',
                              color: activeTemplateIndex === idx ? 'var(--brand-main)' : 'var(--text-secondary)',
                              borderWidth: activeTemplateIndex === idx ? '2px' : '1px'
                            }}
                          >
                            {String(idx + 1).padStart(2, '0')}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Instant Quote / WhatsApp setup button */}
                <button
                  onClick={() => {
                    const msg = hasSamples
                      ? encodeURIComponent(`Hi Aura Team! I am viewing the live work gallery for "${brandGalleryItem.title}". I am interested in custom work similar to sample ${activeTemplateIndex + 1}: "${currentItem.caption}". Can we discuss my custom requirements?`)
                      : encodeURIComponent(`Hi Aura Team! I am exploring the Brand Design Suite for "${brandGalleryItem.title}". I absolutely love the style of Template ${activeTemplateIndex + 1}: "${currentItem.title}" (${currentItem.accent}). Can we customize this set for my business?`);
                    window.open(`https://wa.me/1234567890?text=${msg}`, "_blank");
                  }}
                  className="w-full py-3.5 rounded-2xl text-xs font-bold text-white shadow-xl shadow-red-950/10 flex items-center justify-center gap-2 hover:opacity-95 transition-all transform active:scale-95"
                  style={{
                    background: 'var(--brand-main)'
                  }}
                >
                  {hasSamples ? "🚀 Discuss Similar Custom Work" : "🚀 Setup This Brand Template Set"}
                </button>

                {/* Mobile-only Close / Back Button */}
                <button
                  onClick={() => setBrandGalleryItem(null)}
                  className="w-full py-3 rounded-2xl text-xs font-bold text-center block md:hidden border transition-all active:scale-95 shadow-sm"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'var(--background)',
                    color: 'var(--foreground)'
                  }}
                >
                  ← Back to Showcase
                </button>
              </div>

            </div>
          </div>
        );
      })()}
      
      {/* Media Lightbox Zoom Modal */}

      {/* Floating Business WhatsApp widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Chat window bubble */}
        {waChatOpen && (
          <div className="w-[320px] rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl flex flex-col mb-4 animate-fadeIn">
            {/* WhatsApp green styled header */}
            <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-xl font-bold font-display shadow-inner">
                  💬
                </div>
                <div>
                  <span className="font-bold text-sm block">Aura Growth Chat</span>
                  <span className="text-[10px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block animate-pulse"></span>
                    Typically replies instantly
                  </span>
                </div>
              </div>
              <button
                onClick={() => setWaChatOpen(false)}
                className="text-white hover:text-emerald-200 text-xl font-semibold select-none leading-none"
              >
                &times;
              </button>
            </div>

            {/* Chat background and initial chat bubbles */}
            <div className="bg-slate-950 p-4 space-y-3 max-h-[220px] overflow-y-auto">
              <div className="bg-slate-900 border border-slate-800/80 p-3 rounded-2xl rounded-tl-none text-xs text-slate-300 leading-relaxed shadow-sm">
                Hey there! We are Jordan & Alex, founders of Aura Agency. 👋
              </div>
              <div className="bg-slate-900 border border-slate-800/80 p-3 rounded-2xl rounded-tl-none text-xs text-slate-300 leading-relaxed shadow-sm">
                Tell us about your brand (e.g. cake bakery, hair salon, clothing shop, lighting agency) and the deliverables you are looking for. Let's build your custom quote!
              </div>
            </div>

            {/* Chat message typing and send box */}
            <div className="p-3 border-t border-slate-900 bg-slate-900/20 flex gap-2 items-center">
              <textarea
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 resize-none bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSendWaChat}
                className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/15"
              >
                ➔
              </button>
            </div>
          </div>
        )}

        {/* Floating whatsapp green logo button */}
        <button
          onClick={() => setWaChatOpen(prev => !prev)}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95 group relative border border-emerald-400/30"
        >
          {/* WhatsApp SVG path logo inside */}
          <svg className="w-7 h-7 fill-slate-950" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.449 5.4 0 9.794-4.302 9.797-9.593.001-2.561-1.002-4.97-2.825-6.793C16.42 2.393 14.017 1.39 11.458 1.39c-5.4 0-9.8 4.303-9.802 9.594-.001 1.905.504 3.764 1.464 5.378L2.094 20.35l4.553-1.196zM17.07 14.37c-.285-.143-1.688-.833-1.948-.928-.26-.096-.45-.143-.64.143-.19.285-.736.928-.902 1.118-.166.19-.332.214-.617.071-.285-.143-1.204-.444-2.294-1.416-.848-.756-1.42-1.69-1.586-1.976-.166-.285-.018-.44.124-.581.128-.127.285-.333.428-.5.143-.166.19-.285.285-.476.095-.19.048-.357-.024-.5-.071-.143-.64-1.543-.877-2.11-.23-.556-.464-.48-.64-.489-.165-.008-.355-.01-.546-.01-.191 0-.501.071-.763.357-.262.285-1 .977-1 2.38 0 1.402 1.02 2.756 1.163 2.946.143.19 2.01 3.067 4.869 4.297.68.293 1.212.468 1.626.599.684.218 1.308.187 1.8.114.549-.082 1.688-.69 1.925-1.357.237-.667.237-1.238.166-1.357-.07-.119-.26-.19-.545-.333z" />
          </svg>
          {/* Animated notification dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[7px] text-white font-bold animate-bounce mt-[-2px] mr-[-2px]">
            1
          </span>
        </button>
      </div>

      {/* Main Footer */}
      <footer className="mt-auto py-10 text-center text-xs" style={{ borderTop: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <span className="font-display font-extrabold" style={{ color: 'var(--foreground)' }}>AURA GROWTH PARTNERS</span>
            <span style={{ color: 'var(--border)' }}>|</span>
            <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Digital Agency</span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Crafting custom social media creatives, conversion-ready React applications, and custom integrated systems. Let us grow your local business.
          </p>
          <div className="text-[10px] pt-2 max-w-xs mx-auto" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} Aura Agency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
