import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreditCard } from '../models/credit-card.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  paymentServiceUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  // method used to call payment details API
  public savePaymentData(creditCard: CreditCard): Observable<boolean> {
    return this.http.post<CreditCard>(this.paymentServiceUrl + 'postPayment', creditCard)
      .pipe(
      map(() => { return true; }),
      catchError(this.errorHandler));
  }

  // Error handling
  private errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
