import { useEffect, useState } from "react";

import { Button, Card, Descriptions } from "antd";
import { useNavigate } from "react-router-dom";

import { ContactsService } from "@services";

import { useRequests } from "@hooks";

const ContactsList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const { handleRequest, isLoading } = useRequests();

  const edit = () => navigate("/contacts/edit");

  const fetchData = handleRequest(async () => {
    const resp = await ContactsService.getOne();
    if (resp.status !== 200) throw resp;

    setData(resp.data);
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      title="Контакты"
      extra={
        <Button type="primary" onClick={edit}>
          Редактировать
        </Button>
      }
      loading={isLoading}
    >
      <Descriptions bordered>
        {data && (
          <>
            <Descriptions.Item label="Telegram" span={24}>
              <a href={`${data.telegram}`} target="_blank" rel="noreferrer">
                {data.telegram}
              </a>
            </Descriptions.Item>

            <Descriptions.Item label="Facebook" span={24}>
              <a href={`${data.facebook}`} target="_blank" rel="noreferrer">
                {data.facebook}
              </a>
            </Descriptions.Item>

            <Descriptions.Item label="Instagram" span={24}>
              <a href={`${data.instagram}`} target="_blank" rel="noreferrer">
                {data.instagram}
              </a>
            </Descriptions.Item>

            <Descriptions.Item label="WhatsApp" span={24}>
              <a href={`${data.whatsapp}`} target="_blank" rel="noreferrer">
                {data.whatsapp}
              </a>
            </Descriptions.Item>

            <Descriptions.Item label="Почта" span={24}>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </Descriptions.Item>

            <Descriptions.Item label="Телефон" span={24}>
              <a href={`tel:${data.phone}`}>{data.phone}</a>
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
    </Card>
  );
};

export default ContactsList;
