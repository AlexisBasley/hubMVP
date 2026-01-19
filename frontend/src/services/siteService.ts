import apiClient from './apiClient';

export interface Site {
  id: number;
  name: string;
  location: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteDTO {
  id: number;
  name: string;
  location: string;
  status: string;
}

class SiteService {
  /**
   * Get current user's assigned sites (legacy endpoint - returns DTOs)
   */
  async getUserSites(): Promise<SiteDTO[]> {
    const response = await apiClient.get<SiteDTO[]>('/sites/me');
    return response.data;
  }

  /**
   * Get all sites
   */
  async getAllSites(): Promise<Site[]> {
    const response = await apiClient.get<Site[]>('/sites');
    return response.data;
  }

  /**
   * Get active sites only
   */
  async getActiveSites(): Promise<Site[]> {
    const response = await apiClient.get<Site[]>('/sites?status=active');
    return response.data;
  }

  /**
   * Get site by ID
   */
  async getSiteById(id: number): Promise<Site> {
    const response = await apiClient.get<Site>(`/sites/${id}`);
    return response.data;
  }

  /**
   * Get sites by IDs
   */
  async getSitesByIds(ids: number[]): Promise<Site[]> {
    const response = await apiClient.post<Site[]>('/sites/by-ids', ids);
    return response.data;
  }

  /**
   * Get sites by location
   */
  async getSitesByLocation(location: string): Promise<Site[]> {
    const response = await apiClient.get<Site[]>(`/sites/location/${location}`);
    return response.data;
  }
}

export default new SiteService();
