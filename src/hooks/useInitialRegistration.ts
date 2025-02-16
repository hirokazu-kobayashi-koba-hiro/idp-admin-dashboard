export const useInitialRegistration = () => {
  const postInitialRegistration = async (requestBody: any) => {
    const response = await fetch("/api/admin/initial-registration", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      return {
        error: "tenant registration is failed",
      };
    }

    return {
      payload: "ok",
    };
  };

  return {
    postInitialRegistration,
  };
};
