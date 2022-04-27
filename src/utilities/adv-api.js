import sendRequest from './send-request';

const BASE_URL = `http://localhost:8080/user`;

export function getById(username, charId, advId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/${advId}`);
}

export function createNew(username, charId, advData) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/new`, 'POST', advData);
}

export function editAdv(username, charId, advId, advData) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/${advId}/edit`, 'PUT', advData);
}

export function deleteAdv(username, charId, advId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/${advId}`, 'DELETE');
}