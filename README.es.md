<<<<<<< HEAD
# Network Basic Nodes para n8n

Un paquete de nodos personalizados para n8n que proporciona funcionalidades de red TCP y UDP.

## Nodos Incluidos

### 1. Network Basic Client
**Icono:** 📤 (fa:paper-plane)  
**Categoría:** Output  
**Funcionalidad:** Envío de datos via TCP o UDP

**Características:**
- **Protocolos soportados:** TCP y UDP
- **Configuración de timeout:** Para conexión y respuesta
- **Esperar respuesta:** Opción configurable para recibir respuesta del servidor
- **Encodings soportados:** UTF-8, ASCII, Base64, Hex
- **Mantener conexión abierta:** Para TCP (opcional)
- **Estados de respuesta:** `sent_no_wait`, `response_received`, `no_response`, `connection_closed`

### 2. Network Basic Server
**Icono:** 🖥️ (fa:server)  
**Categoría:** Trigger  
**Funcionalidad:** Servidores TCP y UDP que ejecutan workflows al recibir datos

**Características:**
- **Protocolos soportados:** TCP Server y UDP Server
- **Configuración de host:** Por defecto 127.0.0.1 (localhost)
- **Máximo de conexiones:** Configurable para TCP
- **Respuesta automática:** Opción para enviar respuesta a clientes
- **Encodings soportados:** UTF-8, ASCII, Base64, Hex
- **Datos binarios:** Incluye tanto datos decodificados como binarios en base64

## Instalación

1. Clona o descarga este repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Compila el proyecto:
   ```bash
   npm run build
   ```
4. Enlaza el paquete globalmente:
   ```bash
   npm link
   ```
5. En tu instalación de n8n, instala el paquete:
   ```bash
   npm install n8n-nodes-network-basic-nodes
   ```
   O si lo enlazaste globalmente:
   ```bash
   npm link n8n-nodes-network-basic-nodes
   ```

## Uso

### Network Basic Client

1. Arrastra el nodo "Network Basic Client" a tu workflow
2. Configura el protocolo (TCP o UDP)
3. Establece el host y puerto de destino
4. Escribe el mensaje a enviar
5. Configura las opciones avanzadas según necesites

**Ejemplo de salida:**
```json
{
  "success": true,
  "protocol": "tcp",
  "host": "127.0.0.1",
  "port": 8080,
  "message": "Hello Server!",
  "encoding": "utf8",
  "status": "response_received",
  "response": {
    "data": "Hello Client!",
    "bytes": 13
  },
  "bytes": 13,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Network Basic Server

1. Arrastra el nodo "Network Basic Server" a tu workflow
2. Configura el protocolo (TCP Server o UDP Server)
3. Establece el puerto de escucha
4. Configura el host (127.0.0.1 para localhost, 0.0.0.0 para todas las interfaces)
5. Configura las opciones de respuesta si es necesario

**Ejemplo de datos recibidos:**
```json
{
  "protocol": "tcp",
  "server": {
    "host": "127.0.0.1",
    "port": 8080
  },
  "client": {
    "remoteAddress": "127.0.0.1",
    "remotePort": 54321,
    "localAddress": "127.0.0.1",
    "localPort": 8080
  },
  "data": "Hello Server!",
  "encoding": "utf8",
  "bytes": 13,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "responseSent": false
}
```

## Configuraciones por Defecto

- **Host:** 127.0.0.1 (localhost)
- **Puerto TCP:** 8080
- **Puerto UDP:** 9090
- **Encoding:** UTF-8
- **Esperar respuesta:** false
- **Timeout de conexión:** 5000ms
- **Timeout de respuesta:** 3000ms
- **Mensaje de respuesta:** vacío

## Casos de Uso

### Cliente TCP/UDP
- Envío de datos a servicios externos
- Comunicación con dispositivos IoT
- Integración con sistemas legacy
- Testing de servicios de red

### Servidor TCP/UDP
- Recepción de webhooks personalizados
- Integración con dispositivos que envían datos
- Creación de APIs simples
- Monitoreo de red

## Desarrollo

Para desarrollar o modificar estos nodos:

```bash
# Instalar dependencias
npm install

# Compilar en modo desarrollo (watch)
npm run dev

# Compilar para producción
npm run build

# Linting
npm run lint

# Formateo de código
npm run format
```

## Estructura del Proyecto

```
nodes/
├── NetworkBasic/
│   ├── NetworkBasicClient.node.ts    # Nodo cliente (envío)
│   ├── NetworkBasicClient.node.json  # Metadatos del cliente
│   ├── NetworkBasicServer.node.ts    # Nodo servidor (trigger)
│   └── NetworkBasicServer.node.json  # Metadatos del servidor
├── TCP/                              # Nodos TCP especializados (legacy)
├── UDP/                              # Nodos UDP especializados (legacy)
└── Triggers/                         # Triggers especializados (legacy)
```

## Licencia

MIT

## Contribuciones

=======
# Network Basic Nodes para n8n

Un paquete de nodos personalizados para n8n que proporciona funcionalidades de red TCP y UDP.

## Nodos Incluidos

### 1. Network Basic Client
**Icono:** 📤 (fa:paper-plane)  
**Categoría:** Output  
**Funcionalidad:** Envío de datos via TCP o UDP

**Características:**
- **Protocolos soportados:** TCP y UDP
- **Configuración de timeout:** Para conexión y respuesta
- **Esperar respuesta:** Opción configurable para recibir respuesta del servidor
- **Encodings soportados:** UTF-8, ASCII, Base64, Hex
- **Mantener conexión abierta:** Para TCP (opcional)
- **Estados de respuesta:** `sent_no_wait`, `response_received`, `no_response`, `connection_closed`

### 2. Network Basic Server
**Icono:** 🖥️ (fa:server)  
**Categoría:** Trigger  
**Funcionalidad:** Servidores TCP y UDP que ejecutan workflows al recibir datos

**Características:**
- **Protocolos soportados:** TCP Server y UDP Server
- **Configuración de host:** Por defecto 127.0.0.1 (localhost)
- **Máximo de conexiones:** Configurable para TCP
- **Respuesta automática:** Opción para enviar respuesta a clientes
- **Encodings soportados:** UTF-8, ASCII, Base64, Hex
- **Datos binarios:** Incluye tanto datos decodificados como binarios en base64

## Instalación

1. Clona o descarga este repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Compila el proyecto:
   ```bash
   npm run build
   ```
4. Enlaza el paquete globalmente:
   ```bash
   npm link
   ```
5. En tu instalación de n8n, instala el paquete:
   ```bash
   npm install n8n-nodes-network-basic-nodes
   ```
   O si lo enlazaste globalmente:
   ```bash
   npm link n8n-nodes-network-basic-nodes
   ```

## Uso

### Network Basic Client

1. Arrastra el nodo "Network Basic Client" a tu workflow
2. Configura el protocolo (TCP o UDP)
3. Establece el host y puerto de destino
4. Escribe el mensaje a enviar
5. Configura las opciones avanzadas según necesites

**Ejemplo de salida:**
```json
{
  "success": true,
  "protocol": "tcp",
  "host": "127.0.0.1",
  "port": 8080,
  "message": "Hello Server!",
  "encoding": "utf8",
  "status": "response_received",
  "response": {
    "data": "Hello Client!",
    "bytes": 13
  },
  "bytes": 13,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Network Basic Server

1. Arrastra el nodo "Network Basic Server" a tu workflow
2. Configura el protocolo (TCP Server o UDP Server)
3. Establece el puerto de escucha
4. Configura el host (127.0.0.1 para localhost, 0.0.0.0 para todas las interfaces)
5. Configura las opciones de respuesta si es necesario

**Ejemplo de datos recibidos:**
```json
{
  "protocol": "tcp",
  "server": {
    "host": "127.0.0.1",
    "port": 8080
  },
  "client": {
    "remoteAddress": "127.0.0.1",
    "remotePort": 54321,
    "localAddress": "127.0.0.1",
    "localPort": 8080
  },
  "data": "Hello Server!",
  "encoding": "utf8",
  "bytes": 13,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "responseSent": false
}
```

## Configuraciones por Defecto

- **Host:** 127.0.0.1 (localhost)
- **Puerto TCP:** 8080
- **Puerto UDP:** 9090
- **Encoding:** UTF-8
- **Esperar respuesta:** false
- **Timeout de conexión:** 5000ms
- **Timeout de respuesta:** 3000ms
- **Mensaje de respuesta:** vacío

## Casos de Uso

### Cliente TCP/UDP
- Envío de datos a servicios externos
- Comunicación con dispositivos IoT
- Integración con sistemas legacy
- Testing de servicios de red

### Servidor TCP/UDP
- Recepción de webhooks personalizados
- Integración con dispositivos que envían datos
- Creación de APIs simples
- Monitoreo de red

## Desarrollo

Para desarrollar o modificar estos nodos:

```bash
# Instalar dependencias
npm install

# Compilar en modo desarrollo (watch)
npm run dev

# Compilar para producción
npm run build

# Linting
npm run lint

# Formateo de código
npm run format
```

## Estructura del Proyecto

```
nodes/
├── NetworkBasic/
│   ├── NetworkBasicClient.node.ts    # Nodo cliente (envío)
│   ├── NetworkBasicClient.node.json  # Metadatos del cliente
│   ├── NetworkBasicServer.node.ts    # Nodo servidor (trigger)
│   └── NetworkBasicServer.node.json  # Metadatos del servidor
├── TCP/                              # Nodos TCP especializados (legacy)
├── UDP/                              # Nodos UDP especializados (legacy)
└── Triggers/                         # Triggers especializados (legacy)
```

## Licencia

MIT

## Contribuciones

>>>>>>> eaf0cdaead5b43c13af0b4b103f1729f376d372f
Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir cambios o mejoras. 