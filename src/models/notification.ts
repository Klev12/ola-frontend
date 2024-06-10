export interface NotificationGetDto {
  id: string | number;
  title: string;
  description: string;
  type: NotificationType;
  metadata: NotificationMetadata;
}

export interface NotificationMetadata {
  userId?: string | number;
  formId?: string | number;
}

export enum NotificationType {
  newUser = "new-user",
  verifyUser = "verify-user",
}
