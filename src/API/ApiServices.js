import {API} from "./Constants"
import axios from 'axios';

export const ApiServices = {
    register(user) {
        return axios.post(API.register()
            , JSON.stringify(user),
            {
                      headers: {
                        'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
                      }
                // headers: {'Content-type': 'application/json; charset=UTF-8'}
            }
            )
    }
    ,

    signin(user) {
        return axios.post(API.signin(),
            JSON.stringify(user),
            {
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        })
    },

    addCategory(category){
        return axios.post(API.category(),
            category)
    },
    listCategories(){
        return axios.get(API.category());
    },
    deleteCategory(id){
        return axios.delete(API.category()+id);
    },

    editCategory(id,name){
        return axios.put(API.category()+id ,{label:name});
    }

}
