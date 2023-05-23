import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MasterdataAlternativeKeyService {
	private alternativeKeyAdded = new Subject<boolean>();
	private alternativeKeyRemoved = new Subject<boolean>();

	public alternativeKeyAdded$ = this.alternativeKeyAdded.asObservable();
	public alternativeKeyRemoved$ = this.alternativeKeyRemoved.asObservable();

	public onAlternativeKeyAdded() {
		this.alternativeKeyAdded.next(true);
	}

	public onAlternativeKeyRemoved() {
		this.alternativeKeyRemoved.next(true);
	}
}
