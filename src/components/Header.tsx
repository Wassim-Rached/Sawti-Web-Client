"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Account } from "@/types"; // Make sure to import your Account type if necessary
import { usePathname } from "next/navigation"; // Import the usePathname hook to get the current pathname

interface HeaderProps {
  user: Account | null;
}

const Header = ({ user }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Use the pathname to get the current pathname
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  // Check if the link is active
  const isActive = (path: string) => {
    return pathname === path ? "text-blue-400" : "hover:text-gray-400"; // Add active styles for the current link
  };

  // Special check for /auth paths to distinguish between signin and signup
  const isAuthPageActive = (path: string) => {
    if (pathname.startsWith("/auth")) {
      if (!isMounted) {
        return null;
      }
      return pathname === path ? "text-blue-400" : "hover:text-gray-400"; // Add active styles for the current link
    }
    return "hover:text-gray-400"; // Default hover style
  };

  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" passHref>
            <span className="text-white">Sawti</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" passHref>
            <span className={`${isActive("/")}`}>Home</span>
          </Link>
          <Link href="/favorites" passHref>
            <span className={`${isActive("/favorites")}`}>Favorites</span>
          </Link>
          {user ? (
            <>
              <Link href="/profile" passHref>
                <span className={`${isActive("/profile")}`}>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-400 text-sm"
              >
                Logout
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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 text-white p-6 space-y-4">
            <Link href="/" passHref>
              <span className={`block ${isActive("/")}`}>Home</span>
            </Link>
            <Link href="/favorites" passHref>
              <span className={`block ${isActive("/favorites")}`}>
                Favorites
              </span>
            </Link>
            {user ? (
              <>
                <Link href="/profile" passHref>
                  <span className={`block ${isActive("/profile")}`}>
                    Profile
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block hover:text-gray-400 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" passHref>
                  <span className={`block ${isAuthPageActive("/auth/signin")}`}>
                    Sign In
                  </span>
                </Link>
                <Link href="/auth/signup" passHref>
                  <span className={`block ${isAuthPageActive("/auth/signup")}`}>
                    Sign Up
                  </span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
