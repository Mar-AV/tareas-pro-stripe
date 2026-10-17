import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { activarPro } from '@/lib/plan';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ╔══════════════════════════════════════════════════════════╗
// ║  ESPACIO 6 · Recibir el aviso de Stripe                    ║
// ║                                                          ║
// ║  ¿Por qué esto, si el ESPACIO 5 ya funcionaba?              ║
// ║  Porque el usuario puede cerrar la pestaña justo después  ║
// ║  de pagar y nunca volver. El cobro ocurrió; tu redirect   ║
// ║  no. El webhook llega igual: Stripe le habla a tu         ║
// ║  servidor, no al navegador.                               ║
// ║                                                          ║
// ║  Y por eso hay que verificar la firma: esta ruta está     ║
// ║  abierta al mundo. Sin firma, cualquiera manda un POST    ║
// ║  diciendo «ya pagó» y se lleva tu producto gratis.        ║
// ║                                                          ║
// ║   evento = stripe.webhooks.constructEvent(                ║
// ║     cuerpo, firma, process.env.STRIPE_WEBHOOK_SECRET!);   ║
// ║                                                          ║
// ║  Va dentro de try/catch: si la firma no cuadra,           ║
// ║  responde 400 y no hagas nada más.                        ║
// ╚══════════════════════════════════════════════════════════╝
export async function POST(req: Request) {
  // El cuerpo CRUDO, sin parsear. Si usas req.json() la firma nunca cuadra:
  // se calcula sobre los bytes exactos que mandó Stripe.
  const cuerpo = await req.text();
  const firma = req.headers.get('stripe-signature') ?? '';

  // TODO (Bloque 4) — verificar la firma y actuar:
  //
  //   let evento: Stripe.Event;
  //   try {
  //     evento = stripe.webhooks.constructEvent(cuerpo, firma, SECRETO);
  //   } catch {
  //     return new Response('Firma inválida', { status: 400 });
  //   }
  //   if (evento.type === 'checkout.session.completed') activarPro();
  //   return Response.json({ recibido: true });

  console.log('Llegó un webhook de', cuerpo.length, 'bytes. Firma:', firma.slice(0, 20));
  return new Response('Falta el ESPACIO 6', { status: 501 });
}
