export const BASE_URL = 'http://localhost:27017/api';

export function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, options);
  if (!res.ok) {
    const body = await res.json().catch(()=>({}));
    throw { status: res.status, ...body };
  }
  return res.json().catch(()=>({}));
}
