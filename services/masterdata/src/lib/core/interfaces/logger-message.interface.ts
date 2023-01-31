export interface ILoggerMessage {
	status: "success" | "error" | "info";
	message: string;
}
