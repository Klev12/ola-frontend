import axios from "../interceptors/axios-interceptor";

export default class GlobalFileService {
  url?: string = "";
  name?: string = "files";
  deleteUrl?: string = "";

  constructor({
    url,
    name,
    deleteUrl,
  }: {
    url?: string;
    name?: string;
    deleteUrl?: string;
  }) {
    this.url = url;
    this.name = name;
    this.deleteUrl = deleteUrl;
  }

  upload(files: File[]) {
    const formData = new FormData();
    for (const file of files) {
      formData.append(`${this.name}`, file);
    }

    return axios.post(`${this.url}`, formData);
  }

  delete(identifier: string) {
    return axios.delete(`${this.deleteUrl}/${identifier}`);
  }
}
