import { ApiGateway } from '../utils/apigateway';
import App from '../../src/app';
import { createServer, proxy } from 'aws-serverless-express';
import * as mongoose from 'mongoose';
import { USER }  from '../utils/variable'

const server = createServer(App);
const lambdaFunction = {
  handler: (event, context, resolutionMode = null, callback=null, _server = null) => proxy(_server || server, event, context, resolutionMode, callback)
}

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

function makeEvent (eventOverrides) {
  const baseEvent = clone(ApiGateway)
  const headers = Object.assign({}, baseEvent.headers, eventOverrides.headers)
  const root = Object.assign({}, baseEvent, eventOverrides)
  root.headers = headers
  return root
}

function expectedRootResponse () {
  return makeResponse({
    'headers': {
      'content-length': '3747',
      'content-type': 'text/html; charset=utf-8',
      'etag': 'W/"ea3-WawLnWdlaCO/ODv9DBVcX0ZTchw"'
    }
  })
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
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    await server.close()
  });

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
      path: '/users22',
      httpMethod: 'GET'
    }), {
      succeed
    })

  });

  test('GET USERS', async (done) => {
    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    }

    lambdaFunction.handler(makeEvent({
      path: '/users',
      httpMethod: 'GET'
    }), {
      succeed
    })
  });

  test('CREATE USER', (done) => {
    const postBody = JSON.stringify(USER);
    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    }

    lambdaFunction.handler(makeEvent({
      path: '/users',
      httpMethod: 'POST',
      body: `${postBody}`
    }), {
      succeed
    })
  })

})