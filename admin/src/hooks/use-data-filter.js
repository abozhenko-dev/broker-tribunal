import { useEffect, useState } from "react";

import { useRequests } from "./use-requests";

export const useDataFilter = ({ type = "tags", request, lang }) => {
  const [data, setData] = useState([]);

  const { handleRequest } = useRequests();

  const getData = handleRequest(async () => {
    const resp = await request({ lang });

    if (resp.status !== 200) throw resp;

    if (type === "tags") {
      setData(
        resp?.data.data.map((item) => ({ text: item.name, label: item.name, value: item.name }))
      );
    } else {
      setData(
        resp?.data.data.map((item) => ({ text: item.name, label: item.name, value: item._id }))
      );
    }
  });

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return data;
};
