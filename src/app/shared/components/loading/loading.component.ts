import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private apiService: ApiService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.apiService.loading$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data);
      this.isLoading = data;
      this.cdr.detectChanges();
    });
  }

}
