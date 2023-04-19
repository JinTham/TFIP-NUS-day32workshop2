import { Component, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent{

  @Input()
  taskList!:Task[]

  @Output()
  onRemoveTask = new Subject<number>()

  @Output()
  onEditTask = new Subject<number>()

  removeTask(i:number) {
    this.onRemoveTask.next(i)
  }

  editTask(i:number) {
    this.onEditTask.next(i)
  }

  completeTask(i:number) {
    this.taskList[i].done = true
    console.info(this.taskList)
  }

}
