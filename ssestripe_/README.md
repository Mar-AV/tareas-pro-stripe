# Tareas Pro · Semanas 9 y 10

Programación IV · Universidad San Pablo de Guatemala

Una sola aplicación. Un solo `npm install`. Una sola terminal.

Ya funciona: puedes ver tareas, agregarlas y marcarlas. **Le faltan seis
pedacitos**, y cada uno son entre cinco y diez líneas. Esos seis son la clase
de hoy.

| Semana | Qué le agregamos |
|---|---|
| **9** · Tiempo real | Que todas las pestañas abiertas se enteren al instante, sin recargar |
| **10** · Stripe | Que el plan gratis tope a 5 tareas y se desbloquee pagando |

---

## 1 · Arrancar (3 minutos)

```bash
npm install
cp .env.local.example .env.local     # en Windows:  copy .env.local.example .env.local
npm run dev
```

npm install	pnpm install
npm run dev	pnpm dev
npm run webhook:simular	pnpm webhook:simular
npx ...	pnpm dlx ...


Abre **http://localhost:3000**. Debes ver tres tareas y poder agregar más.

> Para el Bloque 1 **no necesitas Stripe todavía**. Arranca aunque el
> `.env.local` tenga las llaves de mentira.

---

## 2 · Lo primero que tienes que hacer hoy

**Crea tu cuenta de Stripe ahora, en el minuto uno**, aunque no la usemos
hasta la segunda mitad. El correo de verificación tarda, y no quieres estar
esperándolo cuando toque.

1. Entra a **https://dashboard.stripe.com/register**
2. Correo, contraseña, y verifica el correo.
3. Cuando te pregunte por tu negocio, **sáltatelo**. No hace falta activar
   la cuenta para usar el modo de prueba.
4. Ve a **https://dashboard.stripe.com/test/apikeys**
5. Copia la *Secret key* (empieza con `sk_test_`) y pégala en tu `.env.local`.

Comprueba que estás en modo prueba: arriba a la derecha del panel debe decir
**Test mode**. Si tu llave empieza con `sk_test_`, estás bien. **Si alguna vez
ves una que empieza con `sk_live_`, esa mueve dinero de verdad.**

---

## 3 · Los seis espacios

Búscalos en el editor con `Ctrl+Shift+F` → **`TODO (Bloque`**

### Bloque 1 · El canal se abre

| # | Archivo | Qué le falta |
|---|---|---|
| 1 | `app/api/eventos/route.ts` | La petición que nunca se cierra |
| 2 | `lib/eventos.ts` | Mandarle el mensaje a todos los conectados |

**Se prueba así:** abre `http://localhost:3000/api/eventos` en una pestaña.
Si la pestaña se queda cargando para siempre y no truena, funcionó. Una
petición que no termina es exactamente lo que queremos.

### Bloque 2 · El navegador escucha

| # | Archivo | Qué le falta |
|---|---|---|
| 3 | `app/vivo.tsx` | `EventSource` y qué hacer con cada evento |

**Se prueba así:** abre **dos ventanas** lado a lado en la misma dirección.
Agrega una tarea en una. La otra tiene que actualizarse sola, sin tocarla, y
mostrar el aviso abajo. El contador de arriba debe decir **2 conectados**.

Cierra una ventana: la otra debe bajar a 1 sola.

### Bloque 3 · Cobrar

| # | Archivo | Qué le falta |
|---|---|---|
| 4 | `app/api/checkout/route.ts` | Pedirle a Stripe la dirección de pago |
| 5 | `app/gracias/page.tsx` | Confirmarle a Stripe que sí pagó |

**Se prueba así:** agrega tareas hasta llegar a cinco. La sexta te rebota con
un **402**. Presiona *Hazte Pro*, y en Stripe paga con la tarjeta de prueba:

```
Número:      4242 4242 4242 4242
Vencimiento: cualquier fecha futura (12/34)
CVC:         cualquier número (123)
Código postal: cualquiera (12345)
```

Vuelves a tu app convertido en Pro. **Y si dejaste la otra ventana abierta,
esa también se desbloqueó sola** — porque el plan avisa por el canal que
construiste en el Bloque 1.

### Bloque 4 · El aviso que llega aunque cierres la pestaña

| # | Archivo | Qué le falta |
|---|---|---|
| 6 | `app/api/stripe/webhook/route.ts` | Verificar la firma y actuar |

**Se prueba sin instalar nada:**

```bash
npm run webhook:simular
```

El script arma un evento firmado y se lo manda a tu servidor. Te dice si lo
aceptó, si falta el ESPACIO, o si la firma no cuadró.

**Y con Stripe de verdad**, si te da tiempo:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Te imprime un `whsec_...`: pégalo en `.env.local` como
`STRIPE_WEBHOOK_SECRET` y reinicia `npm run dev`.

---

## 4 · Cómo volver a empezar

Los datos viven en memoria. **Apaga y enciende `npm run dev`** y vuelves a
tener tres tareas y plan gratis. Es la forma más rápida de probar el muro de
pago otra vez.

---

## 5 · Si algo falla

| Síntoma | Causa |
|---|---|
| `/api/eventos` responde 501 | Falta el ESPACIO 1 |
| La otra pestaña no se actualiza | Falta el ESPACIO 2 o el 3 |
| El contador siempre dice 0 o 1 | El ESPACIO 2 está vacío: nadie recibe el evento de presencia |
| Se abren conexiones y nunca se cierran | Falta el `return () => fuente.close()` del ESPACIO 3 |
| *Hazte Pro* no hace nada | Falta el ESPACIO 4, o la llave `sk_test_` está mal pegada |
| Stripe dice «Invalid API Key» | Copiaste la publicable en vez de la secreta, o dejaste el texto de ejemplo |
| Vuelves de pagar y sigues en gratis | Falta el ESPACIO 5 |
| El simulador responde 400 | Estás leyendo `req.json()` en vez de `req.text()`, o el secreto no coincide |

---

## 6 · Lo que hay que llevarse

**De la Semana 9:** una petición normal pregunta y se cierra. Un canal en vivo
se queda abierto y es el **servidor** quien habla. SSE es de una sola vía y va
sobre HTTP normal; WebSockets es de dos vías y cambia de protocolo. Si solo
necesitas que el servidor te avise, SSE te sobra.

**De la Semana 10:** el número de tarjeta **nunca toca tu servidor**. Tú mandas
al usuario a Stripe y Stripe te avisa. Y te avisa **dos veces**: por el
redirect, que es cómodo pero se pierde si cierran la pestaña, y por el
webhook, que llega siempre. Por eso se implementan los dos.

---

## 7 · Nota honesta

Este proyecto se preparó en un entorno **sin acceso al registro de npm**, así
que no se pudo correr `npm install` ni levantar el servidor aquí. Se verificó
la sintaxis y los tipos de todos los archivos, y la lógica pura (el formato de
los mensajes SSE y el muro de pago) con `node:test`.

Si algo truena en la primera corrida, lo más probable es una versión de
paquete, no la lógica.
