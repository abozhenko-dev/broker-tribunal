import { Spin } from "antd";

export const PageLoader = ({ loading }) => (
  <div className="loader">
    <Spin tip="Загрузка..." spinning={loading} />
  </div>
);
