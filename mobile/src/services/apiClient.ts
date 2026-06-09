const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

function withDefaultHeaders(headers: HeadersInit = {}): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...headers,
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('EXPO_PUBLIC_API_BASE_URL is not configured')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    headers: withDefaultHeaders(),
  })

  if (!response.ok) {
    throw new Error(`GET ${path} failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}
