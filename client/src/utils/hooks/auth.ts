import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("auth");
    if (user) {
      router.push("/");
    }
    return;
  }, []);
};

export default useAuth;
