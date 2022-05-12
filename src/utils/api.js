const baseUrl = process.env.API_URL || 'http://localhost:8080';

export const get = async url => {
  const token = localStorage.getItem('token') || '';
  const res = await fetch(`${baseUrl}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? ({ 'x-auth-token': token }) : {})
    },
  });

  if (res.ok) {
    const response = await res.json();

    return response.body;
  }

  if (res.status === 403) {
    await updateToken();
  }

  throw new Error('error');
}

export const post = async (url, body, params) => {
  const token = localStorage.getItem('token') || '';
  const res = await fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? ({ 'x-auth-token': token }) : {})
    },
    body: JSON.stringify(body),
    ...params,
  });

  if (res.ok) {
    const response = await res.json()

    return response.body;
  }

  if (res.status === 403) {
    await updateToken();
  }

  throw new Error('error');
}

export const updateToken = async () => {
  const token = localStorage.getItem('token') || '';
  const res = await fetch(`${baseUrl}/api/auth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? ({ 'x-auth-token': token }) : {})
    },
  });

  if (res.ok) {
    const response = await res.json();

    window.localStorage.setItem('token', response.body.token);
    return response.body
  }

  throw new Error('error');
}

export const modalsRequest = async (url, body , isFormData = false, method = 'POST') => {
  const token = localStorage.getItem('token') || '';
  const res = await fetch(`${baseUrl}${url}`, {
    method,
    body: isFormData ? body : JSON.stringify(body),
    headers: {
      ...(!isFormData ? ({ 'Content-Type' : 'application/json' }) : {}),
      ...(token ? ({ 'x-auth-token': token }) : {}),
    }
  });

  if (res.ok) {
    const response = await res.json();

    return { success: true, body: response.body }
  }

  return { success: false }
};

export const deleteRequest = async (url) => {
  const token = localStorage.getItem('token') || '';
  const res = await fetch(`${baseUrl}${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type' : 'application/json',
      ...(token ? { 'x-auth-token': token } : {}),
    }
  });

  if (res.ok) {
    const response = await res.json();

    return { success: true, body: response.body }
  }

  return { success: false }
}