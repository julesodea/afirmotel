## Getting Started with Afirmotel Booking

First, run the development server:

```bash
npm install

npm run dev
```

## Learn More

## Assumptions & Trade-offs

### Data & Persistence
- **Local Storage Only**: All data stored in browser localStorage using Zustand persist middleware. In production, this would be a with proper API layer.
- **No Authentication**: Single-user application. Production would require OAuth 2.0 (Google/GitHub) or auth service like Supabase/Clerk.
- **Sample Hotels**: 8 hardcoded New Zealand hotels with Unsplash images.
- **No Booking Conflicts**: Multiple bookings allowed for same dates (per requirements). Production needs room inventory and availability checking.

### Validation & Constraints
- **Client-Side Validation Only**: Custom form validation without schema library. Production requires server-side validation and security sanitization.
- **Limited Date Validation**: Basic date checks (check-out > check-in, no past dates). Production needs timezone handling, max booking windows, and date-fns/Luxon library.
- **No Guest/Duration Limits**: No occupancy limits per room type or maximum stay duration. Production needs realistic business constraints.

### Features & UX
- **No Booking Edits**: Can cancel but not modify bookings. Production needs edit functionality with price recalculation.
- **No Pagination**: All bookings/hotels load at once. Works for small datasets but production needs pagination/infinite scroll.
- **Simple Search**: Search bookings by guest name only. Production needs filtering by dates, hotels, status, price range.
- **Fixed Pricing**: Room prices constant year-round. Production needs seasonal pricing and dynamic pricing engine.
- **No Notifications**: No email/SMS confirmations. Production needs transactional email service (SendGrid/Resend).
- **No Skeleton Loaders**: Implement skeleton loaders for better UI refinement and user experience in future.

### Technical Debt
- **No Automated Tests**: Time constraint prevented Jest/Vitest + React Testing Library setup. Production requires comprehensive test coverage.
- **No Accessibility**: Missing ARIA labels, keyboard navigation, screen reader support. Production needs WCAG 2.1 AA compliance.
- **Limited Mobile Polish**: Responsive but desktop-optimized. Production should be mobile-first (most hotel bookings on mobile).
- **Styling Consistency**: Tailwind utilities used throughout. Production would benefit from more CSS custom properties and design tokens.

### Future Enhancements
- **React Query**: Add data fetching library when backend API implemented.
- **Theme System**: Expand basic color theme with dark mode and brand customization.
- **Internationalization**: Support multiple languages and currencies (currently English/NZD only).
- **Export Functionality**: Allow CSV/PDF export of bookings for reporting.

## Time Spent
Approximately just over **3 hours** total:

## Deployed on Vercel

<a href="https://afirmotel.vercel.app" target="_blank">Afirmotel Booking</a>

