# NestJS AWS v4

[![npm version](https://img.shields.io/npm/v/nestjs-aws-v4.svg?style=flat-square)](https://www.npmjs.com/package/nestjs-aws-v4)

A [NestJS](https://nestjs.com/) http client library with automatic AWS v4 request signing. This is useful for, among other things, IAM authorization in AWS API Gateway.

# Installation

```bash
npm install --save nestjs-aws-v4
```

# Usage

## Module

By default, requests are signed with IAM credentials and region from environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`). These variables are automatically provided in most AWS code execution environments, like Lambda.

Simply importing the module will use these default settings.

```typescript
import { Module } from '@nestjs/common';
import { AwsV4HttpModule } from 'nestjs-aws-v4';

@Module({
  imports: [AwsV4HttpModule],
})
export class AppModule {}
```

### Configuration

`AwsV4HttpModule` has the same configuration options as `HttpModule`, as well as additional parameters to override credentials and control the signing process.

**Note:** When using with an API Gateway url (i.e. `https://{api_gw_id}.execute-api.us-east-1.amazonaws.com/{stage}`), the service will automatically be inferred as **execute-api**. If you are using an API Gateway custom domain, you must specify `{ service: 'execute-api' }`.

#### Register

```typescript
import { Module } from '@nestjs/common';
import { AwsV4HttpModule } from 'nestjs-aws-v4';

@Module({
  imports: [
    AwsV4HttpModule.register({
      region: 'us-east-1',
      service: 'execute-api'
      credentials: {
        accessKeyId: '...',
        secretAccessKey: '...',
      },
    }),
  ],
})
export class AppModule {}
```

#### RegisterAsync

Sometimes, it may be necessary to use a factory to build your configuration. For instance, you may need to inject a configuration service. This can be done with the `registerAsync` method.

```typescript
@Module({
  imports: [
    AwsV4HttpModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (config: ConfigService) => ({
        region: await config.get('REGION'),
        credentials: {
          accessKeyId: await config.get('ACCESS_KEY_ID'),
          secretAccessKey: await config.get('SECRET_ACCESS_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## AwsV4HttpService

`AwsV4HttpService` works just like the build-in `HttpService`, except all requests will automatically be signed with AWS Signature Version 4.

```typescript
import { Injectable } from '@nestjs/common';
import { AwsV4HttpService } from 'nestjs-aws-v4';

@Injectable()
export class AppService {
  constructor(private readonly http: AwsV4HttpService) {
  }
  getHello() {
    return this.http.get(...);
  }
}
```
