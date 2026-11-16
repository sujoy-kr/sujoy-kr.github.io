import data from "./designs.json";

export type DesignImage = {
  src: string;
  caption: string;
  width: number;
  height: number;
};
export type Design = {
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: { src: string; width: number; height: number };
  images: DesignImage[];
};

export const designs: Design[] = data.map((design) => ({
  ...design,
  images: design.images.map((image, i) => ({
    ...image,
    caption: `Design view ${i + 1}`,
  })),
}));

export const designBn: Record<string, string> = {
  "agency-website-landing-page-design": "সাহসী টাইপোগ্রাফি ও স্পষ্ট সেবা-বিভাগ নিয়ে সাজানো একটি ক্রিয়েটিভ এজেন্সির ল্যান্ডিং পেজ।",
  "apex-footwear-ltd-landing-page-design": "পণ্যের ছবি ও স্পষ্ট কল-টু-অ্যাকশনকে প্রাধান্য দেওয়া একটি জুতার ব্র্যান্ডের ল্যান্ডিং পেজ।",
  "apple-iphone-13-alpine-green-product-page-ui-design": "ডিভাইস ও তার মূল বৈশিষ্ট্যে মনোযোগ রেখে অ্যালপাইন গ্রিন আইফোন ১৩-এর প্রোডাক্ট পেজ।",
  "csgo-knife-marketplace-concept-design": "গাঢ় ও গেম-অনুপ্রাণিত ইন্টারফেসে সিএস:জিও নাইফ স্কিন দেখা ও কেনার মার্কেটপ্লেস ধারণা।",
  "finance-website-ui-design": "পরিষ্কার ও আস্থাজাগানো বিন্যাসে পণ্য ও সংখ্যা উপস্থাপন করা একটি ফাইন্যান্স ওয়েবসাইট।",
  "headphone-product-page-ui-design": "বড় ছবি ও কেন্দ্রীভূত তথ্য দিয়ে সাজানো একটি হেডফোনের প্রোডাক্ট পেজ।",
  "honda-cbr-landing-page": "শক্তিশালী হিরো ও স্পষ্ট স্পেসিফিকেশন-বিভাগসহ হোন্ডা সিবিআর স্পোর্টস বাইকের ল্যান্ডিং পেজ।",
  "ios-weather-app-design": "বর্তমান আবহাওয়া ও পূর্বাভাসের বিস্তারিত স্পষ্টভাবে দেখানো একটি আইওএস আবহাওয়া অ্যাপ।",
  "interior-design-website-landing-page": "শান্ত বিন্যাসে স্থানগুলোকেই মূল চরিত্র করে তোলা একটি ইন্টেরিয়র ডিজাইন স্টুডিওর ল্যান্ডিং পেজ।",
  "jack-daniels-whisky-product-page": "গাঢ় রঙ ও দৃঢ় পণ্য-উপস্থাপনায় জ্যাক ড্যানিয়েল’স হুইস্কির প্রোডাক্ট পেজ।",
  "mv-agusta-rush-motorcycle-product-page": "বাইকটির নকশা ফুটিয়ে তুলতে তৈরি এমভি অগাস্টা রাশ মোটরসাইকেলের প্রোডাক্ট পেজ।",
  "pottery-website-product-page": "নরম রঙ ও প্রতিটি শিল্পকর্মের জন্য পর্যাপ্ত জায়গাসহ হাতে তৈরি মৃৎপাত্রের দোকানের প্রোডাক্ট পেজ।",
  "prothom-alo-landing-page": "পাঠযোগ্যতা ও স্পষ্ট বিন্যাসের কথা ভেবে বাংলা সংবাদ সাইট প্রথম আলোর ল্যান্ডিং পেজ নতুন করে ভাবার প্রস্তাব।",
  "real-estate-landing-page": "সম্পত্তির তালিকা ও অনুসন্ধানকে কেন্দ্রে রাখা একটি রিয়েল এস্টেট ল্যান্ডিং পেজ।",
  "unique-404-error-page-design": "বন্ধ গলিকে বন্ধুত্বপূর্ণ ও স্মরণীয় মুহূর্তে বদলে দেওয়া একটি ৪০৪ এরর পেজ।",
  "veloce-bike-home-page": "সাইকেলটিকে তুলে ধরা হিরোসহ সাইকেল ব্র্যান্ড ভেলোচে-র হোম পেজের ধারণা।",
  "web-dashboard-ui-design": "তথ্যকে স্পষ্ট প্যানেল ও চার্টে সাজানো একটি ওয়েব ড্যাশবোর্ড।",
  "white-slate-cube-product-page-ui-design": "পরিচ্ছন্ন, মিনিমাল ধাঁচে উপস্থাপিত হোয়াইট স্লেট কিউবের প্রোডাক্ট পেজ।",
};
