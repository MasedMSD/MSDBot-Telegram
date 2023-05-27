import { NarrowedContext, Context } from "telegraf";
import { Update, Message } from "typegram";
import { Core } from "../../core";

export type Category = "General" | "Fun" | undefined;

export interface ITextCommandRunOptions {
	client: Core;

	ctx: NarrowedContext<Context, Update.MessageUpdate<Message.TextMessage>>;

	args: string[];

	structure: ITextCommand;
}

export interface ITextCommand {
	name: string;

	description: string;

	category?: Category;

	developerOnly?: boolean;

	administratorOnly?: boolean;

	run: (options: ITextCommandRunOptions) => Promise<unknown>;
}
