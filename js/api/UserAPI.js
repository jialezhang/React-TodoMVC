import { fetchUser } from '../utils/APIUtils';

export function getUser(login, url = `users/${login}`) {
  return fetchUser(url);
}