import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/axios';

const  AuthContext   = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      setUser(user ? JSON.parse(user) : null);
      setToken(token);
      setLoading(false);
    };
    getUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setUser(res.data.user);
    await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    await AsyncStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const register = async (
    name,
    email,
    password,
    height,
    weight,
    age,
    gender,
  ) => {
    const res = await api.post('/auth/register', {
      name,
      email,
      password,
      height,
      weight,
      age,
      gender,
    });
    setUser(res.data.user);
    await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    await AsyncStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const updateProfile = async (name, email, height, weight, age, gender) => {
    const res = await api.put('/api/profile', {
      name,
      email,
      height,
      weight,
      age,
      gender,
    });
    setUser(res.data);
    await AsyncStorage.setItem('user', JSON.stringify(res.data));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, updateProfile, logout, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
}
