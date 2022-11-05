import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.taskService.taskItem$.asObservable().subscribe(task => {
      this.formGroup.patchValue({
        title: task?.title,
        description: task?.description
      });
    });
  }

  createForm() {
    this.formGroup = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null)
    });
  }

  onSubmit(formValue) {

  }

}
