export type Beach = {
  name: string;
  description: string;
  latitude: string | number;
  longitude: string | number;
  isHealthy: boolean;
  tideStatus: string;
  hasLifeguards: boolean;
  lifeguardSchedule?: string;
};
