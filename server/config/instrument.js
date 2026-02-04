import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { SENTRY_DSN } from './env.js';

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [nodeProfilingIntegration(), Sentry.mongooseIntegration()],
  // tracesSampleRate: 1.0, // dev only, reduce in production
  // profilesSampleRate: 1.0,
});
