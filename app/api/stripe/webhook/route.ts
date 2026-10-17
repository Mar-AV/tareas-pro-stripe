import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { activarPro } from '@/lib/plan';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ESPACIO 6: verificar la firma usando el cuerpo crudo de la solicitud.
export async function POST(req: Request) {
  const secreto = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secreto) {
    return new Response('Falta STRIPE_WEBHOOK_SECRET', { status: 500 });
  }

  const cuerpo = await req.text();
  const firma = req.headers.get('stripe-signature') ?? '';
  let evento: Stripe.Event;

  try {
    evento = stripe.webhooks.constructEvent(cuerpo, firma, secreto);
  } catch {
    return new Response('Firma inválida', { status: 400 });
  }

  if (evento.type === 'checkout.session.completed') {
    const sesion = evento.data.object;
    if (sesion.payment_status === 'paid' && sesion.mode === 'subscription') {
      activarPro();
    }
  }

  return Response.json({ recibido: true });
}
