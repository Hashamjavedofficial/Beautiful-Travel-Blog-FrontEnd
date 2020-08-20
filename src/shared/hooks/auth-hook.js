import { useCallback, useEffect, useState } from "react";

let logoutTimer;

const useAuth = () => {
  const [expireTime, setExpireTime] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, previousTokenExpiration) => {
    setToken(token);
    setUserId(uid);
    const tokenExpiration =
      previousTokenExpiration ||
      new Date(new Date().getTime() + 1000 * 60 * 60);
    setExpireTime(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpiration,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setExpireTime(null);
    setUserId(false);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, storedData.expiration);
    }
  }, [login]);
  useEffect(() => {
    if (token && expireTime) {
      const remainingTime = expireTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, expireTime]);

  return { login, logout, token, userId };
};
export default useAuth;
