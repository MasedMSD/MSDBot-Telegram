import { Collection } from "../modules";
import { Handler, InlineButton, TextCommand } from "./elements";

export interface ICore {
	handlers: Collection<string, Handler>;

	inline_buttons: Collection<string | string[], InlineButton>;

	text_commands: Collection<string, TextCommand>;

	readyTimestamp: number;

	get uptime(): number;

	startUp: () => Promise<void>;

	startHandlers: () => Promise<void>;
}
