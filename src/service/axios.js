"use client";
import axios from 'axios';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: '/api'
});
const AxiosProvider = ({ children }) => {
  const { token } = useSelector((state) => {
    return {
      token: state?.auth?.user?.token
    }
  })

  useLayoutEffect(() => {
    createInstance()
  }, [token])

  const createInstance = () => {
    axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        if (response?.status === 200) {
          return response;
        }
        if (!response) {
          return toast.error("Network Error")
        }
      },
      (error) => {
        if (error?.response?.status === 500 || !error?.response?.status) {
          toast.error("Network Error")
        } else if (error?.response?.status === 400) {
          toast.error(error?.response?.data?.error || error?.response?.data?.message)
        }
        return error
      }
    );
  }
  return children;
}

const API = {
  get: async (url, params) => {
    return await axiosInstance.get(url)
  },
  post: async (url, body) => {
    return await axiosInstance.post(url, body)
  },
  put: async (url, body) => {
    return await axiosInstance.put(url, body)
  }
}

export { API, AxiosProvider }