import { login } from "@/lib/store/features/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("auth");
    if (user) {
      router.push("/");
    }
  }, []);

  const saveAuthData = (data: any) => {
    localStorage.setItem("auth", JSON.stringify(data));
    dispatch(login(data));
  };
  return { saveAuthData };
};

export default useAuth;
