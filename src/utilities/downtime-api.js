import sendRequest from './send-request';

const BASE_URL = `https://bargewrightinn.herokuapp.com/user`;

export function getById(username, charId, downtimeId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/downtime/${downtimeId}`);
}

export function createNew(username, charId, downtimeData) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/downtime/`, 'POST', downtimeData);
}

export function editDowntime(username, charId, downtimeId, downtimeData) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/downtime/${downtimeId}/`, 'PUT', downtimeData);
}

export function deleteDowntime(username, charId, downtimeId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/downtime/${downtimeId}`, 'DELETE');
}