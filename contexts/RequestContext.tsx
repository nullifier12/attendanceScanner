import Constants from "expo-constants";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

interface RequestData {
  requests: {
    leave: any[];
    ot: any[];
    ob: any[];
    disputes: any[];
  };
}

interface RequestContextType {
  requestData: RequestData;
  isLoading: boolean;
  error: string | null;
  loadInitialData: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({ children }: { children: React.ReactNode }) {
  const [requestData, setRequestData] = useState<RequestData>({
    requests: {
      leave: [],
      ot: [],
      ob: [],
      disputes: [],
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { session } = useAuth();
  const url = Constants.expoConfig?.extra?.apiUrl;

  const getUserRequest = useCallback(async () => {
    if (!session?.token || !session?.user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${url}/api/mobile/getUserRequest?id=${session.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      // Log the response for debugging
      console.log("Request API Response:", {
        dataLength: {
          leave: responseData.requests?.leave?.length || 0,
          ot: responseData.requests?.ot?.length || 0,
          ob: responseData.requests?.ob?.length || 0,
          disputes: responseData.requests?.disputes?.length || 0,
        },
      });

      // Set the data
      setRequestData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch requests");
    } finally {
      setIsLoading(false);
    }
  }, [url, session?.token, session?.user?.id]);

  const loadInitialData = useCallback(async () => {
    await getUserRequest();
  }, [getUserRequest]);

  const refreshData = useCallback(async () => {
    // Reset and fetch fresh data
    setError(null);
    await getUserRequest();
  }, [getUserRequest]);

  return (
    <RequestContext.Provider
      value={{
        requestData,
        isLoading,
        error,
        loadInitialData,
        refreshData,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error("useRequest must be used within a RequestProvider");
  }
  return context;
}
