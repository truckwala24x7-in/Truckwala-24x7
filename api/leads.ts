import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const clean = (value: unknown, max = 500) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const phoneLooksValid = (value: string) => /^[+()\d\s-]{7,30}$/.test(value);

async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS service_leads (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      vehicle_no TEXT,
      service_type TEXT,
      location TEXT,
      fleet_size TEXT,
      details TEXT,
      inquiry_type TEXT
    )
  `;
}

async function notifyOwner(lead: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_TO_EMAIL;

  if (!apiKey || !from || !to) return;

  const text = [
    'New TruckWala 24×7 service lead',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Vehicle: ${lead.vehicleNo || '-'}`,
    `Service: ${lead.serviceType || '-'}`,
    `Location: ${lead.location || '-'}`,
    `Fleet size: ${lead.fleetSize || '-'}`,
    `Inquiry type: ${lead.inquiryType || '-'}`,
    `Details: ${lead.details || '-'}`,
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `TruckWala lead: ${lead.name}`,
      text,
    }),
  });

  if (!response.ok) {
    console.error('Lead notification failed', await response.text());
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {};
  if (clean((body as Record<string, unknown>).website, 100)) {
    return res.status(400).json({ error: 'Invalid submission.' });
  }

  const lead = {
    name: clean((body as Record<string, unknown>).name, 100),
    phone: clean((body as Record<string, unknown>).phone, 30),
    vehicleNo: clean((body as Record<string, unknown>).vehicleNo, 30),
    serviceType: clean((body as Record<string, unknown>).serviceType, 100),
    location: clean((body as Record<string, unknown>).location, 300),
    fleetSize: clean((body as Record<string, unknown>).fleetSize, 100),
    details: clean((body as Record<string, unknown>).details, 1000),
    inquiryType: clean((body as Record<string, unknown>).inquiryType, 20),
  };

  if (!lead.name || !lead.phone || !phoneLooksValid(lead.phone)) {
    return res.status(400).json({ error: 'A valid name and phone number are required.' });
  }

  try {
    await ensureSchema();
    await sql`
      INSERT INTO service_leads
        (name, phone, vehicle_no, service_type, location, fleet_size, details, inquiry_type)
      VALUES
        (${lead.name}, ${lead.phone}, ${lead.vehicleNo}, ${lead.serviceType},
         ${lead.location}, ${lead.fleetSize}, ${lead.details}, ${lead.inquiryType})
    `;

    // Email is optional: a notification outage must not make a saved lead look failed.
    try {
      await notifyOwner(lead);
    } catch (notificationError) {
      console.error('Lead notification delivery failed', notificationError);
    }
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error('Lead submission failed', error);
    return res.status(500).json({ error: 'Unable to save request.' });
  }
}
