import Cookies from "js-cookie";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { clearUser } from "../../api-redux/donorRedux/donorLoginSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    const token = Cookies.get("donorToken");
    if (!token) return;

    try {
      // Call backend logout API
      await api.post(
        "/DonorProfile/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Clear cookie and Redux state
      Cookies.remove("donorToken");
      dispatch(clearUser());
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { logout };
};
