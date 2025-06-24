import {
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	IExecuteFunctions,
	NodeOperationError,
} from 'n8n-workflow';

import { createSocket } from 'dgram';
import { Socket } from 'net';

export class NetworkSender implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Network Basic Nodes',
		name: 'networkBasicNodes',
		icon: 'fa:network-wired',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["protocol"] + ": " + $parameter["host"] + ":" + $parameter["port"]}}',
		description: 'Send data via TCP or UDP protocols',
		defaults: {
			name: 'Network Basic Nodes',
		},
		inputs: ['main'] as any,
		outputs: ['main'] as any,
		properties: [
			{
				displayName: 'Protocol',
				name: 'protocol',
				type: 'options',
				options: [
					{
						name: 'TCP',
						value: 'tcp',
						description: 'Transmission Control Protocol - reliable, ordered, error-checked',
					},
					{
						name: 'UDP',
						value: 'udp',
						description: 'User Datagram Protocol - fast, connectionless',
					},
				],
				default: 'tcp',
				required: true,
				description: 'Protocol to use for sending data',
			},
			{
				displayName: 'Host',
				name: 'host',
				type: 'string',
				default: 'localhost',
				required: true,
				description: 'Target host address',
				placeholder: 'localhost or 192.168.1.100',
			},
			{
				displayName: 'Port',
				name: 'port',
				type: 'number',
				default: 8080,
				required: true,
				description: 'Target port number',
				typeOptions: {
					minValue: 1,
					maxValue: 65535,
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '={{$input.all()}}',
				required: true,
				description: 'Message to send. Can use expressions to include input data.',
				typeOptions: {
					rows: 4,
				},
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Connection Timeout (ms)',
						name: 'connectionTimeout',
						type: 'number',
						default: 5000,
						description: 'Connection timeout in milliseconds',
						displayOptions: {
							show: {
								'/protocol': ['tcp'],
							},
						},
					},
					{
						displayName: 'Wait for Response',
						name: 'waitForResponse',
						type: 'boolean',
						default: false,
						description: 'Whether to wait for a response from the server after sending data',
					},
					{
						displayName: 'Response Timeout (ms)',
						name: 'responseTimeout',
						type: 'number',
						default: 3000,
						description: 'Time to wait for server response after sending data',
						displayOptions: {
							show: {
								'/options.waitForResponse': [true],
							},
						},
					},
					{
						displayName: 'Encoding',
						name: 'encoding',
						type: 'options',
						options: [
							{
								name: 'UTF-8',
								value: 'utf8',
							},
							{
								name: 'ASCII',
								value: 'ascii',
							},
							{
								name: 'Base64',
								value: 'base64',
							},
							{
								name: 'Hex',
								value: 'hex',
							},
						],
						default: 'utf8',
						description: 'Text encoding to use',
					},
					{
						displayName: 'Keep Connection Open',
						name: 'keepOpen',
						type: 'boolean',
						default: false,
						description: 'Whether to keep the TCP connection open after sending',
						displayOptions: {
							show: {
								'/protocol': ['tcp'],
							},
						},
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const protocol = this.getNodeParameter('protocol', i) as string;
				const host = this.getNodeParameter('host', i) as string;
				const port = this.getNodeParameter('port', i) as number;
				const message = this.getNodeParameter('message', i) as string;
				const options = this.getNodeParameter('options', i) as any;
				const encoding = options.encoding || 'utf8';
				
				let result: any;

				if (protocol === 'tcp') {
					// TCP Implementation
					result = await new Promise((resolve, reject) => {
						const client = new Socket();
						const connectionTimeout = options.connectionTimeout || 5000;
						const responseTimeout = options.responseTimeout || 3000;
						const keepOpen = options.keepOpen || false;
						const waitForResponse = options.waitForResponse || false;
						let responseTimer: NodeJS.Timeout;
						let hasReceived = false;

						// Connection timeout
						client.setTimeout(connectionTimeout);

						client.on('timeout', () => {
							client.destroy();
							reject(new Error(`TCP connection timeout after ${connectionTimeout}ms`));
						});

						client.on('error', (error: Error) => {
							if (responseTimer) clearTimeout(responseTimer);
							reject(new NodeOperationError(this.getNode(), `TCP Error: ${error.message}`));
						});

						client.on('connect', () => {
							client.write(message, encoding as BufferEncoding);
							
							if (waitForResponse) {
								// Set response timeout after sending data
								responseTimer = setTimeout(() => {
									if (!hasReceived) {
										if (!keepOpen) {
											client.destroy();
										}
										resolve({
											sent: message,
											received: null,
											status: 'no_response',
											timeout: true,
											responseTimeoutMs: responseTimeout,
											waitedForResponse: true,
										});
									}
								}, responseTimeout);
							} else {
								// Don't wait for response, close immediately
								if (!keepOpen) {
									client.end();
								}
								resolve({
									sent: message,
									received: null,
									status: 'sent_no_wait',
									timeout: false,
									waitedForResponse: false,
								});
							}
						});

						client.on('data', (data: Buffer) => {
							hasReceived = true;
							if (responseTimer) clearTimeout(responseTimer);
							
							const response = data.toString(encoding as BufferEncoding);
							if (!keepOpen) {
								client.destroy();
							}
							resolve({
								sent: message,
								received: response,
								bytes: data.length,
								status: 'response_received',
								timeout: false,
								waitedForResponse: waitForResponse,
							});
						});

						client.on('close', () => {
							if (responseTimer) clearTimeout(responseTimer);
							if (!keepOpen && !hasReceived && waitForResponse) {
								resolve({
									sent: message,
									received: null,
									status: 'connection_closed',
									timeout: false,
									waitedForResponse: waitForResponse,
								});
							}
						});

						client.connect(port, host);
					});
				} else {
					// UDP Implementation
					result = await new Promise((resolve, reject) => {
						const client = createSocket('udp4');
						const buffer = Buffer.from(message, encoding as BufferEncoding);
						const responseTimeout = options.responseTimeout || 3000;
						const waitForResponse = options.waitForResponse || false;
						let responseTimer: NodeJS.Timeout;
						let hasReceived = false;

						if (waitForResponse) {
							// Listen for incoming messages (responses)
							client.on('message', (data: Buffer, rinfo) => {
								hasReceived = true;
								if (responseTimer) clearTimeout(responseTimer);
								
								const response = data.toString(encoding as BufferEncoding);
								client.close();
								resolve({
									sent: message,
									received: response,
									bytes: buffer.length,
									receivedBytes: data.length,
									status: 'response_received',
									timeout: false,
									waitedForResponse: true,
									remoteAddress: rinfo.address,
									remotePort: rinfo.port,
								});
							});
						}

						client.on('error', (error: Error) => {
							if (responseTimer) clearTimeout(responseTimer);
							client.close();
							reject(new NodeOperationError(this.getNode(), `UDP Error: ${error.message}`));
						});

						// Send the message
						client.send(buffer, 0, buffer.length, port, host, (error) => {
							if (error) {
								if (responseTimer) clearTimeout(responseTimer);
								client.close();
								reject(new NodeOperationError(this.getNode(), `UDP Send Error: ${error.message}`));
								return;
							}

							if (waitForResponse) {
								// Set response timeout after sending
								responseTimer = setTimeout(() => {
									if (!hasReceived) {
										client.close();
										resolve({
											sent: message,
											received: null,
											bytes: buffer.length,
											status: 'no_response',
											timeout: true,
											responseTimeoutMs: responseTimeout,
											waitedForResponse: true,
										});
									}
								}, responseTimeout);
							} else {
								// Don't wait for response, close immediately
								client.close();
								resolve({
									sent: message,
									received: null,
									bytes: buffer.length,
									status: 'sent_no_wait',
									timeout: false,
									waitedForResponse: false,
								});
							}
						});
					});
				}

				returnData.push({
					json: {
						success: true,
						protocol,
						host,
						port,
						message,
						encoding,
						response: result,
						timestamp: new Date().toISOString(),
					},
				});

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							success: false,
							error: error instanceof Error ? error.message : 'Unknown error',
							protocol: this.getNodeParameter('protocol', i),
							host: this.getNodeParameter('host', i),
							port: this.getNodeParameter('port', i),
						},
					});
					continue;
				}
				
				const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
				throw new NodeOperationError(this.getNode(), errorMessage);
			}
		}

		return [returnData];
	}
} 