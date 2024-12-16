export type Beach = {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  isHealthy: boolean;
  tideStatus: string;
  hasLifeguards: boolean;
  lifeguardSchedule?: string;
};