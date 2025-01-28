import api from './api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthTokens> => {
  const response = await api.post('/token/', credentials);
  const tokens = response.data;
  
  // Store tokens
  localStorage.setItem('accessToken', tokens.access);
  localStorage.setItem('refreshToken', tokens.refresh);
  
  return tokens;
};

export const refreshToken = async (): Promise<string> => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) throw new Error('No refresh token found');

  const response = await api.post('/token/refresh/', { refresh });
  const newAccessToken = response.data.access;
  
  localStorage.setItem('accessToken', newAccessToken);
  return newAccessToken;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};
