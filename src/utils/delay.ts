export async function delay(delay: number = 1000) : Promise<{}> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, delay)
	});
};