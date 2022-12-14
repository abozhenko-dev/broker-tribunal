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

import { OverviewsCategoriesService, OverviewsService } from "@services";

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
      categories: "",
      searchByTitle: "",
      searchBySlug: ""
    }
  });
  const [overviews, setOverviews] = useState({});

  const debouncedTitleValue = useDebounce(params.searchByTitle, 500);
  const debouncedSlugValue = useDebounce(params.searchBySlug, 500);

  const categoriesFilter = useDataFilter({
    type: "categories",
    request: OverviewsCategoriesService.getAll,
    lang: params.lang
  });

  // Routes
  const navigate = useNavigate();
  const create = () => navigate("/overviews/create");
  const edit = (id) => () => navigate(`/overviews/edit/${id}`);

  const { handleRequest, isLoading } = useRequests();

  const getOverviews = handleRequest(async () => {
    const resp = await OverviewsService.getAll({
      page: params.page,
      size: params.size,
      lang: params.lang,
      sortByDate: params.sortByDate ? params.sortByDate : null,
      searchByTitle: params.searchByTitle ? params.searchByTitle : null,
      searchBySlug: params.searchBySlug ? params.searchBySlug : null,
      categories: params.categories ? params.categories : null
    });

    setOverviews((prevState) => ({
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
    handleParams(
      "categories",
      filters.categories?.length > 0 ? filters.categories.join(",") : null
    );
    handleParams("sortByDate", sorter.order ? SORT[sorter.order] : null);
  };

  const handleInput = (e, name, handler) => {
    handler(name, e.target.value);
  };

  useEffect(() => {
    if (!hasParams) return;

    getOverviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.lang,
    params.size,
    params.page,
    params.sortByDate,
    debouncedTitleValue,
    debouncedSlugValue,
    params.categories
  ]);

  useEffect(() => {
    if (debouncedTitleValue) handleParams("searchByTitle", "");
    if (debouncedSlugValue) handleParams("searchBySlug", "");
    if (params.sortByDate) handleParams("sortByDate", "");
    if (params.categories) handleParams("categories", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang]);

  return (
    <Card
      title="???????????? ??????????????"
      extra={
        <Button type="primary" onClick={create}>
          ????????????????
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
            dataSource={overviews[params.lang]?.data}
            bordered
            onChange={handleTableChange}
            pagination={{
              current: +params.page,
              pageSize: +params.size,
              total: overviews[params.lang]?.total,
              pageSizeOptions: [5, 10, 20, 50],
              showSizeChanger: true,
              position: "bottom-right",
              onChange: handlePagination
            }}
            loading={isLoading}
            rowKey="_id"
            size="middle"
            scroll={{
              x: 1300
            }}
          >
            <Table.Column
              title="????????????????????"
              dataIndex={["meta", "noIndex"]}
              width={80}
              ellipsis
              align="center"
              render={(value) => <Checkbox checked={!value} />}
            />
            <Table.Column
              title="???????? ????????????????"
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
              title="??????????????"
              dataIndex="logo"
              width={150}
              render={(logo) => (
                <Image
                  width={92}
                  height={34}
                  src={`${process.env.REACT_APP_BUCKET_URL}/${logo.link}`}
                  alt={logo.meta.alt}
                  style={{
                    objectFit: "cover",
                    backgroundColor: "transparent"
                  }}
                />
              )}
            />
            <Table.Column
              title="??????????????????"
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
                    placeholder="?????????????? ?????????????? ??????????????????"
                    value={params.searchByTitle}
                    onInput={(e) => handleInput(e, "searchByTitle", handleParams)}
                  />
                </div>
              )}
              filterIcon={() => <AiOutlineSearch fill={params.searchByTitle ? "#1890ff" : ""} />}
            />
            <Table.Column
              align="center"
              title="??????????????????"
              dataIndex="categories"
              ellipsis
              filters={categoriesFilter}
              filterSearch={true}
              filteredValue={params.categories?.split(",") || null}
              render={(items) =>
                items.map((item) => (
                  <Tag key={item} color="green">
                    {categoriesFilter.find((filter) => filter.value === item)?.text}
                  </Tag>
                ))
              }
            />
            <Table.Column
              title="??????(url)"
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
                    placeholder="?????????????? ?????????????? ??????(url)"
                    value={params.searchBySlug}
                    onInput={(e) => handleInput(e, "searchBySlug", handleParams)}
                  />
                </div>
              )}
              filterIcon={() => <AiOutlineSearch fill={params.searchBySlug ? "#1890ff" : ""} />}
            />
            <Table.Column
              width={120}
              title="????????????????"
              dataIndex="actions"
              align="center"
              fixed="right"
              render={(_, record) => (
                <Space size={5} split={<Divider type="vertical" />}>
                  <Button
                    type="primary"
                    icon={<AiOutlineEdit />}
                    size="middle"
                    title="???????????????????????????? ????????????"
                    onClick={edit(record?._id)}
                  />
                  <RemoveBoundary
                    onSuccess={() => getOverviews()}
                    handler={() => OverviewsService.delete(record._id)}
                  >
                    <Button
                      danger
                      icon={<AiOutlineDelete />}
                      size="middle"
                      title="???????????????? ????????????"
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
