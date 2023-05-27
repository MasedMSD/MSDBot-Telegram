import { Handler, InlineButton, TextCommand } from ".";
import { Collection, importFile } from "../modules";
import { Telegraf } from "telegraf";
import { resolve } from "path";
import { glob } from "glob";
import { ICore } from ".";

export class Core extends Telegraf implements ICore {
	public readonly inline_buttons: Collection<string | string[], InlineButton> = new Collection();
	public readonly handlers: Collection<string, Handler> = new Collection();
	public readonly text_commands: Collection<string, TextCommand> = new Collection();
	public readyTimestamp: number = 0;

	constructor() {
		super(process.env.TOKEN!);
	}

	get uptime(): number {
		return this.readyTimestamp && Date.now() - this.readyTimestamp;
	}

	public readonly startUp = async (): Promise<void> => {
		this.launch();

		this.readyTimestamp = Date.now();

		// Due to best Telegraf update
		setTimeout(async () => await this.startHandlers(), 1 * 1000);

		process.once("SIGINT", () => this.stop("SIGINT"));
		process.once("SIGTERM", () => this.stop("SIGTERM"));
	};

	public readonly startHandlers = async (): Promise<void> => {
		const handlers: string[] = await glob("handlers/**/*{.ts,.js}", {
			cwd: resolve(process.cwd(), "src", "elements"),
		});

		if (handlers.length <= 0) return console.log("[HANDLING] No any handler!");

		handlers.forEach(async <P extends string>(filePath: P): Promise<unknown> => {
			const handler: Handler = await importFile(resolve(process.cwd(), "src", "elements", filePath));

			if (this.handlers.has(handler.name)) throw new Error(`[HANDLING] ${handler.name} already exists!`);
			this.handlers.set(handler.name, handler);

			return await handler.run({ client: this, structure: handler }).catch((err) => console.error(err));
		});
	};
}
