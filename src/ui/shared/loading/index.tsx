import { Spin } from 'antd';
import './style.less';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
  fixed?: boolean;
}

const antIcon = (
  <LoadingOutlined style={{ fontSize: 150, color: 'rgb(93, 93, 255)' }} spin />
);

const Loading: React.FC<LoadingProps> = (props) => {
  const { fixed } = props;

  return (
    <div className={`loading-wrapper ${fixed ? 'is-fixed' : ''}`}>
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};
export default Loading;
