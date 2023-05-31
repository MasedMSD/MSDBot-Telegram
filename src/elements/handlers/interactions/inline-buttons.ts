import { DEVELOPERS } from "../../../../config/config";
import { callbackQuery } from "telegraf/filters";
import { Handler } from "../../../structures";

export default new Handler({
	name: "InlineButtonInteraction",

	run: async ({ client }) => {
		client.on(callbackQuery("data"), async (ctx) => {
			const button = client.inline_buttons.find((button) => {
				if (typeof button.name === "string") return ctx.callbackQuery.data.startsWith(button.name);
				if (typeof button.name === "object")
					return button.name.find((name) => ctx.callbackQuery.data.startsWith(name));
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
