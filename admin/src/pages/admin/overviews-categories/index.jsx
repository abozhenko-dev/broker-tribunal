import { useEffect, useState } from "react";

import { Button, Card, Checkbox, Divider, Input, Segmented, Space, Spin, Table, Tag } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { RemoveBoundary } from "@components";

import { OverviewsCategoriesService } from "@services";

import { useDebounce, useRequests, useUrlParams } from "@hooks";

import { LANGUAGES_KEYS, SORT } from "@utils/constants";

const OverviewsCategories = () => {
  // **Props
  const [params, hasParams, handleParams] = useUrlParams({
    defaultParams: {
      lang: LANGUAGES_KEYS[0],
      page: 1,
      size: 10,
      searchByName: "",
      searchBySlug: "",
      sortByDate: ""
    }
  });
  const [categories, setCategories] = useState({});

  const debouncedNameValue = useDebounce(params.searchByName, 500);
  const debouncedSlugValue = useDebounce(params.searchBySlug, 500);

  // Routes
  const navigate = useNavigate();
  const create = () => navigate("/overviews-categories/create");
  const edit = (id) => () => navigate(`/overviews-categories/edit/${id}`);

  const { handleRequest, isLoading } = useRequests();

  const getCategories = handleRequest(async () => {
    const resp = await OverviewsCategoriesService.getAll({
      page: params.page,
      size: params.size,
      lang: params.lang,
      searchByName: params.searchByName ? params.searchByName : null,
      searchBySlug: params.searchBySlug ? params.searchBySlug : null,
      sortByDate: params.sortByDate ? params.sortByDate : null
    });

    if (resp.status !== 200) throw resp;
    setCategories((prevState) => ({
      ...prevState,
      [`${params.lang}`]: { ...resp?.data }
    }));
  });

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (pagination, filters, sorter) => {
    handleParams("sortByDate", sorter.order ? SORT[sorter.order] : null);
  };

  const handlePagination = (page, size) => {
    handleParams("page", page);
    handleParams("size", size);
  };

  const handleInput = (e, name, handler) => {
    handler(name, e.target.value);
  };

  useEffect(() => {
    if (!hasParams) return;

    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.lang,
    params.size,
    params.page,
    debouncedNameValue,
    debouncedSlugValue,
    params.sortByDate
  ]);

  useEffect(() => {
    if (debouncedNameValue) handleParams("searchByName", "");
    if (debouncedSlugValue) handleParams("searchBySlug", "");
    if (params.sortByDate) handleParams("sortByDate", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang]);

  return (
    <Card
      title="Категории для обзоров"
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
            dataSource={categories[params.lang]?.data}
            bordered
            onChange={handleTableChange}
            pagination={{
              current: +params.page,
              pageSize: +params.size,
              total: categories[params.lang]?.total,
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
              width={80}
              ellipsis
              align="center"
              render={(value) => <Checkbox checked={!value} />}
            />
            <Table.Column
              title="На главной"
              dataIndex="showOnHome"
              width={80}
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
              title="Категория"
              dataIndex="name"
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
                    value={params.searchByName}
                    onInput={(e) => handleInput(e, "searchByName", handleParams)}
                  />
                </div>
              )}
              filterIcon={() => <AiOutlineSearch fill={params.searchByName ? "#1890ff" : ""} />}
              render={(tag) => <Tag color="green">{tag}</Tag>}
            />
            <Table.Column
              title="Описание"
              dataIndex="description"
              ellipsis
              render={(text) => text.join("\n")}
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
                    onSuccess={() => getCategories()}
                    handler={() => OverviewsCategoriesService.delete(record._id)}
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

export default OverviewsCategories;
