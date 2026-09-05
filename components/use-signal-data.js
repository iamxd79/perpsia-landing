"use client";

import { useCallback, useEffect, useState } from "react";

const initialState = {
  data: null,
  error: false,
  loading: true,
};

export function useSignalData(refreshMs = 90000) {
  const [state, setState] = useState(initialState);

  const load = useCallback(async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch("/api/signals", {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Signal feed request failed");
      const data = await response.json();
      setState({ data, error: false, loading: false });
    } catch {
      setState((current) => ({ ...current, error: true, loading: false }));
    } finally {
      window.clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    // The first request is the effect's external subscription boundary.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    const interval = window.setInterval(load, refreshMs);
    return () => window.clearInterval(interval);
  }, [load, refreshMs]);

  return { ...state, refresh: load };
}
