import { NarrowedContext, Context } from "telegraf";
import { CallbackQuery, Update } from "typegram";
import { Core } from "../../core";

export interface IInlineButtonRunOptions {
	client: Core;

	ctx: NarrowedContext<Context<Update>, Update.CallbackQueryUpdate<CallbackQuery.DataQuery>>;

	structure: IInlineButton;
}

export interface IInlineButton {
	name: string | string[];

	developerOnly?: boolean;

	administratorOnly?: boolean;

	run: (options: IInlineButtonRunOptions) => Promise<unknown>;
}
