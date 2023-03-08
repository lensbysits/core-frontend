import { BehaviorSubject } from "rxjs";
import { SearchResponseEntry } from "../models";

export abstract class SearchService<T> {
	// List of the results from the search
	protected searchResultSubject = new BehaviorSubject<T[]>([]);
	searchResult$ = this.searchResultSubject.asObservable();

	// Keep track of the current search-term
	protected searchTermSubject = new BehaviorSubject<string>("");
	searchTerm$ = this.searchTermSubject.asObservable();

	// Trigger actions when a result-item is selected
	protected selectedSearchResultSubject = new BehaviorSubject<SearchResponseEntry | null>(null);
	selectedSearchResult$ = this.selectedSearchResultSubject.asObservable();

	// Do the actual search and with the result call searchResultSubject.next(result);
	abstract search(searchTerm: string): void;
}
