export class Query {
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