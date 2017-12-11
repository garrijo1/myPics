import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
//"DataServices" name has to match object name in data-services.js

@inject(DataServices)
export class Users {
   constructor(data) {
        this.data = data;
        this.USER_SERVICE = 'users';
    }
//this function is going to happens when the "let serverResponse" occurs first
    async save(user){
        if(user){
            let serverResponse = await this.data.post(user, this.USER_SERVICE);
            //when response comes back, we send it back to interface
            return serverResponse;
 }
}

}
