import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import {
  CollaboratorLinkDataGetDto,
  CollaboratorLinkGetDto,
} from "../models/collaborator-link";

class CollaboratorLinkService {
  findAll() {
    return axios.get<{ collaboratorLinks: CollaboratorLinkGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/collaborator-links`
    );
  }

  create() {
    return axios.post(`${ENV.BACKEND_ROUTE}/collaborator-links`);
  }

  invalidateLink(id: number) {
    return axios.delete(
      `${ENV.BACKEND_ROUTE}/collaborator-links/invalidate/${id}`
    );
  }

  retrieveData(token: string) {
    return axios.get<CollaboratorLinkDataGetDto>(
      `${ENV.BACKEND_ROUTE}/collaborator-links/data/${token}`
    );
  }
}

const collaboratorLinkService = new CollaboratorLinkService();

export default collaboratorLinkService;
