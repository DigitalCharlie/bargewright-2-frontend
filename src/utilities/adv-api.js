import sendRequest from './send-request';

const BASE_URL = `https://bargewrightinn.herokuapp.com/user`;

export function getById(username, charId, advId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/${advId}`);
}

export function createNew(username, charId, advData) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/`, 'POST', advData);
}

export function editAdv(username, charId, advId, advData) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/${advId}/`, 'PUT', advData);
}

export function deleteAdv(username, charId, advId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/${advId}`, 'DELETE');
}