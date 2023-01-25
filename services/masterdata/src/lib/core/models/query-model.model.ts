import { IQueryModel } from "../interfaces";

export class QueryModel implements IQueryModel {
  offset?: number | null | undefined;
  limit?: number | null | undefined;
  noLimit?: boolean | null | undefined;
  tag?: string | null | undefined;
  tags: string[] | null | undefined;
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

  init(data?: any) {
    if (data) {
      for (const property in data) {
        if (Object.prototype.hasOwnProperty.call(data, property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

	// eslint-disable-next-line complexity
	toUriQuery(): string {
		let url_ = '';

		if (this.offset !== undefined && this.offset !== null) {
      url_ += "Offset=" + encodeURIComponent("" + this.offset) + "&";
    }
		if (this.limit !== undefined && this.limit !== null) {
      url_ += "Limit=" + encodeURIComponent("" + this.limit) + "&";
    }
		if (this.noLimit !== undefined && this.noLimit !== null) {
      url_ += "NoLimit=" + encodeURIComponent("" + this.noLimit) + "&";
    }
		if (this.tag !== undefined && this.tag !== null) {
      url_ += "Tag=" + encodeURIComponent("" + this.tag) + "&";
    }
    if (this.tags !== undefined && this.tags !== null) {
      // TODO: tags as array?
      url_ += "Tags=" + encodeURIComponent("" + this.tags) + "&";
    }
		if (this.createdBy !== undefined && this.createdBy !== null) {
      url_ += "CreatedBy=" + encodeURIComponent("" + this.createdBy) + "&";
    }
		if (this.createdSince !== undefined && this.createdSince !== null) {
			url_ += "CreatedSince=" + encodeURIComponent(this.createdSince ? "" + this.createdSince.toISOString() : "") + "&";
    }
		if (this.updatedBy !== undefined && this.updatedBy !== null) {
      url_ += "UpdatedBy=" + encodeURIComponent("" + this.updatedBy) + "&";
    }
		if (this.updatedSince !== undefined && this.updatedSince !== null) {
      url_ += "UpdatedSince=" + encodeURIComponent(this.updatedSince ? "" + this.updatedSince.toISOString() : "") + "&";
    }
		if (this.searchTerm !== undefined && this.searchTerm !== null) {
      url_ += "SearchTerm=" + encodeURIComponent("" + this.searchTerm) + "&";
    }
		if (this.orderBy !== undefined && this.orderBy !== null) {
      url_ += "OrderBy=" + encodeURIComponent("" + this.orderBy) + "&";
    }
		if (this.queryString !== undefined && this.queryString !== null) {
      url_ += "QueryString=" + encodeURIComponent("" + this.queryString) + "&";
    }

    url_ = url_.replace(/[?&]$/, "");
		return url_;
	}
}
