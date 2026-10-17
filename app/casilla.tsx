'use client';

import { useRouter } from 'next/navigation';

export function Casilla({ id, hecha }: { id: string; hecha: boolean }) {
  const router = useRouter();

  return (
    <input
      type="checkbox"
      checked={hecha}
      onChange={async () => {
        await fetch(`/api/tareas/${id}`, { method: 'PATCH' });
        router.refresh();
      }}
      className="size-5 accent-uspg-navy"
    />
  );
}
