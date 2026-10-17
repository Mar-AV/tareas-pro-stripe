// ════════════════════════════════════════════════════════════
//  El canal de eventos en vivo.
//
//  Aquí vive la lista de navegadores conectados. Cada uno dejó
//  una línea telefónica abierta y espera que le hablemos.
// ════════════════════════════════════════════════════════════

export type Evento =
  | { tipo: 'presencia'; conectados: number }
  | { tipo: 'tareas'; aviso?: string }
  | { tipo: 'plan'; pro: boolean };

type Cliente = ReadableStreamDefaultController<Uint8Array>;

const g = globalThis as unknown as { __clientes?: Map<string, Cliente> };
g.__clientes ??= new Map();
const clientes = g.__clientes;

const codificador = new TextEncoder();

export function conectados(): number {
  return clientes.size;
}

export function agregarCliente(cliente: Cliente): string {
  const id = crypto.randomUUID();
  clientes.set(id, cliente);
  emitir({ tipo: 'presencia', conectados: clientes.size });
  return id;
}

export function quitarCliente(id: string): void {
  clientes.delete(id);
  emitir({ tipo: 'presencia', conectados: clientes.size });
}

// ╔══════════════════════════════════════════════════════════╗
// ║  ESPACIO 2 · Avisarle a TODOS los conectados               ║
// ║                                                          ║
// ║  El formato de un mensaje SSE es literalmente esto:      ║
// ║                                                          ║
// ║      data: {"lo":"que","sea":1}\n\n                      ║
// ║                                                          ║
// ║  La palabra «data:», el contenido, y DOS saltos de línea. ║
// ║  Los dos saltos son los que marcan «aquí termina el       ║
// ║  mensaje». Con uno solo, el navegador se queda esperando. ║
// ║                                                          ║
// ║  Recorre el mapa de clientes y mándale esa línea a cada   ║
// ║  uno con  cliente.enqueue(codificador.encode(linea)).     ║
// ║  Si uno truena, ya se fue: bórralo del mapa.              ║
// ╚══════════════════════════════════════════════════════════╝
export function emitir(evento: Evento): void {
  // TODO (Bloque 1, paso 2)
}
