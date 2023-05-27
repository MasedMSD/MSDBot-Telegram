import { IConfigService } from "./config.interface";
import { config, DotenvParseOutput } from "dotenv";
import { resolve } from "path";

/**
 * Class to get values from `.env` file
 *
 * @class
 * @implements {IConfigService}
 */
export class ConfigService implements IConfigService {
	private readonly config: DotenvParseOutput;

	/**
	 * @constructor
	 */
	constructor() {
		const pathToEnv: string = resolve(process.cwd(), "config", ".env");
		const { error, parsed } = config({ path: pathToEnv });

		if (error) throw new Error("Could not find the file `.env`");
		if (!parsed) throw new Error("`.env` is empty");

		this.config = parsed;
	}

	public readonly get = <K extends keyof EnvKeys>(key: K): string => {
		const res = this.config[key];

		if (!res) throw new Error(`Couldn't find \`${key}\``);

		return res;
	};
}
