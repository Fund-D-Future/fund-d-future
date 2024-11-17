import { create } from "zustand"

type NotificationType = "success" | "error" | "info" | "warning"
interface Notification {
  id: string
  type: NotificationType
  message: string
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (type: NotificationType, message: string) => void
  removeNotification: (id: string) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (type, message) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now().toString(),
          type,
          message,
        },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),
}))
