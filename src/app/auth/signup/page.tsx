"use client";

import SignUpCard from "@/components/SignUpCard";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h2>

        {/* Sign Up Card */}
        <SignUpCard />

        {/* Redirect to Sign In page */}
        <div className="mt-4 text-center text-sm">
          <p>
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-700"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
