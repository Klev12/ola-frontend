import { ENV } from "../consts/const";
import { PaginationOptions } from "../core/types/pagination-options";
import axios from "../interceptors/axios-interceptor";
import { ServiceOptionGetDto, ServiceOptionPostDto } from "../models/service";

export class ServiceOptionHandler {
  findAll({
    serviceId,
    options = { limit: 10, page: 1 },
  }: {
    serviceId?: number;
    options?: PaginationOptions;
  }) {
    return axios.get<{ count: number; serviceOptions: ServiceOptionGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/service-options?page=${options.page}&&limit=${options.limit}&&serviceId=${serviceId}`
    );
  }

  save(serviceOption: ServiceOptionPostDto) {
    return axios.post(`${ENV.BACKEND_ROUTE}/service-options`, serviceOption);
  }
}

const serviceOptionHandler = new ServiceOptionHandler();

export default serviceOptionHandler;
