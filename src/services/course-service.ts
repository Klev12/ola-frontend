import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { CourseGetDto, CoursePatchDto, CoursePostDto } from "../models/course";

export class CourseService {
  findAll({
    page = 1,
    limit = 10,
    hash,
  }: {
    page?: number;
    limit?: number;
    hash?: string;
  }) {
    return axios.get<{ count: number; courses: CourseGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/courses${
        hash ? `/${hash}` : ""
      }?page=${page}&&limit=${limit}`
    );
  }

  save(data: CoursePostDto) {
    return axios.post(`${ENV.BACKEND_ROUTE}/courses`, data);
  }

  patch(data: CoursePatchDto) {
    return axios.patch(`${ENV.BACKEND_ROUTE}/courses`, data);
  }

  delete({ courseId }: { courseId: number }) {
    return axios.delete(`${ENV.BACKEND_ROUTE}/courses/${courseId}`);
  }
}

const courseService = new CourseService();

export default courseService;
