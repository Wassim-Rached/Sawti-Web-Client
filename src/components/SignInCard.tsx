import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Loading from "@/components/Loading";
import { loginAccount } from "@/services/accounts";
import { useSearchParams, useRouter } from "next/navigation";

const SignIn = () => {
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginAccount({ cin, password });
      login(data.accessToken);
      console.log("User logged in successfully:", data);

      const redirect = searchParams.get("redirect");
      console.log("Redirecting to:", redirect);
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Invalid CIN or password");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="cin"
          className="block text-sm font-medium text-gray-700"
        >
          CIN
        </label>
        <input
          id="cin"
          type="text"
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Sign In
      </button>
      {loading && <Loading />}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </form>
  );
};

export default SignIn;
