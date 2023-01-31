export function removeTrailingCharsFromUri(uri: string): string {
	return uri.replace(/[?&]$/, "");
}
