import { AuthProvider } from "@/context/AuthContext";
import ToastProvider from "./ToastProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <ToastProvider />
      <AuthProvider>{children}</AuthProvider>;
    </>
  );
};

export default Providers;
