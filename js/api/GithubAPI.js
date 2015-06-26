// exports.fetchJialezhang = () => {
//   var deferred = new $.Deferred;

//   $.ajax({
//     url: 'http://api.github.com/users/jialezhang',
//     dataType:  'jsonp',
//     data:      { format: 'jsonp' },
//     success: (result) => {
//       deferred.resolve(result);
//     },
//     error: () => {
//       deferred.reject();
//       alert('error getting posts. please try again later');
//     }
//   });
//   /* 保证请求状态不会被外界修改 */
//   return deferred.promise();
// };
import { fetchQuery, fetchUser } from '../utils/APIUtils';

export function getQuery(query) {
  return fetchQuery(query);
}
export function getUser(login, url = `users/${login}`) {
  return fetchUser(url);
}
