import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()


export class HttpService {
  constructor(private http: HttpClient) {}

  getRates(amount: number, from: string)
  {
    return this.http.get('https://api.exchangerate.host/latest',  
    {
        responseType: 'text',
        params: new HttpParams()
        .set('base', from)
        .set('amount', amount)
        .set('places', '3')
    }
  )
}}
