import { registerForPushNotificationsAsync } from "@/utils/registerPushNotif";
import { EventSubscription } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
  isLoading: boolean;
  clearNotification: () => void;
  clearError: () => void;
  retryRegistration: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const notificationListener = useRef<EventSubscription | null>(null);
  const responseListener = useRef<EventSubscription | null>(null);

  const registerForNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
      console.log("✅ Push token registered:", token);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to register for notifications");
      setError(error);
      console.error("❌ Failed to register for notifications:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const clearError = () => {
    setError(null);
  };

  const retryRegistration = async () => {
    await registerForNotifications();
  };

  useEffect(() => {
    // Register for push notifications
    registerForNotifications();

    // Set up notification listeners
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("🔔 Notification Received: ", {
          title: notification.request.content.title,
          body: notification.request.content.body,
          data: notification.request.content.data,
        });
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("🔔 Notification Response: ", {
          identifier: response.notification.request.identifier,
          actionIdentifier: response.actionIdentifier,
          data: response.notification.request.content.data,
        });
        
        // Clear the notification when user taps it
        setNotification(null);
        
        // Handle the notification response here
        // You can navigate to specific screens based on the data
        const data = response.notification.request.content.data;
        if (data?.screen) {
          // Navigate to specific screen if needed
          console.log("📱 Navigate to screen:", data.screen);
        }
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        notification,
        error,
        isLoading,
        clearNotification,
        clearError,
        retryRegistration,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
