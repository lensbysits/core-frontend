import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LoggerMessagesService } from './logger-messages.service';
import { ILoggerMessage } from '../interfaces';
import {
  Result,
  MasterdataType,
  MasterdataTypeResultList,
  Masterdata,
  MasterdataResultList,
} from '../models';
import {
  IMasterdataTypeCreate,
  IMasterdataTypeUpdate,
  IMasterdataCreate,
  IMasterdataUpdate,
} from '../interfaces';
import {
  MasterdataTypeModelAdapter,
  MasterdataTypeResultListModelAdapter,
  MasterdataModelAdapter,
  MasterdataResultListModelAdapter,
} from '../adapters';

export const isEmpty = (str: string) => !str || !str.length;

@Injectable()
export class MasterdataCrudHttpService {
  private api_base_url = `https://localhost:7029/api/Masterdata`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    }),
    //responseType: 'text' as 'json',
  };

  constructor(
    private readonly client: HttpClient,
    private readonly logger: LoggerMessagesService
  ) {}

  //#region Get
  getAllMasterdataTypes(): Observable<MasterdataTypeResultList> {
    const masterdataTypeResultListModelAdapter =
      new MasterdataTypeResultListModelAdapter();

    return this.client
      .get<MasterdataTypeResultList>(`${this.api_base_url}/type`) //.pipe(first());
      .pipe(
        tap((_) => this.log(null, 'getAllMasterdataTypes', 'success')),
        map((input) => masterdataTypeResultListModelAdapter.adapt(input)),
        catchError(
          this.handleError<MasterdataTypeResultList>(
            'getAllMasterdataTypes',
            masterdataTypeResultListModelAdapter.adapt(null)
          )
        )
      );
  }

  getMasterdataTypeById(id: string): Observable<MasterdataType> {
    const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

    return this.client
      .get<Result<MasterdataType>>(`${this.api_base_url}/type/${id}`)
      .pipe(
        tap((_) => this.log(`id #${id}`, `getMasterdataTypeById`, 'success')),
        map((input) => {
          return masterdataTypeModelAdapter.adapt(input.value);
        }),
        catchError(
          this.handleError<MasterdataType>(
            'getMasterdataTypeById',
            masterdataTypeModelAdapter.adapt(null)
          )
        )
      );
  }

  getAllMasterdatas(typeId = ''): Observable<MasterdataResultList> {
    const masterdataResultListModelAdapter =
      new MasterdataResultListModelAdapter();
    const url = `${this.api_base_url}${!isEmpty(typeId) ? '/' + typeId : ''}`;

    return this.client.get<MasterdataResultList>(url).pipe(
      tap((_) => this.log(null, 'getAllMasterdatas', 'success')),
      map((input) => masterdataResultListModelAdapter.adapt(input)),
      catchError(
        this.handleError<MasterdataResultList>(
          'getAllMasterdatas',
          masterdataResultListModelAdapter.adapt(null)
        )
      )
    );
  }

  getMasterdataById(typeId: string, id: string): Observable<Masterdata> {
    const masterdataModelAdapter = new MasterdataModelAdapter();

    return this.client
      .get<Result<Masterdata>>(`${this.api_base_url}/${typeId}/${id}`)
      .pipe(
        tap((_) => this.log(`id #${id}`, `getMasterdataById`, 'success')),
        map((input) => {
          return masterdataModelAdapter.adapt(input.value);
        }),
        catchError(
          this.handleError<Masterdata>(
            'getMasterdataById',
            masterdataModelAdapter.adapt(null)
          )
        )
      );
  }
  //#endregion

  //#region Add/Post
  createMasterdataType(
    item: IMasterdataTypeCreate
  ): Observable<MasterdataType> {
    const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

    return this.client
      .post<Result<MasterdataType>>(
        `${this.api_base_url}/type`,
        item,
        this.httpOptions
      )
      .pipe(
        tap((newItem) => {
          this.log(
            `id #${newItem?.value?.id}`,
            `createMasterdataType`,
            'success'
          ); //JSON.parse(newItem)
        }),
        map((input) => {
          return masterdataTypeModelAdapter.adapt(input.value);
        }),
        catchError(
          this.handleError<MasterdataType>(
            'createMasterdataType',
            masterdataTypeModelAdapter.adapt(null)
          )
        )
      );
  }

  createMasterdata(item: IMasterdataCreate): Observable<Masterdata> {
    const masterdataModelAdapter = new MasterdataModelAdapter();

    return this.client
      .post<Result<Masterdata>>(`${this.api_base_url}`, item, this.httpOptions)
      .pipe(
        tap((newItem) => {
          this.log(`id #${newItem?.value?.id}`, `createMasterdata`, 'success'); //JSON.parse(newItem)
        }),
        map((input) => {
          return masterdataModelAdapter.adapt(input.value);
        }),
        catchError(
          this.handleError<Masterdata>(
            'createMasterdata',
            masterdataModelAdapter.adapt(null)
          )
        )
      );
  }
  //#endregion

  //#region Update/Put
  updateMasterdataType(
    id: string,
    item: IMasterdataTypeUpdate
  ): Observable<MasterdataType> {
    const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();

    return this.client
      .put<Result<MasterdataType>>(
        `${this.api_base_url}/type/${id}`,
        item,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log(`id #${id}`, `updateMasterdataType`, 'success')),
        map((input) => {
          return masterdataTypeModelAdapter.adapt(input.value);
        }),
        catchError(
          this.handleError<MasterdataType>(
            'updateMasterdataType',
            masterdataTypeModelAdapter.adapt(null)
          )
        )
      );
  }

  updateMasterdata(
    id: string,
    item: IMasterdataUpdate
  ): Observable<Masterdata> {
    const masterdataModelAdapter = new MasterdataModelAdapter();

    return this.client
      .put<Result<Masterdata>>(
        `${this.api_base_url}/${id}`,
        item,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log(`id #${id}`, `updateMasterdata`, 'success')),
        map((input) => {
          return masterdataModelAdapter.adapt(input.value);
        }),
        catchError(
          this.handleError<Masterdata>(
            'updateMasterdata',
            masterdataModelAdapter.adapt(null)
          )
        )
      );
  }
  //#endregion

  //#region Delete
  deleteMasterdataType(id: string): Observable<any> {
    return this.client
      .delete(`${this.api_base_url}/type/${id}`, this.httpOptions)
      .pipe(
        tap((_) => this.log(`id #${id}`, `deleteMasterdataType`, 'success')),
        catchError(this.handleError<any>('deleteMasterdataType', null))
      );
  }

  deleteMasterdata(id: string): Observable<any> {
    return this.client
      .delete(`${this.api_base_url}/${id}`, this.httpOptions)
      .pipe(
        tap((_) => this.log(`id #${id}`, `deleteMasterdata`, 'success')),
        catchError(this.handleError<any>('deleteMasterdata', null))
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
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error('handleError/', error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`(${error.status}) ${error.message}`, operation, 'error');

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
  private log(
    message: string | null,
    operation: string,
    status: string = 'info'
  ) {
    const msg = [];
    msg.push(new Date().toLocaleString());
    msg.push('masterdata');
    msg.push(operation);
    msg.push(status);
    message && msg.push(message);
    this.logger.add({ status, message: msg.join(' | ') } as ILoggerMessage);
  }
  //#endregion
}
