import { DBConnect } from '../../../../src/database/configuration';
import  { Organization }  from '../../../../src/schema/organization';
import { IOrganization } from '../../../../src/interfaces/organization';
import { ORGANIZATION } from '../../../utils/variable';

describe('Organization model', () => {
  beforeAll(async () => {
    DBConnect('test');
  });

  it('Should throw validation errors', () => {
    const organization = new Organization();
    expect(organization.validate).toThrow();
  });

  it('Should save a organization', async () => {
    const organization: IOrganization = new Organization(ORGANIZATION);
    const spy = jest.spyOn(organization, 'save');
    organization.save();

    expect(spy).toHaveBeenCalled();
    expect(organization).toMatchObject({
      name: expect.any(String)
    });
    
    expect(organization.name).toBe(ORGANIZATION.name);
  });
});