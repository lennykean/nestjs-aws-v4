import { HttpService, Inject, Injectable, Optional } from '@nestjs/common';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/common/http/http.constants';
import { aws4Interceptor } from 'aws4-axios/dist/interceptor';
import { AxiosRequestConfig, AxiosInstance } from 'axios';

import { AwsV4HttpModuleOptions } from './aws-v4-http.module';
import { AWS_V4_HTTP_MODULE_OPTIONS } from './constants';

@Injectable()
export class AwsV4HttpService extends HttpService {
  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN) axiosInstance: AxiosInstance,
    @Optional()
    @Inject(AWS_V4_HTTP_MODULE_OPTIONS)
    config: AwsV4HttpModuleOptions,
  ) {
    super(axiosInstance);
    axiosInstance.interceptors.request.use(
      aws4Interceptor(config, config?.credentials),
    );
  }
  request<T = any>(config: AxiosRequestConfig) {
    return super.request<T>(config);
  }
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return super.get<T>(url, config);
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return super.delete<T>(url, config);
  }
  head<T = any>(url: string, config?: AxiosRequestConfig) {
    return super.head<T>(url, config);
  }
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return super.post<T>(url, data, config);
  }
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return super.put<T>(url, data, config);
  }
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return super.patch<T>(url, data, config);
  }
}
