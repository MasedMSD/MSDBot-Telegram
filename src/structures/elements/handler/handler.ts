import { IHandler, IHandlerRunOptions } from "./handler.interface";

export class Handler implements IHandler {
	public name!: string;

	constructor(options: IHandler) {
		if (!options.name) throw new Error(`[${__filename}]: Handler doesn't have name!`);

		Object.assign(this, options);
	}

	public readonly run: (options: IHandlerRunOptions) => Promise<unknown> = async () => {
		throw new Error(`${this.name} doesn't have run function!`);
	};
}
