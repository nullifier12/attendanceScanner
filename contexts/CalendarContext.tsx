import { useAuth } from "@/contexts/AuthContext";
import Constants from "expo-constants";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type CalendarEvent = {
  title: string;
  color?: string;
  time?: string;
};

export type CalendarEventsByDate = {
  [yyyyMmDd: string]: CalendarEvent[];
};

interface CalendarContextType {
  eventsByDate: CalendarEventsByDate;
  isLoading: boolean;
  error: string | null;
  setEventsFromApi: (apiEvents: any[]) => void;
  loadEvents: () => Promise<void>;
  clear: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

function normalizeToYyyyMmDd(dateString: string | null | undefined): string | null {
  if (!dateString) return null;
  const trimmed = String(dateString).trim();
  // Already in YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  // MM/DD/YYYY -> YYYY-MM-DD
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
    const [mm, dd, yyyy] = trimmed.split("/");
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  // Fallback: try Date parsing
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  return null;
}

function parseYyyyMmDdToDate(yyyyMmDd: string): Date {
  const [yyyyStr, mmStr, ddStr] = yyyyMmDd.split("-");
  const yyyy = Number(yyyyStr);
  const mm = Number(mmStr);
  const dd = Number(ddStr);
  return new Date(yyyy, mm - 1, dd);
}

function formatDateToYyyyMmDd(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function transformApiToCalendarMap(apiEvents: any[]): CalendarEventsByDate {
  const map: CalendarEventsByDate = {};
  for (const ev of apiEvents || []) {
    const fromDateRaw = ev?.el_fromdate ?? ev?.el_origin_todate;
    const toDateRaw = ev?.el_todate ?? ev?.el_origin_todate ?? fromDateRaw;
    const startKey = normalizeToYyyyMmDd(fromDateRaw);
    const endKey = normalizeToYyyyMmDd(toDateRaw);
    if (!startKey) continue;

    const title: string = ev?.el_eventname ?? "Event";
    const color: string | undefined = ev?.el_tagcolor || undefined;
    const fromTime: string | undefined = ev?.el_fromstart || undefined;
    const toTime: string | undefined = ev?.el_tostart || undefined;
    const hasTimes = Boolean(fromTime || toTime);
    const time = hasTimes ? [fromTime, toTime].filter(Boolean).join(" - ") : undefined;

    const item: CalendarEvent = { title, color, time };

    // If no end date, just add to the start date
    if (!endKey) {
      if (!map[startKey]) map[startKey] = [];
      map[startKey].push(item);
      continue;
    }

    // Expand inclusively from start to end dates
    const startDate = parseYyyyMmDdToDate(startKey);
    const endDate = parseYyyyMmDdToDate(endKey);
    if (isNaN(startDate.getTime())) continue;
    if (isNaN(endDate.getTime()) || endDate < startDate) {
      const key = startKey;
      if (!map[key]) map[key] = [];
      map[key].push(item);
      continue;
    }

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const key = formatDateToYyyyMmDd(d);
      if (!map[key]) map[key] = [];
      map[key].push(item);
    }
  }
  return map;
}

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [eventsByDate, setEventsByDate] = useState<CalendarEventsByDate>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { session } = useAuth();
  const url = Constants.expoConfig?.extra?.apiUrl;

  const setEventsFromApi = useCallback((apiEvents: any[]) => {
    try {
      const transformed = transformApiToCalendarMap(apiEvents);
      setEventsByDate(transformed);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to process calendar events");
    }
  }, []);

  const loadEvents = useCallback(async () => {
    if (!session?.token) return;
    try {
      setIsLoading(true);
      setError(null);
      const resp = await fetch(`${url}/api/mobile/getemployeeeventgeneral`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const apiData = await resp.json();
      setEventsFromApi(apiData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load calendar events");
    } finally {
      setIsLoading(false);
    }
  }, [session?.token, url, setEventsFromApi]);

  const clear = useCallback(() => {
    setEventsByDate({});
    setIsLoading(false);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({ eventsByDate, isLoading, error, setEventsFromApi, loadEvents, clear }),
    [eventsByDate, isLoading, error, setEventsFromApi, loadEvents, clear]
  );

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

export function useCalendar() {
  const ctx = useContext(CalendarContext);
  if (!ctx) throw new Error("useCalendar must be used within a CalendarProvider");
  return ctx;
}


