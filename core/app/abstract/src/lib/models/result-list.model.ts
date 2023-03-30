import { Result } from "./result.model";

export class ResultList<T> extends Result<T[]> {
	valueSize?: number | undefined;
	totalSize?: number | undefined;
	pageSize?: number | undefined;
	pageIndex?: number | undefined;
	pageNumber?: number | undefined;
	sortingProperty?: string | undefined;
	sortingDirection?: string | undefined;
}
