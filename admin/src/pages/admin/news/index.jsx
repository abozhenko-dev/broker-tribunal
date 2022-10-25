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

import { NewsService, NewsTagsService } from "@services";

import { useDataFilter, useDebounce, useRequests, useUrlParams } from "@hooks";

import { LANGUAGES_KEYS, SORT } from "@utils/constants";

const News = () => {
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
  const [news, setNews] = useState({});

  const debouncedTitleValue = useDebounce(params.searchByTitle, 500);
  const debouncedSlugValue = useDebounce(params.searchBySlug, 500);

  const tagsFilter = useDataFilter({
    type: "tags",
    request: NewsTagsService.getAll,
    lang: params.lang
  });

  // Routes
  const navigate = useNavigate();
  const create = () => navigate("/news/create");
  const edit = (id) => () => navigate(`/news/edit/${id}`);

  const { handleRequest, isLoading } = useRequests();

  const getNews = handleRequest(async () => {
    const resp = await NewsService.getAll({
      page: params.page,
      size: params.size,
      lang: params.lang,
      sortByDate: params.sortByDate ? params.sortByDate : null,
      searchByTitle: params.searchByTitle ? params.searchByTitle : null,
      searchBySlug: params.searchBySlug ? params.searchBySlug : null,
      tags: params.tags ? params.tags : null
    });

    if (resp.status !== 200) throw resp;
    setNews((prevState) => ({
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

    getNews();
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
      title="Новости"
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
            dataSource={news[params.lang]?.data}
            bordered
            onChange={handleTableChange}
            pagination={{
              current: +params.page,
              pageSize: +params.size,
              total: news[params.lang]?.total,
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
              width={100}
              ellipsis
              align="center"
              render={(value) => <Checkbox checked={value} />}
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
                    onSuccess={() => getNews()}
                    handler={() => NewsService.delete(record._id)}
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

export default News;
