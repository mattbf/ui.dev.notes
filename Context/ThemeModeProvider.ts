import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ThemeModeInterface {
  mode: "dark" | "light";
  se;
  tMode: Dispatch<SetStateAction<"dark" | "light">>;
}
const ThemeModeContext = createContext({} as ThemeModeInterface);

export const useThemeMode = () => {
  const themeMode = useContext(ThemeModeContext);
  if (!themeMode?.mode) throw new Error("The theme mode context was accessed outside of the provider tree");
  return themeMode;
};

export const ThemeModeProvider: FC = ({ children }) => {
  const [mode, setMode] = useState<"dark" | "light">("light");

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return <ThemeModeContext.Provider value={contextValue}>{children}</ThemeModeContext.Provider>;
};
