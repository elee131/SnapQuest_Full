import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
  userUID: string | null;
  setUserUID: (uid: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userUID, setUserUID] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userUID, setUserUID }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
