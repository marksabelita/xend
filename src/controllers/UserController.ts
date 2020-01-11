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