import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
      const user = localStorage.getItem('user');

      if (user) {
        setIsLoggedIn(true);
        console.log('User is logged in');
      }
    }, [isLoggedIn])

    const login = () => {
      setIsLoggedIn(true);
    }

    const logout = () => {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      console.log('User is logged out');
    }

    return ( 
        <AuthContext.Provider value={{isLoggedIn, logout, login}}>
            { children }
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;