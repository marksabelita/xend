import  { Comment }  from '../../../src/schema/comment';
import { IComment } from '../../../src/interfaces/comment';
import testVar from '../../utils/variable';
import { DBConnect } from '../../../src/database/configuration';
const { COMMENT } = testVar;

describe('Comments model', () => {
  beforeAll(async () => {
    DBConnect('test');
  });

  it('Should throw validation errors', () => {
    const comment = new Comment();
    expect(comment.validate).toThrow();
  });

  it('Should save a organization', async () => {
    const comment: IComment = new Comment(COMMENT);
    const spy = jest.spyOn(comment, 'save');
    comment.save();
  
    expect(spy).toHaveBeenCalled();
    expect(comment).toMatchObject({
      message: expect.any(String)
    });
  });
});