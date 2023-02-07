export class Result<T> {
	valueType?: string;
	value?: T | undefined;
	valueSize?: number | undefined;
	totalSize?: number | undefined;
	pageSize?: number | undefined;
	pageIndex?: number | undefined;
	pageNumber?: number | undefined;
	sortingProperty?: string | undefined;
	sortingDirection?: string | undefined;
}
