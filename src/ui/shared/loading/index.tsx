import { Spin } from 'antd';
import './style.less';

interface LoadingProps {
  fixed?: boolean;
}
const Loading: React.FC<LoadingProps> = (props) => {
  const { fixed } = props;

  return (
    <div className={`loading-wrapper ${fixed ? 'is-fixed' : ''}`}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};
export default Loading;
