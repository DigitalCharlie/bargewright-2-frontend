import sendRequest from './send-request';

const BASE_URL = `http://localhost:8080/user`;

export function createNew(username, charData) {
  return sendRequest(`${BASE_URL}/${username}/character/new`, 'POST', charData);
}

export function getById(username, id) {
  return sendRequest(`${BASE_URL}/${username}/character/${id}`);
}

export function editChar(username, id, charData) {
  return sendRequest(`${BASE_URL}/${username}/character/${id}/edit`, 'PUT', charData);
}

export async function getAllAdv (username, charId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/all`)
}