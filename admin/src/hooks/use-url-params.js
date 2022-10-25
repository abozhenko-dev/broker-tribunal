import { useEffect, useMemo } from "react";

import { useSearchParams } from "react-router-dom";

export const useUrlParams = ({ defaultParams = {}, ...config }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams);
  const hasParams = useMemo(() => Boolean(Object.keys(params)?.length), [params]);

  const handleParams = (name, param) => {
    if (param) {
      searchParams.set(name, param);
    } else {
      searchParams.delete(name, param);
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!hasParams) {
      for (const key in defaultParams) {
        if (!defaultParams[key]) {
          delete defaultParams[key];
        }
      }
      setSearchParams(defaultParams, { replace: true, ...config });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasParams]);

  return [params, hasParams, handleParams];
};
