// TruckWala 24×7 — Public Highway Operations Engine
'use strict';

// 1. Dynamic Copyright Year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// 2. DataLayer & Telemetry Delegation (Event Safety & URI Validation)
document.addEventListener('click', function (e) {
  const target = e.target;
  if (!target || typeof target.closest !== 'function') return;
  const a = target.closest('a');
  if (!a) return;

  const h = a.getAttribute('href') || '';
  let eventType = null;

  if (h.startsWith('tel:')) {
    eventType = 'CALL_CLICK';
  } else if (h.startsWith('https://wa.me/') || h.includes('wa.me')) {
    eventType = 'WHATSAPP_CLICK';
  } else if (h.includes('maps.google.com') || h.includes('google.com/maps')) {
    eventType = 'MAP_CLICK';
  } else if (a.classList.contains('track-sos')) {
    eventType = 'SOS_DISPATCH_CLICK';
  }

  if (eventType) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventType,
      href: h,
      label: (a.textContent || '').trim().slice(0, 100),
      page: '/vanilla/index.html',
      timestamp: new Date().toISOString()
    });
    if (typeof console !== 'undefined' && console.log) {
      console.log('[TruckWala Telemetry]', eventType);
    }
  }
});

// 3. Highway Fault Code / Diagnostics Interactive Engine
const faultData = Object.freeze({
  adblue: {
    code: 'SPN 5246 / FMI 0',
    title: 'SCR / DEF AdBlue Inducement Torque Limiter',
    status: 'High Highway Derate Risk (Max 20 km/h)',
    desc: 'Common on BS-VI Tata Turbotronn, Cummins ISB 6.7, and Ashok Leyland CRS. Indicates dosing valve blockage, pump pressure drop, or NOx sensor drift. TruckWala response vans carry original dosing units and Cummins/Tata handheld scan tools to reset derate without towing.',
    actionText: 'Request Mobile Scanner Dispatch for SPN 5246',
    waText: 'Need ECM diagnostic van for BS-VI AdBlue SPN 5246 limiter derate'
  },
  airbrake: {
    code: 'Air Circuit < 6.0 Bar',
    title: 'Dual Air Brake Pressure Drop / Locked Wheels',
    status: 'Complete Rig Standstill',
    desc: 'Unloader valve leak, dryer cartridge blowout, or snapped nylon pneumatic brake hose. Spring chambers (Maxi) locked down. Mobile unit carries high-pressure charging hoses, dual-circuit relief valves, and 12-bar auxiliary compressors.',
    actionText: 'Request Emergency Air Brake Mobile Unit',
    waText: 'Air brakes locked pressure below 6 bar need urgent mobile mechanic'
  },
  starter: {
    code: '24V Electrical / Solenoid Click',
    title: 'Starter Motor Click / No Crank After Highway Halt',
    status: 'Electrical No-Start Failure',
    desc: 'Common after toll plaza halts or roadside parking. Burnt solenoid contacts, alternator diode failure, or drained 24V commercial battery bank. Van equipped with high-amp commercial booster cables, new starters, and heavy terminal leads.',
    actionText: 'Request 24V Commercial Jump-Start / Starter Repair',
    waText: 'Heavy truck starter dead no crank need 24V jumpstart or starter check'
  },
  overheat: {
    code: 'Coolant > 105°C / Fan Clutch Failure',
    title: 'Radiator Overheating / Water Pump Belt Snap',
    status: 'Critical Engine Damage Risk',
    desc: 'Poly-V serpentine belt snap, viscous fan hub slip, or silicon radiator hose puncture on heavy grades. Shut engine down immediately. We carry replacement multi-rib belts, heavy-duty clamps, and premixed fleet coolant.',
    actionText: 'Request On-Site Cooling System Repair',
    waText: 'Engine overheating coolant leak need on-site belt or radiator repair'
  }
});

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
      if (!key || !Object.prototype.hasOwnProperty.call(faultData, key)) return;
      const item = faultData[key];
      if (item) {
        faultCodeLabel.textContent = item.code;
        faultTitle.textContent = item.title;
        faultStatus.textContent = item.status;
        faultDesc.textContent = item.desc;
        if (faultWaLink) {
          const encoded = encodeURIComponent(item.waText);
          faultWaLink.setAttribute('href', `https://wa.me/919450002407?text=${encoded}`);
        }
        if (faultCallLink) {
          faultCallLink.setAttribute('href', 'tel:+919450002407');
        }
      }
    });
  });
}

// 4. Emergency Live GPS Location Modal (Safe DOM Manipulation & Zero XSS)
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

// Secure Geolocation Fix & Zero-XSS Status Rendering
if (detectLocationBtn && locationStatusText) {
  detectLocationBtn.addEventListener('click', function () {
    while (locationStatusText.firstChild) {
      locationStatusText.removeChild(locationStatusText.firstChild);
    }

    if (!navigator.geolocation) {
      const errSpan = document.createElement('span');
      errSpan.style.color = '#ef4444';
      errSpan.style.fontSize = '12px';
      errSpan.textContent = 'Geolocation is not supported by your browser. Please call our hotline directly at +91 94500 02407.';
      locationStatusText.appendChild(errSpan);
      return;
    }

    const waitSpan = document.createElement('span');
    waitSpan.style.color = '#60a5fa';
    waitSpan.style.fontSize = '12px';
    waitSpan.textContent = 'Acquiring satellite GPS fix from highway corridor...';
    locationStatusText.appendChild(waitSpan);
    detectLocationBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        detectLocationBtn.disabled = false;
        const lat = Number(pos.coords.latitude).toFixed(6);
        const lng = Number(pos.coords.longitude).toFixed(6);
        const acc = Math.round(Number(pos.coords.accuracy) || 0);

        while (locationStatusText.firstChild) {
          locationStatusText.removeChild(locationStatusText.firstChild);
        }

        const box = document.createElement('div');
        box.style.background = 'rgba(34, 197, 94, 0.1)';
        box.style.border = '1px solid #22c55e';
        box.style.borderRadius = '4px';
        box.style.padding = '10px';
        box.style.marginTop = '8px';

        const title = document.createElement('strong');
        title.style.color = '#4ade80';
        title.style.display = 'block';
        title.style.fontSize = '13px';
        title.textContent = '✓ GPS Coordinates Locked:';

        const coords = document.createElement('span');
        coords.style.fontFamily = 'monospace';
        coords.style.fontSize = '12px';
        coords.style.color = '#f8fafc';
        coords.textContent = `${lat}, ${lng}`;

        const accInfo = document.createElement('span');
        accInfo.style.fontSize = '11px';
        accInfo.style.color = '#94a3b8';
        accInfo.style.display = 'block';
        accInfo.style.marginTop = '2px';
        accInfo.textContent = `Accuracy: within ±${acc} meters`;

        box.appendChild(title);
        box.appendChild(coords);
        box.appendChild(accInfo);
        locationStatusText.appendChild(box);

        if (sendCoordinatesLink) {
          sendCoordinatesLink.style.display = 'inline-flex';
          const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(lat)},${encodeURIComponent(lng)}`;
          const rawMessage = `EMERGENCY HIGHWAY BREAKDOWN! My exact GPS location is: ${mapsUrl} (Accuracy: ±${acc}m). Please dispatch TruckWala mechanic van.`;
          sendCoordinatesLink.setAttribute('href', `https://wa.me/919450002407?text=${encodeURIComponent(rawMessage)}`);
          sendCoordinatesLink.setAttribute('rel', 'noopener noreferrer');
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'GPS_COORDINATES_LOCKED',
          latitude: lat,
          longitude: lng,
          accuracy: acc
        });
      },
      function (err) {
        detectLocationBtn.disabled = false;
        while (locationStatusText.firstChild) {
          locationStatusText.removeChild(locationStatusText.firstChild);
        }

        const errBox = document.createElement('div');
        errBox.style.color = '#f87171';
        errBox.style.fontSize = '12px';

        const msg = document.createElement('span');
        const cleanReason = err && err.code === 1 ? 'Permission denied' : 'GPS signal unavailable';
        msg.textContent = `Could not lock GPS (${cleanReason}). Call our hotline directly at `;

        const callA = document.createElement('a');
        callA.href = 'tel:+919450002407';
        callA.style.textDecoration = 'underline';
        callA.style.fontWeight = 'bold';
        callA.style.color = '#ffffff';
        callA.textContent = '+91 94500 02407';

        errBox.appendChild(msg);
        errBox.appendChild(callA);
        locationStatusText.appendChild(errBox);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}
