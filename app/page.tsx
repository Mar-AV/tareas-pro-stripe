import { tareas } from '@/lib/datos';
import { conectados } from '@/lib/eventos';
import { esPro, LIMITE_GRATIS } from '@/lib/plan';
import { BotonPro } from './boton-pro';
import { Casilla } from './casilla';
import { Formulario } from './formulario';
import { Vivo } from './vivo';

// Los datos están en memoria y cambian todo el tiempo: nada de caché.
export const dynamic = 'force-dynamic';

export default function Home() {
  const pro = esPro();
  const restantes = LIMITE_GRATIS - tareas.length;

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tareas Pro</h1>
          <p className="mt-1 text-sm text-slate-500">
            Programación IV · Semanas 9 y 10
          </p>
        </div>
        {/* El indicador de presencia y las notificaciones viven aquí */}
        <Vivo conectadosInicial={conectados()} />
      </div>

      {/* ── Banner del plan ── */}
      <div
        className={`mt-8 rounded-2xl border p-5 ${
          pro ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white'
        }`}
      >
        {pro ? (
          <p className="font-medium text-emerald-800">
            Plan Pro activo · tareas ilimitadas
          </p>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">Plan gratis</p>
              <p className="text-sm text-slate-500">
                {restantes > 0
                  ? `Te quedan ${restantes} de ${LIMITE_GRATIS} tareas`
                  : 'Llegaste al límite. La siguiente tarea necesita Pro.'}
              </p>
            </div>
            <BotonPro />
          </div>
        )}
      </div>

      <Formulario />

      <ul className="mt-6 space-y-2">
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <Casilla id={tarea.id} hecha={tarea.hecha} />
            <div className="min-w-0 flex-1">
              <p className={tarea.hecha ? 'text-slate-400 line-through' : 'font-medium'}>
                {tarea.titulo}
              </p>
              <p className="text-xs text-slate-500">{tarea.autor}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
