export const ApiGateway = {
  "httpMethod": "GET",
  "//body": "{\"name\": \"Sam\"}",
  "path": "/users",
  "resource": "/{proxy+}",
  "queryStringParameters": {},
  "pathParameters": {
      "proxy": "users"
  },
  "headers": {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, sdch, br",
      "Accept-Language": "en-US,en;q=0.8",
      "CloudFront-Forwarded-Proto": "https",
      "CloudFront-Is-Desktop-Viewer": "true",
      "CloudFront-Is-Mobile-Viewer": "false",
      "CloudFront-Is-SmartTV-Viewer": "false",
      "CloudFront-Is-Tablet-Viewer": "false",
      "CloudFront-Viewer-Country": "US",
      "Content-Type": "application/json",
      "Host": "xxxxxxxxxx.execute-api.us-east-1.amazonaws.com",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
      "Via": "1.1 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.cloudfront.net (CloudFront)",
      "X-Amz-Cf-Id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx_xxxxxxxxxxx_xxxx==",
      "X-Forwarded-For": "11.111.111.111, 11.111.111.111",
      "X-Forwarded-Port": "111",
      "X-Forwarded-Proto": "http"
  },
  "requestContext": {
      "accountId": "111111111111",
      "resourceId": "xxxxxx",
      "stage": "prod",
      "requestId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "identity": {
          "cognitoIdentityPoolId": "",
          "accountId": "",
          "cognitoIdentityId": "",
          "caller": "",
          "apiKey": "",
          "sourceIp": "11.111.111.111",
          "cognitoAuthenticationType": "",
          "cognitoAuthenticationProvider": "",
          "userArn": "",
          "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
          "user": ""
      },
      "resourcePath": "/{proxy+}",
      "httpMethod": "GET",
      "apiId": "xxxxxxxxxx"
  }
}