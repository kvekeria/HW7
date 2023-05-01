import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/search';

  constructor(private http: HttpClient) {}

  search(term: string) {
    return this.http.post(this.apiUrl, { term });
  }
}
