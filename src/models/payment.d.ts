export interface PaymentGetDto {
  id?: number;
  form_id?: number;
  total: number;
  payment_date: Date;
  subscription_value: number;
  number_fees: number;
  month_value: number;
  remaining_total: number;
}
