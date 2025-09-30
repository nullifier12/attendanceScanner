import { Announcement, AnnouncementContextType } from '@/types/announcement';
import Constants from 'expo-constants';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = Constants.expoConfig?.extra?.apiUrl;

  const loadAnnouncements = useCallback(async (token: string) => {
    if (!token || !url) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${url}/api/mobile/getannouncement`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      // Transform API data to our Announcement interface
      const transformedAnnouncements: Announcement[] = Array.isArray(data) 
        ? data.map((item: any, index: number) => ({
            id: item.id?.toString() || index.toString(),
            title: item.am_text || 'No Title',
            content: item.am_text, // Use the same text for content
            date: item.am_timeposted ? new Date(item.am_timeposted).toLocaleDateString() : new Date().toLocaleDateString(),
            priority: 'medium',
            isRead: false,
          }))
        : [];

      setAnnouncements(transformedAnnouncements);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load announcements';
      setError(errorMessage);
      console.error('Error loading announcements:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const markAsRead = useCallback((announcementId: string) => {
    setAnnouncements(prev => 
      prev.map(announcement => 
        announcement.id === announcementId 
          ? { ...announcement, isRead: true }
          : announcement
      )
    );
  }, []);

  const clearAnnouncements = useCallback(() => {
    setAnnouncements([]);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      announcements,
      isLoading,
      error,
      setAnnouncements,
      loadAnnouncements,
      markAsRead,
      clearAnnouncements,
    }),
    [announcements, isLoading, error, loadAnnouncements, markAsRead, clearAnnouncements]
  );

  return (
    <AnnouncementContext.Provider value={value}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncements() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error('useAnnouncements must be used within an AnnouncementProvider');
  }
  return context;
}
