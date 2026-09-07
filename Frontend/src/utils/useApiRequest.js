import { useState, useCallback } from "react";
import { toast } from "sonner";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (apiCall, { loadingMessage, successMessage, silent } = {}) => {
      const toastId = loadingMessage
        ? toast.loading(loadingMessage)
        : undefined;
      setLoading(true);

      try {
        const response = await apiCall();

        if (successMessage) {
          toast.success(successMessage, { id: toastId });
        } else if (toastId) {
          toast.dismiss(toastId);
        }

        return { data: response.data, error: null };
      } catch (e) {
        const message =
          e?.response?.data?.message ||
          "Something went wrong. Please try again.";
        if (!silent) toast.error(message, { id: toastId });
        return { data: null, error: message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { request, loading };
};

export default useApiRequest;
