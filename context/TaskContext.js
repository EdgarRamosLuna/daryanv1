import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TasksProvider = ({ children }) => {
  const [first, setFirst] = useState(0);

  
  return (
    <TaskContext.Provider
      value={{
        first,
        setFirst
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
