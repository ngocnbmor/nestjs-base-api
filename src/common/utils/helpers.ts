/**
 * Get message
 * @param CODE
 * @param param
 * @returns string
 */

export function getMessage(CODE: string, ...param: string[]): string {
	if (param.length === 0) {
		return CODE;
	}
	const args = param;
	return CODE.replace(/\{(\d+)\}/g, function () {
		return args[arguments[1]] || `${arguments[1]}`;
	});
}
