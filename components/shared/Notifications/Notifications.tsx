"use client"

import { useNotificationStore } from "lib/stores/notification-store"
import { useEffect } from "react"

export default function Notifications() {
  const { notifications, removeNotification } = useNotificationStore()

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id)
      }, 5000)

      return () => clearTimeout(timer)
    })
  }, [notifications, removeNotification])

  return (
    <div className="fixed right-4 top-4 z-50 space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm transform rounded-lg p-4 shadow-lg transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : notification.type === "error"
              ? "bg-red-500 text-white"
              : notification.type === "warning"
              ? "bg-yellow-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <p>{notification.message}</p>
            <button onClick={() => removeNotification(notification.id)} className="ml-4 text-white hover:text-gray-200">
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
