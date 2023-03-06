import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class SearchService {
	protected searchResultSubject = new BehaviorSubject<any>([]);
	searchResult$ = this.searchResultSubject.asObservable();

	// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
	search(searchTerm: string): void {}
}
