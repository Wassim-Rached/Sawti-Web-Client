"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const { account, logout } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    console.log("Logging out...");
  };

  const isActive = (path: string) => {
    return pathname === path ? "text-blue-400" : "hover:text-gray-400";
  };

  const isAuthPageActive = (path: string) => {
    if (pathname.startsWith("/auth")) {
      if (!isMounted) {
        return null;
      }
      return pathname === path ? "text-blue-400" : "hover:text-gray-400";
    }
    return "hover:text-gray-400";
  };

  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 h-16">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-full">
        <div className="text-2xl font-bold flex items-center space-x-2">
          <Link href="/" passHref>
            <span className="text-white">Sawti</span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" passHref>
            <span className={`${isActive("/")}`}>Home</span>
          </Link>
          {account ? (
            <>
              <Link href="/favorites" passHref>
                <span className={`${isActive("/favorites")}`}>Favorites</span>
              </Link>
              <Link href="/profile" passHref>
                <span className={`${isActive("/profile")}`}>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-400 text-sm flex items-center space-x-2"
              >
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" passHref>
                <span className={`${isAuthPageActive("/auth/signin")}`}>
                  Sign In
                </span>
              </Link>
              <Link href="/auth/signup" passHref>
                <span className={`${isAuthPageActive("/auth/signup")}`}>
                  Sign Up
                </span>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars4Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 text-white p-6 space-y-4">
          <Link href="/" passHref>
            <span
              className={`block text-lg font-medium ${isActive("/")}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </span>
          </Link>
          {account ? (
            <>
              <Link href="/favorites" passHref>
                <span
                  className={`block text-lg font-medium ${isActive(
                    "/favorites"
                  )}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Favorites
                </span>
              </Link>
              <Link href="/profile" passHref>
                <span
                  className={`block text-lg font-medium ${isActive(
                    "/profile"
                  )}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block text-lg font-medium hover:text-gray-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" passHref>
                <span
                  className={`block text-lg font-medium ${isAuthPageActive(
                    "/auth/signin"
                  )}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </span>
              </Link>
              <Link href="/auth/signup" passHref>
                <span
                  className={`block text-lg font-medium ${isAuthPageActive(
                    "/auth/signup"
                  )}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </span>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
