export interface IQueryModel {
  offset?: number | null | undefined;
  limit?: number | null | undefined;
  noLimit?: boolean | null | undefined;
  tag?: string | null | undefined;
  tags?: string[] | null | undefined;
  createdBy?: string | null | undefined;
  createdSince?: Date | null | undefined;
  updatedBy?: string | null | undefined;
  updatedSince?: Date | null | undefined;
  searchTerm?: string | null | undefined;
  orderBy?: string | null | undefined;
  queryString?: string | null | undefined;
}
