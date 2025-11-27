import { useNavigate } from "react-router-dom";

// Custom hook for API request with global error handling
export function useProtectedApi() {
  const navigate = useNavigate();

  const fetchWithAuthRedirect = async (...args) => {
    const response = await fetch(...args);
    if (response.status === 404) {
      // Show message or set error state globally as needed
      alert("404 Error: Resource not found. Redirecting to auth page.");
      navigate("/auth", { replace: true });
      throw new Error("404 Not Found"); // Optional: reject promise
    }
    return response;
  };

  return { fetchWithAuthRedirect };
}
