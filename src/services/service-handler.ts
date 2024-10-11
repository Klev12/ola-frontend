import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { PaginationOptions } from "../models/pagination-options";
import { ServiceGetDto, ServicePostDto } from "../models/service";

export class ServiceHandler {
  findAll({
    options = { limit: 10, page: 1 },
  }: {
    options?: PaginationOptions;
  }) {
    return axios.get<{ count: number; services: ServiceGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/services?page=${options.page}&&limit=${options.limit}`
    );
  }

  findById({ serviceId }: { serviceId: number }) {
    return axios.get<{ service: ServiceGetDto }>(
      `${ENV.BACKEND_ROUTE}/services/${serviceId}`
    );
  }

  save(service: ServicePostDto) {
    return axios.post(`${ENV.BACKEND_ROUTE}/services`, service);
  }
}

const serviceHandler = new ServiceHandler();

export default serviceHandler;
