interface EnvKeys {
	/**
	 * Токен для запуска бота.
	 *
	 * @type {string}
	 */
	readonly TOKEN: string;
}

declare namespace NodeJS {
	interface ProcessEnv extends EnvKeys {}
}
