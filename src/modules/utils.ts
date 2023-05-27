export const importFile = async <P extends string, T>(filePath: P): Promise<T> => {
	return (await import(filePath))?.default;
};
