import Stripe from 'stripe';

// La llave SECRETA solo existe en el servidor. Nunca la importes
// desde un componente con 'use client': se iría al navegador.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

export const URL_BASE = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
