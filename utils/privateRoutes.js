import { useRouter } from "next/router";
import { getStorage } from "./storage";

const PrivateRoutes = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const accessToken = getStorage("active_masuk");

      if (!accessToken) {
        router.replace("/login");
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default PrivateRoutes;
