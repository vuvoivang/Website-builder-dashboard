import React from 'react';
import { DownloadOutlined, UserOutlined, LoginOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Avatar, MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import './style.less';
import { useNavigate } from 'react-router-dom';
import dynamicDataService, { DatabaseSystem } from '~/src/services/dynamic-data';
import { errorMsg } from '~/src/utils';
import fileDownload from 'js-file-download';

const items: MenuProps['items'] = [
  {
    label: 'MySQL',
    key: DatabaseSystem.MYSQL,
  },
  {
    label: 'SQL Lite',
    key: DatabaseSystem.SQLITE,
  }, {
    label: 'SQL Server',
    key: DatabaseSystem.SQLSERVER,
  }, {
    label: 'Postgres',
    key: DatabaseSystem.POSTGRES,
  }
];



const GenDatabaseScriptZone: React.FC<any> = ({ projectId }) => {
  const handleGetScriptDatabase = (databaseSystem = DatabaseSystem.MYSQL) => {
    try {
      dynamicDataService.getScript(projectId, databaseSystem).then((resp: any) => {
        if (!resp.msg) {
          fileDownload(resp.url, resp.url.substr(resp.url.lastIndexOf('/') + 1));
        } else errorMsg('Gen script failed, please try again later');
      });
    } catch (err) {
      console.log('Err delete document', err);
      errorMsg('Gen script failed, please try again later');
    }
  }
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const { key } = e;
    handleGetScriptDatabase(Number(key));
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


  return (
    <Space className='gen-script-zone' wrap>
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            <span>Script</span>
            <DownloadOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  )
};

export default GenDatabaseScriptZone;
