import sendRequest from './send-request';

const BASE_URL = `http://localhost:8080/user`;


export function getById(username, id) {
  return sendRequest(`${BASE_URL}/${username}/character/${id}`);
}

export function createNew(username, charData) {
  return sendRequest(`${BASE_URL}/${username}/character/`, 'POST', charData);
}

export function editChar(username, id, charData) {
  return sendRequest(`${BASE_URL}/${username}/character/${id}/`, 'PUT', charData);
}

export function deleteChar(username, charId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}`, 'DELETE');
}

// GET ALL REQUESTS

export async function getAllAdv (username, charId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/adventure/all`)
}

export async function getAllMagic (username, charId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/magicitem/all`)
}

export async function getAllDowntime (username, charId) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/downtime/all`)
}
