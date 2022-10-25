import { useEffect, useState } from "react";

import {
  Button,
  Card,
  Checkbox,
  Divider,
  Image,
  Input,
  Segmented,
  Space,
  Spin,
  Table,
  Tag
} from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { RemoveBoundary } from "@components";

import { BlogService, BlogTagsService } from "@services";

import { useDataFilter, useDebounce, useRequests, useUrlParams } from "@hooks";

import { LANGUAGES_KEYS, SORT } from "@utils/constants";

const Blog = () => {
  // **Props
  const [params, hasParams, handleParams] = useUrlParams({
    defaultParams: {
      lang: LANGUAGES_KEYS[0],
      page: 1,
      size: 10,
      sortByDate: "",
      tags: "",
      searchByTitle: "",
      searchBySlug: ""
    }
  });
  const [articles, setArticles] = useState({});

  const debouncedTitleValue = useDebounce(params.searchByTitle, 500);
  const debouncedSlugValue = useDebounce(params.searchBySlug, 500);

  // Routes
  const navigate = useNavigate();
  const create = () => navigate("/blog/create");
  const edit = (id) => () => navigate(`/blog/edit/${id}`);

  const { handleRequest, isLoading } = useRequests();

  const tagsFilter = useDataFilter({
    type: "tags",
    request: BlogTagsService.getAll,
    lang: params.lang
  });

  const getArticles = handleRequest(async () => {
    const resp = await BlogService.getAll({
      page: params.page,
      size: params.size,
      lang: params.lang,
      sortByDate: params.sortByDate ? params.sortByDate : null,
      searchByTitle: params.searchByTitle ? params.searchByTitle : null,
      searchBySlug: params.searchBySlug ? params.searchBySlug : null,
      tags: params.tags ? params.tags : null
    });

    if (resp.status !== 200) throw resp;

    setArticles((prevState) => ({
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
    handleParams("tags", filters.tags?.length > 0 ? filters.tags.join(",") : null);
    handleParams("sortByDate", sorter.order ? SORT[sorter.order] : null);
  };

  const handleInput = (e, name, handler) => {
    handler(name, e.target.value);
  };

  useEffect(() => {
    if (!hasParams) return;

    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.lang,
    params.size,
    params.page,
    params.sortByDate,
    debouncedTitleValue,
    debouncedSlugValue,
    params.tags
  ]);

  useEffect(() => {
    if (debouncedTitleValue) handleParams("searchByTitle", "");
    if (debouncedSlugValue) handleParams("searchBySlug", "");
    if (params.sortByDate) handleParams("sortByDate", "");
    if (params.tags) handleParams("tags", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang]);

  return (
    <Card
      title="Блог"
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
            dataSource={articles[params.lang]?.data}
            bordered
            onChange={handleTableChange}
            pagination={{
              current: +params.page,
              pageSize: +params.size,
              total: articles[params.lang]?.total,
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
              title="Индексация"
              dataIndex={["meta", "noIndex"]}
              width={70}
              ellipsis
              align="center"
              render={(value) => <Checkbox checked={!value} />}
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
            <Table.Column
              align="center"
              title="Постер"
              dataIndex="poster"
              width={150}
              render={(poster) => (
                <Image
                  width={75}
                  height={75}
                  src={`${process.env.REACT_APP_BUCKET_URL}/${poster.link}`}
                  alt={poster.meta.alt}
                  style={{
                    objectFit: "cover",
                    backgroundColor: "transparent"
                  }}
                />
              )}
            />
            <Table.Column
              title="Заголовок"
              dataIndex="title"
              width={250}
              ellipsis
              filterDropdown={() => (
                <div
                  style={{
                    padding: 8
                  }}
                >
                  <Input
                    placeholder="Начните вводить заголовок"
                    value={params.searchByTitle}
                    onInput={(e) => handleInput(e, "searchByTitle", handleParams)}
                  />
                </div>
              )}
              filterIcon={() => <AiOutlineSearch fill={params.searchByTitle ? "#1890ff" : ""} />}
            />
            <Table.Column
              title="Теги"
              dataIndex="tags"
              ellipsis
              filters={tagsFilter}
              filterSearch={true}
              filteredValue={params.tags?.split(",") || null}
              render={(tags) =>
                tags.map((tag) => (
                  <Tag key={tag} color="green">
                    {tag}
                  </Tag>
                ))
              }
            />
            <Table.Column
              align="center"
              key="views"
              title="Кол. просмотров"
              dataIndex="views"
              render={(text) => <Tag color="cyan">{text}</Tag>}
            />

            <Table.Column
              title="ЧПУ(url)"
              dataIndex="slug"
              width={150}
              ellipsis
              filterDropdown={() => (
                <div
                  style={{
                    padding: 8
                  }}
                >
                  <Input
                    placeholder="Начните вводить ЧПУ(url)"
                    value={params.searchBySlug}
                    onInput={(e) => handleInput(e, "searchBySlug", handleParams)}
                  />
                </div>
              )}
              filterIcon={() => <AiOutlineSearch fill={params.searchBySlug ? "#1890ff" : ""} />}
            />
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
                    onSuccess={() => getArticles()}
                    handler={() => BlogService.delete(record._id)}
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

export default Blog;
