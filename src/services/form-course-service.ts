import axios from "axios";
import { ENV } from "../consts/const";

export class FormCourseService {
  setCourse({
    formId,
    courseId,
    hash,
  }: {
    formId: number;
    courseId: number;
    hash?: string;
  }) {
    return axios.post(
      `${ENV.BACKEND_ROUTE}/forms/course${hash ? `/${hash}` : ""}`,
      {
        formId,
        courseId,
      }
    );
  }
}

const formCourseService = new FormCourseService();

export default formCourseService;
