/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */

/* Copied from generated code. This is a lens core model from the backend */

export interface IQueryModel {
    offset?: number | undefined;
    limit?: number | undefined;
    noLimit?: boolean | undefined;
    tags?: string | undefined;
    createdBy?: string | undefined;
    createdSince?: Date | undefined;
    updatedBy?: string | undefined;
    updatedSince?: Date | undefined;
    searchTerm?: string | undefined;
    orderBy?: string | undefined;
    queryString?: string | undefined;
}

export class QueryModel implements IQueryModel {
    offset?: number | undefined;
    limit?: number | undefined;
    noLimit?: boolean | undefined;
    tags?: string | undefined;
    createdBy?: string | undefined;
    createdSince?: Date | undefined;
    updatedBy?: string | undefined;
    updatedSince?: Date | undefined;
    searchTerm?: string | undefined;
    orderBy?: string | undefined;
    readonly queryString?: string | undefined;

    static fromJS(data: any): QueryModel {
        data = typeof data === 'object' ? data : {};
        const result = new QueryModel();
        result.init(data);
        return result;
    }

    constructor(data?: IQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.offset = _data["offset"];
            this.limit = _data["limit"];
            this.noLimit = _data["noLimit"];
            this.tags = _data["tags"];
            this.createdBy = _data["createdBy"];
            this.createdSince = _data["createdSince"] ? new Date(_data["createdSince"].toString()) : <any>undefined;
            this.updatedBy = _data["updatedBy"];
            this.updatedSince = _data["updatedSince"] ? new Date(_data["updatedSince"].toString()) : <any>undefined;
            this.searchTerm = _data["searchTerm"];
            this.orderBy = _data["orderBy"];
            (<any>this).queryString = _data["queryString"];
        }
    }


    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["offset"] = this.offset;
        data["limit"] = this.limit;
        data["noLimit"] = this.noLimit;
        data["tags"] = this.tags;
        data["createdBy"] = this.createdBy;
        data["createdSince"] = this.createdSince ? this.createdSince.toISOString() : <any>undefined;
        data["updatedBy"] = this.updatedBy;
        data["updatedSince"] = this.updatedSince ? this.updatedSince.toISOString() : <any>undefined;
        data["searchTerm"] = this.searchTerm;
        data["orderBy"] = this.orderBy;
        data["queryString"] = this.queryString;
        return data;
    }
}