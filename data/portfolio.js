export const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'cake', name: 'Cake Business' },
  { id: 'salon', name: 'Salons & Spa' },
  { id: 'light', name: 'Light Business' },
  { id: 'clothing', name: 'Clothing Businesses' },
  { id: 'fitness', name: 'Fitness & Gym' }
];

export const contentTypes = [
  { id: 'posts', name: 'Social Media Posts' },
  { id: 'reels', name: 'Instagram Reels' },
  { id: 'video_ads', name: 'Video Ads' },
  { id: 'websites', name: 'Websites' },
  { id: 'ai_tools', name: 'AI Integration Tools' },
  { id: 'pos_systems', name: 'POS Systems' }
];

export const portfolioItems = [
  // --- POSTS CATEGORY ---
  {
    id: 'post-cake',
    title: 'Gourmet Cake Social Media Campaign',
    category: 'cake',
    type: 'posts',
    image: '/assets/cake/posts/cake_post.png',
    description: 'High-converting visual post for Sweet Creations showcasing artisanal 3-tier custom cakes with macro floral details.',
    metrics: '+45% Booking Rate',
    features: ['High-contrast styling', 'Elegant typography', 'Mouthwatering color palette'],
    // ✅ ADD YOUR CAKE POST IMAGES HERE
    // Place your image files in /public/assets/cake/posts/ and list them below
    // Example: { image: '/assets/cake/posts/cake_post_2.png', caption: 'Chocolate Drip Cake' }
    samples: [
      { image: '/assets/cake/posts/cake_post.png', caption: 'Gourmet Cake Campaign' },
      // { image: '/assets/cake/posts/cake_post_2.png', caption: 'Add your caption here' },
      // { image: '/assets/cake/posts/cake_post_3.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'post-salon',
    title: 'Aura Premium Salon Brand Campaign',
    category: 'salon',
    type: 'posts',
    image: '/assets/salon/posts/salon_post.png',
    description: 'A glossy social media branding post for Aura Salon. Elevated typography tailored for booking luxury hair treatments.',
    metrics: '+60% Instagram Profile Visits',
    features: ['Modern editorial layout', 'Clean CTA overlay', 'Luxury gold/teal tone'],
    // ✅ ADD YOUR SALON POST IMAGES HERE
    // Place your image files in /public/assets/salon/posts/ and list them below
    samples: [
      { image: '/assets/salon/posts/salon_post.png', caption: 'Salon Brand Campaign' },
      { image: '/assets/salon/posts/salon_post_2.jpeg', caption: 'Advanced Hair Coloring' },
      { image: '/assets/salon/posts/salon_post_3.jpeg', caption: 'Luxury Styling Treatment' },
    ]
  },
  {
    id: 'post-light',
    title: 'Lumia Designer Lighting Ad Campaign',
    category: 'light',
    type: 'posts',
    image: '/assets/light/posts/light_post.png',
    description: 'Minimalist product placement post showcasing luxury lighting fixture installations with deep ambient glow.',
    metrics: '2.5x Increase in Store Directions clicks',
    features: ['Warm/cool lighting balance', 'Sleek architectural vibe', 'Sophisticated spacing'],
    // ✅ ADD YOUR LIGHTING POST IMAGES HERE
    // Place your image files in /public/assets/light/posts/ and list them below
    samples: [
      { image: '/assets/light/posts/light_post.png', caption: 'Lighting Ad Campaign' },
      // { image: '/assets/light/posts/light_post_2.png', caption: 'Add your caption here' },
      // { image: '/assets/light/posts/light_post_3.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'post-clothing',
    title: 'Urban Thread Summer Collection Post',
    category: 'clothing',
    type: 'posts',
    image: '/assets/clothing/posts/clothing_post.png',
    description: 'A minimalist fashion lookup card for Urban Thread. Clean text overlay framing organic, sustainable streetwear.',
    metrics: '+85% E-commerce Click-throughs',
    features: ['Editorial framing', 'Neutral palette contrast', 'Summer trend highlighting'],
    // ✅ ADD YOUR CLOTHING POST IMAGES HERE
    // Place your image files in /public/assets/clothing/posts/ and list them below
    samples: [
      { image: '/assets/clothing/posts/clothing_post.png', caption: 'Summer Collection Post' },
      // { image: '/assets/clothing/posts/clothing_post_2.png', caption: 'Add your caption here' },
      // { image: '/assets/clothing/posts/clothing_post_3.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'post-fitness',
    title: 'FitLife Gym Summer Campaign',
    category: 'fitness',
    type: 'posts',
    image: '/assets/fitness/posts/fitness_post.jpeg',
    description: 'Energetic, high-impact social media post for FitLife Gym designed to drive new summer membership signups.',
    metrics: '+75% Membership Enquiries',
    features: ['Bold high-contrast styling', 'Motivational typography', 'Vibrant action framing'],
    // ✅ ADD YOUR FITNESS POST IMAGES HERE
    // Place your image files in /public/assets/fitness/posts/ and list them below
    samples: [
      { image: '/assets/fitness/posts/fitness_post.jpeg', caption: 'Summer Gym Campaign' },
      { image: '/assets/fitness/posts/fitness_post2.jpeg', caption: 'Strength Training Showcase' },
      { image: '/assets/fitness/posts/fitness_post3.jpeg', caption: 'Cardio & Conditioning Session' },
    ]
  },

  // --- REELS CATEGORY ---
  {
    id: 'reel-cake',
    title: 'Decorating Masterclass Reel',
    category: 'cake',
    type: 'reels',
    image: '/assets/cake/reels/reel_mockup.png',
    description: 'Behind-the-scenes icing process reel showing the delicate frosting application of a luxury chocolate wedding cake.',
    metrics: '120k+ Views & 8k Saves',
    features: ['Trending background audio hook', 'Satisfying speed ramp cuts', 'Pre-baked caption templates'],
    // ✅ ADD YOUR CAKE REEL THUMBNAILS HERE
    // Place your image files in /public/assets/cake/reels/ and list them below
    samples: [
      { image: '/assets/cake/reels/reel_mockup.png', caption: 'Decorating Masterclass Reel' },
      // { image: '/assets/cake/reels/reel_cake_2.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'reel-salon',
    title: 'Satisfying Hair Transformation Reel',
    category: 'salon',
    type: 'reels',
    image: '/assets/salon/reels/reel_mockup.png',
    description: 'Split-second before/after balayage coloration transformation. Dynamic zoom transitions and gorgeous ambient lighting.',
    metrics: '210k+ Views & 400+ Saves',
    features: ['High-contrast color transition', 'Interactive Q&A poll in description', 'Client testimonial overlays'],
    // ✅ ADD YOUR SALON REEL THUMBNAILS HERE
    // Place your image files in /public/assets/salon/reels/ and list them below
    samples: [
      { image: '/assets/salon/reels/reel_mockup.png', caption: 'Hair Transformation Reel' },
      // { image: '/assets/salon/reels/reel_salon_2.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'reel-light',
    title: 'Ambient Room Makeover Reel',
    category: 'light',
    type: 'reels',
    image: '/assets/light/reels/reel_mockup.png',
    description: 'Visual transition reel from static white light to warm designer pendant glow, demonstrating lighting mood design.',
    metrics: '75k+ Views & 1.2k Leads',
    features: ['Before/after visual jump-cut', 'ASMR light clicking sound design', 'Shop now tag integration'],
    // ✅ ADD YOUR LIGHTING REEL THUMBNAILS HERE
    // Place your image files in /public/assets/light/reels/ and list them below
    samples: [
      { image: '/assets/light/reels/reel_mockup.png', caption: 'Ambient Room Makeover Reel' },
      // { image: '/assets/light/reels/reel_light_2.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'reel-clothing',
    title: 'Summer Outfit Styling Reel',
    category: 'clothing',
    type: 'reels',
    image: '/assets/clothing/reels/reel_mockup.png',
    description: 'Fast-paced street styling lookbook showing a model combining five summer streetwear basics in an urban location.',
    metrics: '340k+ Views & 12k Shares',
    features: ['Sync-to-beat audio editing', 'Quick transition jumps', 'Swipe up link for purchase'],
    // ✅ ADD YOUR CLOTHING REEL THUMBNAILS HERE
    // Place your image files in /public/assets/clothing/reels/ and list them below
    samples: [
      { image: '/assets/clothing/reels/reel_mockup.png', caption: 'Summer Outfit Styling Reel' },
      // { image: '/assets/clothing/reels/reel_clothing_2.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'reel-fitness',
    title: '12-Week Transformation Journey Reel',
    category: 'fitness',
    type: 'reels',
    image: '/assets/fitness/reels/reel_mockup.png',
    description: 'High-energy, fast-tempo before/after transformation reel showcasing training sessions, form execution, and client success.',
    metrics: '280k+ Views & 15k Saves',
    features: ['High-beat audio sync editing', 'Split-screen progress transitions', 'Call-to-action link overlays'],
    // ✅ ADD YOUR FITNESS REEL THUMBNAILS HERE
    // Place your image files in /public/assets/fitness/reels/ and list them below
    samples: [
      { image: '/assets/fitness/reels/reel_mockup.png', caption: '12-Week Transformation Reel' },
    ]
  },

  // --- VIDEO ADS ---
  {
    id: 'video-cake',
    title: 'Sweet Creations Commercial Video Ad',
    category: 'cake',
    type: 'video_ads',
    image: '/assets/cake/video_ads/video_ad.png',
    description: 'High-definition cinematic promo video capturing slow-motion caramel drips, gold leaf dusting, and fresh strawberry topping.',
    metrics: '3.4% Purchase Conversion Rate',
    features: ['Cinematic color grading', '4K high-speed macros', 'Direct reservation link'],
    // ✅ ADD YOUR CAKE VIDEO AD THUMBNAILS HERE
    // Place your image files in /public/assets/cake/video_ads/ and list them below
    samples: [
      { image: '/assets/cake/video_ads/video_ad.png', caption: 'Sweet Creations Video Ad' },
      // { image: '/assets/cake/video_ads/video_cake_2.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'video-salon',
    title: 'Unveil Your Glamour Video Ad',
    category: 'salon',
    type: 'video_ads',
    image: '/assets/salon/video_ads/video_ad.jpeg',
    description: 'Highly professional, upbeat commercial for digital screens showcasing the full client experience from massage to final styling.',
    metrics: '40% Lower Cost-Per-Click (CPC)',
    features: ['Brand storytelling structure', 'Satisfying sound elements', 'Localized targeting strategy'],
    // ✅ ADD YOUR SALON VIDEO AD THUMBNAILS HERE
    // Place your image files in /public/assets/salon/video_ads/ and list them below
    samples: [
      { image: '/assets/salon/video_ads/video_ad.jpeg', caption: 'Unveil Your Glamour Ad' },
      // { image: '/assets/salon/video_ads/video_salon_2.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'video-light',
    title: 'Lumia Concept Video Showreel',
    category: 'light',
    type: 'video_ads',
    image: '/assets/light/video_ads/video_ad.png',
    description: 'A dark, relaxing architectural walkthrough showing lighting setups inside a high-end luxury smart apartment.',
    metrics: '+55% Commercial Client Leads',
    features: ['Calming ambient score', 'Smart home automation sync', 'B2B target positioning'],
    // ✅ ADD YOUR LIGHTING VIDEO THUMBNAILS HERE
    // Place your image files in /public/assets/light/video_ads/ and list them below
    samples: [
      { image: '/assets/light/video_ads/video_ad.png', caption: 'Lumia Concept Showreel' },
      // { image: '/assets/light/video_ads/video_light_2.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'video-clothing',
    title: 'Urban Thread Brand Anthem Video',
    category: 'clothing',
    type: 'video_ads',
    image: '/assets/clothing/video_ads/video_ad.png',
    description: 'Cinematic brand story shoot emphasizing recycled fabrics, raw textures, and slow urban lifestyles in modern cities.',
    metrics: '65% Retargeting ROI Improvement',
    features: ['Sustainable message emphasis', 'Vibrant urban color palette', 'YouTube/Instagram ad cutdowns'],
    // ✅ ADD YOUR CLOTHING VIDEO THUMBNAILS HERE
    // Place your image files in /public/assets/clothing/video_ads/ and list them below
    samples: [
      { image: '/assets/clothing/video_ads/video_ad.png', caption: 'Urban Thread Brand Anthem' },
      // { image: '/assets/clothing/video_ads/video_clothing_2.png', caption: 'Add your caption here' },
    ]
  },
  {
    id: 'video-fitness',
    title: 'FitLife Brand Anthem Commercial',
    category: 'fitness',
    type: 'video_ads',
    image: '/assets/fitness/video_ads/video_ad.png',
    description: 'Cinematic brand promo capturing raw workout sessions, professional trainer coaching, and group class energy.',
    metrics: '4.2% Ad Conversion Rate',
    features: ['Cinematic color grading', 'Intense motivational score', 'Direct slot reservation links'],
    // ✅ ADD YOUR FITNESS VIDEO THUMBNAILS HERE
    // Place your image files in /public/assets/fitness/video_ads/ and list them below
    samples: [
      { image: '/assets/fitness/video_ads/video_ad.png', caption: 'FitLife Brand Anthem' },
    ]
  },

  // --- WEBSITES (Interactive Mockups rendered via React Component) ---
  {
    id: 'web-cake',
    title: 'Sweet Creations E-commerce Platform',
    category: 'cake',
    type: 'websites',
    description: 'An interactive cake ordering platform allowing customers to pick tiers, fillings, decorations, and schedule delivery.',
    metrics: '8.2% Direct Sales Conversion',
    features: ['3D tier customizer preview', 'Real-time booking calendar', 'Express checkout integration']
  },
  {
    id: 'web-salon',
    title: 'Aura Booking Portal & CMS',
    category: 'salon',
    type: 'websites',
    description: 'A clean, spa-themed interface with live slot checking, stylist selectors, and automated WhatsApp/email confirmation.',
    metrics: '92% Automated Booking Success',
    features: ['Stylist schedule sync', 'Pre-payment support', 'SMS appointment reminders']
  },
  {
    id: 'web-light',
    title: 'Lumia Interactive B2B Catalog',
    category: 'light',
    type: 'websites',
    description: 'A dynamic showroom catalog featuring detailed 3D lux mapping, specification sheet downloads, and bulk pricing quote forms.',
    metrics: '3x Contractor Inquiries',
    features: ['Dialux file downloads', 'Interactive lighting calculator', 'Client portal dashboards']
  },
  {
    id: 'web-clothing',
    title: 'Urban Thread Headless Shopify App',
    category: 'clothing',
    type: 'websites',
    description: 'Next.js storefront optimized for mobile-first loading, feature size-selection engines, and custom outfit creator boards.',
    metrics: '98/100 Lighthouse Performance',
    features: ['0.4s page loading times', 'Animated quick-cart slider', 'Personalized look recommendation']
  },
  {
    id: 'web-fitness',
    title: 'FitLife Member Portal & Booking App',
    category: 'fitness',
    type: 'websites',
    description: 'A Next.js responsive web application for gym check-ins, personal trainer schedules, and class pass purchasing.',
    metrics: '94% Online Check-in Adoption',
    features: ['Real-time trainer schedules', 'Class credit payment portal', 'Progress tracking charts']
  },

  // --- AI TOOLS (Interactive Assistant in card) ---
  {
    id: 'ai-cake',
    title: 'AI Flavor & Occasion Advisor',
    category: 'cake',
    type: 'ai_tools',
    description: 'An AI-powered concierge chatbot assisting users in choosing the perfect cake flavor, sizing, and design based on guest count and theme.',
    metrics: '85% Customer Pre-sales Resolution',
    features: ['Natural language flavor profiling', 'Guest count automatic scaling', 'Chef order sheet output']
  },
  {
    id: 'ai-salon',
    title: 'AI Hair Style & Color Consult',
    category: 'salon',
    type: 'ai_tools',
    description: 'A custom chatbot evaluating hair type, skin undertone, and desired maintenance levels to suggest styles and hair treatments.',
    metrics: '50% Higher High-Ticket Appointments',
    features: ['Skin undertone diagnostic questionnaire', 'Custom styling routines generator', 'Direct stylist matching algorithm']
  },
  {
    id: 'ai-light',
    title: 'AI Lighting Design Planner',
    category: 'light',
    type: 'ai_tools',
    description: 'A smart assistant calculating lighting fixtures (lumens, fixture types, spacing) based on room dimensions and desired ambiance.',
    metrics: 'B2B Sales Cycle Reduced by 4 Days',
    features: ['Lux calculation API', 'Warm vs cool color suggestions', 'Automated shopping list creation']
  },
  {
    id: 'ai-clothing',
    title: 'AI Personal Fashion Stylist',
    category: 'clothing',
    type: 'ai_tools',
    description: 'An intelligent shopping assistant matching user wardrobe preferences and body shapes to curate personalized outfit packs.',
    metrics: '+28% Average Order Value (AOV)',
    features: ['Occasion-based matching', 'Real-time color matching rules', 'One-click bundle buy button']
  },
  {
    id: 'ai-fitness',
    title: 'AI Personal Coach & Diet Planner',
    category: 'fitness',
    type: 'ai_tools',
    description: 'An integrated chatbot using natural language to calculate daily macros, build workout schedules, and suggest meal prep recipes.',
    metrics: '+45% Trainer Lead Conversions',
    features: ['Macro ratio calculator API', 'Dynamic workout routines generator', 'Instant meal plan exports']
  },

  // --- POS SYSTEMS (Interactive Checkout) ---
  {
    id: 'pos-cake',
    title: 'Bakery Order & Delivery POS Customization',
    category: 'cake',
    type: 'pos_systems',
    description: 'Tailored POS terminal configuration for bakeries tracking ingredient inventory, custom order milestones, and driver dispatching.',
    metrics: '15% Ingredient Waste Reduction',
    features: ['Recipe-to-inventory link', 'Custom cake status pipeline', 'SMS driver dispatcher panel']
  },
  {
    id: 'pos-salon',
    title: 'Spa-Desk Stylist Commission POS',
    category: 'salon',
    type: 'pos_systems',
    description: 'POS configuration splitting service tips, tracking stylist commissions, automating checkouts, and updating product stocks.',
    metrics: 'No Commission Disputes in 6 Months',
    features: ['Multi-stylist commission math', 'Fast checkout tap-to-pay', 'Tip split automation']
  },
  {
    id: 'pos-light',
    title: 'Wholesale Lighting Inventory Terminal',
    category: 'light',
    type: 'pos_systems',
    description: 'B2B wholesale sales register displaying bulk tier discounts, managing store stocks, and creating instant client quotes.',
    metrics: 'Zero Inventory Count Discrepancies',
    features: ['RFID tracking compatibility', 'Tiered contractor discounts', 'Custom order invoice builder']
  },
  {
    id: 'pos-clothing',
    title: 'Retail Clothing Omni-channel Checkout',
    category: 'clothing',
    type: 'pos_systems',
    description: 'Modern terminal linking brick-and-mortar sales with Shopify e-commerce stocks. Fast barcode scanning and customer loyalty tabs.',
    metrics: '100% Unified Stock Accuracies',
    features: ['Real-time Shopify sync', 'Integrated gift card scanner', 'Paperless SMS receipt dispatch']
  },
  {
    id: 'pos-fitness',
    title: 'Gym Front-Desk Check-in POS Customization',
    category: 'fitness',
    type: 'pos_systems',
    description: 'Tailored checkout register linking active memberships, scanning barcode check-ins, selling supplements, and tracking coach commission splits.',
    metrics: 'Zero Check-in Delays in Peak Hours',
    features: ['Membership card scan support', 'Supplement quick-inventory sync', 'Personal trainer commissions link']
  }
];
