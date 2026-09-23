import { DiagnosticFault, ReviewItem } from '../types';

export const BUSINESS_CONFIG = {
  name: 'TruckWala 24×7',
  tagline: "Truck Breakdown? We're Ready 24×7.",
  subTagline: 'Commercial Vehicle Service & Breakdown Assistance',
  servicePromise: 'Complete Commercial Vehicle Solution Under One Roof.',
  operatingRule: 'No Breakdown Left Unanswered.',
  phoneDisplay: '+91 94500 02407',
  phoneCall: '+919450002407',
  whatsappNumber: '919450002407',
  email: 'truckwala24x7@gmail.com',
  address: 'Gadan Khera Bypass, Unnao, Uttar Pradesh 209801',
  corridor: 'Kanpur–Unnao Transport Corridor (NH-27)',
  googleMapsUrl: 'https://maps.google.com/?q=Gadan+Khera+Bypass+Unnao+Uttar+Pradesh',
  googleReviewsUrl: 'https://maps.google.com/?q=TruckWala+24x7+Gadan+Khera+Bypass+Unnao',
  hours: '24 Hours · 7 Days · 365 Days',
};

export const COMMON_SYMPTOMS = [
  'Engine Not Starting / Dead Battery',
  'Air Leak / Brakes Jammed',
  'AdBlue (DEF) Error / BS6 Torque Limiter',
  'Engine Overheating / Coolant Loss',
  'White / Black Smoke / Loss of Power',
  'Clutch Failure / Gear Shifting Jammed',
  'Alternator / Electrical Short',
  'Suspension / Spring Leaf / Axle Issue',
  'Turbocharger Failure / Boost Leak',
  'Fuel Injection / Pump Jamming',
];

export const DIAGNOSTIC_FAULTS: DiagnosticFault[] = [
  {
    id: 'bs6-adblue-derate',
    codeOrTitle: 'BS-VI SCR / AdBlue Derate (SPN 5246)',
    symptom: 'Engine warning lamp on, truck speed restricted to 20 km/h or torque limited to 50%',
    severity: 'CRITICAL_STOP',
    commonVehicles: 'Tata Signa / Prima, Ashok Leyland AVTR, BharatBenz BS6',
    roadsideCheck: 'Check AdBlue tank level and urea dosing line for crystallization or loose wiring to DEF injector.',
    truckwalaSolution: 'Mobile scanner ECM fault code clearing, SCR dosing test, NOx sensor validation & genuine DEF replenishment on highway.',
  },
  {
    id: 'air-leak-brake-jam',
    codeOrTitle: 'Dual Air Tank Pressure Drop (< 6.5 Bar)',
    symptom: 'Spring brake actuator locked, wheels will not rotate, constant hissing sound near tractor-trailer junction',
    severity: 'CRITICAL_STOP',
    commonVehicles: 'All Multi-axle commercial vehicles (Tata 3518, 4825, Leyland 4220)',
    roadsideCheck: 'Do NOT force-drive with locked brakes. Check glad hands, nylon air pipes for rupture or frozen unloader valve.',
    truckwalaSolution: 'Mobile van dispatched with high-pressure pneumatic repair kit, push-fit brass connectors, unloader valves & brake chamber seals.',
  },
  {
    id: 'cummins-overheat',
    codeOrTitle: 'High Coolant Temp Warning (> 102°C)',
    symptom: 'Steam from reservoir, radiator fan clutch not engaging, temperature needle pegged in red',
    severity: 'HIGH_EMERGENCY',
    commonVehicles: 'Cummins ISBe 5.9 / 6.7, Tata Turbotronn 5L, Eicher Pro',
    roadsideCheck: 'Park safely on shoulder. Do NOT open radiator cap while hot. Check serpentine belt tension and lower hose rupture.',
    truckwalaSolution: 'Mobile coolant supply, heavy-duty thermostat replacement, water pump inspection and fan viscous clutch override.',
  },
  {
    id: 'starter-solenoid-click',
    codeOrTitle: 'Starter Motor Clicking / Complete No-Crank',
    symptom: 'Dashboard lights dim when key turns, heavy metallic click from flywheel area but engine does not crank',
    severity: 'HIGH_EMERGENCY',
    commonVehicles: 'Commercial Trucks (12V & 24V Electrical Systems)',
    roadsideCheck: 'Check heavy battery cable clamp tightness, neutral safety switch and ground earth strap for corrosion.',
    truckwalaSolution: 'Heavy-duty 24V jumpstart pack, on-site starter motor solenoid service, relay bypass & carbon brush swap.',
  },
  {
    id: 'white-smoke-turbo',
    codeOrTitle: 'Dense White Smoke & Sudden Power Loss',
    symptom: 'Heavy unburnt diesel fumes, loud whistling noise under load, boost pressure missing on incline',
    severity: 'MODERATE',
    commonVehicles: 'Tata Cummins 6BT, Ashok Leyland H6, Eicher 4-Cylinder',
    roadsideCheck: 'Check intercooler hoses for blow-off or split clamps. Inspect oil level for fuel dilution.',
    truckwalaSolution: 'Turbocharger shaft play inspection, silicone coupler replacement, injector leak-off test and boost line sealing.',
  },
];

export const VEHICLE_BRANDS = [
  {
    name: 'Tata Motors Commercial',
    models: 'Prima, Signa, LPT 1618, 3518, 4018, 4825, Ultra, 407',
    engines: 'Cummins ISBe, Turbotronn 3.3L / 5.0L, 697 TCIC',
  },
  {
    name: 'Ashok Leyland',
    models: 'AVTR Modular Series, Captain, Boss, Ecomet, 1616, 2518',
    engines: 'H-Series 4-Cyl & 6-Cyl CRS, i-Gen6, Neptune 8L',
  },
  {
    name: 'Eicher Trucks & Buses',
    models: 'Pro 2000, Pro 3000, Pro 6000, Pro 8000 Heavy Duty',
    engines: 'VEDX5 & VEDX8 Volvo-Eicher common rail engines',
  },
  {
    name: 'BharatBenz',
    models: '1617R, 2823R, 3528R, 4028T, 5528T Tractor-Trailers',
    engines: 'OM 926 / OM 906 Electronic Common Rail',
  },
  {
    name: 'Mahindra & Others',
    models: 'Blazo X 28, 35, 42, 49, 55 Multi-Axle & Haulage',
    engines: 'mPower FuelSmart 7.2L Heavy Duty Diesel',
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Ramakant Yadav',
    role: 'Long-haul Driver (UP 78)',
    vehicle: 'Tata Signa 4825 Tipper',
    rating: 5,
    date: '3 weeks ago',
    content:
      'Gadan Khera bypass par raat 2:30 baje air pressure pipe fat gaya tha aur gaadi lock ho gayi thi. TruckWala ko call kiya, 35 minute mein service van aayi naye brass coupler aur pipe ke sath. Raat mein hi gaadi chaloo kar di.',
  },
  {
    id: 'rev-2',
    author: 'Surender Singh Chauhan',
    role: 'Fleet Manager, Awadh Freight Lines (14 Trucks)',
    vehicle: 'BharatBenz 3528R & Leyland 4220',
    rating: 5,
    date: '1 month ago',
    content:
      'We operate regular container routes between Kanpur industrial estate and Lucknow corridor. TruckWala 24x7 is our trusted emergency breakdown partner. No fake parts, real diagnostic scanners, and honest billing.',
  },
  {
    id: 'rev-3',
    author: 'Mohd. Aslam',
    role: 'Transport Contractor',
    vehicle: 'Tata 4018 Tractor Trailer',
    rating: 5,
    date: '2 months ago',
    content:
      'Engine overheat and water pump leakage solved on NH-27 shoulder. Technician brought genuine coolant, heavy hose and replaced belt right on the highway. Professional roadside setup.',
  },
];

export function buildWhatsAppLink(details: {
  vehicleNumber?: string;
  problem?: string;
  location?: string;
  coords?: { latitude: number; longitude: number };
}): string {
  const parts: string[] = ['*EMERGENCY BREAKDOWN REQUEST - TRUCKWALA 24x7*'];
  if (details.vehicleNumber) {
    parts.push(`*Vehicle No:* ${details.vehicleNumber.toUpperCase()}`);
  }
  if (details.problem) {
    parts.push(`*Problem:* ${details.problem}`);
  }
  if (details.location) {
    parts.push(`*Location:* ${details.location}`);
  }
  if (details.coords) {
    parts.push(`*GPS Location:* https://maps.google.com/?q=${details.coords.latitude},${details.coords.longitude}`);
  }
  parts.push('Please dispatch nearest mobile technician immediately.');
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(parts.join('\n'))}`;
}
