import { ITextCommand, ITextCommandRunOptions, Category } from "./text-command.interface";

export class TextCommand implements ITextCommand {
	public name!: string;
	public description!: string;

	public category?: Category;
	public developerOnly?: boolean;
	public administratorOnly?: boolean;

	constructor(options: ITextCommand) {
		if (!options.name) throw new Error(`[${__filename}]: Text Command doesn't have name!`);

		Object.assign(this, options);
	}

	public readonly run: (options: ITextCommandRunOptions) => Promise<unknown> = async () => {
		throw new Error(`${this.name} doesn't have run function!`);
	};
}
