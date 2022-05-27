import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('usuario');
    const userInfo = JSON.parse(tokenString);
    return userInfo?.usuario
  };

  const [usuario, setUsuario] = useState(getToken());

  const saveUser = userInfo => {
    if (userInfo !== undefined){
      sessionStorage.setItem('usuario', JSON.stringify(userInfo));
      setUsuario(userInfo);
    }
  };

  return {
    setUsuario: saveUser,
    usuario
  }
}