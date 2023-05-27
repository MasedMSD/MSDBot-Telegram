import { IInlineButton, IInlineButtonRunOptions } from "./inline-button.interface.ts";

export class InlineButton implements IInlineButton {
	public name!: string | string[];

	public nsfwOnly?: boolean = false;
	public devOnly?: boolean = false;
	public administratorOnly?: boolean = false;

	constructor(options: IInlineButton) {
		if (!options.name) throw new Error(`[${__filename}]: Inline Button doesn't have name!`);

		Object.assign(this, options);
	}

	public readonly run: (options: IInlineButtonRunOptions) => Promise<unknown> = async () => {
		throw new Error(`${this.name} doesn't have run function!`);
	};
}
