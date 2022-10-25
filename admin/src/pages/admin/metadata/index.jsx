import { useEffect, useState } from "react";

import { Button, Card, Checkbox, Divider, Input, Segmented, Space, Spin, Table } from "antd";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { RemoveBoundary } from "@components";

import { MetadataService } from "@services";

import { useDebounce, useRequests, useUrlParams } from "@hooks";

import { LANGUAGES_KEYS, PAGES } from "@utils/constants";

const Metadata = () => {
  // **Props
  const [params, hasParams, handleParams] = useUrlParams({
    defaultParams: {
      lang: LANGUAGES_KEYS[0],
      page: 1,
      size: 10,
      searchByTitle: "",
      searchBySlug: ""
    }
  });
  const [data, setData] = useState({});

  const debouncedTitleValue = useDebounce(params.searchByTitle, 500);
  const debouncedSlugValue = useDebounce(params.searchBySlug, 500);

  // Routes
  const navigate = useNavigate();
  const create = () => navigate("/metadata/create");
  const edit = (translationId) => () => navigate(`/metadata/edit/${translationId}`);

  const { handleRequest, isLoading } = useRequests();

  const setInitials = handleRequest(async () => {
    const resp = await MetadataService.getAll({
      page: params.page,
      size: params.size,
      lang: params.lang,
      searchByTitle: params.searchByTitle ? params.searchByTitle : null,
      searchBySlug: params.searchBySlug ? params.searchBySlug : null
    });

    if (resp.status !== 200) throw resp;

    setData((prevState) => ({
      ...prevState,
      [`${params.lang}`]: { ...resp?.data }
    }));
  });

  const handlePagination = (page, size) => {
    handleParams("page", page);
    handleParams("size", size);
  };

  const handleInput = (e, name, handler) => {
    handler(name, e.target.value);
  };

  useEffect(() => {
    if (!hasParams) return;

    setInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang, params.size, params.page, debouncedTitleValue, debouncedSlugValue]);

  useEffect(() => {
    if (debouncedTitleValue) handleParams("searchByTitle", "");
    if (debouncedSlugValue) handleParams("searchBySlug", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang]);

  return (
    <Card
      title="Страницы"
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
            dataSource={data[params.lang]?.data}
            bordered
            loading={isLoading}
            pagination={{
              current: +params.page,
              pageSize: +params.size,
              total: data[params.lang]?.total,
              pageSizeOptions: [5, 10, 20, 50],
              showSizeChanger: true,
              position: "bottom-right",
              onChange: handlePagination
            }}
            rowKey="_id"
            size="middle"
            scroll={{
              x: 1000
            }}
          >
            <Table.Column
              title="Индексация"
              dataIndex="noIndex"
              width={200}
              ellipsis
              render={(value, record) => (
                <>
                  <Checkbox checked={!value} style={{ marginRight: 8 }} />
                  {PAGES.find((page) => page.value === record.slug)?.label || value}
                </>
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
              key="description"
              title="Описание"
              dataIndex="description"
              width={350}
              ellipsis
            />
            <Table.Column title="Хлебная крошка" dataIndex="breadcrumb" ellipsis />
            <Table.Column title="Seo текст" dataIndex="seo" ellipsis />
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
                    onSuccess={() => setInitials()}
                    handler={() => MetadataService.delete(record._id)}
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

export default Metadata;
