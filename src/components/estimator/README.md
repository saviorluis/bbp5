# Estimator Integration

This directory will contain the components needed for the estimaitor integration.

## Files to Add

### Components

- QuoteTemplate.tsx - Template for generating quotes
- EstimatorForm.tsx - Main estimator form component
- QuotePDF.tsx - PDF generation component (if needed)
- Any other UI components used by the estimator

### Library Files to Add (in src/lib)

- types.ts - Types and interfaces for the estimator
- constants.ts - Constants like SCOPE_OF_WORK
- utils.ts - Utility functions for formatting, quote number generation, etc.

## Required Dependencies

- @react-pdf/renderer - For PDF generation

## Integration Steps

1. Copy files from estimaitor repo
2. Update import paths as needed
3. Install dependencies
4. Connect the estimator to the existing quote form if needed
5. Test the integration

## Notes

- The estimator will be accessible at /estimate
- The existing quote form at /get-quote can remain as-is or be updated to link to the estimator
