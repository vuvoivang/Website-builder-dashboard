import React, { useState } from 'react';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import { WidgetProps } from '~/src/ui/shared/forms/FormBuilder/FormBuilder';
import logger from '~/src/utils/logger';

interface UploadButtonProps extends WidgetProps {
  actionUpload?: any;
}

const UploadButton: React.FC<Partial<UploadButtonProps>> = (props) => {
  const { onChange, value, actionUpload } = props;
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload file with format JPG/PNG!');
    }
    return isJpgOrPng;
  };

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : <div className="anticon anticon-camera" role="img" aria-label="camera">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>}
    </div>
  );

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      logger.debug('uploading!');
      return;
    }

    if (info.file.status === 'done') {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      logger.debug('uploaded!', info.file);

      const urlFile: string = info.file.response?.url;

      if (urlFile) {
        logger.debug('urlFile | uploaded', urlFile);
        onChange && onChange(urlFile);
      } else {
        message.error(
          `${info.file.name} file uploaded failed | error: ${info.file.response?.data?.detail || 'Something went wrong'
          }`
        );
        return;
      }
    }

    if (info.file.status === 'error') {
      logger.debug('error', info.file);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // setTimeout(() => {
      //   setLoading(false)
      //   message.error(`${info.file.name} file upload failed`);
      // }, 1000);
    }
  };

  const headerConfig: any = {};
  return (
    <Upload
      accept="image/*"
      name="file"
      listType="picture-card"
      showUploadList={false}
      action={actionUpload}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      withCredentials={false}
      headers={headerConfig}
      disabled={props?.disabled}
    >
      {loading ? <LoadingOutlined /> : value ? <img src={value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default UploadButton;
