import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UiProviderType {
  children: ReactNode;
}

interface UiProps {
  taskModalOpen: boolean;
  setTaskModalOpen: (value: boolean) => void;
  groupModalOpen: boolean;
  setGroupModalOpen: (value: boolean) => void;
  deleteProjectModalOpen: boolean;
  setDeleteProjectModalOpen: (value: boolean) => void;
  groupModalOptions: boolean;
  setGroupModalOptions: (value: boolean) => void;
  handleSetThemeLight: () => void;
  darkTheme: boolean;
  colapse: boolean;
  setColapse: (value: boolean) => void;
}

//Context
const UiContext = createContext<UiProps>({} as UiProps);

//Provider
export const UiProvider = ({ children }: UiProviderType) => {
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [groupModalOpen, setGroupModalOpen] = useState<boolean>(false);
  const [groupModalOptions, setGroupModalOptions] = useState<boolean>(false);
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState<boolean>(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [colapse, setColapse] = useState(false);

  useEffect(() => {
    //colors
    const colorDark = [
      "--white: #f4f6f8",
      "--blue: #26323e;",
      "--blue-plus: #36414b;",
      "--blue-10: #647686;",
      "--blue-50: #505f6d;",
      "--blue-50-plus: #576775;",
      "--blue-150: #798591;",
      "--blue-100: #3c4854;",
      "--blue-700: #212d38;",
      "--blue-900: #15202b;",
      "--blue-950: #0d141c;",

      "--blue-bg: #15202b;",
      "--blue-list: #15202b;",
      "--blue-card: #26323e;",
      "--blue-card-plus: #36414b;",

      "--gray-50: #ecefed;",
      "--gray-100: #c4c4c4;",
      "--gray-150: #bcbcbc;",
      "--gray-180: #a3a3a3;",
      "--gray-200: #929292;",
      "--gray-400: #49525a;",
      "--gray-500: #36414b;",
    ];
    const colorLight = [
      "--white: #000000",
      "--blue: #CDD4DB;",
      "--blue-plus: #9BA8B4;",
      "--blue-10: #99A5B0;",
      "--blue-50: #B0B8C0;",
      "--blue-50-plus: #808D98;",
      "--blue-150: #75818C;",
      "--blue-100: #DEE0E3;",
      "--blue-700: #EAEBEB;",
      "--blue-900: #F5F5F5;",
      "--blue-950: #A8AEB3;",

      "--blue-bg: #EAEBEB;",
      "--blue-list: #DEE0E3;",
      "--blue-card: #F5F5F5;",
      "--blue-card-plus: #FFFFFF;",

      "--gray-50: #101311;",
      "--gray-100: #3B3B3B;",
      "--gray-150: #5C5C5C;",
      "--gray-180: #6E6E6E;",
      "--gray-200: #6E6E6E;",
      "--gray-400: #A5AEB6;",
      "--gray-500: #B5C0CA;",
    ];

    //root css variables
    const root = document.getElementsByTagName("html")[0];
    root.style.cssText = !darkTheme ? colorDark.join(";") : colorLight.join(";");
  }, [darkTheme]);

  //handle set theme
  function handleSetThemeLight() {
    setDarkTheme(!darkTheme);
  }

  return (
    <UiContext.Provider
      value={{
        taskModalOpen,
        setTaskModalOpen,
        groupModalOpen,
        setGroupModalOpen,
        deleteProjectModalOpen,
        setDeleteProjectModalOpen,
        groupModalOptions,
        setGroupModalOptions,
        handleSetThemeLight,
        darkTheme,
        colapse,
        setColapse,
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
