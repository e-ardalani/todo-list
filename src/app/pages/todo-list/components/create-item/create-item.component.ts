import {Component, Inject, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Task} from '../../models/task-model';
import {v4 as uuidv4} from 'uuid';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  formGroup: FormGroup;
  tasks: Observable<any[]>;


  constructor(private db: AngularFirestore,
              private taskService: TaskService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CreateItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.createForm();
    if (this.data.task) {
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

  reset() {
    this.dialogRef.close(false);
  }


  onSubmit(form) {
    if (this?.data?.task) {
      this.taskService.updateTask(this?.data?.task?.id, form?.title, form?.description).then(() => {
        this.dialogRef.close();
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
        this.dialogRef.close();
      }).finally(() => {

      });
    }

  }

}
