import { Injectable, Inject, Optional, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { LoggerMessagesService } from "./logger-messages.service";
import { ILoggerMessage } from "../interfaces";
import {
  Result,
  MasterdataType,
  MasterdataTypeResultList,
  Masterdata,
  MasterdataResultList,
} from "../models";
import {
  IMasterdataTypeCreate,
  IMasterdataTypeUpdate,
  IMasterdataCreate,
  IMasterdataUpdate,
} from "../interfaces";
import {
  MasterdataTypeModelAdapter,
  MasterdataTypeResultListModelAdapter,
  MasterdataModelAdapter,
  MasterdataResultListModelAdapter,
} from "../adapters";

const isEmpty = (str: string) => !str || !str.length;

export const API_BASE_URL = new InjectionToken<string>("API_BASE_URL");

@Injectable()
export class MasterdataCrudHttpService {
  private baseUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    }),
    //responseType: 'text' as 'json',
  };

  constructor(
    private readonly client: HttpClient,
    private readonly logger: LoggerMessagesService,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  //#region Get
  getAllMasterdataTypes(offset: number, rows: number): Observable<MasterdataTypeResultList> {
    const masterdataTypeResultListModelAdapter = new MasterdataTypeResultListModelAdapter();

    const url = this.genericListUriMasterdata(`${this.baseUrl}`, offset, rows);
    return this.client
      .get<MasterdataTypeResultList>(url) //.pipe(first());
      .pipe(
        tap(() => this.log(null, "getAllMasterdataTypes", "success")),
        map((input) => masterdataTypeResultListModelAdapter.adapt(input)),
        catchError(
          this.handleError<MasterdataTypeResultList>(
            "getAllMasterdataTypes",
            masterdataTypeResultListModelAdapter.adapt(null)
          )
        )
      );
  }

  getMasterdataTypeById(id: string): Observable<MasterdataType> {
    const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

    return this.client.get<Result<MasterdataType>>(`${this.baseUrl}/${id}/details`).pipe(
      tap((_) => this.log(`id #${id}`, `getMasterdataTypeById`, "success")),
      map((input) => {
        return masterdataTypeModelAdapter.adapt(input.value);
      }),
      catchError(
        this.handleError<MasterdataType>(
          "getMasterdataTypeById",
          masterdataTypeModelAdapter.adapt(null)
        )
      )
    );
  }

  getAllMasterdatas(
    typeId: string,
    offset: number,
    rows: number
  ): Observable<MasterdataResultList> {
    const masterdataResultListModelAdapter = new MasterdataResultListModelAdapter();

    const url = this.genericListUriMasterdata(
      `${this.baseUrl}${!isEmpty(typeId) ? "/" + typeId : ""}`,
      offset,
      rows
    );
    return this.client.get<MasterdataResultList>(url).pipe(
      tap((_) => this.log(null, "getAllMasterdatas", "success")),
      map((input) => masterdataResultListModelAdapter.adapt(input)),
      catchError(
        this.handleError<MasterdataResultList>(
          "getAllMasterdatas",
          masterdataResultListModelAdapter.adapt(null)
        )
      )
    );
  }

  getMasterdataById(typeId: string, id: string): Observable<Masterdata> {
    const masterdataModelAdapter = new MasterdataModelAdapter();

    return this.client.get<Result<Masterdata>>(`${this.baseUrl}/${typeId}/${id}`).pipe(
      tap(() => this.log(`id #${id}`, `getMasterdataById`, "success")),
      map((input) => {
        return masterdataModelAdapter.adapt(input.value);
      }),
      catchError(
        this.handleError<Masterdata>("getMasterdataById", masterdataModelAdapter.adapt(null))
      )
    );
  }
  //#endregion

  //#region Add/Post
  createMasterdataType(item: IMasterdataTypeCreate): Observable<MasterdataType> {
    const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

    return this.client
      .post<Result<MasterdataType>>(`${this.baseUrl}`, item, this.httpOptions)
      .pipe(
        tap((newItem) => {
          this.log(`id #${newItem?.value?.id}`, `createMasterdataType`, "success"); //JSON.parse(newItem)
        }),
        map((input) => {
          return masterdataTypeModelAdapter.adapt(input.value);
        }),
        catchError(
          this.handleError<MasterdataType>(
            "createMasterdataType",
            masterdataTypeModelAdapter.adapt(null)
          )
        )
      );
  }

  createMasterdata(item: IMasterdataCreate): Observable<Masterdata> {
    const masterdataModelAdapter = new MasterdataModelAdapter();

    return this.client.post<Result<Masterdata>>(`${this.baseUrl}/${item.masterdataTypeId}`, item, this.httpOptions).pipe(
      tap((newItem) => {
        this.log(`id #${newItem?.value?.id}`, `createMasterdata`, "success"); //JSON.parse(newItem)
      }),
      map((input) => {
        return masterdataModelAdapter.adapt(input.value);
      }),
      catchError(
        this.handleError<Masterdata>("createMasterdata", masterdataModelAdapter.adapt(null))
      )
    );
  }
  //#endregion

  //#region Update/Put
  updateMasterdataType(id: string, item: IMasterdataTypeUpdate): Observable<MasterdataType> {
    const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

    return this.client
      .put<Result<MasterdataType>>(`${this.baseUrl}/${id}/details`, item, this.httpOptions)
      .pipe(
        tap(() => this.log(`id #${id}`, `updateMasterdataType`, "success")),
        map((input) => {
          return masterdataTypeModelAdapter.adapt(input.value);
        }),
        catchError(
          this.handleError<MasterdataType>(
            "updateMasterdataType",
            masterdataTypeModelAdapter.adapt(null)
          )
        )
      );
  }

  updateMasterdata(masterdatatype: string, id: string, item: IMasterdataUpdate): Observable<Masterdata> {
    const masterdataModelAdapter = new MasterdataModelAdapter();

    return this.client
      .put<Result<Masterdata>>(`${this.baseUrl}/${masterdatatype}/${id}`, item, this.httpOptions)
      .pipe(
        tap((_) => this.log(`id #${id}`, `updateMasterdata`, "success")),
        map((input) => {
          return masterdataModelAdapter.adapt(input.value);
        }),
        catchError(
          this.handleError<Masterdata>("updateMasterdata", masterdataModelAdapter.adapt(null))
        )
      );
  }
  //#endregion

  //#region Delete
  deleteMasterdataType(masterdatatype: string): Observable<any> {
    return this.client.delete(`${this.baseUrl}/${masterdatatype}/details`, this.httpOptions).pipe(
      tap(() => this.log(`id #${masterdatatype}`, `deleteMasterdataType`, "success")),
      catchError(this.handleError<any>("deleteMasterdataType", null))
    );
  }

  deleteMasterdata(masterdatatype: string, masterdata: string): Observable<any> {
    return this.client.delete(`${this.baseUrl}/${masterdatatype}/${masterdata}`, this.httpOptions).pipe(
      tap((_) => this.log(`id #${masterdata}`, `deleteMasterdata`, "success")),
      catchError(this.handleError<any>("deleteMasterdata", null))
    );
  }
  //#endregion

  //#region Private methods
  /**
   * Handle Http operation that failed. Also let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error("handleError/", error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`(${error.status}) ${error.message}`, operation, "error");

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message with the Logger Service
   *
   * @param message - text message to be logged
   * @param operation - executed operation title
   * @param status - executed operation status
   */
  private log(message: string | null, operation: string, status: string = "info") {
    const msg = [];
    msg.push(new Date().toLocaleString());
    msg.push("masterdata");
    msg.push(operation);
    msg.push(status);
    message && msg.push(message);
    this.logger.add({ status, message: msg.join(" | ") } as ILoggerMessage);
  }

  /**
   * @param baseUrl (optional)
   * @param offset (optional)
   * @param limit (optional)
   * @return Success
   */
  genericListUriMasterdata(
    baseUrl: string | null | undefined,
    offset: number,
    limit: number
  ): string {
    return this.genericListUri(
      baseUrl,
      limit > 0 ? offset : undefined,
      limit > 0 ? limit : undefined,
      limit > 0 ? undefined : true,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  /**
   * @param baseUrl (optional)
   * @param offset (optional)
   * @param limit (optional)
   * @param noLimit (optional)
   * @param tag (optional)
   * @param createdBy (optional)
   * @param createdSince (optional)
   * @param updatedBy (optional)
   * @param updatedSince (optional)
   * @param searchTerm (optional)
   * @param orderBy (optional)
   * @param queryString (optional)
   * @return Success
   */
  genericListUri(
    baseUrl: string | null | undefined,
    offset: number | null | undefined,
    limit: number | null | undefined,
    noLimit: boolean | null | undefined,
    tag: string | null | undefined,
    createdBy: string | null | undefined,
    createdSince: Date | null | undefined,
    updatedBy: string | null | undefined,
    updatedSince: Date | null | undefined,
    searchTerm: string | null | undefined,
    orderBy: string | null | undefined,
    queryString: string | null | undefined
  ): string {
    let url_ = `${baseUrl}?`;
    if (offset !== undefined && offset !== null)
      url_ += "Offset=" + encodeURIComponent("" + offset) + "&";
    if (limit !== undefined && limit !== null)
      url_ += "Limit=" + encodeURIComponent("" + limit) + "&";
    if (noLimit !== undefined && noLimit !== null)
      url_ += "NoLimit=" + encodeURIComponent("" + noLimit) + "&";
    if (tag !== undefined && tag !== null) url_ += "Tag=" + encodeURIComponent("" + tag) + "&";
    if (createdBy !== undefined && createdBy !== null)
      url_ += "CreatedBy=" + encodeURIComponent("" + createdBy) + "&";
    if (createdSince !== undefined && createdSince !== null)
      url_ +=
        "CreatedSince=" +
        encodeURIComponent(createdSince ? "" + createdSince.toISOString() : "") +
        "&";
    if (updatedBy !== undefined && updatedBy !== null)
      url_ += "UpdatedBy=" + encodeURIComponent("" + updatedBy) + "&";
    if (updatedSince !== undefined && updatedSince !== null)
      url_ +=
        "UpdatedSince=" +
        encodeURIComponent(updatedSince ? "" + updatedSince.toISOString() : "") +
        "&";
    if (searchTerm !== undefined && searchTerm !== null)
      url_ += "SearchTerm=" + encodeURIComponent("" + searchTerm) + "&";
    if (orderBy !== undefined && orderBy !== null)
      url_ += "OrderBy=" + encodeURIComponent("" + orderBy) + "&";
    if (queryString !== undefined && queryString !== null)
      url_ += "QueryString=" + encodeURIComponent("" + queryString) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return url_;
  }
  //#endregion
}
