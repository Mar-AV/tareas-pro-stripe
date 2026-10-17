import { emitir } from './eventos';

// El plan gratis aguanta cinco tareas. La sexta es la que te hace pagar.
export const LIMITE_GRATIS = 5;

const g = globalThis as unknown as { __pro?: { valor: boolean } };
g.__pro ??= { valor: false };

export function esPro(): boolean {
  return g.__pro!.valor;
}

/**
 * Enciende el plan Pro.
 *
 * Fíjate en la última línea: al activar Pro, avisamos por el MISMO canal
 * de eventos del Bloque 1. Por eso, cuando pagues en una pestaña, la otra
 * se desbloquea sola. Las dos semanas se tocan justo aquí.
 */
export function activarPro(): void {
  g.__pro!.valor = true;
  emitir({ tipo: 'plan', pro: true });
}

export function reiniciarPlan(): void {
  g.__pro!.valor = false;
  emitir({ tipo: 'plan', pro: false });
}
