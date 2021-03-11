import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Comanda from '../models/Comanda';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  url = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }


  new(comanda: Comanda): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/comanda`,
      comanda
    )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/comanda/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
  


}
