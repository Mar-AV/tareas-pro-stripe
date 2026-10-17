import { agregarCliente, quitarCliente } from '@/lib/eventos';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// ESPACIO 1: mantener abierto el canal SSE hasta que se desconecte el navegador.
export async function GET(req: Request) {
  let cerrar = () => {};

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const id = agregarCliente(controller);
      let cerrado = false;

      cerrar = () => {
        if (cerrado) return;
        cerrado = true;
        quitarCliente(id);
        try {
          controller.close();
        } catch {
          // El navegador ya cerró el stream.
        }
      };

      if (req.signal.aborted) {
        cerrar();
      } else {
        req.signal.addEventListener('abort', cerrar, { once: true });
      }
    },
    cancel() {
      cerrar();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
