import { agregarCliente, quitarCliente } from '@/lib/eventos';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// ╔══════════════════════════════════════════════════════════╗
// ║  ESPACIO 1 · El canal abierto                              ║
// ║                                                          ║
// ║  Una petición normal: preguntas, te responden, se cierra. ║
// ║  Esta NO se cierra. Se queda abierta y el servidor va     ║
// ║  escribiendo cuando tiene algo que decir.                 ║
// ║                                                          ║
// ║  Pasos:                                                   ║
// ║   1. Crea  new ReadableStream({ start(controller) {...} })║
// ║   2. Dentro de start: guarda el controller con            ║
// ║      agregarCliente(controller) y quédate con el id.      ║
// ║   3. Cuando el navegador cierre la pestaña, Next dispara  ║
// ║      req.signal. Escucha 'abort' y llama quitarCliente(id)║
// ║   4. Devuelve  new Response(stream, { headers })          ║
// ║      con Content-Type: text/event-stream                  ║
// ╚══════════════════════════════════════════════════════════╝
export async function GET(req: Request) {
  // TODO (Bloque 1, paso 1)
  return new Response('Todavía no está hecho el ESPACIO 1', { status: 501 });
}
