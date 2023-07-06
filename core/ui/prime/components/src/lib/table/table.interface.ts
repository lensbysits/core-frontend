export type PaginatorPosition = "both" | "top" | "bottom";
export type RowsPerPageOption = 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 60 | 70 | 80 | 90 | 100 | 200 | 300 | 400 | 500 | 1000;

export interface IOrderByMeta {
	field: string;
	direction: "asc" | "desc";
}
export interface ILazyLoadEvent {
	offset: number;
	rows: number;
	orderBy?: IOrderByMeta;
}
