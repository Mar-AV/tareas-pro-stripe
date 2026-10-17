'use client';

import { useState } from 'react';

export function BotonPro() {
  const [yendo, setYendo] = useState(false);

  async function alPagar() {
    setYendo(true);
    const r = await fetch('/api/checkout', { method: 'POST' });
    const { url, mensaje } = await r.json();

    if (url) {
      // Nos vamos del sitio. La tarjeta se escribe en Stripe, no aquí.
      window.location.href = url;
    } else {
      alert(mensaje ?? 'No pude crear la sesión de pago');
      setYendo(false);
    }
  }

  return (
    <button
      type="button"
      onClick={alPagar}
      disabled={yendo}
      className="rounded-lg bg-uspg-rojo px-5 py-2.5 font-medium text-white disabled:opacity-50"
    >
      {yendo ? 'Abriendo Stripe…' : 'Hazte Pro · $5/mes'}
    </button>
  );
}
