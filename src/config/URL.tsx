const BASE_URL = {
  DEV: "http://127.0.0.1:8787",
  PROD: "https://tht-backend.rajerkulkarni01.workers.dev",
};

const BASE_SOCKET_URL = {
  DEV: "ws://127.0.0.1:8787",
  PROD: "wss://tht-backend.rajerkulkarni01.workers.dev",
};

export const USE_BASE_URL = BASE_URL.DEV;
export const USE_BASE_SOCKET_URL = BASE_SOCKET_URL.DEV;
