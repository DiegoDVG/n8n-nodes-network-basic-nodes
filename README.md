# n8n Network Basic Nodes

A custom n8n node package that provides basic network functionality including TCP and UDP data transmission.

## Features

- **TCP Support**: Send data using Transmission Control Protocol with reliable, ordered, error-checked delivery
- **UDP Support**: Send data using User Datagram Protocol for fast, connectionless communication
- **Multiple Encodings**: Support for UTF-8, ASCII, Base64, and Hex encoding
- **Configurable Options**: Timeout settings, connection management, and encoding options
- **Error Handling**: Comprehensive error handling with detailed response information

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm
- n8n installed globally or locally

### Install the Node

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the node:
   ```bash
   npm run build
   ```
5. Link the node for local development:
   ```bash
   npm link
   ```
6. In your n8n custom directory (usually `~/.n8n/custom/`), link the node:
   ```bash
   npm link n8n-nodes-network-basic-nodes
   ```
7. Restart n8n

## Usage

### Node Parameters

- **Protocol**: Choose between TCP or UDP
- **Host**: Target host address (e.g., localhost, 192.168.1.100)
- **Port**: Target port number (1-65535)
- **Message**: Message to send (supports expressions)

### Advanced Options

- **Timeout**: Connection timeout in milliseconds (TCP only)
- **Encoding**: Text encoding (UTF-8, ASCII, Base64, Hex)
- **Keep Connection Open**: Whether to keep TCP connection open after sending

### Example Usage

#### TCP Example
```json
{
  "protocol": "tcp",
  "host": "192.168.1.100",
  "port": 8080,
  "message": "Hello TCP Server!",
  "options": {
    "timeout": 5000,
    "encoding": "utf8"
  }
}
```

#### UDP Example
```json
{
  "protocol": "udp",
  "host": "localhost",
  "port": 9090,
  "message": "Hello UDP Server!",
  "options": {
    "encoding": "utf8"
  }
}
```

## Output

The node returns a JSON object with the following information:

```json
{
  "success": true,
  "protocol": "tcp",
  "host": "localhost",
  "port": 8080,
  "message": "Hello Server!",
  "encoding": "utf8",
  "response": {
    "sent": "Hello Server!",
    "received": "Server response",
    "bytes": 14
  },
  "timestamp": "2024-01-01T10:00:00.000Z"
}
```

## Development

### Building
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request 