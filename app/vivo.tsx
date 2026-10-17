'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Evento } from '@/lib/eventos';

export function Vivo({ conectadosInicial }: { conectadosInicial: number }) {
  const router = useRouter();
  const [conectados, setConectados] = useState(conectadosInicial);
  const [aviso, setAviso] = useState<string | null>(null);

  // ESPACIO 3: escuchar los eventos y refrescar las dos pestañas automáticamente.
  useEffect(() => {
    const fuente = new EventSource('/api/eventos');
    let temporizador: ReturnType<typeof setTimeout> | undefined;

    fuente.onmessage = (mensaje) => {
      try {
        const evento = JSON.parse(mensaje.data) as Evento;

        if (evento.tipo === 'presencia') {
          setConectados(evento.conectados);
          return;
        }

        if (
          evento.tipo === 'tareas' ||
          evento.tipo === 'plan' ||
          evento.tipo === 'tarea_marcada'
        ) {
          router.refresh();

          if ('aviso' in evento && evento.aviso) {
            setAviso(evento.aviso);
            if (temporizador) clearTimeout(temporizador);
            temporizador = setTimeout(() => setAviso(null), 3500);
          }
        }
      } catch (error) {
        console.error('No se pudo leer el evento SSE:', error);
      }
    };

    return () => {
      fuente.close();
      if (temporizador) clearTimeout(temporizador);
    };
  }, [router]);

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
