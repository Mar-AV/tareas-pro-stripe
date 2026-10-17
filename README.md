# Tareas Pro | Proyecto Semanas 9 y 10

### Programación IV — Universidad San Pablo de Guatemala

**Datos del estudiante**

- **Nombre:** Marlon Vinicio Aguilar Vásquez
- **Carné:** 2500101
- **Carrera:** Ingeniería en Sistemas
- **Curso:** Programación IV
- **Universidad:** Universidad San Pablo de Guatemala

---

## 1. Descripción del proyecto

**Tareas Pro** es una aplicación web creada para administrar tareas de manera sencilla y práctica. El objetivo principal es implementar funciones de comunicación en tiempo real y un sistema de suscripciones utilizando Stripe.

El proyecto corresponde a las actividades de las semanas 9 y 10 del curso de Programación IV.

La aplicación permite crear, consultar y completar tareas, incorporando funcionalidades que mejoran la interacción entre el usuario y el servidor.

### Funciones principales

- Visualizar las tareas registradas.
- Agregar y marcar tareas como completadas.
- Sincronizar cambios entre distintas pestañas.
- Mostrar la cantidad de usuarios conectados.
- Limitar el plan gratuito a cinco tareas.
- Integrar pagos de prueba mediante Stripe.
- Actualizar el estado de la suscripción.
- Procesar notificaciones mediante webhooks.

---

## 2. Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| Next.js | Desarrollo de la aplicación web |
| React | Construcción de la interfaz |
| TypeScript | Programación con tipado estático |
| Node.js | Entorno de ejecución |
| Server-Sent Events (SSE) | Comunicación en tiempo real |
| Stripe | Procesamiento de pagos |
| API Routes | Comunicación entre cliente y servidor |

---

## 3. Instalación y ejecución

Para ejecutar este proyecto es necesario tener instalado Node.js y un administrador de paquetes como npm.

### Paso 1. Instalar dependencias

Abrir una terminal dentro de la carpeta del proyecto y ejecutar:

```bash
npm install
```

### Paso 2. Configurar variables de entorno

Crear el archivo `.env.local` utilizando el archivo de ejemplo.

En Windows:

```powershell
copy .env.local.example .env.local
```

En la terminal de Linux o macOS:

```bash
cp .env.local.example .env.local
```

### Paso 3. Iniciar la aplicación

```bash
npm run dev
```

Después, ingresar desde el navegador a:

**http://localhost:3000**

Al iniciar, la aplicación contiene tres tareas de ejemplo que pueden visualizarse y modificarse.

También es posible ejecutar el proyecto utilizando pnpm:

```bash
pnpm install
pnpm dev
```

**Importante:** para trabajar con las funciones básicas y la comunicación en tiempo real no es necesario configurar Stripe inicialmente.

---

## 4. Desarrollo de las semanas 9 y 10

### Semana 9 — Comunicación en tiempo real

Durante esta etapa se implementa la comunicación mediante Server-Sent Events (SSE).

Esta tecnología permite que el servidor envíe actualizaciones automáticamente a los navegadores conectados, sin necesidad de actualizar manualmente la página.

**Archivos principales:**

| Archivo | Responsabilidad |
|---|---|
| `app/api/eventos/route.ts` | Mantener abierta la conexión SSE |
| `lib/eventos.ts` | Distribuir eventos a los clientes conectados |
| `app/vivo.tsx` | Recibir eventos y actualizar la interfaz |

**Comprobación del funcionamiento:**

1. Iniciar la aplicación.
2. Abrir dos pestañas con `http://localhost:3000`.
3. Crear una tarea desde una de ellas.
4. Verificar que la segunda pestaña reciba la actualización.
5. Revisar que el contador refleje las conexiones abiertas.

También puede comprobarse la conexión visitando:

`http://localhost:3000/api/eventos`

Esta conexión permanece abierta porque está diseñada para recibir actualizaciones continuas.

### Semana 10 — Integración con Stripe

En esta etapa se incorpora una funcionalidad de suscripción para diferenciar entre usuarios gratuitos y usuarios Pro.

**Plan gratuito:** permite registrar hasta cinco tareas.

**Plan Pro:** elimina el límite de tareas después de validar correctamente el pago.

**Archivos principales:**

| Archivo | Responsabilidad |
|---|---|
| `app/api/checkout/route.ts` | Crear una sesión de pago en Stripe |
| `app/gracias/page.tsx` | Verificar el resultado del pago y actualizar el plan |
| `app/api/stripe/webhook/route.ts` | Recibir y verificar las notificaciones de Stripe |

### Configuración de Stripe

Para configurar el sistema de pagos:

1. Ingresar a https://dashboard.stripe.com/register
2. Crear una cuenta.
3