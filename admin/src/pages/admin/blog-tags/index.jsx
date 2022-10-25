import { useEffect, useState } from "react";

import { Button, Card, Divider, Segmented, Space, Spin, Table, Tag } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { RemoveBoundary } from "@components";

import { BlogTagsService } from "@services";

import { useRequests, useUrlParams } from "@hooks";

import { LANGUAGES_KEYS, SORT } from "@utils/constants";

const BlogTags = () => {
  // **Props
  const [params, hasParams, handleParams] = useUrlParams({
    defaultParams: {
      lang: LANGUAGES_KEYS[0],
      page: 1,
      size: 10,
      sortByDate: ""
    }
  });
  const [tags, setTags] = useState({});

  // Routes
  const navigate = useNavigate();
  const create = () => navigate("/blog-tags/create");
  const edit = (id) => () => navigate(`/blog-tags/edit/${id}`);

  const { handleRequest, isLoading } = useRequests();

  const getArticlesTags = handleRequest(async () => {
    const resp = await BlogTagsService.getAll({
      page: params.page,
      size: params.size,
      lang: params.lang,
      sortByDate: params.sortByDate ? params.sortByDate : null
    });

    if (resp.status !== 200) throw resp;
    setTags((prevState) => ({
      ...prevState,
      [`${params.lang}`]: { ...resp?.data }
    }));
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

    getArticlesTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang, params.size, params.page, params.sortByDate]);

  useEffect(() => {
    if (params.sortByDate) handleParams("sortByDate", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang]);

  return (
    <Card
      title="Теги статей"
      extra={
        <Button type="primary" onClick={create}>
          Добавить
        </Button>
      }
    >
      <Spin spinning={!hasParams}>
        <Space size="large" direction="vertical" style={{ display: "flex" }}>
          <Space size="small" split={<Divider type="vertical" />}>
            <Segmented
              size="large"
              value={params.lang}
              options={LANGUAGES_KEYS}
              onChange={(value) => handleParams("lang", value)}
            />
          </Space>
          <Table
            dataSource={tags[params.lang]?.data}
            bordered
            onChange={handleTableChange}
            pagination={{
              current: +params.page,
              pageSize: +params.size,
              total: tags[params.lang]?.total,
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
              title="Тег"
              dataIndex="name"
              width={150}
              render={(tag) => <Tag color="green">{tag}</Tag>}
            />
            <Table.Column title="Описание" dataIndex="description" ellipsis />
            <Table.Column
              width={120}
              title="Действия"
              dataIndex="actions"
              align="center"
              fixed="right"
              render={(_, record) => (
                <Space size={5} split={<Divider type="vertical" />}>
                  <Button
                    type="primary"
                    icon={<AiOutlineEdit />}
                    size="middle"
                    title="Редактирование записи"
                    onClick={edit(record?._id)}
                  />
                  <RemoveBoundary
                    onSuccess={() => getArticlesTags()}
                    handler={() => BlogTagsService.delete(record._id)}
                  >
                    <Button
                      danger
                      icon={<AiOutlineDelete />}
                      size="middle"
                      title="Удаление записи"
                    />
                  </RemoveBoundary>
                </Space>
              )}
            />
          </Table>
        </Space>
      </Spin>
    </Card>
  );
};

export default BlogTags;
