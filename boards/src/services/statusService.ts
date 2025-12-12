import { StatusResponse } from "../interfaces/statusResponse";

export const checkStatus = async (): Promise<StatusResponse> => {
  const token = sessionStorage.getItem("authToken");

  const response = await fetch("http://localhost:8080/auth/checkStatus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    console.error("Failed to check status:", response.statusText);
  }

  return response.json() as Promise<StatusResponse>;
};
