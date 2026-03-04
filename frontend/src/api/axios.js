import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

const api = axios.create({
  // baseURL: BASE_URL || 'http://10.0.2.2:5000', // For Android emulator
  baseURL: BASE_URL || 'http://192.168.29.2:5000', // For Physical Device
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
