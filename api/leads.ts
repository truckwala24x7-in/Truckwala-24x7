import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const clean = (value: unknown, max = 500) => typeof value === 'string' ? value.trim().slice(0, max) : '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const name = clean(req.body?.name, 100);
  const phone = clean(req.body?.phone, 30);
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required.' });

  try {
    await sql`INSERT INTO service_leads (name, phone, vehicle_no, service_type, location, fleet_size, details, inquiry_type)
      VALUES (${name}, ${phone}, ${clean(req.body?.vehicleNo, 30)}, ${clean(req.body?.serviceType, 100)}, ${clean(req.body?.location)}, ${clean(req.body?.fleetSize, 100)}, ${clean(req.body?.details)}, ${clean(req.body?.inquiryType, 20)})`;
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error('Lead submission failed', error);
    return res.status(500).json({ error: 'Unable to save request.' });
  }
}
