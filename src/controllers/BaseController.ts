import { Model } from 'mongoose';
import { DBConnect } from '../database/configuration';

export class BaseController {

  protected schema: Model<any>;
  protected ENV: string;

  constructor(env, schema) {
    this.schema = schema;
    DBConnect(env);
  }

  public async getData() {
    return this.schema.find();
  }

  public async showData(request) {
    return new Promise((resolve, reject) => {
      const { id } = request.params; 
      if (id) {
        this.schema.findById(id).then(data => {
          resolve(data);
        }).catch(err => reject(err));
      }
    });
  }

  public async storeData(request) {
    return this.schema.create(request.body);
  }

  public async updateData(request) {
    const { id } = request.params;
    const { body } = request;
    if (id) {
      return this.schema.findByIdAndUpdate(id, body, {new: true});
    }
  }

  public async  deleteData(request) {
    const { id } = request.params;
    return this.schema.findByIdAndRemove(id);
  }
}