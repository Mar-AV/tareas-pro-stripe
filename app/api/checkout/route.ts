import { stripe, URL_BASE } from '@/lib/stripe';
export const runtime = 'nodejs';

// ESPACIO 4: Stripe Checkout mensual en modo de suscripción.
export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_')) {
    return Response.json(
      { mensaje: 'Configura STRIPE_SECRET_KEY con una clave de prueba sk_test_... en .env.local.' },
      { status: 503 }
    );
  }

  try {
    const sesion = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Tareas Pro' },
          unit_amount: 500,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }],
      success_url: `${URL_BASE}/gracias?sesion={CHECKOUT_SESSION_ID}`,
      cancel_url: URL_BASE,
    });
    return Response.json({ url: sesion.url });
  } catch (error) {
    console.error('Error de Checkout:', error);
    return Response.json({ mensaje: 'No se pudo iniciar el Checkout de Stripe.' }, { status: 500 });
  }
}
