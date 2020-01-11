import {BaseController} from './BaseController';
import { Organization } from '../schema/organization';
const ENV = (process.env.NODE_ENV) || 'local';

export class OrganizationController extends BaseController{
  constructor() {
    super(ENV, Organization);
  }

  public async index(request, response){
    try {
      const data = await this.getData();
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

  