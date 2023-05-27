import { InlineButton } from "../../structures";

export default new InlineButton({
	name: "ping_button",

	run: async ({ ctx }) => {
		return await ctx.answerCbQuery("Pong!");
	},
});
