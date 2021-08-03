import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Type } from './type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private TYPE_URL = 'http://localhost:3000/api/v1/types';

  getTypes() : Observable<any> {
    return this.http.get<Type[]>(this.TYPE_URL);
  }

  constructor(
    private http: HttpClient,
  ) { }
}
