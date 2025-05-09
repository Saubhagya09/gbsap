import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  addProject(response: Object) {
    throw new Error('Method not implemented.');
  }

  post(url: any, data: any): Observable<any> {
    return this.http.post(url, data);
  }
  get(url: any) {
    return this.http.get(url);
  }
  delete(url: any): Observable<any> {
    return this.http.delete(url);
  }

  put(url: any, data: any): Observable<any> {
    return this.http.put(url, data);
  }

  // private currentProjectIdSubject = new BehaviorSubject<number | null>(null);
  // currentProjectId$ = this.currentProjectIdSubject.asObservable();

  // setProjectId(id: number): void {
  //   this.currentProjectIdSubject.next(id);
  // }


  // task

  private selectedTaskSubject = new BehaviorSubject<any>(null);
  selectedTask$ = this.selectedTaskSubject.asObservable();

  setSelectedTask(task: any) {
    this.selectedTaskSubject.next(task);
  }

  getSelectedTask() {
    return this.selectedTaskSubject.getValue(); // For sync access
  }
}

