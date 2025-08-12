// ===================== CORE TYPES =====================

export type ProjectType = 
  | 'restaurant'
  | 'fast_food'
  | 'medical'
  | 'retail'
  | 'office'
  | 'industrial'
  | 'educational'
  | 'hotel'
  | 'jewelry_store'
  | 'grocery_store'
  | 'yoga_studio'
  | 'kids_fitness'
  | 'bakery'
  | 'interactive_toy_store'
  | 'church'
  | 'arcade'
  | 'coffee_shop'
  | 'fire_station'
  | 'apartment'
  | 'warehouse'
  | 'dormitory'
  | 'dental_office'
  | 'pet_resort'
  | 'beauty_store'
  | 'mailroom'
  | 'residential'
  | 'car_wash'
  | 'construction_trailor'
  | 'other';

export type CleaningType = 'rough' | 'final' | 'rough_final' | 'rough_final_touchup' | 'pressure_washing_only' | 'vct_only' | 'window_cleaning_only';

export type PressureWashingServiceType = 
  | 'soft_wash'
  | 'roof_wash'
  | 'driveway'
  | 'deck'
  | 'trex_deck'
  | 'custom'
  | 'dumpster_corral'
  | 'commercial';

// ===================== FORM DATA INTERFACE =====================

export interface FormData {
  // Project Information
  projectType: ProjectType;
  cleaningType: CleaningType;
  squareFootage: number;
  
  // Basic Options
  hasVCT: boolean;
  vctSquareFootage: number;
  distanceFromOffice: number;
  gasPrice: number;
  applyMarkup: boolean;
  
  // Team Configuration
  numberOfCleaners: number;
  urgencyLevel: number;
  
  // Overnight Stay
  stayingOvernight: boolean;
  numberOfNights: number;
  
  // Specialty Services
  needsPressureWashing: boolean;
  pressureWashingServices: {
    type: 'soft_wash' | 'roof_wash' | 'driveway' | 'deck' | 'daily_rate';
    area: number;
    description?: string;
  }[];
  // Legacy fields for backward compatibility
  pressureWashingArea: number;
  pressureWashingType: 'soft_wash' | 'roof_wash' | 'driveway' | 'deck' | 'daily_rate';
  needsWindowCleaning: boolean;
  chargeForWindowCleaning?: boolean;
  
  // Window Details
  numberOfWindows: number;
  numberOfLargeWindows: number;
  numberOfHighAccessWindows: number;
  
  // Project-Specific
  numberOfDisplayCases: number;
  
  // Client Information (Optional)
  clientName?: string;
  projectName?: string;
}

// ===================== ESTIMATE DATA INTERFACE =====================

export interface EstimateData {
  // Base Calculations
  basePrice: number;
  cleaningTypeMultiplier: number;
  projectTypeMultiplier: number;
  
  // Additional Costs
  vctCost: number;
  travelCost: number;
  overnightCost: number;
  pressureWashingCost: number;
  windowCleaningCost: number;
  displayCaseCost: number;
  
  // Adjustments
  urgencyMultiplier: number;
  
  // Totals
  totalBeforeMarkup: number;
  markup: number;
  salesTax: number;
  totalPrice: number;
  
  // Time and Metrics
  estimatedHours: number;
  pricePerSquareFoot: number;
  timeToCompleteInDays: number;
  
  // AI and Optional Data
  aiRecommendations: string[];
  adjustedLineItems?: Record<string, number>;
  windowCount?: number;
  pressureWashingServiceDetails?: {
    [key in PressureWashingServiceType]?: {
      area: number;
      cost: number;
    };
  };
}

export interface AIRecommendationRequest {
  projectType: ProjectType;
  cleaningType: CleaningType;
  squareFootage: number;
  hasVCT: boolean;
  estimatedHours: number;
  numberOfCleaners: number;
  urgencyLevel: number;
  needsPressureWashing: boolean;
  needsWindowCleaning?: boolean;
  numberOfWindows?: number;
  numberOfLargeWindows?: number;
  numberOfHighAccessWindows?: number;
}

export interface AIRecommendationResponse {
  recommendations: string[];
}
