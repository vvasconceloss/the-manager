import { useState, useEffect } from "react";
import { getVersion } from "@tauri-apps/api/app";

export function useAppVersion(): string {
  const [appVersion, setAppVersion] = useState("");

  useEffect(() => {
    getVersion()
      .then(setAppVersion)
      .catch(() => setAppVersion("0.1.0"));
  }, []);

  return appVersion;
}
