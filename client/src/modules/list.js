import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { mypics } from '../resources/data/mypics';

@inject(Router, AuthService, mypics)
export class List {
  constructor(router, auth, mypics) {
    this.router = router;
    this.auth = auth;
    this.mypics = mypics;
    this.priorities = ['Low', 'Medium', 'High', 'Critical'];
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.showList = true;
    this.title = "Joe Has Pics!";
      this.showCompleted = false;
  }

  async activate() {
    await this.mypics.getUsermypics(this.user._id);
  }

  createmypics() {
    this.mypicsObj = {
      mypics: "",
      description: "",
      dateDue: new Date(),
      userId: this.user._id,
      priority: this.priorities[0]
    }
    this.showList = false;
  }

  async savemypics() {
    if (this.mypicsObj) {
      let response = await this.mypics.save(this.mypicsObj);
      if (response.error) {
        alert("There was an error creating the mypics");
      } else {
        var mypicsId = response._id;
        if (this.filesToUpload && this.filesToUpload.length) {
          await this.mypics.uploadFile(this.filesToUpload, this.user._id, mypicsId);
          this.filesToUpload = [];
        }
      }
      this.showList = true;
    }
  }

  editmypics(mypics) {
    this.mypicsObj = mypics;
    this.showList = false;
  }

  deletemypics(mypics) {
    this.mypics.deletemypics(mypics._id);
  }

  completeTodo(mypics) {
    mypics.completed = !mypics.completed;
    this.mypicsObj = mypics;
    this.savemypics();
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
