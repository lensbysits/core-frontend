import { Injectable, Inject, Optional, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { LoggerMessagesService } from "./logger-messages.service";
import { removeTrailingCharsFromUri } from "../utils";
import { Result, MasterdataType, MasterdataTypeResultList, Masterdata, MasterdataResultList, TagsResultList, QueryModel } from "../models";
import { ILoggerMessage, IMasterdataTypeCreate, IMasterdataTypeUpdate, IMasterdataCreate, IMasterdataUpdate } from "../interfaces";
import {
	MasterdataTypeModelAdapter,
	MasterdataTypeResultListModelAdapter,
	MasterdataModelAdapter,
	MasterdataResultListModelAdapter,
  TagsResultListModelAdapter
} from "../adapters";

const isEmpty = (str: string) => !str || !str.length;

export const API_BASE_URL = new InjectionToken<string>("API_BASE_URL");

@Injectable()
export class MasterdataCrudHttpService {
	private baseUrl: string;
	private httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*"
		})
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

		const queryParams = this.buildListQueryModelParams(new QueryModel({ offset, limit: rows }));
		const url = this.buildListUri(this.baseUrl, queryParams.toString());

		return this.client
			.get<MasterdataTypeResultList>(url)
			.pipe(
				tap(() => this.log(null, "getAllMasterdataTypes", "success")),
				map(input => masterdataTypeResultListModelAdapter.adapt(input)),
				catchError(this.handleError<MasterdataTypeResultList>("getAllMasterdataTypes", masterdataTypeResultListModelAdapter.adapt(null)))
			);
	}

	getMasterdataTypeById(masterdatatype: string): Observable<MasterdataType> {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

		return this.client.get<Result<MasterdataType>>(`${this.baseUrl}/${masterdatatype}/details`).pipe(
			tap(() => this.log(`id #${masterdatatype}`, `getMasterdataTypeById`, "success")),
			map(input => {
				return masterdataTypeModelAdapter.adapt(input.value);
			}),
			catchError(this.handleError<MasterdataType>("getMasterdataTypeById", masterdataTypeModelAdapter.adapt(null)))
		);
	}

	getAllMasterdatas(masterdatatype: string, offset: number, rows: number, tags: string[]): Observable<MasterdataResultList> {
		const masterdataResultListModelAdapter = new MasterdataResultListModelAdapter();

		const queryParams = this.buildListQueryModelParams(new QueryModel({ offset, limit: rows, tags: tags.join(",") }));
		const url = this.buildListUri(`${this.baseUrl}${!isEmpty(masterdatatype) ? "/" + masterdatatype : ""}`, queryParams.toString());

		return this.client.get<MasterdataResultList>(url).pipe(
			tap(() => this.log(null, "getAllMasterdatas", "success")),
			map(input => masterdataResultListModelAdapter.adapt(input)),
			catchError(this.handleError<MasterdataResultList>("getAllMasterdatas", masterdataResultListModelAdapter.adapt(null)))
		);
	}

	getMasterdataById(masterdatatype: string, id: string): Observable<Masterdata> {
		const masterdataModelAdapter = new MasterdataModelAdapter();

		return this.client.get<Result<Masterdata>>(`${this.baseUrl}/${masterdatatype}/${id}`).pipe(
			tap(() => this.log(`id #${id}`, `getMasterdataById`, "success")),
			map(input => {
				return masterdataModelAdapter.adapt(input.value);
			}),
			catchError(this.handleError<Masterdata>("getMasterdataById", masterdataModelAdapter.adapt(null)))
		);
	}

	getAllTags(masterdatatype: string, offset: number, rows: number): Observable<TagsResultList> {
		const tagsResultListModelAdapter = new TagsResultListModelAdapter();

		const queryParams = this.buildListQueryModelParams(new QueryModel({ offset, limit: rows }));
		const url = this.buildListUri(`${this.baseUrl}${!isEmpty(masterdatatype) ? "/" + masterdatatype : ""}/tags`, queryParams.toString());

		return this.client.get<TagsResultList>(url).pipe(
			tap(() => this.log(null, "getAllTags", "success")),
			map(input => tagsResultListModelAdapter.adapt(input)),
			catchError(this.handleError<TagsResultList>("getAllTags", tagsResultListModelAdapter.adapt(null)))
		);
	}
	//#endregion

	//#region Add/Post
	createMasterdataType(item: IMasterdataTypeCreate): Observable<MasterdataType> {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

		return this.client.post<Result<MasterdataType>>(`${this.baseUrl}`, item, this.httpOptions).pipe(
			tap(newItem => {
				this.log(`id #${newItem?.value?.id}`, `createMasterdataType`, "success");
			}),
			map(input => {
				return masterdataTypeModelAdapter.adapt(input.value);
			}),
			catchError(this.handleError<MasterdataType>("createMasterdataType", masterdataTypeModelAdapter.adapt(null)))
		);
	}

	createMasterdata(item: IMasterdataCreate): Observable<Masterdata> {
		const masterdataModelAdapter = new MasterdataModelAdapter();

		return this.client.post<Result<Masterdata>>(`${this.baseUrl}/${item.masterdataTypeId}`, item, this.httpOptions).pipe(
			tap(newItem => {
				this.log(`id #${newItem?.value?.id}`, `createMasterdata`, "success");
			}),
			map(input => {
				return masterdataModelAdapter.adapt(input.value);
			}),
			catchError(this.handleError<Masterdata>("createMasterdata", masterdataModelAdapter.adapt(null)))
		);
	}
	//#endregion

	//#region Update/Put
	updateMasterdataType(masterdatatype: string, item: IMasterdataTypeUpdate): Observable<MasterdataType> {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

		return this.client.put<Result<MasterdataType>>(`${this.baseUrl}/${masterdatatype}/details`, item, this.httpOptions).pipe(
			tap(() => this.log(`id #${masterdatatype}`, `updateMasterdataType`, "success")),
			map(input => {
				return masterdataTypeModelAdapter.adapt(input.value);
			}),
			catchError(this.handleError<MasterdataType>("updateMasterdataType", masterdataTypeModelAdapter.adapt(null)))
		);
	}

	updateMasterdata(masterdatatype: string, id: string, item: IMasterdataUpdate): Observable<Masterdata> {
		const masterdataModelAdapter = new MasterdataModelAdapter();

		return this.client.put<Result<Masterdata>>(`${this.baseUrl}/${masterdatatype}/${id}`, item, this.httpOptions).pipe(
			tap(() => this.log(`id #${id}`, `updateMasterdata`, "success")),
			map(input => {
				return masterdataModelAdapter.adapt(input.value);
			}),
			catchError(this.handleError<Masterdata>("updateMasterdata", masterdataModelAdapter.adapt(null)))
		);
	}
	//#endregion

	//#region Delete
	deleteMasterdataType(masterdatatype: string): Observable<MasterdataType> {
		return this.client.delete<MasterdataType>(`${this.baseUrl}/${masterdatatype}/details`, this.httpOptions).pipe(
			tap(() => this.log(`id #${masterdatatype}`, `deleteMasterdataType`, "success")),
			catchError(this.handleError<MasterdataType>("deleteMasterdataType", undefined))
		);
	}

	deleteMasterdata(masterdatatype: string, masterdata: string): Observable<Masterdata> {
		return this.client.delete<Masterdata>(`${this.baseUrl}/${masterdatatype}/${masterdata}`, this.httpOptions).pipe(
			tap(() => this.log(`id #${masterdata}`, `deleteMasterdata`, "success")),
			catchError(this.handleError<Masterdata>("deleteMasterdata", undefined))
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	private buildListUri(baseUrl: string | undefined, queryString?: string) {
		const url = removeTrailingCharsFromUri(`${baseUrl}?${queryString}`);
		return url;
	}

	private buildListQueryModelParams(queryModel?: QueryModel): HttpParams {
		if (!queryModel) {
			return new HttpParams();
		}
		const { offset, limit } = queryModel;
		queryModel.offset = undefined;
		queryModel.limit = undefined;
		queryModel.noLimit = true;
		if (limit && limit > 0) {
			queryModel.offset = offset;
			queryModel.limit = limit;
			queryModel.noLimit = undefined;
		}
		return queryModel.asParams();
	}
	//#endregion
}
