import { tareas } from '@/lib/datos';
import { emitir } from '@/lib/eventos';

export const dynamic = 'force-dynamic';

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params; // en Next 15+ los params son asíncronos
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) return Response.json({ mensaje: 'No existe' }, { status: 404 });

  tarea.hecha = !tarea.hecha;
  emitir({ tipo: 'tareas' });

  return Response.json(tarea);
}
