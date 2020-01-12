import {BaseController} from './BaseController';
import { Comment } from '../schema/comment';
import { Organization } from '../schema/organization';
import { request } from 'http';

const ENV = (process.env.NODE_ENV) || 'local';

export class CommentController extends BaseController{
  constructor() {
    super(ENV, Comment);
  }

  public async index(request, response){
    try {
      const data = await this.getData({body: {}});
      this.sendResponse(response, data);
    } catch (error){
      this.catchErrors(response, error);
    }    
  }

  public async deleteCommentsByOrganizationId(request, response) {
    try {
      const data = await this.deleteBulk(request);
      this.sendResponse(response, data);
    } catch (error) {
      this.catchErrors(response, error);
    }
  }

  public async store(request, response){
    try {
      const { organizationId } = request.body;
      const insertCommentResult = await this.storeData(request);
      const newOrganization = new BaseController(ENV, Organization);
      const { id } = insertCommentResult;

      const organizationParams = {
        params : {
          id: organizationId
        },
        body : { $push: { comments: { _id: id } }}
      };
      
      const insertOrganizationResult = await newOrganization.updateData(organizationParams);
      this.sendResponse(response, { insertCommentResult, insertOrganizationResult });
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

  