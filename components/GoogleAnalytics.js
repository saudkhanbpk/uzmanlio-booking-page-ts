'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import DOMPurify from 'dompurify';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

/**
 * Google Analytics 4 Component
 * Tracks page views and custom events for the booking page
 */

// Helper function to send page views
export const pageview = (url, additionalParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      ...additionalParams
    });
  }
};

// Helper function to send custom events
export const event = (action, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
};

// Track expert profile view
export const trackExpertProfileView = (expertId, expertName) => {
  event('view_expert_profile', {
    expert_id: expertId,
    expert_name: expertName,
    page_type: 'expert_profile',
    event_category: 'engagement',
    event_label: expertName
  });
};

// Track institution profile view
export const trackInstitutionProfileView = (institutionId, institutionName) => {
  event('view_institution_profile', {
    institution_id: institutionId,
    institution_name: institutionName,
    page_type: 'institution_profile',
    event_category: 'engagement',
    event_label: institutionName
  });
};

// Track booking initiation
export const trackBookingInitiated = (expertId, serviceType) => {
  event('booking_initiated', {
    expert_id: expertId,
    service_type: serviceType,
    event_category: 'conversion',
    event_label: 'Booking Started'
  });
};

// Track CTA button clicks
export const trackCTAClick = (buttonName, expertId) => {
  event('cta_click', {
    button_name: buttonName,
    expert_id: expertId,
    event_category: 'engagement',
    event_label: buttonName
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage, pageType, entityId) => {
  event('scroll_depth', {
    percent_scrolled: percentage,
    page_type: pageType,
    entity_id: entityId,
    event_category: 'engagement'
  });
};

// Track time on page
export const trackTimeOnPage = (seconds, pageType, entityId) => {
  event('time_on_page', {
    time_seconds: seconds,
    page_type: pageType,
    entity_id: entityId,
    event_category: 'engagement'
  });
};

// Analytics tracker component that handles page view tracking
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Extract expert ID or institution ID from URL for custom tracking
    let additionalParams = {};

    if (pathname.includes('/expert/')) {
      const expertId = pathname.split('/expert/')[1]?.split('/')[0];
      if (expertId) {
        additionalParams = {
          page_type: 'expert_profile',
          expert_id: expertId
        };
      }
    } else if (pathname.includes('/institution/')) {
      const institutionId = pathname.split('/institution/')[1]?.split('/')[0];
      if (institutionId) {
        additionalParams = {
          page_type: 'institution_profile',
          institution_id: institutionId
        };
      }
    }

    pageview(url, additionalParams);
  }, [pathname, searchParams]);

  return null;
}

// Main Google Analytics component
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    console.warn('GA4 Measurement ID not configured. Set NEXT_PUBLIC_GA4_MEASUREMENT_ID in .env');
    return null;
  }

  return (
    <>
      {/* Load Google Analytics script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* Initialize Google Analytics */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false,
              anonymize_ip: true
            });
          `)
        }}
      />

      {/* Page view tracker with Suspense boundary */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}
