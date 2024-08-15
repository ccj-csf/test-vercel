'use client';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://b70fad8155973eaa9001dcf65f029bf7@o4507484294938624.ingest.us.sentry.io/4507507538919424',
  integrations: [
    // See docs for support of different versions of variation of react router
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    Sentry.browserTracingIntegration(),
    // Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  environment: process.env.NEXT_PUBLIC_ENV,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: [
    'localhost',
    'gptxai',
    'characterx',
    'api.gptxai.fun',
    'sandbox-api.characterx.ai',
    'api-miniapp.characterx.ai',
  ],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
