import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import {
  ContractGetDto,
  ContractPatchDto,
  ContractType,
} from "../models/contract";

export function getTermsAndConditions() {
  return axios
    .get<{ contracts: ContractGetDto[] }>(`${ENV.BACKEND_ROUTE}/contracts`)
    .then((res) =>
      res.data.contracts.filter(
        (contract) => contract.type === ContractType.graphicDesign
      )
    );
}

export function getAllContracts() {
  return axios.get<{ contracts: ContractGetDto[] }>(
    `${ENV.BACKEND_ROUTE}/contracts`
  );
}

export function patchContract(contract: ContractPatchDto) {
  return axios.patch(`${ENV.BACKEND_ROUTE}/contracts`, contract);
}
