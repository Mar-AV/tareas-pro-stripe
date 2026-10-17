/**
 * Simula un webhook de Stripe sin instalar el Stripe CLI.
 *
 *   npm run webhook:simular
 *
 * Arma un evento «checkout.session.completed», le calcula la firma con
 * el secreto de tu .env.local y lo manda a tu propio servidor. Sirve para
 * probar el ESPACIO 6 cuando no tienes el CLI a la mano.
 *
 * Para verlo de verdad, con eventos reales de Stripe:
 *   stripe listen --forward-to localhost:3000/api/stripe/webhook
 */
import crypto from 'node:crypto';
import fs from 'node:fs';

// ── leer .env.local a mano (sin dependencias) ──
const env = {};
try {
  for (const linea of fs.readFileSync('.env.local', 'utf8').split('\n')) {
    const m = linea.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].trim();
  }
} catch {
  console.error('No encontré .env.local. Cópialo de .env.local.example primero.');
  process.exit(1);
}

const SECRETO = env.STRIPE_WEBHOOK_SECRET || 'whsec_de_prueba_para_el_simulador';
const DESTINO = (env.NEXT_PUBLIC_URL || 'http://localhost:3000') + '/api/stripe/webhook';

const cuerpo = JSON.stringify({
  id: 'evt_simulado_' + Date.now(),
  object: 'event',
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_test_simulado',
      object: 'checkout.session',
      payment_status: 'paid',
      mode: 'subscription',
    },
  },
});

function firmar(secreto) {
  const t = Math.floor(Date.now() / 1000);
  const v1 = crypto.createHmac('sha256', secreto).update(`${t}.${cuerpo}`).digest('hex');
  return `t=${t},v1=${v1}`;
}

async function mandar(firma, etiqueta) {
  const r = await fetch(DESTINO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'stripe-signature': firma },
    body: cuerpo,
  });
  const texto = await r.text();
  console.log(`  [${etiqueta}] ${r.status} ${texto.slice(0, 120)}`);
  return r.status;
}

console.log(`\nMandando un checkout.session.completed a ${DESTINO}\n`);

let estado = await mandar(firmar(SECRETO), 'secreto completo');

// Por si tu versión de la librería firma sin el prefijo whsec_
if (estado === 400 && SECRETO.startsWith('whsec_')) {
  estado = await mandar(firmar(SECRETO.slice(6)), 'sin prefijo whsec_');
}

console.log('');
if (estado === 200) {
  console.log('✅ El webhook lo aceptó. Recarga la página: ya deberías ser Pro.');
} else if (estado === 501) {
  console.log('⚠️  Todavía falta el ESPACIO 6 en app/api/stripe/webhook/route.ts');
} else if (estado === 400) {
  console.log('❌ Firma rechazada. Revisa que STRIPE_WEBHOOK_SECRET sea el mismo');
  console.log('   que usa constructEvent, y que estés leyendo req.text() y no req.json().');
} else {
  console.log(`❓ Respondió ${estado}. Revisa la terminal donde corre npm run dev.`);
}
console.log('');

// Evidencia adicional: una firma falsa debe recibir 400.
const estadoInvalido = await mandar('t=0,v1=firma_invalida', 'firma incorrecta');
if (estadoInvalido === 400) {
  console.log('✅ Firma incorrecta rechazada con HTTP 400.');
} else {
  console.log(`❌ Se esperaba 400 para la firma incorrecta, se recibió ${estadoInvalido}.`);
}
