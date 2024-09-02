import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";

class PdfService {
  create(html: string) {
    return axios
      .post(
        `${ENV.BACKEND_ROUTE}/pdf`,
        { html },
        { responseType: "arraybuffer" }
      )
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        return blob;
      });
  }
}

const pdfService = new PdfService();

export default pdfService;
