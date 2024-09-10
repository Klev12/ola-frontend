import axios from "../interceptors/axios-interceptor";

export default class GlobalFileService {
  url?: string = "";
  name?: string = "files";
  deleteUrl?: string = "";
  payload?: object = {};

  constructor({
    url,
    name,
    deleteUrl,
    payload,
  }: {
    url?: string;
    name?: string;
    deleteUrl?: string;
    payload?: object;
  }) {
    this.url = url;
    this.name = name;
    this.deleteUrl = deleteUrl;
    this.payload = payload;
  }

  upload(files: File[]) {
    const formData = new FormData();
    for (const file of files) {
      formData.append(`${this.name}`, file);
    }

    for (const [key, value] of Object.entries(this.payload || {})) {
      formData.append(`${key}`, value);
    }

    return axios.post(`${this.url}`, formData);
  }

  delete(identifier: string) {
    console.log(this.payload);
    return axios.delete(`${this.deleteUrl}/${identifier}`, {
      data: this.payload,
    });
  }
}
