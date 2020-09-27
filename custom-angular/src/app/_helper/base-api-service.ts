import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export const apiPartUrl = {
  book: 'book/'
};

interface BaseApiInterface {
  getObject(objectId?: number, queryParameter?: {}): Observable<any>;

  patchObject(objectData: {}, objectId: number): Observable<any>;

  deleteObject(objectId: number): Observable<any>;

  createObject(objectData: {}): Observable<any>;
}

export abstract class BaseApiService implements BaseApiInterface {
  baseApiUrl = environment.baseUrl;
  apiUrl = this.baseApiUrl;
  protected constructor(private http: HttpClient) {
  }
  public getObject(id = null, queryParameter: {} = null): Observable<any[] | any> {
    if (id !== null) {
      return this.http.get<any>(this.apiUrl + id.toString() + '/', {params: queryParameter});
    }
    return this.http.get<any>(this.apiUrl, {params: queryParameter});

  }
  public patchObject(objectData: {}, objectId: number): Observable<any> {
    return this.http.patch<any>(this.apiUrl + objectId + '/', objectData);
  }
  public deleteObject(objectId: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + objectId);
  }
  public createObject(objectData: {}): Observable<any> {
    return this.http.post<any>(this.apiUrl, objectData);
  }
}

export class ObjectApiService {
  /*
   */
  objectBehaviorSubject = new BehaviorSubject<any>(null);
  public keyId = 'id';

  constructor(private api: BaseApiInterface) {
    this.listObject();
  }

  public listObject(): void {
    this.api.getObject()
      .subscribe(
        x => {
          this.onSuccessListObject(x);
          },
        error => {
          this.onFailListObject(error);
        });
  }

  public getObject(objectId: number): void {
      this.api.getObject(objectId).subscribe(
        x => {
            this.onSuccessGetObject(x, objectId);
        },
        error => {
          this.onFailGetObject(error);
        }
      );
  }

  public createObject(objectData): void {
    this.api.createObject(objectData).subscribe(
      returnedObject => {
        this.onSuccessCreateObject(returnedObject);
      },
      error => {
        this.onFailCreateObject(error);
      }
    );
  }

  public deleteObject(objectId: number): void {
    this.api.deleteObject(objectId).subscribe(
      returnedObject => {
        this.onSuccessDeleteObject(returnedObject, objectId);
      },
      error => {
        this.onFailDeleteObject(error);
      }
    );
  }

  public patchObject(objectId, objectData): void {
    this.api.patchObject(objectData, objectId).subscribe(
      returnedObject => {
        this.onSuccessPatchObject(returnedObject, objectData, objectId);
      },
      error => {
        this.onFailPatchObject(error);
      }
    );
  }

  public onSuccessCreateObject(returnedObject): void {
      this.addItem(returnedObject);
  }

  public onSuccessDeleteObject(returnedObject, objectId): void {
    this.removeItem(objectId);
  }

  public onSuccessPatchObject(returnedObject, objectData, objectId): void {
    const itemIndex = this.findObjectIndex(objectId);
    if (itemIndex !== null) {
      this.updateItem(returnedObject, itemIndex);
    }
    else {
      this.addItem(returnedObject);
    }
  }

  public onSuccessListObject(returnedObject): void {
    this.objectBehaviorSubject.next(returnedObject);
  }

  public onSuccessGetObject(returnedObject, objectId): void {
    const itemIndex = this.findObjectIndex(objectId);
    if (itemIndex) {
      this.updateItem(returnedObject, itemIndex);
      this.objectBehaviorSubject.next(this.objectBehaviorSubject.value);
    }
    else {
      this.addItem(returnedObject);
    }
  }

  public onFailCreateObject(error: any): void {}
  public onFailGetObject(error: any): void {}
  public onFailPatchObject(error: any): void {}
  public onFailListObject(error: any): void {}
  public onFailDeleteObject(error: any): void {}

  private findObjectIndex(itemId): number | null {
      const objectList = this.objectBehaviorSubject.value;
      let index = 0;
      for (const element of objectList) {
        if (element[this.keyId] === itemId) {
          return index;
        }
        index += 1;
      }
      return null;
    }
  private removeItem(objectId): void {
    let count = 0;
    for (const element of this.objectBehaviorSubject.value) {
      if (element[this.keyId] === objectId) {
        const objectList = [...this.objectBehaviorSubject.value];
        objectList.splice(count, 1);
        this.objectBehaviorSubject.next(objectList);
      }
      count += 1;
    }
  }
  private addItem(newObject): void {
      if (this.objectBehaviorSubject.value) {
        const objectList = [...this.objectBehaviorSubject.value, newObject];
        this.objectBehaviorSubject.next(objectList);
      } else {
        this.objectBehaviorSubject.next([newObject]);
      }
  }
  private updateItem(item, itemIndex): void {
    for (const key of Object.keys(item)) {
        this.objectBehaviorSubject.value[itemIndex][key] = item[key];
    }
  }
}

