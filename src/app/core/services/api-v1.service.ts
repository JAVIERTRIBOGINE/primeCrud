import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiV1Service {

  constructor(private http: HttpClient) { }

  // Create methods to make API requests 
  getData(url: string) {
    return this.http.get(url);
  }
  
  postData(url: string, data: object) {
    return this.http.post(url, data );
  }

  patchData(url: string, element: any) {
    return this.http.patch(url+"/"+element['id'],  element)
  }

  deleteData(url: string, id: string) {
    console.log("llega al delete: ", id);

    return this.http.delete(url+"/"+id);
  }
  
  searchbyName(url: string, key: string, name: string) {
    return this.http.get(url+'?' + key + '_like='+ name);
  }
}