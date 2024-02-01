export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchData<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}/${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }
  return response.json();
}
