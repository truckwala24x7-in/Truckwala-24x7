// TruckWala 24×7 — Production Vanilla Engine

// Dynamic Copyright Year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 1. DataLayer & Telemetry Delegation
document.addEventListener('click', function (e) {
  const a = e.target.closest('a');
  if (!a) return;
  const h = a.getAttribute('href') || '';
  let eventType = null;

  if (h.startsWith('tel:')) {
    eventType = 'CALL_CLICK';
  } else if (h.includes('wa.me')) {
    eventType = 'WHATSAPP_CLICK';
  } else if (h.includes('google.com/maps')) {
    eventType = 'MAP_CLICK';
  } else if (a.classList.contains('track-sos')) {
    eventType = 'SOS_DISPATCH_CLICK';
  }

  if (eventType) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventType,
      href: h,
      label: a.innerText.trim(),
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
    console.log('[TruckWala Telemetry]', eventType, h);
  }
});

// 2. Highway Fault Code / Diagnostics Interactive Engine
const faultData = {
  adblue: {
    code: 'SPN 5246 / FMI 0',
    title: 'SCR / DEF AdBlue Inducement Torque Limiter',
    status: 'High Highway Derate Risk (Max 20 km/h)',
    desc: 'Common on BS-VI Tata Turbotronn, Cummins ISB 6.7, and Ashok Leyland CRS. Indicates dosing valve blockage, pump pressure drop, or NOx sensor drift. TruckWala response vans carry original dosing units and Cummins/Tata handheld scan tools to reset derate without towing.',
    actionText: 'Request Mobile Scanner Dispatch for SPN 5246',
    waText: 'Need%20ECM%20diagnostic%20van%20for%20BS-VI%20AdBlue%20SPN%205246%20limiter%20derate'
  },
  airbrake: {
    code: 'Air Circuit < 6.0 Bar',
    title: 'Dual Air Brake Pressure Drop / Locked Wheels',
    status: 'Complete Rig Standstill',
    desc: 'Unloader valve leak, dryer cartridge blowout, or snapped nylon pneumatic brake hose. Spring chambers (Maxi) locked down. Mobile unit carries high-pressure charging hoses, dual-circuit relief valves, and 12-bar auxiliary compressors.',
    actionText: 'Request Emergency Air Brake Mobile Unit',
    waText: 'Air%20brakes%20locked%20pressure%20below%206%20bar%20need%20urgent%20mobile%20mechanic'
  },
  starter: {
    code: '24V Electrical / Solenoid Click',
    title: 'Starter Motor Click / No Crank After Highway Halt',
    status: 'Electrical No-Start Failure',
    desc: 'Common after toll plaza halts or roadside parking. Burnt solenoid contacts, alternator diode failure, or drained 24V commercial battery bank. Van equipped with high-amp commercial booster cables, new starters, and heavy terminal leads.',
    actionText: 'Request 24V Commercial Jump-Start / Starter Repair',
    waText: 'Heavy%20truck%20starter%20dead%20no%20crank%20need%2024V%20jumpstart%20or%20starter%20check'
  },
  overheat: {
    code: 'Coolant > 105°C / Fan Clutch Failure',
    title: 'Radiator Overheating / Water Pump Belt Snap',
    status: 'Critical Engine Damage Risk',
    desc: 'Poly-V serpentine belt snap, viscous fan hub slip, or silicon radiator hose puncture on heavy grades. Shut engine down immediately. We carry replacement multi-rib belts, heavy-duty clamps, and premixed fleet coolant.',
    actionText: 'Request On-Site Cooling System Repair',
    waText: 'Engine%20overheating%20coolant%20leak%20need%20on-site%20belt%20or%20radiator%20repair'
  }
};

const faultButtons = document.querySelectorAll('.fault-btn');
const faultCodeLabel = document.getElementById('faultCodeLabel');
const faultTitle = document.getElementById('faultTitle');
const faultStatus = document.getElementById('faultStatus');
const faultDesc = document.getElementById('faultDesc');
const faultWaLink = document.getElementById('faultWaLink');
const faultCallLink = document.getElementById('faultCallLink');

if (faultButtons.length > 0 && faultCodeLabel) {
  faultButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      faultButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const key = this.getAttribute('data-fault');
      const item = faultData[key];
      if (item) {
        faultCodeLabel.textContent = item.code;
        faultTitle.textContent = item.title;
        faultStatus.textContent = item.status;
        faultDesc.textContent = item.desc;
        if (faultWaLink) {
          faultWaLink.setAttribute('href', `https://wa.me/919450002407?text=${item.waText}`);
        }
        if (faultCallLink) {
          faultCallLink.setAttribute('href', 'tel:+919450002407');
        }
      }
    });
  });
}

// 3. Emergency Live GPS Location Modal
const modalBackdrop = document.getElementById('gpsModal');
const openGpsButtons = document.querySelectorAll('.open-gps-modal');
const closeGpsButton = document.getElementById('closeGpsModal');
const detectLocationBtn = document.getElementById('detectLocationBtn');
const locationStatusText = document.getElementById('locationStatusText');
const sendCoordinatesLink = document.getElementById('sendCoordinatesLink');

function openModal() {
  if (modalBackdrop) {
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
  }
}

function closeModal() {
  if (modalBackdrop) {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
  }
}

openGpsButtons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
  });
});

if (closeGpsButton) {
  closeGpsButton.addEventListener('click', closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', function (e) {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });
}

// Geolocation Handler
if (detectLocationBtn) {
  detectLocationBtn.addEventListener('click', function () {
    if (!navigator.geolocation) {
      locationStatusText.innerHTML = '<span style="color:#ef4444;">Geolocation is not supported by your browser. Please call our hotline directly.</span>';
      return;
    }

    locationStatusText.innerHTML = '<span style="color:#60a5fa;">Acquiring satellite GPS fix from highway corridor...</span>';
    detectLocationBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const acc = Math.round(pos.coords.accuracy);

        locationStatusText.innerHTML = `
          <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid #22c55e; border-radius: 4px; padding: 10px; margin-top: 8px;">
            <strong style="color: #4ade80; display: block; font-size: 13px;">✓ GPS Coordinates Locked:</strong>
            <span style="font-family: monospace; font-size: 12px; color: #f8fafc;">${lat}, ${lng}</span>
            <span style="font-size: 11px; color: #94a3b8; display: block; margin-top: 2px;">Accuracy: within ±${acc} meters</span>
          </div>
        `;

        if (sendCoordinatesLink) {
          sendCoordinatesLink.style.display = 'inline-flex';
          const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
          const waMessage = `EMERGENCY%20HIGHWAY%20BREAKDOWN!%20My%20exact%20GPS%20location%20is:%20${mapsUrl}%20(Accuracy:%20${acc}m).%20Please%20dispatch%20TruckWala%20mechanic%20van.`;
          sendCoordinatesLink.setAttribute('href', `https://wa.me/919450002407?text=${waMessage}`);
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'GPS_COORDINATES_LOCKED',
          latitude: lat,
          longitude: lng,
          accuracy: acc
        });

        detectLocationBtn.disabled = false;
      },
      function (err) {
        detectLocationBtn.disabled = false;
        locationStatusText.innerHTML = `
          <span style="color:#f87171; font-size: 12px;">GPS signal not available (${err.message}). Call our hotline directly at <a href="tel:+919450002407" style="text-decoration: underline; font-weight: bold; color: #fff;">+91 94500 02407</a>.</span>
        `;
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}
