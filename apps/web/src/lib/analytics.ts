// Google Analytics 4 event tracking utility
// Safely calls gtag if it exists (respects user consent via Klaro)

export const trackEvent = (eventName: string, eventData?: Record<string, string | number>) => {
  if (typeof window === 'undefined') return;

  try {
    const gtag = (window as any).gtag;
    if (gtag) {
      gtag('event', eventName, eventData || {});
    }
  } catch (error) {
    // Silently fail if gtag is not available
    console.debug('GA4 tracking unavailable:', error);
  }
};

// Pre-defined events for Planutrip
export const analytics = {
  // Signup conversion
  signupComplete: () => {
    trackEvent('sign_up', {
      method: 'email',
    });
  },

  // Trip creation
  tripCreated: (destinationCity: string) => {
    trackEvent('trip_created', {
      destination: destinationCity,
    });
  },

  // Trip shared/invite sent
  tripShared: (collaboratorCount: number) => {
    trackEvent('trip_shared', {
      collaborators: collaboratorCount,
    });
  },

  // Form submission
  contactFormSubmitted: () => {
    trackEvent('contact_form_submit');
  },

  // Page-specific events
  featureViewed: (featureName: string) => {
    trackEvent('feature_viewed', {
      feature: featureName,
    });
  },

  // Itinerary item created
  itineraryItemCreated: () => {
    trackEvent('itinerary_item_created');
  },
};
