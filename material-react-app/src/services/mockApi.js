// Mock API service for development when backend is not available
const MOCK_ENABLED = true; // Set to false when backend is available

const mockResponses = {
  '/user/auto-login': {
    method: 'GET',
    response: () => Promise.reject(new Error('Not authenticated')),
  },
  '/user/notifications': {
    method: 'GET',
    response: () => Promise.resolve([]),
  },
  '/admin/update-profile': {
    method: 'PUT',
    response: () => Promise.reject(new Error('Not authenticated')),
  },
  '/admin/admin/register-super-admin': {
    method: 'POST',
    response: () => Promise.reject(new Error('Registration not available')),
  },
};

export const mockFetch = async (url, options = {}) => {
  if (!MOCK_ENABLED) {
    return fetch(url, options);
  }

  // Extract the path from the URL
  const urlObj = new URL(url, 'http://localhost:8080');
  const path = urlObj.pathname;
  
  console.log(`🔧 Mock API call: ${options.method || 'GET'} ${path}`);
  
  const mockResponse = mockResponses[path];
  
  if (mockResponse) {
    try {
      const data = await mockResponse.response();
      return {
        ok: true,
        status: 200,
        json: () => Promise.resolve(data),
      };
    } catch (error) {
      return {
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: error.message }),
      };
    }
  }
  
  // If no mock found, return 404
  return {
    ok: false,
    status: 404,
    json: () => Promise.resolve({ error: 'Endpoint not found' }),
  };
};

// Replace global fetch with mock when enabled
if (MOCK_ENABLED && typeof window !== 'undefined') {
  window.originalFetch = window.fetch;
  window.fetch = (url, options) => {
    // Only mock localhost:8080 calls
    if (typeof url === 'string' && url.includes('localhost:8080')) {
      return mockFetch(url, options);
    }
    return window.originalFetch(url, options);
  };
}
