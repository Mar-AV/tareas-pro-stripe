// Los datos viven en memoria. Se borran al apagar el servidor.
// Van colgados de globalThis para que el recargado en caliente de Next
// no los borre cada vez que guardas un archivo.

export type Tarea = {
  id: string;
  titulo: string;
  hecha: boolean;
  autor: string;
};

const g = globalThis as unknown as { __tareas?: Tarea[] };

g.__tareas ??= [
  { id: crypto.randomUUID(), titulo: 'Leer sobre Server-Sent Events', hecha: true, autor: 'Sistema' },
  { id: crypto.randomUUID(), titulo: 'Crear la cuenta de Stripe en modo prueba', hecha: false, autor: 'Sistema' },
  { id: crypto.randomUUID(), titulo: 'Abrir dos pestañas y ver la magia', hecha: false, autor: 'Sistema' },
];

export const tareas = g.__tareas;
