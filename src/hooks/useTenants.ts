import { convertToCamel } from "@/functions/convertToCamel";

export const useTenants = () => {
  const postTenant = async (requestBody: any) => {
    const response = await fetch("/api/admin/tenants", {
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

  const fetchTenants = async () => {
    const response = await fetch("/api/admin/tenants");

    if (!response.ok) {
      return {
        error: "fetching tenants is failed",
      };
    }

    const body = await response.json();
    const converted = convertToCamel(body);
    return {
      payload: converted,
    };
  };

  const fetchTenant = async (tenantId: string) => {
    const response = await fetch(`/api/admin/tenants/${tenantId}`);

    if (!response.ok) {
      return {
        error: "fetching tenant is failed",
      };
    }

    const body = await response.json();
    const converted = convertToCamel(body);
    return {
      payload: converted,
    };
  };

  return {
    postTenant,
    fetchTenants,
    fetchTenant,
  };
};
