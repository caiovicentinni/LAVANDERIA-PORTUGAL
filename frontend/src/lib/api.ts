const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ServiceData {
  id: number;
  name_pt: string;
  name_br: string;
  name_en: string;
  image_url: string;
  is_active: boolean;
  requires_dimensions: boolean;
  sort_order: number;
}

export interface QuotePayload {
  service: number;
  first_name: string;
  last_name: string;
  email: string;
  whatsapp: string;
  postal_code: string;
  length?: string;
  width?: string;
  details?: string;
  language: string;
  photo?: File;
}

export interface QuoteResponse {
  id: number;
  service: number;
  service_name: string;
  status: string;
  email_sent: boolean;
  created_at: string;
}

export async function fetchServices(): Promise<ServiceData[]> {
  const res = await fetch(`${API_URL}/services/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function createQuote(data: QuotePayload): Promise<QuoteResponse> {
  const formData = new FormData();

  formData.append('service', String(data.service));
  formData.append('first_name', data.first_name);
  formData.append('last_name', data.last_name);
  formData.append('email', data.email);
  formData.append('whatsapp', data.whatsapp);
  formData.append('postal_code', data.postal_code);
  formData.append('language', data.language);

  if (data.length) formData.append('length', data.length);
  if (data.width) formData.append('width', data.width);
  if (data.details) formData.append('details', data.details);
  if (data.photo) formData.append('photo', data.photo);

  const res = await fetch(`${API_URL}/quotes/`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(JSON.stringify(error));
  }
  return res.json();
}
