'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Un nombre distinto por pestaña. Así, cuando abras dos, sabes
// cuál de las dos escribió qué.
const NOMBRES = ['Quetzal', 'Jaguar', 'Ceiba', 'Tikal', 'Atitlán', 'Pacaya'];

export function Formulario() {
  const router = useRouter();
  const [autor] = useState(() => NOMBRES[Math.floor(Math.random() * NOMBRES.length)]!);
  const [titulo, setTitulo] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    const r = await fetch('/api/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, autor }),
    });

    if (r.ok) {
      setTitulo('');
      router.refresh();
    } else {
      const problema = await r.json();
      setError(problema.mensaje);
    }
    setEnviando(false);
  }

  return (
    <form onSubmit={enviar} className="mt-6">
      <div className="flex gap-2">
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder={`Agregar una tarea (eres ${autor})`}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-uspg-navy"
        />
        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg bg-uspg-navy px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          {enviando ? '…' : 'Agregar'}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-uspg-rojo">{error}</p>}
    </form>
  );
}
