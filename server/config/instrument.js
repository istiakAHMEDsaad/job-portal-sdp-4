// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://314192488f26c64ad8d381f530504345@o4510339330867200.ingest.us.sentry.io/4510339431923712",
  integrations: [nodeProfilingIntegration(), Sentry.mongooseIntegration()],
  // tracesSampleRate: 1.0, // Capture 100% of the transaction
  // sendDefaultPii: true,
});
// Manually call startProfiler and stopProfiler
// to profile the code in between
Sentry.profiler.startProfiler();

// Starts a transaction that will also be profiled
Sentry.startSpan(
  {
    name: "My First Transaction",
  },
  () => {
    // the code executing inside the transaction will be wrapped in a span and profiled
  }
);

// Calls to stopProfiling are optional - if you don't stop the profiler. it will keep profilling
// your application until the process exits or stopProfiling is called.
Sentry.profiler.stopProfiler();
