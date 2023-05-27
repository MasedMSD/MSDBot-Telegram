import { TextCommand, Handler } from "../../../structures";
import { importFile } from "../../../modules";
import { resolve } from "path";
import { glob } from "glob";

export default new Handler({
	name: "PreloadTextCommands",

	run: async ({ client }) => {
		const commands: string[] = await glob("text-commands/**/*{.ts,.js}", {
			cwd: resolve(process.cwd(), "src", "elements"),
		});

		if (commands.length <= 0) return console.log("[HANDLING] | You don't have any text command!");

		commands.forEach(async <P extends string>(filePath: P) => {
			const command: TextCommand = await importFile(resolve(process.cwd(), "src", "elements", filePath));

			client.text_commands.set(command.name, command);
		});
	},
});
