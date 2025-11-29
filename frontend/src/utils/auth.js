// src/utils/auth.js
export const getUserRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.role || null;
  } catch {
    return null;
  }
};

export const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null;
};
