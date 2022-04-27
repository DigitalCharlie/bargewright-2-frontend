import sendRequest from './send-request';

const BASE_URL = `http://localhost:8080/user`;

export function createNew(username, charId, magicItemData) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/magicItem/new`, 'POST', magicItemData);
}