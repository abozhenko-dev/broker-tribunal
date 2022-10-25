import { useEffect, useState } from "react";

import { Card, Spin, Table, Tag } from "antd";
import dayjs from "dayjs";

import { FeedbackService } from "@services";

import { useRequests, useUrlParams } from "@hooks";

import { SORT } from "@utils/constants";

const TYPE_COLORS = {
  promotion: "green",
  consultation: "blue",
  complaint: "red"
};

const TYPE_LABELS = {
  promotion: "Реклама",
  consultation: "Консультация",
  complaint: "Жалоба"
};

const FeedbackList = () => {
  // **Props
  const [params, hasParams, handleParams] = useUrlParams({
    defaultParams: {
      page: 1,
      size: 10,
      sortByDate: ""
    }
  });
  const [data, setData] = useState({});

  const { handleRequest, isLoading } = useRequests();

  const fetchData = handleRequest(async () => {
    const resp = await FeedbackService.getAll({
      page: params.page,
      size: params.size,
      sortByDate: params.sortByDate ? params.sortByDate : null
    });
    if (resp.status !== 200) throw resp;

    setData(resp.data);
  });

  const handlePagination = (page, size) => {
    handleParams("page", page);
    handleParams("size", size);
  };

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (pagination, filters, sorter) => {
    handleParams("sortByDate", sorter.order ? SORT[sorter.order] : null);
  };

  useEffect(() => {
    if (!hasParams) return;

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.size, params.page, params.sortByDate]);

  return (
    <Card title="Формы">
      <Spin spinning={!hasParams}>
        <Table
          dataSource={data.data}
          bordered
          onChange={handleTableChange}
          pagination={{
            current: +params.page,
            pageSize: +params.size,
            total: data?.total,
            pageSizeOptions: [5, 10, 20, 50],
            showSizeChanger: true,
            position: "bottom-right",
            onChange: handlePagination
          }}
          loading={isLoading}
          rowKey="_id"
          size="middle"
          scroll={{
            x: 1000
          }}
        >
          <Table.Column
            title="Дата создания"
            dataIndex="createdAt"
            width={150}
            align="center"
            render={(value) => dayjs(value).format("DD MMM YYYY")}
            sorter
            sortDirections={["descend", "ascend"]}
            defaultSortOrder="descend"
          />
          <Table.Column
            title="Тип"
            dataIndex="type"
            render={(value) => <Tag color={TYPE_COLORS[value]}>{TYPE_LABELS[value]}</Tag>}
          />
          <Table.Column title="Имя" dataIndex="name" />
          <Table.Column title="Почта" dataIndex="email" />
          <Table.Column title="Имя брокера" dataIndex="brokerName" />
          <Table.Column title="Телефон" dataIndex="phone" />
          <Table.Column title="Опыт" dataIndex="tradingExperience" />
          <Table.Column title="Комментарий" dataIndex="comment" />
        </Table>
      </Spin>
    </Card>
  );
};

export default FeedbackList;
