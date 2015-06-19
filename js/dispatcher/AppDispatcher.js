import { Dispatcher } from 'flux';

const flux = new Dispatcher();

export function register(callback) {
  return flux.register(callback);
}

export function waitFor(ids) {
  return flux.waitFor(ids);
}

/**
 * Dispatches a single action.
 */
export function dispatch(obj) {

  return flux.dispatch(obj);
}
