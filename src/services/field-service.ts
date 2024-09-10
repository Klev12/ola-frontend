import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FieldPatchDto } from "../models/field";

export class FieldService {
  patch(field: FieldPatchDto) {
    return axios.patch(`${ENV.BACKEND_ROUTE}/fields`, field);
  }
}

const fieldService = new FieldService();

export default fieldService;
