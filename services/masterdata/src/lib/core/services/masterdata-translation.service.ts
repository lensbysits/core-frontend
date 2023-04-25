import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { IMasterdataTranslationFlat } from "../interfaces";

@Injectable()
export class MasterdataTranslationService {
	// translation items should be reloaded!
	private readonly resetSubject: Subject<void> = new Subject();
	public reset$ = this.resetSubject.asObservable();

	// translation items
	private readonly translationItemsSubject = new BehaviorSubject<IMasterdataTranslationFlat[]>(this.TranslationItems);
	translationItems$ = this.translationItemsSubject.asObservable();

	get TranslationItems(): IMasterdataTranslationFlat[] {
		return this.translationItemsSubject?.value;
	}
	set TranslationItems(items: IMasterdataTranslationFlat[]) {
		const items_ = Array.isArray(items) ? items : [items];
		this.translationItemsSubject.next(items_);
	}

	// additional methods
	markResetTranslationItems() {
		this.resetSubject.next();
	}

	resetTranslationItems(items: IMasterdataTranslationFlat[]): void {
		const items_ = Array.isArray(items) ? items : [items];
		this.TranslationItems = [...items_];
	}
}
