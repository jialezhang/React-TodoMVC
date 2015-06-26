import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

import 'core-js/es6/promise';
import 'whatwg-fetch';


const querySchema = new Schema('query', { idAttribute: 'query' });
const userSchema = new Schema('user', { idAttribute: 'login' });

/* const API_ROOT = 'http://hn.algolia.com/api/v1/search?query=' */
const API_ROOT = 'http://api.github.com/'
/* 随意搜索 */
/* search?query=';
   搜索指定用户
   http://hn.algolia.com/api/v1/users/:username */

/**
 * Fetches an API response and normalizes the result JSON according to schema.
 */
function fetchAndNormalize(url, schema) {
  if (url.indexOf(API_ROOT) === -1) {
    url = API_ROOT + url;
  }

  return fetch(url).then(response =>
    response.json().then(json => {
      /* humps.camelize("hello_world"); // "helloWorld" */
      /* var object = {
         attr_one: "foo",
         attr_two: "bar"
         };

         object = humps.camelizeKeys(object);

         object.attrOne === "foo"; // true
         object.attrTwo === "bar"; // true
       */
      console.log('json');
      console.log(schema);
      console.log(json);
      const camelizedJson = camelizeKeys(json);
      console.log("normalize");
      console.log(normalize(camelizedJson, schema));
      console.log('上面的出现了么');
      return {
        ...normalize(camelizedJson, schema)
      };
    })
  );
}

export function fetchQuery(query) {
  console.log('start');
  const test = fetchAndNormalize(query, querySchema);
  console.log(test)
  return  test;
}

export function fetchUser(url) {
  return fetchAndNormalize(url, userSchema);
}

export function fetchUserArray(url) {
  return fetchAndNormalize(url, arrayOf(userSchema));
}

export function fetchRepo(url) {
  return fetchAndNormalize(url, repoSchema);
}

export function fetchRepoArray(url) {
  return fetchAndNormalize(url, arrayOf(repoSchema));
}
