import { Convenience } from "telegraf/types";
import { TextCommand } from "../../structures";
import { Markup } from "telegraf";

export default new TextCommand({
	name: "ping",
	description: "Ping command",

	run: async ({ ctx }) => {
		return await ctx.reply("Pong!", {
			reply_markup: Markup.inlineKeyboard([
				[
					{
						text: "Pong Button!",
						callback_data: "ping_button",
					},
				],
			]).reply_markup,
		});
	},
});
