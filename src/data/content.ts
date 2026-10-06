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
  address: 'Gadan Khera Bypass, NH-27, Unnao & Panki Hub, Kanpur, UP 209801',
  corridor: 'Kanpur–Unnao NH-27 & NH-19 Transport Corridor',
  googleMapsUrl: 'https://maps.app.goo.gl/P7uBDaVwf3XMfVYdA',
  googleReviewsUrl: 'https://maps.app.goo.gl/P7uBDaVwf3XMfVYdA',
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
    name: 'Mahindra Commercial Trucks',
    hindiName: 'महिंद्रा ट्रक (फुरियो, ब्लाज़ो, क्रूज़ियो, जायो)',
    models: 'Furio (7, 11, 14, 16, 17), Cruzio, Blazo X (28, 35, 42, 49, 55), Jayo, Loadking Optimo',
    engines: 'mPower FuelSmart 7.2L & mDiTech BS6 Common Rail Diesel',
    keywords: 'mahindra furio, mahindra blazo, mahindra cruzio, mahindra jayo, mahindra loadking optimo',
  },
  {
    name: 'Volvo Eicher Commercial (VECV)',
    hindiName: 'आईशर व वोल्वो कमर्शियल (Eicher Pro, Volvo FM/FMX)',
    models: 'Pro 2000, Pro 3000, Pro 6000, Pro 8000 Heavy Duty, Volvo FM 420, FMX Tippers',
    engines: 'VEDX5 & VEDX8 Volvo-Eicher common rail BS-IV / BS-VI engines',
    keywords: 'volvo eicher, eicher truck shop, eicher commercial repair',
  },
  {
    name: 'Tata Motors Commercial',
    hindiName: 'टाटा मोटर्स कमर्शियल (Prima, Signa, LPT)',
    models: 'Prima, Signa (2823, 3525, 4825, 5530), LPT 1618, 3518, 4018, Ultra, 407, 709, 1109',
    engines: 'Cummins ISBe 5.6 / 6.7, Turbotronn 3.3L / 5.0L, 697 TCIC BS6',
    keywords: 'tata signa, tata prima, tata truck mechanic, cummins isbe repair',
  },
  {
    name: 'Ashok Leyland',
    hindiName: 'अशोक लेलैंड (AVTR, Captain, Boss, Dost)',
    models: 'AVTR Modular Series (2820, 3520, 4220, 4825, 5525), Captain, Boss, Ecomet, Bada Dost',
    engines: 'H-Series 4-Cyl & 6-Cyl CRS, i-Gen6, Neptune 8L Common Rail',
    keywords: 'ashok leyland avtr, leyland truck breakdown, i-gen6 bs6 service',
  },
  {
    name: 'BharatBenz Heavy Haulage',
    hindiName: 'भारतबेंज कमर्शियल (1617R, 2823R, 3528R, 5528T)',
    models: '1617R, 2823R, 3528R, 4028T, 5528T Tractor-Trailers & Heavy Container Rigs',
    engines: 'OM 926 / OM 906 Electronic Common Rail Turbodiesel',
    keywords: 'bharatbenz truck service, bharatbenz heavy trailer repair',
  },
  {
    name: 'Trailer Trucks & Towing Recovery Fleet',
    hindiName: 'टेलर ट्रक व टोइंग / रिकवरी वैन (Tow Truck & Trailer)',
    models: 'Multi-axle 22 to 55 Ton Tractor Trailers, 40ft/32ft Containers, Hydraulic Tow Trucks & Recovery Cranes',
    engines: 'Heavy Hydraulic Winch, 24V Air Booster, Low-Bed Heavy Recovery Equipment',
    keywords: 'trailer truck, टेलर ट्रक, tow truck near me, recovery van service near me, truck shop',
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
