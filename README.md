# 🐉 Dragon Ball Dashboard – Guía de Inicio

Este repositorio contiene una aplicación **Frontend desarrollada en React + Vite** que consume la **Dragon Ball API**.  
La aplicación incluye autenticación, roles de usuario y un dashboard con listado de personajes.

Este documento explica **paso a paso** cómo descargar el proyecto, configurarlo y ejecutarlo correctamente.

---

## 📌 Requisitos previos

Antes de comenzar, debes tener instalado en tu computadora:

### 1️⃣ Node.js (obligatorio)
- Descarga: https://nodejs.org
- Instala la versión **LTS**
- Verifica la instalación:
```bash
node -v
npm -v
2️⃣ Git (obligatorio)
Descarga: https://git-scm.com

Verifica:

bash
Copiar código
git --version
📥 Clonar el repositorio
Abre una terminal y ejecuta:

bash
Copiar código
git clone https://github.com/USUARIO/dragonball-dashboard.git
Luego entra al proyecto:

bash
Copiar código
cd dragonball-dashboard
📦 Instalación de dependencias
Ejecuta el siguiente comando una sola vez:

bash
Copiar código
npm install
Este comando descargará todas las librerías necesarias para que el proyecto funcione.

⚙️ Configuración del archivo .env
En la raíz del proyecto encontrarás (o deberás crear) un archivo llamado:

txt
Copiar código
.env
Agrega el siguiente contenido:

.env
Copiar código
VITE_API_URL=https://dragonball-api.com/api
VITE_ADMIN_EMAIL=admin@test.com
VITE_ADMIN_PASSWORD=Admin123
VITE_USER_EMAIL=user@test.com
VITE_USER_PASSWORD=User123

⚠️ IMPORTANTE
El prefijo VITE_ es obligatorio para que las variables funcionen en Vite.

🔐 Roles de usuario
La aplicación maneja dos roles:

👤 User
Puede:

Ver personajes

Filtrar y buscar

No puede:

Crear

Editar

Eliminar

🛡️ Admin
Puede:

Ver personajes

Crear personajes

Editar personajes

Eliminar personajes

El rol se maneja desde el sistema de autenticación del proyecto.

▶️ Ejecutar el proyecto
Una vez instaladas las dependencias y configurado el .env, ejecuta:

bash
Copiar código
npm run dev
Verás un mensaje similar a este:

txt
Copiar código
Local: http://localhost:5173
Abre esa URL en tu navegador.

🧪 Scripts disponibles
Comando	Descripción
npm run dev	Inicia el proyecto en desarrollo
npm run build	Genera el build de producción
npm run preview	Previsualiza el build

❗ Problemas comunes
❌ No inicia el proyecto
Ejecuta nuevamente:

bash
Copiar código
npm install
npm run dev
❌ Error con la API
Verifica el archivo .env

Asegúrate de que la URL de la API sea correcta

🌐 API utilizada
Dragon Ball API
📖 Documentación oficial:
https://web.dragonball-api.com/documentation

📝 Notas finales
Este proyecto es una prueba técnica frontend

El código está organizado para facilitar la lectura

No se requiere configuración de backend
