import { INodeType, INodeTypeDescription, ITriggerFunctions, ITriggerResponse } from 'n8n-workflow';
export declare class TcpServerTrigger implements INodeType {
    description: INodeTypeDescription;
    trigger(this: ITriggerFunctions): Promise<ITriggerResponse>;
}
