import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Public = ({children}) => {
  const isAuth =useAuth();
  return (
    isAuth?<Navigate to= '/inbox' /> :children
  )
}

export default Public;