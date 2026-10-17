import Link from 'next/link';
import { stripe } from '@/lib/stripe';
import { activarPro } from '@/lib/plan';

export const dynamic = 'force-dynamic';

export default async function Gracias({
  searchParams,
}: {
  searchParams: Promise<{ sesion?: string }>;
}) {
  const { sesion } = await searchParams;
  let pagado = false;

  // ESPACIO 5: validar el pago consultando a Stripe, nunca confiar en la URL sola.
  if (sesion?.startsWith('cs_test_') && process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_')) {
    try {
      const s = await stripe.checkout.sessions.retrieve(sesion);
      if (s.payment_status === 'paid' && s.mode === 'subscription') {
        pagado = true;
        activarPro();
      }
    } catch (error) {
      console.error('No se pudo verificar el pago:', error);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-20 text-center">
      <p className="text-5xl">{pagado ? '🎉' : '🤔'}</p>
      <h1 className="mt-4 text-3xl font-bold">
        {pagado ? '¡Ya eres Pro!' : 'No pude confirmar el pago'}
      </h1>
      <p className="mt-2 text-slate-600">
        {pagado
          ? 'Vuelve a la lista: el límite de cinco tareas ya no existe. La otra pestaña también se actualizará.'
          : 'Comprueba que completaste un Checkout en modo de prueba y que la URL incluye una sesión válida.'}
      </p>
      <Link href="/" className="mt-8 inline-block rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white">
        Volver a mis tareas
      </Link>
    </main>
  );
}
