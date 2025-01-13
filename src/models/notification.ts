export interface NotificationGetDto {
  id: string | number;
  title: string;
  description: string;
  type: NotificationType;
  metadata: NotificationMetadata;
  seen: boolean;
  createdAt: string;
}

export interface NotificationMetadata {
  userId?: string | number;
  formId?: string | number;
  transactionToken?: string;
}

export enum NotificationType {
  newUser = "new-user",
  verifyUser = "verify-user",
  newTransaction = "new-transaction",
  transactionCompleted = "transaction-completed",
  regulationSeen = "regulation-seen",
  formComplete = "form-complete",
}
