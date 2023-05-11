import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
	DomainsResultListModelAdapter,
	LanguagesResultListModelAdapter,
	MasterdataAlternativeKeyModelAdapter,
	MasterdataAlternativeKeyResultListModelAdapter,
	MasterdataModelAdapter,
	MasterdataRelatedItemModelAdapter,
	MasterdataRelatedItemResultListModelAdapter,
	MasterdataResultListModelAdapter,
	MasterdataTypeModelAdapter,
	MasterdataTypeResultListModelAdapter,
	TagsResultListModelAdapter
} from "../adapters";
import {
	IMasterdataAlternativeKeyCreate,
	IMasterdataCreate,
	IMasterdataRelatedItemCreate,
	IMasterdataTranslationUpdateMdItem,
	IMasterdataTranslationUpdateMdType,
	IMasterdataTypeCreate,
	IMasterdataTypeUpdate,
	IMasterdataUpdate,
	ISourceLanguagesResultList
} from "../interfaces";
import {
	LanguagesResultList,
	Masterdata,
	MasterdataAlternativeKey,
	MasterdataAlternativeKeyResultList,
	MasterdataRelatedItem,
	MasterdataRelatedItemResultList,
	MasterdataResultList,
	MasterdataType,
	MasterdataTypeResultList,
	QueryModel,
	Result,
	TagsResultList
} from "../models";

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

	constructor(private readonly client: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
		this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
	}

	getAllMasterdataTypes(offset: number, rows: number): Observable<MasterdataTypeResultList> {
		const masterdataTypeResultListModelAdapter = new MasterdataTypeResultListModelAdapter();

		const queryParams = this.buildListQueryModelParams(new QueryModel({ offset, limit: rows }));
		const url = this.buildListUri(this.baseUrl, queryParams.toString());

		return this.client.get<MasterdataTypeResultList>(url).pipe(map(input => masterdataTypeResultListModelAdapter.adapt(input)));
	}

	getMasterdataTypeById(masterdatatype: string): Observable<MasterdataType> {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

		return this.client.get<Result<MasterdataType>>(`${this.baseUrl}/${masterdatatype}/details`).pipe(
			map(input => {
				return masterdataTypeModelAdapter.adapt(input.value);
			})
		);
	}

	getAllMasterdatas(masterdatatype: string, offset: number, rows: number, tags: string[]): Observable<MasterdataResultList> {
		const masterdataResultListModelAdapter = new MasterdataResultListModelAdapter();

		const queryParams = this.buildListQueryModelParams(new QueryModel({ offset, limit: rows, tags: tags.join(",") }));
		const url = this.buildListUri(`${this.baseUrl}${!isEmpty(masterdatatype) ? "/" + masterdatatype : ""}`, queryParams.toString());

		return this.client.get<MasterdataResultList>(url).pipe(map(input => masterdataResultListModelAdapter.adapt(input)));
	}

	getMasterdataById(masterdatatype: string, id: string): Observable<Masterdata> {
		const masterdataModelAdapter = new MasterdataModelAdapter();

		return this.client.get<Result<Masterdata>>(`${this.baseUrl}/${masterdatatype}/${id}`).pipe(
			map(input => {
				return masterdataModelAdapter.adapt(input.value);
			})
		);
	}

	getAllMasterdataAlternativeKeys(
		masterdatatype: string,
		masterdata: string,
		offset: number,
		rows: number
	): Observable<MasterdataAlternativeKeyResultList> {
		const masterdataAlternativeKeyResultListModelAdapter = new MasterdataAlternativeKeyResultListModelAdapter();

		const queryParams = this.buildListQueryModelParams(new QueryModel({ offset, limit: rows }));
		const url = this.buildListUri(`${this.baseUrl}/${masterdatatype}/${masterdata}/keys`, queryParams.toString());

		return this.client.get<MasterdataAlternativeKeyResultList>(url).pipe(map(input => masterdataAlternativeKeyResultListModelAdapter.adapt(input)));
	}

	getAllDomains(masterdatatype: string, masterdata: string, offset: number, rows: number): Observable<TagsResultList> {
		const domainsResultListModelAdapter = new DomainsResultListModelAdapter();

		const queryParams = this.buildListQueryModelParams(new QueryModel({ offset, limit: rows }));
		const url = this.buildListUri(`${this.baseUrl}/${masterdatatype}/${masterdata}/keys/domains`, queryParams.toString());

		return this.client.get<TagsResultList>(url).pipe(map(input => domainsResultListModelAdapter.adapt(input)));
	}

	getAllTags(masterdatatype: string, offset: number, rows: number): Observable<TagsResultList> {
		const tagsResultListModelAdapter = new TagsResultListModelAdapter();

		const queryParams = this.buildListQueryModelParams(new QueryModel({ offset, limit: rows }));
		const url = this.buildListUri(`${this.baseUrl}${!isEmpty(masterdatatype) ? "/" + masterdatatype : ""}/tags`, queryParams.toString());

		return this.client.get<TagsResultList>(url).pipe(map(input => tagsResultListModelAdapter.adapt(input)));
	}

	getRelatedItems(masterdatatype: string, masterdata: string): Observable<MasterdataRelatedItemResultList> {
		const masterdataRelatedItemResultListModelAdapter = new MasterdataRelatedItemResultListModelAdapter();

		const queryParams = this.buildListQueryModelParams();
		const url = this.buildListUri(`${this.baseUrl}/${masterdatatype}/${masterdata}/related`, queryParams.toString());

		return this.client.get<MasterdataRelatedItemResultList>(url).pipe(map(input => masterdataRelatedItemResultListModelAdapter.adapt(input)));
	}

	getAllLanguages(masterdatatype: string, offset: number, rows: number): Observable<LanguagesResultList> {
		const languagesResultListModelAdapter = new LanguagesResultListModelAdapter();

		const queryParams = this.buildListQueryModelParams(new QueryModel({ offset, limit: rows }));
		const url = this.buildListUri(`${this.baseUrl}/${masterdatatype}/langs`, queryParams.toString());

		return this.client.get<ISourceLanguagesResultList>(url).pipe(map(input => languagesResultListModelAdapter.adapt(input)));
	}

	createMasterdataType(item: IMasterdataTypeCreate): Observable<MasterdataType> {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

		return this.client.post<Result<MasterdataType>>(`${this.baseUrl}`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataTypeModelAdapter.adapt(input.value);
			})
		);
	}

	createMasterdata(item: IMasterdataCreate): Observable<Masterdata> {
		const masterdataModelAdapter = new MasterdataModelAdapter();

		return this.client.post<Result<Masterdata>>(`${this.baseUrl}/${item.masterdataTypeId}`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataModelAdapter.adapt(input.value);
			})
		);
	}

	createMasterdataAlternativeKey(masterdatatype: string, item: IMasterdataAlternativeKeyCreate): Observable<MasterdataAlternativeKey> {
		const masterdataAlternativeKeyModelAdapter = new MasterdataAlternativeKeyModelAdapter();

		return this.client
			.post<Result<MasterdataAlternativeKey>>(`${this.baseUrl}/${masterdatatype}/${item.masterdataId}/keys`, [item], this.httpOptions)
			.pipe(
				map(input => {
					return masterdataAlternativeKeyModelAdapter.adapt(input.value);
				})
			);
	}

	// eslint-disable-next-line max-len
	createMasterdataRelatedItems(masterdatatype: string, masterdata: string, item: IMasterdataRelatedItemCreate[]): Observable<MasterdataRelatedItem> {
		const masterdataRelatedItemModelAdapter = new MasterdataRelatedItemModelAdapter();

		// eslint-disable-next-line max-len
		return this.client.post<Result<MasterdataRelatedItem>>(`${this.baseUrl}/${masterdatatype}/${masterdata}/related`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataRelatedItemModelAdapter.adapt(input.value);
			})
		);
	}

	updateMasterdataType(masterdatatype: string, item: IMasterdataTypeUpdate): Observable<MasterdataType> {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

		return this.client.put<Result<MasterdataType>>(`${this.baseUrl}/${masterdatatype}/details`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataTypeModelAdapter.adapt(input.value);
			})
		);
	}

	updateMasterdata(masterdatatype: string, id: string, item: IMasterdataUpdate): Observable<Masterdata> {
		const masterdataModelAdapter = new MasterdataModelAdapter();

		return this.client.put<Result<Masterdata>>(`${this.baseUrl}/${masterdatatype}/${id}`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataModelAdapter.adapt(input.value);
			})
		);
	}

	updateMasterdataTypeTranslation(masterdatatype: string, item: IMasterdataTranslationUpdateMdType): Observable<MasterdataType> {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

		return this.client.put<Result<MasterdataType>>(`${this.baseUrl}/${masterdatatype}/translation`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataTypeModelAdapter.adapt(input.value);
			})
		);
	}

	updateMasterdataTranslation(masterdatatype: string, id: string, item: IMasterdataTranslationUpdateMdItem): Observable<Masterdata> {
		const masterdataModelAdapter = new MasterdataModelAdapter();

		return this.client.put<Result<Masterdata>>(`${this.baseUrl}/${masterdatatype}/${id}/translation`, item, this.httpOptions).pipe(
			map(input => {
				return masterdataModelAdapter.adapt(input.value);
			})
		);
	}

	deleteMasterdataType(masterdatatype: string): Observable<MasterdataType> {
		return this.client.delete<MasterdataType>(`${this.baseUrl}/${masterdatatype}/details`, this.httpOptions);
	}

	deleteMasterdata(masterdatatype: string, masterdata: string): Observable<Masterdata> {
		return this.client.delete<Masterdata>(`${this.baseUrl}/${masterdatatype}/${masterdata}`, this.httpOptions);
	}

	deleteMasterdataAlternativeKey(masterdatatype: string, masterdata: string, id: string): Observable<MasterdataAlternativeKey> {
		return this.client.delete<MasterdataAlternativeKey>(`${this.baseUrl}/${masterdatatype}/${masterdata}/keys/${id}`, this.httpOptions);
	}

	deleteMasterdataRelatedItems(masterdatatype: string, masterdata: string, guids: string[]): Observable<MasterdataRelatedItem> {
		const options = {
			...this.httpOptions,
			body: [...guids]
		};

		return this.client.delete<MasterdataRelatedItem>(`${this.baseUrl}/${masterdatatype}/${masterdata}/related`, options);
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
