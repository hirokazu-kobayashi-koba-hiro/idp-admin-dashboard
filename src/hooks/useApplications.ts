import { convertToCamel } from "@/functions/convertToCamel";
import { convertToSnake } from "@/functions/convertToSnake";

export const useApplications = () => {
  const postApplication = async (request: any) => {
    const response = await fetch("/api/admin/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      return {
        error: "Network response was not ok",
      };
    }

    const body = await response.json();
    const converted = convertToCamel(body);
    return {
      payload: converted.result,
    };
  };

  const fetchApplications = async () => {
    const response = await fetch("/api/admin/applications");
    if (!response.ok) {
      return {
        error: "Network response was not ok",
      };
    }

    const body = await response.json();
    const converted = convertToCamel(body);
    return {
      payload: converted,
    };
  };

  const fetchApplication = async (id: string) => {
    const response = await fetch(`/api/admin/applications/${id}`);
    if (!response.ok) {
      return {
        error: "Network response was not ok",
      };
    }

    const body = await response.json();
    const converted = convertToCamel(body);
    return {
      payload: converted,
    };
  };

  const putApplication = async (id: string, request: any) => {
    const convertedRequest = convertToSnake(request);

    const response = await fetch(`/api/admin/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(convertedRequest),
    });
    if (!response.ok) {
      const errorResponse = await response.json();

      return {
        error: {
          type: errorResponse.error,
          description: errorResponse.error_description,
        },
      };
    }

    const body = await response.json();
    const converted = convertToCamel(body);
    return {
      payload: converted,
    };
  };

  return {
    postApplication,
    fetchApplications,
    fetchApplication,
    putApplication,
  };
};
