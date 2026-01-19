import apiClient from './apiClient';

export interface Site {
  id: number;
  name: string;
  location: string;
  status: string;
}

class SiteService {
  async getUserSites(): Promise<Site[]> {
    const response = await apiClient.get<Site[]>('/sites/me');
    return response.data;
  }
}

export default new SiteService();
