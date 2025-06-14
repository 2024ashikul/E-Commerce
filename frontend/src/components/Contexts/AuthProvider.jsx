
import { useState ,useEffect} from "react";
import { AuthContext } from "./AuthContext";



export const AuthProvider = ({children}) => {
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [username , setUserName] = useState('');
    useEffect(() => {
      const token = localStorage.getItem('token'); 
      if (token) {
      setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      const username = localStorage.getItem('username');
      if(username){
        setUserName(username)
      }
    }, []);
    return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username , setUserName }}>
      {children}
    </AuthContext.Provider>
  );
}