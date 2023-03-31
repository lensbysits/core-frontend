import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MasterdataAlternativeKeyService {
	private alternativeKeyAdded = new Subject<boolean>();
	alternativeKeyAdded$ = this.alternativeKeyAdded.asObservable();

	private alternativeKeyRemoved = new Subject<boolean>();
	alternativeKeyRemoved$ = this.alternativeKeyRemoved.asObservable();

	onAlternativeKeyAdded() {
		this.alternativeKeyAdded.next(true);
	}

	onAlternativeKeyRemoved() {
		this.alternativeKeyRemoved.next(true);
	}
}
