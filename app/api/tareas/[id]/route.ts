import { tareas } from '@/lib/datos';
import { emitir } from '@/lib/eventos';

export const dynamic = 'force-dynamic';

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return Response.json({ mensaje: 'No existe la tarea' }, { status: 404 });
  }

  tarea.hecha = !tarea.hecha;

  // Evento propio: avisa a todas las pestañas al marcar o desmarcar una tarea.
  emitir({
    tipo: 'tarea_marcada',
    aviso: tarea.hecha
      ? `Se completó la tarea: ${tarea.titulo}`
      : `Se marcó como pendiente: ${tarea.titulo}`,
  });

  return Response.json(tarea);
}
