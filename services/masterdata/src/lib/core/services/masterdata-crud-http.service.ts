import { Injectable, Inject, Optional, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Result, MasterdataType, MasterdataTypeResultList, Masterdata, MasterdataResultList, TagsResultList, QueryModel } from "../models";
import { IMasterdataTypeCreate, IMasterdataTypeUpdate, IMasterdataCreate, IMasterdataUpdate } from "../interfaces";
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
		@Optional() @Inject(API_BASE_URL) baseUrl?: string
	) {
		this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
	}

	getAllMasterdataTypes(offset: number, rows: number): Observable<MasterdataTypeResultList> {
		const masterdataTypeResultListModelAdapter = new MasterdataTypeResultListModelAdapter();

		const queryParams = this.buildListQueryModelParams(new QueryModel({ offset, limit: rows }));
		const url = this.buildListUri(this.baseUrl, queryParams.toString());

		return this.client
			.get<MasterdataTypeResultList>(url)
			.pipe(
				map(input => masterdataTypeResultListModelAdapter.adapt(input)),
				catchError(this.handleError<MasterdataTypeResultList>("getAllMasterdataTypes", masterdataTypeResultListModelAdapter.adapt(null)))
			);
	}

	getMasterdataTypeById(masterdatatype: string): Observable<MasterdataType> {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

		return this.client.get<Result<MasterdataType>>(`${this.baseUrl}/${masterdatatype}/details`).pipe(
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
			map(input => masterdataResultListModelAdapter.adapt(input)),
			catchError(this.handleError<MasterdataResultList>("getAllMasterdatas", masterdataResultListModelAdapter.adapt(null)))
		);
	}

	getMasterdataById(masterdatatype: string, id: string): Observable<Masterdata> {
		const masterdataModelAdapter = new MasterdataModelAdapter();

		return this.client.get<Result<Masterdata>>(`${this.baseUrl}/${masterdatatype}/${id}`).pipe(
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
			map(input => tagsResultListModelAdapter.adapt(input)),
			catchError(this.handleError<TagsResultList>("getAllTags", tagsResultListModelAdapter.adapt(null)))
		);
	}

	createMasterdataType(item: IMasterdataTypeCreate): Observable<MasterdataType> {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

		return this.client.post<Result<MasterdataType>>(`${this.baseUrl}`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataTypeModelAdapter.adapt(input.value);
			}),
			catchError(this.handleError<MasterdataType>("createMasterdataType", masterdataTypeModelAdapter.adapt(null)))
		);
	}

	createMasterdata(item: IMasterdataCreate): Observable<Masterdata> {
		const masterdataModelAdapter = new MasterdataModelAdapter();

		return this.client.post<Result<Masterdata>>(`${this.baseUrl}/${item.masterdataTypeId}`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataModelAdapter.adapt(input.value);
			}),
			catchError(this.handleError<Masterdata>("createMasterdata", masterdataModelAdapter.adapt(null)))
		);
	}

	updateMasterdataType(masterdatatype: string, item: IMasterdataTypeUpdate): Observable<MasterdataType> {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

		return this.client.put<Result<MasterdataType>>(`${this.baseUrl}/${masterdatatype}/details`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataTypeModelAdapter.adapt(input.value);
			}),
			catchError(this.handleError<MasterdataType>("updateMasterdataType", masterdataTypeModelAdapter.adapt(null)))
		);
	}

	updateMasterdata(masterdatatype: string, id: string, item: IMasterdataUpdate): Observable<Masterdata> {
		const masterdataModelAdapter = new MasterdataModelAdapter();

		return this.client.put<Result<Masterdata>>(`${this.baseUrl}/${masterdatatype}/${id}`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataModelAdapter.adapt(input.value);
			}),
			catchError(this.handleError<Masterdata>("updateMasterdata", masterdataModelAdapter.adapt(null)))
		);
	}

	deleteMasterdataType(masterdatatype: string): Observable<MasterdataType> {
		return this.client.delete<MasterdataType>(`${this.baseUrl}/${masterdatatype}/details`, this.httpOptions).pipe(
			catchError(this.handleError<MasterdataType>("deleteMasterdataType", undefined))
		);
	}

	deleteMasterdata(masterdatatype: string, masterdata: string): Observable<Masterdata> {
		return this.client.delete<Masterdata>(`${this.baseUrl}/${masterdatatype}/${masterdata}`, this.httpOptions).pipe(
			catchError(this.handleError<Masterdata>("deleteMasterdata", undefined))
		);
	}

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
			console.error(`handleError/${operation}`, error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	private buildListUri(baseUrl: string | undefined, queryString?: string) {
		const url = `${baseUrl}?${queryString}`.replace(/[?&]$/, "");
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
}
