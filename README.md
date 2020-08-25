# NestJS AWS v4

A [NestJS](https://nestjs.com/) http client library with automatic AWS v4 request signing. This is useful for, among other things, IAM authorization in AWS API Gateway.

# Installation

```bash
npm install --save nestjs-aws-v4
```

# Usage

## Module

By default, requests are signed with IAM credentials from environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, etc) which are automatically provided in most AWS code execution environments, like Lambda.

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

`AwsV4HttpModule` has all the same configuration options as `HttpModule`, as well as additional parameters to override credentials and control the signing process.

```typescript
import { Module } from '@nestjs/common';
import { AwsV4HttpModule } from 'nestjs-aws-v4';

@Module({
  imports: [
    AwsV4HttpModule.register({
      credentials: {
        accessKeyId: '...',
        secretAccessKey: '...',
      },
    }),
  ],
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
});
```
