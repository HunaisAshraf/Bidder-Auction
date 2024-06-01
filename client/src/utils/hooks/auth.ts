import { login, logout } from "@/lib/store/features/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("auth");
    if (user) {
      dispatch(login(JSON.parse(user)));
      // router.push("/");
    } else {
      dispatch(logout());
    }
  }, []);

  const saveAuthData = (data: any) => {
    localStorage.setItem("auth", JSON.stringify(data));
    dispatch(login(data));
    // router.push("/");
  };
  return { saveAuthData };
};

export default useAuth;
