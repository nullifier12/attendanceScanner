export interface Announcement {
  id: string;
  title: string;
  content?: string;
  date: string;
  priority?: 'low' | 'medium' | 'high';
  isRead?: boolean;
}

export interface AnnouncementContextType {
  announcements: Announcement[];
  isLoading: boolean;
  error: string | null;
  setAnnouncements: (announcements: Announcement[]) => void;
  loadAnnouncements: (token: string) => Promise<void>;
  markAsRead: (announcementId: string) => void;
  clearAnnouncements: () => void;
}

