export interface ResultPutDto {
  form_id: string | number;
  field_id: string | number;
  response: ResponseResult;
}
export interface ResponseResult {
  value: string;
}

export interface Result extends ResultPutDto {
  id: string | number;
}

export interface AllResultPutDto {
  id: string | number;
  results: ResultPutDto[];
}
