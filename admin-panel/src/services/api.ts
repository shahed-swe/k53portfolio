import axios from 'axios';
import { getAccessToken, refreshToken, logout } from './auth';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        // If refresh token fails, logout and redirect to login
        logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Projects
export const getProjects = () => api.get('/projects/');
export const getProject = (id: number) => api.get(`/projects/${id}/`);
export const createProject = (data: any) => api.post('/projects/', data);
export const updateProject = (id: number, data: any) => api.put(`/projects/${id}/`, data);
export const deleteProject = (id: number) => api.delete(`/projects/${id}/`);
export const assignTeamMember = (projectId: number, employeeId: number) => 
  api.post(`/projects/${projectId}/assign_team_member/`, { employee_id: employeeId });

// Employees
export const getEmployees = () => api.get('/employees/');
export const getEmployee = (id: number) => api.get(`/employees/${id}/`);
export const createEmployee = (data: any) => api.post('/employees/', data);
export const updateEmployee = (id: number, data: any) => api.put(`/employees/${id}/`, data);
export const deleteEmployee = (id: number) => api.delete(`/employees/${id}/`);

// Services
export const getServices = () => api.get('/services/');
export const getService = (id: number) => api.get(`/services/${id}/`);
export const createService = (data: any) => api.post('/services/', data);
export const updateService = (id: number, data: any) => api.put(`/services/${id}/`, data);
export const deleteService = (id: number) => api.delete(`/services/${id}/`);

// Contact Messages
export const getContactMessages = () => api.get('/contact-messages/');
export const getContactMessage = (id: number) => api.get(`/contact-messages/${id}/`);
export const updateContactMessage = (id: number, data: any) => api.put(`/contact-messages/${id}/`, data);
export const deleteContactMessage = (id: number) => api.delete(`/contact-messages/${id}/`);
export const markMessageAsRead = (id: number) => api.post(`/contact-messages/${id}/mark_as_read/`);
export const updateMessageStatus = (id: number, status: string) => 
  api.post(`/contact-messages/${id}/update_status/`, { status });

// Testimonials
export const getTestimonials = () => api.get('/testimonials/');
export const getTestimonial = (id: number) => api.get(`/testimonials/${id}/`);
export const createTestimonial = (data: any) => api.post('/testimonials/', data);
export const updateTestimonial = (id: number, data: any) => api.put(`/testimonials/${id}/`, data);
export const deleteTestimonial = (id: number) => api.delete(`/testimonials/${id}/`);

// Contact Information
export const getContactInformation = () => api.get('/contact-info/');
export const updateContactInformation = (id: number, data: any) => api.put(`/contact-info/${id}/`, data);

export default api;
