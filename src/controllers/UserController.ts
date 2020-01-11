import {BaseController} from './BaseController';
import { User } from '../schema/user';
const ENV = (process.env.NODE_ENV) || 'local';

export class UserController extends BaseController{
  constructor() {
    super(ENV, User);
  }

  public async index(){
    try {
      return this.getData();
    } catch (error){
      console.log(error)
    }    
  }

  
}

  // private catchErrors(validationError, response) {
  //   const errorMessages = [];
  //   for (var errName in validationError.errors) {
  //     errorMessages.push(validationError.errors[errName].message)
  //   }
  //   response.status(422).send({
  //     success: false,
  //     errors: errorMessages,
  //   });
  // }

  // private sendResponse(response, data) {
  //   response.send({
  //     'success': true,
  //     'data': data,
  //   });
  // }