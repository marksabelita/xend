import { Model } from 'mongoose';
import { DBConnect } from '../database/configuration';

export class BaseController {

  protected schema: Model<any>;
  protected ENV: string;

  constructor(env, schema) {
    this.schema = schema;
    DBConnect(env);
  }

  public async getData(deleted = false) {
    return this.schema.find({deleted});
  }

  public async showData(request, deleted = false) {
    return new Promise((resolve, reject) => {
      const { id } = request.params; 
      if (id) {
        this.schema.findOne({_id: id, deleted}).then(data => {
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
    return this.schema.findByIdAndUpdate(id, {deleted: true}, {new: true});
  }
}