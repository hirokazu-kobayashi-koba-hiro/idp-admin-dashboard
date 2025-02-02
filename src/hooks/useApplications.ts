import {convertToCamel} from "@/functions/convertToCamel";

export const useApplications = () => {

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
            payload: converted
        }
    }

    return {
        fetchApplications,
    }
}