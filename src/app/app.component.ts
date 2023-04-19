import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from './models';
import { TodoComponent } from './components/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'day32workshop2';

  taskList: Task[] = []
  currentTask!:Task
  updateMode:boolean = false
  isFormInvalid!:boolean

  @ViewChild(TodoComponent)
  todoComp!: TodoComponent

  ngOnInit(): void {
    // const tasks = localStorage.getItem('todo')
    // if (!tasks)
    //   return
    // for (let t of tasks){
    //   const task:any = JSON.parse(t)
    //   task['dueDate'] = new Date(task['dueDate'])
    //   this.taskList.push({...task})
    // }
    // console.info(this.taskList)
  }

  addTask(task:Task) {
    let idx = this.taskList.findIndex(t => t.description==task.description)
    if (idx == -1){
      this.taskList.push(task)
    } else {
      this.taskList[idx] = task
    }
    localStorage.setItem('todo', JSON.stringify(task))
  }

  removeTask(i:number) {
    this.taskList.splice(i,1)
  }

  editTask(i:number) {
    this.currentTask = this.taskList[i]
    this.todoComp.value = this.currentTask
    this.updateMode = true
  }

  clear() {
    this.todoComp.initForm()
    this.updateMode = false
  }

  checkFormInvalid(invalid:boolean) {
    this.isFormInvalid = invalid
    console.info(this.isFormInvalid)
  }

}
