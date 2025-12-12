# NextTasksFront — Micro Frontend React App (Module Federation)

> **Aplicación de gestión de tareas estilo Trello**, construida como un **micro‑frontend en React** usando **Module Federation**. Parte del ecosistema **NextTasks**, un sistema completo para la organización visual de tareas mediante tableros, columnas y tarjetas.

---

# 🎯 Resumen del proyecto

NextTasksFront es el **frontend principal** del sistema, encargado de:

* Renderizar la UI del dashboard de tareas
* Integrarse con otros micro‑frontends
* Gestionar estados compartidos entre módulos
* Cargar de forma remota componentes federados en tiempo de ejecución

La arquitectura se basa en **Webpack Module Federation**, lo que permite:

* Despliegue independiente de cada microfrontend
* Escalabilidad del proyecto
* Equipos trabajando en módulos separados sin romper la app

Ideal como proyecto demostrable para reclutadores interesados en **arquitecturas modernas**, **React avanzado**, y **micro‑frontends**.

---

# 🧩 Arquitectura del proyecto

El proyecto sigue un enfoque modular:

```
NextTasksFront
│── src
│   ├── app
│   │   ├── components
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   └── services
│   ├── federation
│   │   ├── remoteEntry.js
│   │   ├── exposes.js
│   │   └── remotes.js
│   └── index.js
│
│── webpack.config.js
│── package.json
└── ...
```

### **Puntos destacados**

* Carga dinámica de micro‑frontends a través de `remotes.js`.
* Exposición de componentes clave para otros módulos.
* Comunicación entre módulos mediante servicios desacoplados.
* UI desacoplada siguiendo una estructura clean.

---

# 🛠 Tech Stack

* **React 18**
* **Module Federation (Webpack 5)**
* **CSS Modules / Styled Components** (según implementación)
* **Axios / Fetch API** para comunicación http
* **React Router** para navegación
* **Vite / Webpack** (dependiendo de configuración del proyecto)
* **Micro Frontends Architecture**

---

# 📦 Funcionalidades principales

✔ Gestión visual de tareas estilo Trello
✔ Tableros con columnas y tarjetas
✔ Drag & Drop (arrastrar tareas entre columnas)
✔ Autenticación integrada con backend / microfrontend externo
✔ Consumo dinámico de módulos remotos
✔ UI reactiva y optimizada
✔ Arquitectura extensible a nuevos micro‑frontends

---

# 🚀 Cómo ejecutar el proyecto

> **Requisitos:** Node.js 18+ y npm

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el proyecto

```bash
npm start
```

El frontend arrancará normalmente en:

```
http://localhost:3000
```

### 3. Ejecutar junto a los otros micro‑frontends

Asegúrate de que los remotes configurados en `remotes.js` estén levantados.

Ejemplo:

```bash
npm run start:mf
```

> Si quieres, puedo añadir un **docker-compose** para levantar todo el ecosistema con un solo comando.

---

# 📡 Configuración de Module Federation

Ejemplo simplificado del módulo:

```js
new ModuleFederationPlugin({
  name: "nexttasksfront",
  filename: "remoteEntry.js",
  remotes: {
    auth: "auth@http://localhost:3001/remoteEntry.js",
    boards: "boards@http://localhost:3002/remoteEntry.js",
  },
  exposes: {
    "./Dashboard": "./src/app/pages/Dashboard",
  },
  shared: deps,
});
```

> Puedo documentar la arquitectura con un diagrama si lo deseas.

---

# 🧪 Tests

El proyecto puede incluir:

* **Jest** para tests unitarios
* **React Testing Library** para tests de UI
* **Tests E2E** con Cypress o Playwright

Si me indicas qué usas, puedo completar esta sección.

---

# 🖼 Capturas de pantalla / GIF de demo

> Aquí puedes añadir screenshots o una demo visual del tablero.

*(Envíame capturas o te indico cuáles tomar para que sea atractivo para reclutadores.)*

---

# 🧠 Lo que demuestra este proyecto

### ✔ Arquitectura avanzada (micro‑frontends)

### ✔ Conocimiento profundo de Webpack / Federation

### ✔ Diseño mantenible y escalable

### ✔ Buenas prácticas con React

### ✔ Trabajo en entornos distribuidos

Ideal para posiciones **React, full‑stack, frontend avanzado o arquitecto frontend junior.**

---

# 📌 Roadmap / Mejoras futuras

* [ ] Integración completa de autenticación federada
* [ ] Uso de cache distribuida entre microfrontends
* [ ] Migración progresiva a Vite Federation
* [ ] Añadir pruebas E2E
* [ ] Contenedores Docker para despliegue completo

---

# 📄 Licencia

MIT — Puedes usar este código como referencia para tus propios proyectos.

---

# 📫 Contacto

* **GitHub:** [https://github.com/Jechig0](https://github.com/Jechig0)
* **LinkedIn:** *(añade el tuyo)*
* **Email:** *(tu email profesional)*

---

> Si quieres, puedo crear también el README para el backend, los otros microfrontends o generar diagramas de arquitectura (componentes, módulo federation, flujo de datos).
