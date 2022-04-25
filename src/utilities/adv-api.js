import sendRequest from './send-request';

const BASE_URL = `http://localhost:8080/user`;

export function createNew(username, charId, advData) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/new`, 'POST', advData);
}