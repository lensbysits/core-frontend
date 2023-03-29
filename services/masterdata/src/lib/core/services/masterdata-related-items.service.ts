import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { MasterdataRelatedItemGroupedByType } from "../models";

export interface ICurrentMasterdata {
	masterdataTypeId?: string;
	masterdataId?: string;
}

export interface ICurrentOpenedType {
	idx: number;
	id?: string;
}

@Injectable()
export class MasterdataRelatedItemsService {
	// related items should be reloaded!
	private readonly resetSubject: Subject<void> = new Subject();
	public reset$ = this.resetSubject.asObservable();

	// current masterdata
	private readonly currentMasterdataSubject = new BehaviorSubject<ICurrentMasterdata>({});
	currentMasterdata$ = this.currentMasterdataSubject.asObservable();

	get CurrentMasterdata(): ICurrentMasterdata {
		return this.currentMasterdataSubject?.value;
	}
	set CurrentMasterdata(item: ICurrentMasterdata) {
		this.currentMasterdataSubject.next(item);
	}

	// current opened type box
	private readonly currentOpenedTypeSubject = new BehaviorSubject<ICurrentOpenedType>({ idx: 0 });
	currentOpenedType$ = this.currentOpenedTypeSubject.asObservable();

	get CurrentOpenedType(): ICurrentOpenedType {
		return this.currentOpenedTypeSubject?.value;
	}
	set CurrentOpenedType(item: ICurrentOpenedType) {
		this.currentOpenedTypeSubject.next(item);
	}

	// related items grouped by type
	private readonly relatedItemsSubject = new BehaviorSubject<MasterdataRelatedItemGroupedByType[]>(this.RelatedItems);
	relatedItems$ = this.relatedItemsSubject.asObservable();

	get RelatedItems(): MasterdataRelatedItemGroupedByType[] {
		return this.relatedItemsSubject?.value;
	}
	set RelatedItems(items: MasterdataRelatedItemGroupedByType | MasterdataRelatedItemGroupedByType[]) {
		const items_ = Array.isArray(items) ? items : [items];
		this.relatedItemsSubject.next(items_);
	}

	// additional methods
	markResetRelatedItems() {
		this.resetSubject.next();
	}

	setCurrentOpenedTypeById(typeId: string) {
		const idx = this.getRelatedItemsGroupedByType().findIndex(item => typeId === item.typeId);
		this.CurrentOpenedType = { id: typeId, idx };
	}

	resetRelatedItems(items: MasterdataRelatedItemGroupedByType | MasterdataRelatedItemGroupedByType[]): void {
		const items_ = Array.isArray(items) ? items : [items];
		this.RelatedItems = [...items_];
	}

	addRelatedItems(items: MasterdataRelatedItemGroupedByType | MasterdataRelatedItemGroupedByType[]): void {
		let items_ = Array.isArray(items) ? items : [items];

		items_ = items_.filter(item => {
			// verify for duplicate types!
			return !this.RelatedItems?.some(elem => elem.typeId === item.typeId);
		});
		this.RelatedItems = [...(this.RelatedItems ?? []), ...items_];
	}

	getRelatedItemsGroupedByType(): MasterdataRelatedItemGroupedByType[] {
		return this.RelatedItems?.sort(this.sortByTypeName);
	}

	private sortByTypeName(a: MasterdataRelatedItemGroupedByType, b: MasterdataRelatedItemGroupedByType) {
		// ignore upper and lowercase
		const nameA = a.typeName.toUpperCase();
		const nameB = b.typeName.toUpperCase();
		return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
	}
}
