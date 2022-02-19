import { createContext, ReactNode, useContext } from "react";

interface NotificationProviderPropsType {
  children: ReactNode;
}
interface contextProps {}

//context
const NotificationContext = createContext<contextProps>({} as contextProps);

//Provider
export const NotificationProvider = ({ children }: NotificationProviderPropsType) => {
  return <NotificationContext.Provider value={{}}>{children}</NotificationContext.Provider>;
};

export function useNotifications() {
  const context = useContext(NotificationContext);
}
