import { Button } from "antd";

export const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="error-fallback">
    <div className="error-fallback__content">
      <span className="error-fallback__text">Что-то пошло не так:</span>
      <span className="error-fallback__message">{error.message} Error Message</span>
      <Button type="primary" onClick={resetErrorBoundary}>
        Попробовать снова
      </Button>
    </div>
  </div>
);
