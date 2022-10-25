import { useEffect, useState } from "react";

import { Button, Card, Descriptions, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import { SeoService } from "@services";

import { useRequests } from "@hooks";

const SeoList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const { handleRequest, isLoading } = useRequests();

  const edit = () => navigate("/seo/edit");

  const fetchData = handleRequest(async () => {
    const resp = await SeoService.getOne();
    if (resp.status !== 200) throw resp;

    setData(resp.data);
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      title="Seo"
      extra={
        <Button type="primary" onClick={edit}>
          Редактировать
        </Button>
      }
    >
      <Spin spinning={isLoading}>
        <Descriptions bordered>
          {data && (
            <>
              <Descriptions.Item label="Robots.txt" span={24}>
                <span title={data.robots}>{data.robots?.substring(0, 100)}...</span>
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Spin>
    </Card>
  );
};

export default SeoList;
