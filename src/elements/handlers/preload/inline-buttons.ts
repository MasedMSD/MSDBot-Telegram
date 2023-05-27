import { InlineButton, Handler } from "../../../structures";
import { importFile } from "../../../modules";
import { resolve } from "path";
import { glob } from "glob";

export default new Handler({
	name: "PreloadInlineButtons",

	run: async ({ client }) => {
		const buttons: string[] = await glob("inline-buttons/**/*{.ts,.js}", {
			cwd: resolve(process.cwd(), "src", "elements"),
		});

		if (buttons.length <= 0) return console.log("[HANDLING] | You don't have any inline button!");

		buttons.forEach(async <P extends string>(filePath: P) => {
			const button: InlineButton = await importFile(resolve(process.cwd(), "src", "elements", filePath));

			client.inline_buttons.set(button.name, button);
		});
	},
});
