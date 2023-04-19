import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  form!:FormGroup
  constructor(private fb:FormBuilder){}

  @Input()
  editTask!:Task

  @Output()
  onSubmitForm = new Subject<Task>()

  @Output()
  onFormInvalid = new Subject<boolean>()

  ngOnInit(): void {
      this.form = this.createForm()
      this.isFormInvalid()
  }

  get value():Task {
    return this.form.value as Task
  }

  set value(task:Task) {
    this.initForm(task)
  }

  initForm(task:Task | null=null) {
    this.form = this.createForm(task)
    this.isFormInvalid()
  }

  createForm(editTask:Task | null = null):FormGroup {
    return this.fb.group({
      description:this.fb.control<string>(editTask? editTask.description: '',[Validators.required,Validators.minLength(5)]),
      priority:this.fb.control<string>(editTask? editTask.priority: 'low',[Validators.required]),
      dueDate:this.fb.control<Date>(editTask? editTask.dueDate: new Date(),[Validators.required]),
      done:this.fb.control<boolean>(editTask? editTask.done: false)
    })
  }

  processForm() {
    const task:Task = this.form.value
    this.onSubmitForm.next(task)
    this.form = this.createForm()
  }

  isFormInvalid():boolean {
    const due = this.form.get('dueDate')?.value
    if (!due){
      this.onFormInvalid.next(true)
      return true
    }
    this.onFormInvalid.next(this.form.invalid || (new Date(due) < new Date()))
    return this.form.invalid || (new Date(due) < new Date())
  }

  hasError(control:string):boolean {
    return !!(this.form.get(control)?.invalid && this.form.get(control)?.dirty)
  }


}
