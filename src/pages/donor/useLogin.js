import { useDispatch, useSelector } from "react-redux";
import { loginUser, setUserFromCookie } from "../../api-redux/donorRedux/donorLoginSlice";
import { useEffect } from "react";

export const useLogin = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  // On mount, restore user from cookie if available
  useEffect(() => {
    dispatch(setUserFromCookie());
  }, [dispatch]);

  // const login = (username, password) => {
  //   dispatch(loginUser({ username, password }));
  // };

  const login = (username, password) => {
  return dispatch(loginUser({ username, password })).unwrap();
};

  return { login, user, loading, error };
};
