import Link from 'next/link';
import { stripe } from '@/lib/stripe';
import { activarPro } from '@/lib/plan';

export const dynamic = 'force-dynamic';

export default async function Gracias({
  searchParams,
}: {
  searchParams: Promise<{ sesion?: string }>;
}) {
  const { sesion } = await searchParams; // en Next 15+ searchParams es asíncrono

  let pagado = false;

  // ╔════════════════════════════════════════════════════════╗
  // ║  ESPACIO 5 · Confirmar que de verdad pagó                ║
  // ║                                                        ║
  // ║  Stripe nos devolvió al usuario con un id de sesión en  ║
  // ║  la URL. Pero cualquiera puede escribir esa URL a mano. ║
  // ║  Hay que PREGUNTARLE a Stripe, no creerle a la URL.     ║
  // ║                                                        ║
  // ║   const s = await stripe.checkout.sessions              ║
  // ║                 .retrieve(sesion);                      ║
  // ║   if (s.payment_status === 'paid') {                    ║
  // ║     pagado = true;                                      ║
  // ║     activarPro();                                       ║
  // ║   }                                                     ║
  // ╚════════════════════════════════════════════════════════╝
  if (sesion) {
    // TODO (Bloque 3, paso 3)
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-20 text-center">
      <p className="text-5xl">{pagado ? '🎉' : '🤔'}</p>
      <h1 className="mt-4 text-3xl font-bold">
        {pagado ? '¡Ya eres Pro!' : 'No pude confirmar el pago'}
      </h1>
      <p className="mt-2 text-slate-600">
        {pagado
          ? 'Vuelve a la lista: el límite de cinco tareas ya no existe. Y si dejaste otra pestaña abierta, míralas a las dos.'
          : 'Si ya hiciste el ESPACIO 5, revisa que la URL traiga ?sesion=cs_test_…'}
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white"
      >
        Volver a mis tareas
      </Link>
    </main>
  );
}
