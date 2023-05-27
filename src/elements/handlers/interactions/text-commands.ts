import { PREFIX, DEVELOPERS } from "../../../../config/config";
import { Handler } from "../../../structures";
import { message } from "telegraf/filters";

export default new Handler({
	name: "TextCommandInteraction",

	run: async ({ client }) => {
		client.on(message("text"), async (ctx) => {
			if (ctx.from.is_bot || ctx.from.id === 777000) return;
			if (!ctx.message.text.startsWith(PREFIX)) return;

			const content = ctx.message.text;
			const args = content.slice(PREFIX.length).trim().split(/ +/);
			const command = client.text_commands.get(
				args.shift()!.toLowerCase().replace(`@${client.botInfo!.username.toLowerCase()}`, "")
			);

			if (!command) return;
			if (command.developerOnly && !DEVELOPERS.includes(ctx.update.message.from.id))
				return await ctx.reply("You are not developer! 😠");

			return await command.run({ client, ctx, args, structure: command }).catch(async (err) => {
				await ctx.reply("An unexpected error occurred!");

				console.error(err);
			});
		});
	},
});
