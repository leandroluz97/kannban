import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Notification from "../utils/notifications";

const configSuccess = { bodyClassName: "toastify__success", className: "toastify" };
const configError = { bodyClassName: "toastify__error", className: "toastify" };

interface NotificationProviderPropsType {
  children: ReactNode;
}
interface NotificationType {
  id: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  notificationTime: Date;
}

type addNotification = Pick<NotificationType, "description" | "notificationTime">;
type updateNotification = Pick<NotificationType, "isActive" | "id">;

interface contextProps {
  notifications: NotificationType[];

  getAllNotifications: () => Promise<void>;
  addNotification: ({ description, notificationTime }: addNotification) => Promise<void>;
  updateNotification: ({ id, isActive }: updateNotification) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

//context
const NotificationContext = createContext<contextProps>({} as contextProps);

//Provider
export const NotificationProvider = ({ children }: NotificationProviderPropsType) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (notifications.length > 0) {
        let outDatedNotifications = notifications.filter((notify) => notify.notificationTime <= new Date() && notify.isActive === true);

        if (outDatedNotifications.length > 0) {
          outDatedNotifications.map((notify) => updateNotification({ id: notify.id, isActive: false }));

          if (window.Notification.permission === "granted") {
            outDatedNotifications.forEach((notify) => {
              new window.Notification(`Notification for ${notify.description} its on time!`);
            });
          }
        }

        setCounter((prev) => prev + 1);
      }
    }, 1000 * 60);

    return () => clearTimeout(timer);
  }, [counter, notifications]);

  async function getAllNotifications() {
    try {
      const notification = new Notification();
      const allNotifications: NotificationType[] = await notification.getNotifications();

      setNotifications(allNotifications);
    } catch (error) {
      toast.error("Error on getting notifications.", configError);
    }
  }

  async function addNotification({ description, notificationTime }: addNotification) {
    try {
      const isActive = true;
      const notification = new Notification();
      const newNotification: NotificationType = await notification.addNotification({ description, isActive, notificationTime });

      setNotifications([...notifications, newNotification]);
    } catch (error) {
      toast.error("Error on adding new notification.", configError);
    }
  }

  async function updateNotification({ isActive, id }: updateNotification) {
    try {
      const notification = new Notification();
      await notification.updateNotification({ isActive, id });

      const allNotifications = notifications.map((notify) => {
        if (notify.id === id) {
          notify.isActive = isActive;
        }
        return notify;
      });

      console.log(allNotifications);

      setNotifications(allNotifications);
    } catch (error) {
      toast.error("Error on updating notification.", configError);
    }
  }

  async function deleteNotification(id: string) {
    try {
      const notification = new Notification();
      await notification.deleteNotification(id);

      const allNotifications = notifications.filter((notify) => notify.id !== id);

      setNotifications(allNotifications);
    } catch (error) {
      console.log(error);

      toast.error("Error on delete notification.", configError);
    }
  }

  return (
    <NotificationContext.Provider value={{ notifications, getAllNotifications, addNotification, updateNotification, deleteNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotifications() {
  const context = useContext(NotificationContext);
  return context;
}
