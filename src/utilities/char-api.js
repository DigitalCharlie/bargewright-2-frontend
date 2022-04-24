import sendRequest from './send-request';

const BASE_URL = `http://localhost:8080/user`;

export function createNew(username, charData) {
  return sendRequest(`${BASE_URL}/${username}/character/new`, 'POST', charData);
}