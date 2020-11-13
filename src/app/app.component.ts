import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit, OnDestroy {
  private timeDelay = 3000;
  private destroyed$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    timer(0, this.timeDelay)
      .pipe(takeUntil(this.destroyed$), switchMap(() => this.callApi()))
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private callApi() {
    return this.http.post('https://localhost:44327/apicall', null);
  }
}
