import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../models/task-model';
import {v4 as uuidv4} from 'uuid';
import {TaskService} from '../../services/task.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-item-bottom-sheet',
  templateUrl: './create-item-bottom-sheet.component.html',
  styleUrls: ['./create-item-bottom-sheet.component.scss']
})
export class CreateItemBottomSheetComponent implements OnInit {
  formGroup: FormGroup;
  isEdit = false;

  constructor(private taskService: TaskService,
              private bottomSheetRef: MatBottomSheetRef<CreateItemBottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    if (this.data.task) {
      this.isEdit = true;
      this.formGroup.patchValue({
        title: this.data?.task?.title,
        description: this.data?.task?.description
      });
    }
  }

  createForm() {
    this.formGroup = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null)
    });
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }

  onSubmit(form) {
    if (this?.data?.task) {
      this.taskService.updateTask(this?.data?.task?.id, form?.title, form?.description).then(() => {
        this.bottomSheetRef.dismiss();
      }).finally(() => {

      });
    } else {
      const task: Task = {
        title: form.title,
        description: form.description,
        isBookmark: false,
        isDone: false,
        creationDate: Date.now(),
        id: uuidv4()
      };
      this.taskService.addTask(task).then(() => {
        this.bottomSheetRef.dismiss();
      }).finally(() => {

      });
    }
  }

}
