import { FormData, EstimateData, ProjectType, CleaningType } from '@/lib/types';
import {
  BASE_RATE_PER_SQFT,
  PROJECT_TYPE_MULTIPLIERS,
  CLEANING_TYPE_MULTIPLIERS,
  getVCTCostPerSqFt,
  calculateHourlyTravelFee,
  HOTEL_COST_PER_NIGHT,
  PER_DIEM_PER_DAY,
  URGENCY_MULTIPLIERS,
  WINDOW_CLEANING,
  DISPLAY_CASE,
  PRESSURE_WASHING,
  SALES_TAX_RATE,
  MARKUP_PERCENTAGE
} from '@/lib/constants';

// Calculate base price based on square footage and project type
export function calculateBasePrice(squareFootage: number, projectType: ProjectType): number {
  const basePrice = squareFootage * BASE_RATE_PER_SQFT;
  const multiplier = PROJECT_TYPE_MULTIPLIERS[projectType] || 1;
  return basePrice * multiplier;
}

// Calculate VCT flooring cost with tiered pricing
export function calculateVCTCost(vctSquareFootage: number, hasVCT: boolean): number {
  return hasVCT ? vctSquareFootage * getVCTCostPerSqFt(vctSquareFootage) : 0;
}

// Calculate travel cost using new hourly-based fee structure
export function calculateTravelCost(distance: number): number {
  return calculateHourlyTravelFee(distance);
}

// Calculate overnight stay cost
export function calculateOvernightCost(
  stayingOvernight: boolean,
  numberOfNights: number,
  numberOfCleaners: number
): number {
  if (!stayingOvernight || numberOfNights <= 0) return 0;

  const roomsNeeded = Math.ceil(numberOfCleaners / 2); // 2 people per room
  const hotelCost = roomsNeeded * HOTEL_COST_PER_NIGHT * numberOfNights;
  const perDiemCost = numberOfCleaners * PER_DIEM_PER_DAY * numberOfNights;

  return hotelCost + perDiemCost;
}

// Calculate window cleaning cost
export function calculateWindowCleaningCost(
  numberOfWindows: number,
  numberOfLargeWindows: number,
  numberOfHighAccessWindows: number
): number {
  const standardCost = numberOfWindows * WINDOW_CLEANING.COST_PER_WINDOW;
  const largeCost = numberOfLargeWindows * WINDOW_CLEANING.COST_PER_WINDOW * WINDOW_CLEANING.LARGE_WINDOW_MULTIPLIER;
  const highAccessCost = numberOfHighAccessWindows * WINDOW_CLEANING.COST_PER_WINDOW * WINDOW_CLEANING.HIGH_ACCESS_MULTIPLIER;

  return standardCost + largeCost + highAccessCost;
}

// Calculate display case cleaning cost
export function calculateDisplayCaseCost(numberOfDisplayCases: number): number {
  return numberOfDisplayCases * DISPLAY_CASE.COST_PER_CASE;
}

// Calculate pressure washing cost
export function calculatePressureWashingCost(area: number, type: 'standard' | 'commercial' = 'standard'): number {
  return area * PRESSURE_WASHING.COST_PER_SQFT;
}

// Calculate urgency multiplier
export function calculateUrgencyMultiplier(urgencyLevel: number): number {
  return URGENCY_MULTIPLIERS[urgencyLevel] || 1;
}

// Calculate estimated hours with optimized calculation
export function calculateEstimatedHours(
  squareFootage: number,
  numberOfCleaners: number,
  cleaningType: CleaningType
): number {
  // Base hours calculation (assuming 500 sq ft per person per hour)
  const baseHours = squareFootage / (500 * numberOfCleaners);
  
  // Apply cleaning type multiplier
  const multiplier = CLEANING_TYPE_MULTIPLIERS[cleaningType] || 1;
  
  return baseHours * multiplier;
}

// Calculate total estimate with new pricing structure
export function calculateTotalEstimate(
  basePrice: number,
  vctCost: number,
  travelCost: number,
  overnightCost: number,
  pressureWashingCost: number,
  windowCleaningCost: number,
  displayCaseCost: number,
  urgencyMultiplier: number,
  applyMarkup: boolean = true
): { totalBeforeMarkup: number; markup: number; salesTax: number; totalPrice: number } {
  const totalBeforeMarkup = (
    basePrice + vctCost + travelCost + overnightCost + 
    pressureWashingCost + windowCleaningCost + displayCaseCost
  ) * urgencyMultiplier;

  const markup = applyMarkup ? totalBeforeMarkup * MARKUP_PERCENTAGE : 0;
  const totalWithMarkup = totalBeforeMarkup + markup;
  const salesTax = totalWithMarkup * SALES_TAX_RATE;
  const totalPrice = totalWithMarkup + salesTax;

  return {
    totalBeforeMarkup,
    markup,
    salesTax,
    totalPrice
  };
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Format square footage
export function formatSquareFootage(sqft: number): string {
  return new Intl.NumberFormat('en-US').format(sqft) + ' sq ft';
}

// Format time estimate
export function formatTimeEstimate(hours: number): string {
  if (hours < 4) return '2-4 hours';
  if (hours < 8) return '4-8 hours';
  if (hours < 16) return '1-2 days';
  if (hours < 40) return '3-5 days';
  return '5+ days';
} 