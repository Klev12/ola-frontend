import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import {
  CollaboratorLinkGetDto,
  DecodedLinkToken,
  MemberLinkType,
} from "../models/collaborator-link";

class CollaboratorLinkService {
  readonly api = {
    base: `${ENV.BACKEND_ROUTE}/member-links`,
  };

  findAll() {
    return axios.get<{ memberLinks: CollaboratorLinkGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/member-links`
    );
  }

  create({ type }: { type: MemberLinkType }) {
    return axios.post(`${ENV.BACKEND_ROUTE}/member-links`, { type });
  }

  invalidateLink(id: number) {
    return axios.delete(`${ENV.BACKEND_ROUTE}/member-links/invalidate/${id}`);
  }

  retrieveData(token: string) {
    return axios.get<{ decodedToken: DecodedLinkToken }>(
      `${ENV.BACKEND_ROUTE}/member-links/data/${token}`
    );
  }
}

const collaboratorLinkService = new CollaboratorLinkService();

export default collaboratorLinkService;
