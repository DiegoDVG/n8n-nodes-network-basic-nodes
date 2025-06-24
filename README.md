# Network Basic Nodes for n8n

A comprehensive n8n node package that provides TCP and UDP network functionality with specialized client and server nodes.

**🌐 Languages:** [English](README.md) | [Español](README.es.md)

## Included Nodes

### 1. Network Basic Client
**Icon:** 📤 (fa:paper-plane)  
**Category:** Output  
**Functionality:** Send data via TCP or UDP protocols

**Features:**
- **Supported protocols:** TCP and UDP
- **Timeout configuration:** For connection and response
- **Wait for response:** Configurable option to receive server response
- **Supported encodings:** UTF-8, ASCII, Base64, Hex
- **Keep connection open:** For TCP (optional)
- **Response states:** `sent_no_wait`, `response_received`, `no_response`, `connection_closed`

### 2. Network Basic Server
**Icon:** 🖥️ (fa:server)  
**Category:** Trigger  
**Functionality:** TCP and UDP servers that trigger workflows when receiving data

**Features:**
- **Supported protocols:** TCP Server and UDP Server
- **Host configuration:** Default 127.0.0.1 (localhost)
- **Maximum connections:** Configurable for TCP
- **Automatic response:** Option to send response back to clients
- **Supported encodings:** UTF-8, ASCII, Base64, Hex
- **Binary data:** Includes both decoded data and binary data in base64

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Link the package globally:
   ```bash
   npm link
   ```
5. In your n8n installation, install the package:
   ```bash
   npm install n8n-nodes-network-basic-nodes
   ```
   Or if you linked it globally:
   ```bash
   npm link n8n-nodes-network-basic-nodes
   ```

## Usage

### Network Basic Client

1. Drag the "Network Basic Client" node to your workflow
2. Configure the protocol (TCP or UDP)
3. Set the target host and port
4. Write the message to send
5. Configure advanced options as needed

**Output example:**
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

1. Drag the "Network Basic Server" node to your workflow
2. Configure the protocol (TCP Server or UDP Server)
3. Set the listening port
4. Configure the host (127.0.0.1 for localhost, 0.0.0.0 for all interfaces)
5. Configure response options if needed

**Received data example:**
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

## Default Configurations

- **Host:** 127.0.0.1 (localhost)
- **TCP Port:** 8080
- **UDP Port:** 9090
- **Encoding:** UTF-8
- **Wait for response:** false
- **Connection timeout:** 5000ms
- **Response timeout:** 3000ms
- **Response message:** empty

## Use Cases

### TCP/UDP Client
- Send data to external services
- Communicate with IoT devices
- Integration with legacy systems
- Network service testing

### TCP/UDP Server
- Receive custom webhooks
- Integration with devices that send data
- Create simple APIs
- Network monitoring

## Development

To develop or modify these nodes:

```bash
# Install dependencies
npm install

# Compile in development mode (watch)
npm run dev

# Compile for production
npm run build

# Linting
npm run lint

# Code formatting
npm run format
```

## Project Structure

```
nodes/
├── NetworkBasic/
│   ├── NetworkBasicClient.node.ts    # Client node (sending)
│   ├── NetworkBasicClient.node.json  # Client metadata
│   ├── NetworkBasicServer.node.ts    # Server node (trigger)
│   └── NetworkBasicServer.node.json  # Server metadata
├── TCP/                              # Specialized TCP nodes (legacy)
├── UDP/                              # Specialized UDP nodes (legacy)
└── Triggers/                         # Specialized triggers (legacy)
```

## License

MIT

## Contributing

Contributions are welcome. Please open an issue or pull request to suggest changes or improvements. 