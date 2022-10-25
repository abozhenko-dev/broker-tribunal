import { useEffect, useState } from "react";

import { Router } from "@components";

import { AuthService } from "@services";

import { useActions } from "@hooks";

export const App = () => {
  const { setUserInfo, setIsAuthorized } = useActions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const resp = await AuthService.getUserInfo();

      if (resp.status === 200) {
        setUserInfo(resp.data);
        setIsAuthorized(true);
      }

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !loading ? <Router /> : <></>;
};
