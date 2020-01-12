import {BaseController} from './BaseController';
import { Organization } from '../schema/organization';
const ENV = (process.env.NODE_ENV) || 'local';

export class OrganizationController extends BaseController{
  constructor() {
    super(ENV, Organization);
  }

  public async index(request, response){
    try {
      const requestData = {
        body: {},
        populate: [
          { 'path': 'comments', match: {deleted: false} },
          { 'path': 'members', match: {deleted: false} },
          { 'path': 'owner' }
        ]
      } 
      const data = await this.getData(requestData);
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

  public async getUserByOrganizationId(request, response){
    try {
      const { organizationId } = request.params;  

      const requestData = {
        body: {
          _id: organizationId
        },
        populate: [
          { 'path': 'members', match: {deleted: false} },
        ],
        select: 'members'
      } 

      const data = await this.showData(requestData);
      this.sendResponse(response, data);
    } catch (error) {
      this.catchErrors(response, error);
    }
  }
  
  public async getCommentsByOrganizationId(request, response){
    try {
      const { organizationId } = request.params;  

      const requestData = {
        body: {
          _id: organizationId
        },
        populate: [
          { 'path': 'comments', match: {deleted: false} }
        ],
        select: 'comments'
      } 

      const data = await this.showData(requestData);
      this.sendResponse(response, data);
    } catch (error) {
      this.catchErrors(response, error);
    }
  }

  public async join(request, response){
    try {
      const { _id } = request.body;
      const { params } = request;
      const postData = {
        params,
        body : { $push: { members: { _id } }}
      }
      
      const data = await this.updateData(postData);
      this.sendResponse(response, data);
    } catch (error) {
      this.catchErrors(response, error);
    }
  }

  private sendResponse(response, data) {
    response.send({
      'success': true,
      data
    });
  }
  
  private catchErrors(response, error) {
    response.status(422).send({
      success: false,
      errors: error.message,
    });
  }

}

  