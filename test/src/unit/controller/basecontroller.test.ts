import {BaseController} from '../../../../src/controllers/BaseController';
import  { User }  from '../../../../src/schema/user';
import { USER } from '../../../utils/variable'; 
import * as mongoose from 'mongoose';

describe('Comments model', () => {

  afterAll(() => {
    mongoose.connection.db.dropDatabase();
  })

  it('Should display list of user', async () => {
    const baseController = new BaseController('test', User);
    const userList = await baseController.getData({body: {}});

    const isResultArray = Array.isArray(userList);
    expect(isResultArray).toEqual(true);
  });

  it('Should create, show and delete a user', async () => {
    const baseController = new BaseController('test', User);
    const data = {
      body: USER
    }

    const insertUserResult = await baseController.storeData(data);
    expect(insertUserResult).toHaveProperty('_id');

    const user = {
      params:{
        id: insertUserResult._id
      },
      body: {
        followers: 3,
      }
    }

    const showUserResult = await baseController.showData(user);
    expect(showUserResult).toHaveProperty('_id');

    const updateUserResult = await baseController.updateData(user);
    expect(updateUserResult).toHaveProperty('_id');
    expect(updateUserResult.followers).toEqual(3);

    const deleteUserResult = await baseController.deleteData(user);
    expect(deleteUserResult).toHaveProperty('_id');

    const showUserResultUponDeletion = await baseController.showData(user);
    expect(showUserResultUponDeletion).toBe(null);
  })
});