export interface Homestay {
  id: string;
  title: string;
  description: string;
  price: number;
  imageURL?: string; // Keep for backward compatibility
  imageURLs: string[]; // Array of image URLs
  mainImageURL: string; // Main image URL (first image)
  airbnbLink: string;
  phone: string;
  timestamp: number;
  updatedAt?: number;
  updatedBy?: string;
}

export interface WelcomeContent {
  id: string;
  content: string;
  title: string;
  subtitle: string;
  updatedAt?: number;
  updatedBy?: string;
}

export interface AboutUsContent {
  id: string;
  mainTitle: string;
  mainDescription: string;
  introText: string;
  ourStory: {
    title: string;
    content: string;
  };
  localExperience: {
    title: string;
    content: string;
  };
  whyChooseUs: {
    title: string;
    benefits: string[];
  };
  updatedAt?: number;
  updatedBy?: string;
}

export interface User {
  uid: string;
  email: string;
} 