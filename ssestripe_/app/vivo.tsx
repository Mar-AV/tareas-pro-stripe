'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Vivo({ conectadosInicial }: { conectadosInicial: number }) {
  const router = useRouter();
  const [conectados, setConectados] = useState(conectadosInicial);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    // ╔════════════════════════════════════════════════════════╗
    // ║  ESPACIO 3 · Escuchar el canal                           ║
    // ║                                                        ║
    // ║  EventSource ya viene en el navegador. No se instala.   ║
    // ║  Y se reconecta solo si se cae la red: eso es gratis.   ║
    // ║                                                        ║
    // ║   const fuente = new EventSource('/api/eventos');       ║
    // ║                                                        ║
    // ║   fuente.onmessage = (e) => {                           ║
    // ║     const evento = JSON.parse(e.data);                  ║
    // ║                                                        ║
    // ║     if (evento.tipo === 'presencia')                    ║
    // ║       setConectados(evento.conectados);                 ║
    // ║                                                        ║
    // ║     if (evento.tipo === 'tareas' ||                     ║
    // ║         evento.tipo === 'plan') {                       ║
    // ║       router.refresh();   // ← vuelve a pedir la página ║
    // ║       if (evento.aviso) mostrar(evento.aviso);          ║
    // ║     }                                                   ║
    // ║   };                                                    ║
    // ║                                                        ║
    // ║   return () => fuente.close();  // ← NO se te olvide    ║
    // ╚════════════════════════════════════════════════════════╝

    // TODO (Bloque 2, paso 1)
  }, [router]);

  function mostrar(texto: string) {
    setAviso(texto);
    setTimeout(() => setAviso(null), 3500);
  }

  return (
    <>
      <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
        <span className="mr-1.5 inline-block size-2 rounded-full bg-emerald-500 align-middle" />
        {conectados} conectado{conectados === 1 ? '' : 's'}
      </span>

      {aviso && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-uspg-navy px-5 py-3 text-sm font-medium text-white shadow-lg">
          {aviso}
        </div>
      )}
    </>
  );
}
