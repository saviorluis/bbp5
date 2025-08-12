# Post Construction Cleaning Calculator Components

This directory contains all the components related to the post-construction cleaning calculator.

## Directory Structure

```
estimator/
├── core/                    # Core calculator components
│   ├── EstimatorForm.tsx   # Main calculator form
│   ├── EstimateResult.tsx  # Results display
│   └── AIRecommendations.tsx # AI-powered recommendations
├── quote/                  # Quote generation components
│   ├── QuoteTemplate.tsx  # Quote template layout
│   └── QuotePDF.tsx      # PDF generation
├── ui/                    # Reusable UI components
│   └── LoadingSpinner.tsx # Loading indicator
└── utils/                 # Utility functions and helpers
    ├── calculations.ts   # Calculation logic
    └── validation.ts    # Form validation

## Features

- Professional post-construction cleaning calculator
- Accurate cost estimation based on multiple factors
- AI-powered cleaning recommendations
- Professional quote generation
- PDF export functionality
- Mobile-responsive design

## Usage

The calculator is designed to be used by administrators to generate accurate cleaning estimates. It takes into account:

- Project type (office, retail, medical, etc.)
- Square footage
- Cleaning type (rough, final, complete package)
- Additional services (window cleaning, pressure washing)
- Travel costs and overnight stays
- Urgency levels
- VCT flooring
- Display case cleaning (for jewelry stores)

## Development

When adding new features or modifying existing ones:

1. Keep components small and focused
2. Use TypeScript for type safety
3. Follow the established folder structure
4. Update tests when changing functionality
5. Document any new features or changes

## Styling

The calculator uses:
- Tailwind CSS for styling
- shadcn/ui for UI components
- Custom components for specific needs

## Future Improvements

- [ ] Add more project types
- [ ] Enhance AI recommendations
- [ ] Add more customization options
- [ ] Improve mobile experience
- [ ] Add more export formats
```
