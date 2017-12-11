import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { ToDo } from '../resources/data/todo';

@inject(Router, AuthService, ToDo)
export class List {
  constructor(router, auth, todo) {
    this.router = router;
    this.auth = auth;
    this.todo = todo;
    this.priorities = ['Low', 'Medium', 'High', 'Critical'];
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.showList = true;
    this.title = "Joe Has Things ToDo!";
      this.showCompleted = false;
  }

  async activate() {
    await this.todo.getUserTodos(this.user._id);
  }

  createTodo() {
    this.todoObj = {
      todo: "",
      description: "",
      dateDue: new Date(),
      userId: this.user._id,
      priority: this.priorities[0]
    }
    this.showList = false;
  }

  async saveTodo() {
    if (this.todoObj) {
      let response = await this.todo.save(this.todoObj);
      if (response.error) {
        alert("There was an error creating the Todo");
      } else {
        var todoId = response._id;
        if (this.filesToUpload && this.filesToUpload.length) {
          await this.todo.uploadFile(this.filesToUpload, this.user._id, todoId);
          this.filesToUpload = [];
        }
      }
      this.showList = true;
    }
  }

  editTodo(todo) {
    this.todoObj = todo;
    this.showList = false;
  }

  deleteTodo(todo) {
    this.todo.deleteTodo(todo._id);
  }

  completeTodo(todo) {
    todo.completed = !todo.completed;
    this.todoObj = todo;
    this.saveTodo();
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  changeFiles() {
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
  }

  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }

  back() {
    this.showList = true;
  }

  logout() {
    sessionStorage.removeItem('user');
    this.auth.logout();
  }



}
