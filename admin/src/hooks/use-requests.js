import { useState } from "react";

import { useErrorHandler } from "react-error-boundary";

export const useRequests = () => {
  const handleError = useErrorHandler();

  const [isLoading, setIsLoading] = useState(false);

  const handleRequest =
    (callback) =>
    async (...args) => {
      try {
        setIsLoading(true);
        const response = await callback(...args);
        return response;
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

  return { handleRequest, isLoading, setIsLoading };
};
