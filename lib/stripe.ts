import Stripe from 'stripe';

// No compartas claves privadas ni las importes en componentes del navegador.
// Se usa un marcador solo para arrancar la app sin credenciales;
// el endpoint de Checkout impide iniciar pagos sin sk_test_ real.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_sin_configurar');
export const URL_BASE = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
