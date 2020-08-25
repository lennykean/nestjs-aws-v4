import {
  DynamicModule,
  HttpModule,
  HttpModuleOptions,
  Module,
} from '@nestjs/common';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/common/http/http.constants';
import { Credentials, InterceptorOptions } from 'aws4-axios/dist/interceptor';
import Axios from 'axios';

import { AwsV4HttpService } from './aws-v4-http.service';
import { AWS_V4_HTTP_MODULE_OPTIONS } from './constants';

export type AwsV4HttpModuleOptions = HttpModuleOptions &
  InterceptorOptions & {
    credentials: Credentials;
  };

@Module({
  imports: [HttpModule],
  providers: [
    AwsV4HttpService,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: Axios,
    },
  ],
  exports: [AwsV4HttpService],
})
export class AwsV4HttpModule {
  static register(config: AwsV4HttpModuleOptions): DynamicModule {
    return {
      module: AwsV4HttpModule,
      imports: [HttpModule],
      providers: [
        AwsV4HttpService,
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: Axios.create(config),
        },
        {
          provide: AWS_V4_HTTP_MODULE_OPTIONS,
          useValue: config,
        },
      ],
      exports: [AwsV4HttpService],
    };
  }
}
