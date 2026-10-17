import { stripe, URL_BASE } from '@/lib/stripe';

export const runtime = 'nodejs';

// ╔══════════════════════════════════════════════════════════╗
// ║  ESPACIO 4 · Crear la sesión de Checkout                   ║
// ║                                                          ║
// ║  Ojo con lo que NO estamos haciendo: no pedimos número    ║
// ║  de tarjeta, no lo guardamos, no lo vemos. Le pedimos a   ║
// ║  Stripe una dirección y mandamos al usuario para allá.    ║
// ║                                                          ║
// ║  await stripe.checkout.sessions.create({                  ║
// ║    mode: 'subscription',                                  ║
// ║    line_items: [{                                         ║
// ║      price_data: {                                        ║
// ║        currency: 'usd',                                   ║
// ║        product_data: { name: 'Tareas Pro' },              ║
// ║        unit_amount: 500,          // centavos: $5.00      ║
// ║        recurring: { interval: 'month' },                  ║
// ║      },                                                   ║
// ║      quantity: 1,                                         ║
// ║    }],                                                    ║
// ║    success_url: `${URL_BASE}/gracias?sesion=` +            ║
// ║                 '{CHECKOUT_SESSION_ID}',                  ║
// ║    cancel_url: URL_BASE,                                  ║
// ║  })                                                       ║
// ║                                                          ║
// ║  Devuelve  Response.json({ url: sesion.url })             ║
// ╚══════════════════════════════════════════════════════════╝
export async function POST() {
  // TODO (Bloque 3, paso 2)
  return Response.json({ mensaje: 'Falta el ESPACIO 4' }, { status: 501 });
}
