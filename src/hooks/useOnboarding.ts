import { convertToCamel } from "@/functions/convertToCamel";

export const useOnboarding = () => {
  const postRegistration = async (requestBody: any) => {
    const response = await fetch("/api/admin/onboarding", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      return {
        error: "tenant registration is failed",
      };
    }
    const body = await response.json();
    const converted = convertToCamel(body);

    return {
      payload: converted,
    };
  };

  return {
    postRegistration,
  };
};
