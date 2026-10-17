// Canal de Server-Sent Events compartido entre las pestañas abiertas.
export type Evento =
  | { tipo: 'presencia'; conectados: number }
  | { tipo: 'tareas'; aviso?: string }
  | { tipo: 'plan'; pro: boolean }
  | { tipo: 'tarea_marcada'; aviso: string };

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
  if (clientes.delete(id)) {
    emitir({ tipo: 'presencia', conectados: clientes.size });
  }
}

// ESPACIO 2: enviar el mensaje SSE a todas las conexiones activas.
export function emitir(evento: Evento): void {
  const linea = `data: ${JSON.stringify(evento)}\n\n`;
  const mensaje = codificador.encode(linea);

  for (const [id, cliente] of clientes) {
    try {
      cliente.enqueue(mensaje);
    } catch {
      clientes.delete(id);
    }
  }
}
