import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-confirm-bottom-sheet',
  templateUrl: './confirm-bottom-sheet.component.html',
  styleUrls: ['./confirm-bottom-sheet.component.scss']
})
export class ConfirmBottomSheetComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ConfirmBottomSheetComponent>) { }

  ngOnInit(): void {
  }


  submit() {
    this.bottomSheetRef.dismiss(true);

  }

  reset() {
    this.bottomSheetRef.dismiss(false);

  }

}
