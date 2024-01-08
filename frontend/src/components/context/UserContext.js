import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  const setUser = (newUsername) => {
    setUsername(newUsername);
  };

  return (
    <UserContext.Provider value={{username, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const setUser = (newUsername) => {
  const context = useContext(UserContext);
    if (!context) {
        throw new Error('setUser must be used within a UserProvider');
    }
    context.setUser(newUsername);
};

export default UserContext;