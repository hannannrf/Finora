import api from './client.js';
import { toDateInputValue } from '../utils/format';

export async function getRecurring() {
  const res = await api.get('/recurring');
  return res.data.data;
}

export async function createRecurring(data) {
  const res = await api.post('/recurring', data);
  return res.data;
}

export async function updateRecurring(id, data) {
  const res = await api.patch(`/recurring/${id}`, data);
  return res.data;
}

export async function deleteRecurring(id) {
  await api.delete(`/recurring/${id}`);
}

export async function processRecurring() {
  // Send the user's own calendar date. The server runs in UTC, which is still
  // "yesterday" in Pakistan between midnight and 5 AM.
  const res = await api.post('/recurring/process', { today: toDateInputValue() });
  return res.data;
}
