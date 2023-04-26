const API_BASE_URL = import.meta.env.VITE_API_HOST || 'http://34.117.219.34/';
/**
 * Performs a fetch request with the given method and data, use key 'buildify-token' in localStorage
 * @param {string} url - The url to fetch
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE)
 * @param {object} [data] - Optional data object to include in the request body
 * @param {object} [extendHeaders] - Optional extended config headers
 * @returns {Promise} A Promise that resolves with the response data or rejects with the error
 */

export const fetchWithBuildifyToken = (
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
  extendHeaders?: any
) => {
  const url = path.includes('http') ? path : API_BASE_URL + path;
  const token = localStorage.getItem('buildify-token') || '';
  if (method === 'GET' || method === 'DELETE') {
    const fetchUrl = data
      ? `${url}?${new URLSearchParams(data).toString()}`
      : url;
    return fetch(fetchUrl, {
      method,
      headers: {
        ...extendHeaders,
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .catch((error) => {
        // handle error
      });
  }
  const headers = {
    'Content-Type': 'application/json',
    ...extendHeaders,
    Authorization: token,
  };
  let body = data;
  if (headers['Content-Type'] === 'multipart/form-data') {
    delete headers['Content-Type'];
  } else {
    body = JSON.stringify(data);
  }
  return fetch(url, {
    method,
    headers,
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .catch((error) => {
      // handle error
    });
};
