import { Core } from "../../core";

export interface IHandlerRunOptions {
	client: Core;

	structure: IHandler;
}

export interface IHandler {
	name: string;

	run: (options: IHandlerRunOptions) => Promise<unknown>;
}
