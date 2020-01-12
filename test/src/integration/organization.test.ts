import { ApiGateway } from '../../utils/apigateway';
import App from '../../../src/app';
import { createServer, proxy } from 'aws-serverless-express';
import * as mongoose from 'mongoose';
import { USER, COMMENT, ORGANIZATION }  from '../../utils/variable'
let userId: string;
let organizationId: string;
const server = createServer(App);
const lambdaFunction = {
  handler: (event, context, resolutionMode = null, callback=null, _server = null) => proxy(_server || server, event, context, resolutionMode, callback)
}

const clone = (json) => {
  return JSON.parse(JSON.stringify(json))
}

const makeEvent = (eventOverrides) => {
  const baseEvent = clone(ApiGateway)
  const headers = Object.assign({}, baseEvent.headers, eventOverrides.headers)
  const root = Object.assign({}, baseEvent, eventOverrides)
  root.headers = headers
  return root
}

const makeResponse = (response) => {
  const baseResponse = {
    'body': '',
    'isBase64Encoded': false,
    'statusCode': 200
  }
  const baseHeaders = {
    'access-control-allow-origin': '*',
    'connection': 'close',
    'content-type': 'application/json; charset=utf-8',
    'x-powered-by': 'Express'
  }
  const headers = Object.assign({}, baseHeaders, response.headers)
  const finalResponse = Object.assign({}, baseResponse, response)
  finalResponse.headers = headers
  return finalResponse
}



describe('Tntegration testing for user', () => {

  afterAll(async () => {
    mongoose.connection.db.dropDatabase();
    mongoose.disconnect();
    server.close()
  });

  beforeAll(async (done) => {
    const postBody = JSON.stringify(USER);
    const succeed = response => {
      const result = JSON.parse(response.body);
      userId = result.data._id;
      done();
    };

    lambdaFunction.handler(makeEvent({
      path: '/users',
      httpMethod: 'POST',
      body: `${postBody}`
    }), {
      succeed
    });
  })

  test('RETURN 404', async (done) => {
    const succeed = response => {
      expect(response.statusCode).toEqual(404);
    
      makeResponse({
        'body': response.body,
        'headers': {
          'content-length': '46',
          'etag': 'W/"2e-Lu6qxFOQSPFulDAGUFiiK6QgREo"'
        }
      })
      done();
    }

    lambdaFunction.handler(makeEvent({
      path: '/orgg',
      httpMethod: 'GET'
    }), {
      succeed
    })

  });

  test('GET ORGANIZATIONS', async (done) => {
    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    }

    lambdaFunction.handler(makeEvent({
      path: '/organizations',
      httpMethod: 'GET'
    }), {
      succeed
    })
  });

  test('CREATE ORGANIZATION', (done) => {
    expect(userId.length).toBeGreaterThan(0);

    const overRideWithActualData = {
      ...ORGANIZATION, 
      owner: userId
    };

    const postBody = JSON.stringify(overRideWithActualData);

    const succeed = response => {
      const result = JSON.parse(response.body);
      organizationId = result.data._id;

      expect(response.statusCode).toEqual(200);
      done();
    }

    lambdaFunction.handler(makeEvent({
      path: '/organizations',
      httpMethod: 'POST',
      body: `${postBody}`
    }), {
      succeed
    })
  });

  test('JOIN ORGANIZATION', (done) => {
    expect(userId.length).toBeGreaterThan(0);
    expect(organizationId.length).toBeGreaterThan(0);

    const overRideWithActualData = {
      _id: userId
    };

    const postBody = JSON.stringify(overRideWithActualData);

    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    }

    lambdaFunction.handler(makeEvent({
      path: `/organization/join/${organizationId}`,
      httpMethod: 'POST',
      body: `${postBody}`
    }), {
      succeed
    })
  });

  test('JOIN ORGANIZATION', (done) => {
    expect(userId.length).toBeGreaterThan(0);
    expect(organizationId.length).toBeGreaterThan(0);

    const overRideWithActualData = {
      _id: userId
    };

    const postBody = JSON.stringify(overRideWithActualData);

    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    }

    lambdaFunction.handler(makeEvent({
      path: `/organization/join/${organizationId}`,
      httpMethod: 'POST',
      body: `${postBody}`
    }), {
      succeed
    })
  });

  test('GET COMMENTS', (done) => {
    expect(userId.length).toBeGreaterThan(0);
    expect(organizationId.length).toBeGreaterThan(0);

    const overRideWithActualData = {
      _id: userId
    };

    const postBody = JSON.stringify(overRideWithActualData);

    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    }

    lambdaFunction.handler(makeEvent({
      path: `/organization/${organizationId}/comments`,
      httpMethod: 'GET',
      body: `${postBody}`
    }), {
      succeed
    })
  })

  test('GET USERS', (done) => {
    expect(userId.length).toBeGreaterThan(0);
    expect(organizationId.length).toBeGreaterThan(0);

    const overRideWithActualData = {
      _id: userId
    };

    const postBody = JSON.stringify(overRideWithActualData);

    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    }

    lambdaFunction.handler(makeEvent({
      path: `/organization/${organizationId}/users`,
      httpMethod: 'GET',
      body: `${postBody}`
    }), {
      succeed
    })
  })
  
})