import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Todo } from '../models/todo';

import { environment } from '../../environments/environment';

@Injectable()
export class TodoService {
    private endpoint = environment.server_url;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    private extractData<T>() {
        return (res: Response) => {
            let body = res;
            return (body || { }) as T;
        }
    }

    public getTodos(): Observable<Todo[]> {
        return this.http.get(this.endpoint + '/').pipe(map(this.extractData<Todo[]>()));
    }

    public getTodo(id: number): Observable<Todo> {
        return this.http.get(this.endpoint + '/' + id).pipe(map(this.extractData<Todo>()));
    }

    public addTodo(todo: Todo): Observable<void> {
        return this.http.post<any>(this.endpoint + '/', JSON.stringify(todo), this.httpOptions).pipe(catchError(this.handleError<void>('addProduct')));
    }

    public updateTodo(id: number, todo: Todo): Observable<void> {
        return this.http.put(this.endpoint + '/' + id, JSON.stringify(todo), this.httpOptions).pipe(catchError(this.handleError<any>('updateProduct')));
    }

    public deleteTodo(id: number): Observable<void> {
        return this.http.delete<any>(this.endpoint + '/' + id, this.httpOptions).pipe(catchError(this.handleError<void>('deleteProduct')));
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
      }
}