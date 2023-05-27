import { Handler } from "../../structures";

export default new Handler({
	name: "Launch",

	run: async ({ client }) => {
		if (client?.botInfo?.is_bot) {
			const to_print = [
				`\n[BOT] | ✅ ${client.botInfo.first_name} Launched!`,
				`[BOT] | Information: \n\tID: ${client.botInfo.id} \n`,
			];

			console.log(to_print.join("\n"));
		}
	},
});
