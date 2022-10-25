import { useEffect, useState } from "react";

import { Button, Card, Checkbox, Divider, Segmented, Space, Table, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete } from "react-icons/ai";

import { RemoveBoundary } from "@components";

import { ReviewsService } from "@services";

import { useRequests, useUrlParams } from "@hooks";

import { ENTITY_OPTIONS, SORT } from "@utils/constants";

const { Link } = Typography;

const Reviews = () => {
  // **Props
  // **Props
  const [params, hasParams, handleParams] = useUrlParams({
    defaultParams: {
      filterByEntity: ENTITY_OPTIONS[0].value,
      page: 1,
      size: 10,
      sortByDate: "",
      sortByStatus: ""
    }
  });
  const { handleRequest, isLoading } = useRequests();

  // **Local state
  const [reviews, setReviews] = useState({
    data: [],
    total: 0
  });
  const [checkedReviews, setCheckedReviews] = useState([]);

  const getReviews = handleRequest(async () => {
    const resp = await ReviewsService.getAll({
      page: params.page,
      size: params.size,
      filterByEntity: params.filterByEntity,
      sortByDate: params.sortByDate ? params.sortByDate : null,
      sortByStatus: params.sortByStatus ? params.sortByStatus : null
    });

    if (resp.status !== 200) throw resp;

    setReviews(resp.data);
  });

  const changeApproving = handleRequest(async () => {
    const resp = await ReviewsService.approve({ ids: checkedReviews });
    if (resp.status !== 200) throw resp;

    setCheckedReviews([]);
    getReviews();
  });

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.field === "isApproved") {
      handleParams("sortByStatus", sorter.order ? SORT[sorter.order] : null);
    } else {
      handleParams("sortByDate", sorter.order ? SORT[sorter.order] : null);
    }
  };

  const handlePagination = (page, size) => {
    handleParams("page", page);
    handleParams("size", size);
  };

  const handleMark = (newSelectedRowKeys) => {
    setCheckedReviews(newSelectedRowKeys);
  };

  useEffect(() => {
    if (!hasParams) return;

    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.size, params.page, params.sortByDate, params.sortByStatus, params.filterByEntity]);

  useEffect(() => {
    if (params.sortByDate) handleParams("sortByDate", "");
    if (params.sortByStatus) handleParams("sortByStatus", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.filterByEntity]);

  return (
    <Card
      title="Отзывы"
      extra={
        <>
          <span
            style={{
              marginRight: 8
            }}
          >
            {checkedReviews.length === 0 ? "" : `Выбрано ${checkedReviews.length} отзывов`}
          </span>
          <Button type="primary" disabled={checkedReviews.length === 0} onClick={changeApproving}>
            Одобрить
          </Button>
        </>
      }
    >
      <Space size="large" direction="vertical" style={{ display: "flex" }}>
        <Space size="small" split={<Divider type="vertical" />}>
          <Segmented
            size="large"
            value={params.filterByEntity}
            options={ENTITY_OPTIONS}
            onChange={(value) => handleParams("filterByEntity", value)}
          />
        </Space>
        <Table
          dataSource={reviews?.data}
          bordered
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            current: +params.page,
            pageSize: +params.size,
            total: reviews.total,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50],
            position: "bottom-right",
            onChange: handlePagination
          }}
          rowSelection={{
            checkedReviews,
            onChange: handleMark,
            getCheckboxProps: (record) => ({
              disabled: record.isApproved,
              isApproved: record.isApproved
            }),
            selections: [Table.SELECTION_ALL, Table.SELECTION_NONE]
          }}
          rowKey="_id"
          size="middle"
          scroll={{
            x: 1000
          }}
        >
          <Table.Column
            title="На сайте"
            dataIndex="isApproved"
            valuePropName="checked"
            align="center"
            width={100}
            render={(value) => <Checkbox checked={value} />}
            sorter
            sortDirections={["descend", "ascend"]}
            defaultSortOrder="descend"
          />
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
          <Table.Column title="Имя" dataIndex="authorName" ellipsis />
          <Table.Column
            title="Почта"
            dataIndex="authorEmail"
            ellipsis
            render={(value) => (
              <Link href={`mailto:${value}`} target="_blank" rel="noreferrer">
                {value}
              </Link>
            )}
          />
          <Table.Column title="Объект" dataIndex="entity" />
          <Table.Column title="Отзыв" dataIndex="text" width={200} ellipsis />
          <Table.Column
            title="Оценка"
            dataIndex="rating"
            align="center"
            width={100}
            ellipsis
            sorter={(a, b) => a.rating - b.rating}
            render={(record) => <Tag color="gold">{record}</Tag>}
          />
          <Table.Column title="Имя брокера" dataIndex="broker" ellipsis />
          <Table.Column
            width={100}
            title="Действия"
            dataIndex="actions"
            align="center"
            fixed="right"
            render={(_, record) => (
              <Space size={5} split={<Divider type="vertical" />}>
                <RemoveBoundary
                  onSuccess={() => getReviews(1, 10)}
                  handler={() => ReviewsService.delete(record._id)}
                >
                  <Button danger icon={<AiOutlineDelete />} size="middle" title="Удаление записи" />
                </RemoveBoundary>
              </Space>
            )}
          />
        </Table>
      </Space>
    </Card>
  );
};

export default Reviews;
