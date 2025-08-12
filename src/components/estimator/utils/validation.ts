import { FormData } from '@/lib/types';

// Validate square footage
export function validateSquareFootage(value: number): string | null {
  if (!value || value <= 0) {
    return 'Square footage is required and must be greater than 0';
  }
  if (value > 1000000) {
    return 'Square footage cannot exceed 1,000,000';
  }
  return null;
}

// Validate gas price
export function validateGasPrice(value: number): string | null {
  if (!value || value < 1) {
    return 'Gas price must be at least $1.00';
  }
  if (value > 10) {
    return 'Gas price cannot exceed $10.00';
  }
  return null;
}

// Validate number of cleaners
export function validateNumberOfCleaners(value: number): string | null {
  if (!value || value < 1) {
    return 'At least 1 cleaner is required';
  }
  if (value > 50) {
    return 'Number of cleaners cannot exceed 50';
  }
  return null;
}

// Validate overnight stays
export function validateOvernightStay(formData: FormData): string | null {
  if (formData.stayingOvernight) {
    if (!formData.numberOfNights || formData.numberOfNights < 1) {
      return 'Number of nights is required for overnight stays';
    }
    if (formData.numberOfNights > 30) {
      return 'Number of nights cannot exceed 30';
    }
  }
  return null;
}

// Validate window counts
export function validateWindowCounts(formData: FormData): string | null {
  if (formData.needsWindowCleaning) {
    const totalWindows = (formData.numberOfWindows || 0) +
      (formData.numberOfLargeWindows || 0) +
      (formData.numberOfHighAccessWindows || 0);
    
    if (totalWindows === 0) {
      return 'At least one window must be specified when window cleaning is selected';
    }
    if (totalWindows > 1000) {
      return 'Total number of windows cannot exceed 1,000';
    }
  }
  return null;
}

// Validate pressure washing
export function validatePressureWashing(formData: FormData): string | null {
  if (formData.needsPressureWashing && (!formData.pressureWashingArea || formData.pressureWashingArea <= 0)) {
    return 'Pressure washing area is required and must be greater than 0';
  }
  return null;
}

// Validate display cases
export function validateDisplayCases(formData: FormData): string | null {
  if (formData.projectType === 'jewelry_store' && formData.numberOfDisplayCases > 0) {
    if (formData.numberOfDisplayCases > 100) {
      return 'Number of display cases cannot exceed 100';
    }
  }
  return null;
}

// Validate entire form
export function validateForm(formData: FormData): { [key: string]: string } {
  const errors: { [key: string]: string } = {};

  // Required fields
  if (!formData.projectType) errors.projectType = 'Project type is required';
  if (!formData.cleaningType) errors.cleaningType = 'Cleaning type is required';
  
  // Square footage
  const sqftError = validateSquareFootage(formData.squareFootage);
  if (sqftError) errors.squareFootage = sqftError;

  // Gas price
  const gasPriceError = validateGasPrice(formData.gasPrice);
  if (gasPriceError) errors.gasPrice = gasPriceError;

  // Number of cleaners
  const cleanersError = validateNumberOfCleaners(formData.numberOfCleaners);
  if (cleanersError) errors.numberOfCleaners = cleanersError;

  // Overnight stay
  const overnightError = validateOvernightStay(formData);
  if (overnightError) errors.numberOfNights = overnightError;

  // Window cleaning
  const windowError = validateWindowCounts(formData);
  if (windowError) errors.windowCounts = windowError;

  // Pressure washing
  const pressureWashingError = validatePressureWashing(formData);
  if (pressureWashingError) errors.pressureWashingArea = pressureWashingError;

  // Display cases
  const displayCasesError = validateDisplayCases(formData);
  if (displayCasesError) errors.numberOfDisplayCases = displayCasesError;

  return errors;
} 