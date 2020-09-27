import { Injectable } from '@angular/core';
import {BaseApiService, ObjectApiService, apiPartUrl} from '../_helper/base-api-service';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookBaseService extends BaseApiService {
  apiUrl = this.baseApiUrl + apiPartUrl.book;
  constructor(http: HttpClient) {
    super(http);
  }
}


@Injectable({
  providedIn: 'root'
})
export class BookService  extends ObjectApiService{

  constructor(api: BookBaseService) {
    super(api);
  }
}
