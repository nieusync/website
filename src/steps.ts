import { post } from './api';
import { landingOrigin } from './origin';

/**
 * Counts how far visitors get through a tool, so we can see at which stage
 * people leave. Sent to website-api, which keeps a count per day, tool, step
 * and campaign and nothing else: no name, no address, no cookie and nothing
 * stored on the visitor's device, so it works for everyone, not only for the
 * visitors who accept analytics cookies.
 *
 * ponytail: off until Legal confirms that counting without consent is allowed
 * here. Some EU guidance reads any request the browser sends for statistics as
 * needing consent, cookie or not. Flip `ENABLED` to true once that is settled;
 * nothing else changes.
 */
const ENABLED = false;

/** The stages of a tool in the order a visitor passes them. website-api refuses any other. */
export type ToolStep = 'view' | 'details' | 'answered' | 'results';

/**
 * Adds this visitor to the count for one step. Fire and forget: a count that
 * fails to arrive is one number off, and never worth an error on the page.
 */
export function countStep(form: string, step: ToolStep) {
  if (!ENABLED) return;
  post('/api/steps', { form, step, origin: landingOrigin() }).catch((error) =>
    console.error('step count failed', error),
  );
}
