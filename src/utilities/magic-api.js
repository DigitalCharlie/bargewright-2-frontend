import sendRequest from './send-request';

const BASE_URL = `http://localhost:8080/user`;

export function getById(username, charId, magicItemId) {
	return sendRequest(`${BASE_URL}/${username}/character/${charId}/magicitem/${magicItemId}`);
}

export function createNew(username, charId, magicItemData) {
  return sendRequest(`${BASE_URL}/${username}/character/${charId}/magicItem/new`, 'POST', magicItemData);
}

export function editMagicItem(username, charId, magicItemId, magicItemData) {
	return sendRequest(`${BASE_URL}/${username}/character/${charId}/magicitem/${magicItemId}/edit`, 'PUT', magicItemData);
  }

export function deleteMagicItem(username, charId, magicItemId) {
	return sendRequest(`${BASE_URL}/${username}/character/${charId}/magicitem/${magicItemId}`, 'DELETE');
}