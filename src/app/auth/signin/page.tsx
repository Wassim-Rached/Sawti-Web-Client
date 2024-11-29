"use client";

import SignInCard from "@/components/SignInCard";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign In
        </h2>

        {/* Sign In Card */}
        <SignInCard />

        {/* Redirect to Sign Up page */}
        <div className="mt-4 text-center text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <a
              href="/auth/signup"
              className="text-blue-600 hover:text-blue-700"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
