import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UiProviderType {
  children: ReactNode;
}

interface UiProps {
  taskModalOpen: boolean;
  setTaskModalOpen: (value: boolean) => void;
}

//Context
const UiContext = createContext<UiProps>({} as UiProps);

//Provider
export const UiProvider = ({ children }: UiProviderType) => {
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <UiContext.Provider
      value={{
        taskModalOpen,
        setTaskModalOpen,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export function useUI() {
  const context = useContext(UiContext);

  return context;
}