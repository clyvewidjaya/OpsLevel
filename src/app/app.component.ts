import { Component } from '@angular/core';
import {Todo} from './domain/Todo';
import {FormControl, FormGroup} from '@angular/forms';
import _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODOApp';
  public todoList: Todo[] = [];
  public onAddTodo = false;
  public form: FormGroup;
  public titleControl: FormControl;
  public descriptionControl: FormControl;
  public currentId = 0;

  constructor() {
    this.titleControl = new FormControl('');
    this.descriptionControl = new FormControl('');
    this.form = new FormGroup({
      titleControl: this.titleControl,
      descriptionControl: this.descriptionControl
    });
  }

  public onDelete(id){
    _.remove(this.todoList, (todo) => {
      return todo.id === id;
    });
  }

  public onAdd(){
    this.onAddTodo = true;
  }

  public onCancel(){
    this.onAddTodo = false;
  }

  public onSave(value){
    this.todoList.push(
        new Todo(this.currentId, value.titleControl, value.descriptionControl)
    );

    this.onAddTodo = false;
    this.currentId++;
    this.form.reset();
  }
}
