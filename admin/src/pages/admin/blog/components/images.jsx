import { Form } from "antd";

import { FileUpload } from "@components";

import { BlogService } from "@services";

import { ONLY_IMAGES } from "@utils/constants";

export const Images = () => (
  <>
    <Form.Item label="Постер" name="poster" rules={[{ required: true }]}>
      <FileUpload accept={ONLY_IMAGES} uploadRequest={BlogService.uploadPoster} required />
    </Form.Item>
  </>
);
