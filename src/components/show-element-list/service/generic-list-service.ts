import axios from "../../../interceptors/axios-interceptor";
import { PaginationOptions } from "../../../models/pagination-options";
import { ParamsUrl } from "../ShowElementList";

export class GenericListService {
  findAll({
    options,
    month,
    year,
    url,
    params,
  }: {
    options: PaginationOptions;
    month?: number;
    year?: number;
    url: string;
    params?: ParamsUrl;
  }) {
    let api = `${url}?page=${options.page}&&limit=${options.limit}`;

    if (month) {
      api += `&&month=${month}`;
    }

    if (year) {
      api += `&&year=${year}`;
    }
    if (params?.ownership) {
      api += `&&ownership=${params.ownership}`;
    }

    for (const [key, value] of Object.entries(params?.values ?? {})) {
      api += `${key}=${value}`;
    }

    return axios.get(api);
  }
}

const genericListService = new GenericListService();

export default genericListService;
