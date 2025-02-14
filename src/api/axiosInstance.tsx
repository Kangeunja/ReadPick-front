import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

// 기본 api url 설정
const API_BASE_URL = "http://localhost:8080";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
  withCredentials: true, // Refresh Token을 httpOnly 쿠키로 저장할 경우
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const excludedUrls = ["/auth/tokens"];
    if (excludedUrls.some((url) => config.url?.includes(url))) {
      return config;
    }

    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 리프레시 토큰 함수
const refreshToken = async () => {
  const refreshToken = getCookie("refreshToken");

  if (!refreshToken) {
    throw new Error("리프레시 토큰이 없습니다.");
  }

  try {
    const response = await axiosInstance.post(
      "/auth/tokens",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // 새로운 토큰 저장
    setCookie("accessToken", accessToken);
    setCookie("refreshToken", newRefreshToken);

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    if (typeof window !== "undefined") {
      alert("다시 로그인해주세요.");
    }
    throw error;
  }
};

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status === 401) {
      try {
        const accessToken = await refreshToken();

        // 새로운 엑세스 토큰으로 헤더업데이트
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
