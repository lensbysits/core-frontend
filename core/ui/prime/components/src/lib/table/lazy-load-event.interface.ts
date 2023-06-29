export interface ILazyLoadEvent {
	offset: number;
	rows: number;
	orderBy?: string; // "{field} {direction}" and {direction} = asc | desc
}
