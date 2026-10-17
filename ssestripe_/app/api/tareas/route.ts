import { tareas } from '@/lib/datos';
import { emitir } from '@/lib/eventos';
import { esPro, LIMITE_GRATIS } from '@/lib/plan';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(tareas);
}

export async function POST(req: Request) {
  const { titulo, autor } = (await req.json()) as { titulo?: string; autor?: string };

  if (!titulo || titulo.trim().length < 3) {
    return Response.json({ mensaje: 'Escribe al menos 3 caracteres' }, { status: 400 });
  }

  // ── El muro de pago ──
  if (!esPro() && tareas.length >= LIMITE_GRATIS) {
    return Response.json(
      { mensaje: `El plan gratis llega a ${LIMITE_GRATIS} tareas`, necesitaPro: true },
      { status: 402 }, // 402 Payment Required. Existe desde 1997 y casi nadie lo usa.
    );
  }

  const tarea = {
    id: crypto.randomUUID(),
    titulo: titulo.trim(),
    hecha: false,
    autor: autor?.trim() || 'Alguien',
  };
  tareas.unshift(tarea);

  // Avisarle a todas las pestañas abiertas.
  emitir({ tipo: 'tareas', aviso: `${tarea.autor} agregó «${tarea.titulo}»` });

  return Response.json(tarea, { status: 201 });
}
