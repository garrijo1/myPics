import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)
export class mypics {

    constructor(data) {
        this.data = data;
        this.MYPICS_SERVICE = 'mypics';
        this.GALLERIES_SERVICE = 'galleries';
        this.mypicsArray = [];
        this.galleriesArray = [];
    }
    async getUsermypics(id) {
        let response = await this.data.get(this.MYPICS_SERVICE + "/galleries/" + id);
        if (!response.error && !response.message) {
            this.mypicsArray = response;
        }
    }

    async getUsergalleries(id) {
        let response = await this.data.get(this.GALLERIES_SERVICE + "/user/" + id);
        if (!response.error && !response.message) {
            this.galleriesArray = response;
        }
    }

    async save(mypics) {
        if (!mypics._id) {
            let serverResponse = await this.data.post(mypics, this.MYPICS_SERVICE);
            if (!serverResponse.error) {
                this.mypicsArray.push(serverResponse);
            }
            return serverResponse;
         } else {
            let serverResponse = await this.data.put(mypics, this.MYPICS_SERVICE + "/" + mypics._id);
            if (!serverResponse.error) {
                // this.updateArray(response);
            }
            return serverResponse;
        }
    }
    async savegalleries(galleries) {
        if (!galleries._id) {
            let serverResponse = await this.data.post(galleries, this.GALLERIES_SERVICE);
            if (!serverResponse.error) {
                this.galleriesArray.push(serverResponse);
            }
            return serverResponse;
         } else {
            let serverResponse = await this.data.put(galleries, this.GALLERIES_SERVICE + "/" + galleries._id);
            if (!serverResponse.error) {
                // this.updateArray(response);
            }
            return serverResponse;
        }
    }

    async deletegalleries(id) {
        let response = await this.data.delete(this.GALLERIES_SERVICE + "/" + id);
        if (!response.error) {
            for (let i = 0; i < this.galleriesArray.length; i++) {
                if (this.galleriesArray[i]._id === id) {
                    this.galleriesArray.splice(i, 1);
                }
            }
        }
    }

    async deletemypics(id) {
        let response = await this.data.delete(this.MYPICS_SERVICE + "/" + id);
        if (!response.error) {
            for (let i = 0; i < this.mypicsArray.length; i++) {
                if (this.mypicsArray[i]._id === id) {
                    this.mypicsArray.splice(i, 1);
                }
            }
        }
    }

    async uploadFile(files, userId, mypicsId) {
        let formData = new FormData();
        files.forEach((item, index) => {
            formData.append("file" + index, item);
        });

        let response = await this.data.uploadFiles(formData, this.MYPICS_SERVICE + "/upload/" + userId + "/" + mypicsId);
        return response;
    }


}

