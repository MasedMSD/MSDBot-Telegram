export interface IConfigService {
	/**
	 * Returns the value from the `.env` file
	 *
	 * @param {string} key Key
	 * @returns {string} Value
	 */
	readonly get: <K extends keyof EnvKeys>(key: K) => string;
}
