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

export function getAllContracts({ type }: { type?: ContractType }) {
  let api = `${ENV.BACKEND_ROUTE}/contracts`;
  if (type) {
    api += `?type=${type}`;
  }

  return axios.get<{ contracts: ContractGetDto[] }>(api);
}

export function patchContract(contract: ContractPatchDto) {
  return axios.patch(`${ENV.BACKEND_ROUTE}/contracts`, contract);
}

export class ContractService {
  findById({ contractId }: { contractId: number }) {
    return axios.get<{ contract: ContractGetDto }>(
      `${ENV.BACKEND_ROUTE}/contracts/${contractId}`
    );
  }
}

const contractService = new ContractService();

export default contractService;
