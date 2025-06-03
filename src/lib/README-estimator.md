# Estimator Library Files

This directory will contain the library files needed for the estimaitor integration.

## Files to Add

- **types.ts** - Types and interfaces for the estimator

  - Quote interfaces
  - Parameter types
  - Form field types

- **constants.ts** - Constants used by the estimator

  - SCOPE_OF_WORK options
  - Default values
  - Price multipliers

- **utils.ts** (merge with existing or create new file)
  - Quote number generation
  - Price calculation functions
  - Formatting utilities
  - PDF generation helpers

## Integration Notes

- Check for conflicts with existing utils.ts
- May need to update import paths in components
- Add tests for new functionality if applicable
