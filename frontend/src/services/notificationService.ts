import apiClient from './apiClient';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  priority: string;
  isRead: boolean;
  actionUrl: string | null;
  createdAt: string;
}

export interface NotificationPage {
  content: Notification[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

class NotificationService {
  async getNotifications(page: number = 0, size: number = 20): Promise<NotificationPage> {
    const response = await apiClient.get<NotificationPage>('/notifications', {
      params: { page, size }
    });
    return response.data;
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    const response = await apiClient.put<Notification>(`/notifications/${notificationId}/read`);
    return response.data;
  }

  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<number>('/notifications/unread-count');
    return response.data;
  }
}

export default new NotificationService();
