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
    // this.showWhat = "1";
    this.title = "Joe Has Pics!";
    this.showCompleted = false;
  }

  // async activate() {
  //   await this.mypics.getUsermypics(this.user._id);
  // }

  async optionSelected() {
    console.log(this.showWhat)
    if (this.showWhat == "1") {
      this.mypics.getUsergalleries(this.user._id);
      this.showGalleryList = true;
    } else if (this.showWhat == '2') {
      this.mypics.getUsergalleries(this.user._id);
      this.mypicsObj = {
        mypics: "",
        description: "",
        picDate: new Date(),
        userId: this.user._id,
        galleriesId: ""
      }
    } else if (this.showWhat == '3') {
      this.galleriesObj = {
        galleries: "",
        description: "",
        userId: this.user._id,
      }
    }
  }
  createmypics() {
    this.mypicsObj = {
      mypics: "",
      description: "",
      picDate: new Date(),
      userId: this.user._id,
    }
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
  creategalleries() {
    this.galleriesObj = {
      galleries: "",
      description: "",
      userId: this.user._id,
    }
  }
  async savegalleries() {
    if (this.galleriesObj) {
      let response = await this.mypics.savegalleries(this.galleriesObj);
      if (response.error) {
        alert("There was an error creating the mypics");
      }
    }
  }

  async showPhotos(gallery){
    await this.mypics.getUsermypics(gallery._id);
    this.showGalleryList = false;
  }

  editgalleries(gallery){
    this.galleriesObj = gallery;
    this.showWhat = '3';
  }

  deletegalleries(gallery){
    this.mypics.deletegalleries(gallery._id);
  }

  editmypics(mypics) {
    this.ypicsObjm = mypics;
    this.showList = false;
  }

  deletemypics(mypics) {
    this.mypics.deletemypics(mypics._id);
  }

  // completeTodo(mypics) {
  //   mypics.completed = !mypics.completed;
  //   this.mypicsObj = mypics;
  //   this.savemypics();
  // }

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

