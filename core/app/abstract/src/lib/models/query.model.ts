import { HttpParams } from '@angular/common/http';
import { IQueryModel } from './query.model.interface';

export class QueryModel implements IQueryModel {
	offset?: number | null | undefined;
	limit?: number | null | undefined;
	noLimit?: boolean | null | undefined;
	tags?: string | null | undefined;
	createdBy?: string | null | undefined;
	createdSince?: Date | null | undefined;
	updatedBy?: string | null | undefined;
	updatedSince?: Date | null | undefined;
	searchTerm?: string | null | undefined;
	orderBy?: string | null | undefined;
	readonly queryString?: string | null | undefined;

	constructor(data?: IQueryModel) {
		this.init(data);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	init(data?: any) {
		if (data) {
			for (const property in data) {
				if (Object.prototype.hasOwnProperty.call(data, property)) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(<any>this)[property] = (<any>data)[property];
				}
			}
		}
	}

	asParams() {
		return this.buildQueryParams();
	}

	asString() {
		return this.asParams().toString();
	}

	// eslint-disable-next-line complexity
	private buildQueryParams(): HttpParams {
		let queryParams = new HttpParams();

		if (this.offset !== undefined && this.offset !== null) {
			queryParams = queryParams.append("Offset", ""+this.offset);
		}
		if (this.limit !== undefined && this.limit !== null) {
			queryParams = queryParams.append("Limit", this.limit);
		}
		if (this.noLimit !== undefined && this.noLimit !== null) {
			queryParams = queryParams.append("NoLimit", this.noLimit);
		}
		if (this.tags !== undefined && this.tags !== null) {
			queryParams = queryParams.append("Tags", this.tags);
		}
		if (this.createdBy !== undefined && this.createdBy !== null) {
			queryParams = queryParams.append("CreatedBy", this.createdBy);
		}
		if (this.createdSince !== undefined && this.createdSince !== null) {
			queryParams = queryParams.append("CreatedSince", (this.createdSince as Date).toISOString());
		}
		if (this.updatedBy !== undefined && this.updatedBy !== null) {
			queryParams = queryParams.append("UpdatedBy", this.updatedBy);
		}
		if (this.updatedSince !== undefined && this.updatedSince !== null) {
			queryParams = queryParams.append("UpdatedSince", (this.updatedSince as Date).toISOString());
		}
		if (this.searchTerm !== undefined && this.searchTerm !== null) {
			queryParams = queryParams.append("SearchTerm", this.searchTerm);
		}
		if (this.orderBy !== undefined && this.orderBy !== null) {
			queryParams = queryParams.append("OrderBy", this.orderBy);
		}
		if (this.queryString !== undefined && this.queryString !== null) {
			queryParams = queryParams.append("QueryString", this.queryString);
		}

		return queryParams;
	}
}
