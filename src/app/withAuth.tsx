import { useAuth } from "@/context/AuthContext";
import { useEffect, ComponentType } from "react";
import { usePathname, useRouter } from "next/navigation";

interface AuthProps {
  [key: string]: unknown;
}

export function withAuth<T extends AuthProps>(Component: ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { isLoggedIn, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
      if (loading) {
        return;
      }
      if (!isLoggedIn) {
        console.log("Redirecting to sign in page");
        router.push(`/auth/signin?redirect=${pathname}`);
      }
    }, [isLoggedIn, loading, pathname, router]);

    if (loading || !isLoggedIn) {
      return null;
    }

    return <Component {...props} />;
  };
}
