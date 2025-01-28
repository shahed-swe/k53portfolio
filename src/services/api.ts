const API_BASE_URL = 'http://localhost:8000/api';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: number;
  name: string;
  designation: string;
  department: string;
  bio: string;
  email: string;
  phone: string | null;
  image: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  client: string;
  start_date: string;
  end_date: string | null;
  status: string;
  technologies: string[];
  image: string | null;
  team_members: Employee[];
  created_at: string;
  updated_at: string;
}

export interface ContactInformation {
  id: number;
  address: string;
  email: string;
  phone: string;
  working_hours: string;
  google_maps_url: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class ApiService {
  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format: not JSON");
      }

      const data = await response.json();
      console.log(`Response from ${endpoint}:`, data);

      // For list endpoints, ensure we have an array
      if (endpoint.endsWith('/')) {
        if (!Array.isArray(data)) {
          console.error('Invalid response format:', data);
          throw new Error('Invalid response format: expected an array');
        }
      }

      return data as T;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  private async postData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
    }
  }

  async getServices(): Promise<Service[]> {
    return this.fetchData<Service[]>('services/');
  }

  async getEmployees(): Promise<Employee[]> {
    return this.fetchData<Employee[]>('employees/');
  }

  async getProjects(): Promise<Project[]> {
    return this.fetchData<Project[]>('projects/');
  }

  async getContactInformation(): Promise<ContactInformation> {
    const response = await this.fetchData<ContactInformation[]>('contact-info/');
    return response[0]; // We only have one contact information record
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.fetchData<Testimonial[]>('testimonials/');
  }

  async sendContactMessage(message: ContactMessage): Promise<any> {
    return this.postData('contact-messages/', message);
  }
}

export const apiService = new ApiService();
