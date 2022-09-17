import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Private = ({children}) => {
  const isAuth =useAuth();
  return (
    isAuth? children:<Navigate to="/" />
  )
}

export default Private;