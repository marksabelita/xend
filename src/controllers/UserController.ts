import {BaseController} from './BaseController';
import { User } from '../schema/user';
const ENV = (process.env.NODE_ENV) || 'local';

export class UserController extends BaseController{
  constructor() {
    super(ENV, User);
  }

  public async index(request, response){
    try {
      const data = await this.getData({body: {}});
      this.sendResponse(response, data);
    } catch (error){
      this.catchErrors(response, error);
    }    
  }

  public async store(request, response){
    try {
      const data = await this.storeData(request);
      this.sendResponse(response, data);
    } catch (error){
      this.catchErrors(response, error);
    }
  }

  // public async getUsersByOrganizationId(request, response) {
  //   try {
  //     const { organizationId } = request.params;  
  //     const requestData = {
  //       body: {
  //         organizationId 
  //       }
  //     }
  //     const data = await this.getData(requestData);
  //     this.sendResponse(response, data);
  //   } catch (error) {
  //     this.catchErrors(response, error);
  //   }
  // }

  private sendResponse(response, data) {
    response.send({
      'success': true,
      data
    });
  }
  
  private catchErrors(response, validationError) {
    const errorMessages = [];
    for (var errName in validationError.errors) {
      errorMessages.push(validationError.errors[errName].message)
    }
    response.status(422).send({
      success: false,
      errors: errorMessages,
    });
  }

}

  