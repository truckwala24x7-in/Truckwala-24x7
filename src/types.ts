export interface ServiceRequest {
  id: string;
  driverName: string;
  phone: string;
  vehicleNumber: string;
  vehicleModel?: string;
  problemType: string;
  symptoms: string[];
  locationText: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  photoPreviewUrl?: string;
  status: 'PENDING' | 'DISPATCHED' | 'ON_SITE' | 'RESOLVED';
  timestamp: number;
}

export type TrackingEventType =
  | 'CALL_CLICK'
  | 'WHATSAPP_CLICK'
  | 'MAP_CLICK'
  | 'FORM_SUBMITTED'
  | 'LOCATION_SHARED'
  | 'JOB_REQUESTED';

export interface TrackingEvent {
  id: string;
  type: TrackingEventType;
  label: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface DiagnosticFault {
  id: string;
  codeOrTitle: string;
  symptom: string;
  severity: 'HIGH_EMERGENCY' | 'MODERATE' | 'CRITICAL_STOP';
  commonVehicles: string;
  roadsideCheck: string;
  truckwalaSolution: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  vehicle: string;
  rating: number;
  date: string;
  content: string;
}
