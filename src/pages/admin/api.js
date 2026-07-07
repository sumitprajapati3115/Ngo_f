export const getApiUrl = () => {
  // Use VITE_API_URL from environment variables, with a fallback for local development
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${getApiUrl()}${endpoint}`;
  const token = localStorage.getItem('token');

  const config = {
    ...options,
    headers: {
      ...options.headers,
    },
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // Automatically stringify body if it's a plain object and not FormData.
  // Also sets the Content-Type header, unless it's already set.
  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
  }

  // If the request body is already a JSON string, make sure the backend can parse it.
  if (config.body && typeof config.body === 'string' && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    if (response.status === 404 || response.status === 501) {
      throw new Error('यह सुविधा अभी प्रक्रिया में है। आगे का काम जारी है।');
    }
    let errorMessage = `An error occurred: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Ignore if response is not JSON
    }
    throw new Error(errorMessage);
  }

  // Handle cases where the response might be empty
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const text = await response.text();
    return text ? JSON.parse(text) : {}; // Handle empty JSON response
  }

  return response.text(); // Or handle as needed
};