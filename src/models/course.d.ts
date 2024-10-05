export interface CourseGetDto {
  id: number;
  title: string;
  description: string;
  html: string;
  price: string;
  contractId: number;
}

export interface CoursePostDto {
  title: string;
  description: string;
  html: string;
  price: string;
}

export interface CoursePatchDto extends Partial<CoursePostDto> {
  courseId: number;
}
