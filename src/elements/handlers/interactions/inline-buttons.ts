import { DEVELOPERS } from "../../../../config/config";
import { callbackQuery } from "telegraf/filters";
import { Handler } from "../../../structures";

export default new Handler({
	name: "InlineButtonInteraction",

	run: async ({ client }) => {
		client.on(callbackQuery("data"), async (ctx) => {
			const button = client.inline_buttons.find((button) => {
				if (typeof button.name === "string") return button.name.startsWith(ctx.callbackQuery.data);
				if (typeof button.name === "object")
					return button.name.find((name) => name.startsWith(ctx.callbackQuery.data));
			});

			if (!button) return;
			if (button.devOnly && !DEVELOPERS.includes(ctx.update.callback_query.from.id)) return;

			return await button.run({ client, ctx, structure: button }).catch(async (err) => {
				await ctx.answerCbQuery("An unexpected error occurred!");

				console.error(err);
			});
		});
	},
});
