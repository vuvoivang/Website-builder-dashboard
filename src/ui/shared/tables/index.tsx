import React, { useState } from 'react';

import { PaginationProps, Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { Container, Draggable } from 'react-smooth-dnd';

import SkeletonTable from './skeleton';

type DragContainerProps = {
  children?: any;
  handleOnDrop: (...args) => void;
  className: string;
};
const DragContainer: React.FC<DragContainerProps> = (props) => {
  const { handleOnDrop, children, className } = props;
  return (
    <Container
      onDrop={handleOnDrop}
      dragClass="row-ghost"
      dropClass="row-ghost-drop"
      render={(ref) => {
        return (
          <tbody ref={ref} className={className}>
            {children}
          </tbody>
        );
      }}
    />
  );
};

function DragableBodyRow(props) {
  return (
    <Draggable
      render={() => {
        return <tr style={{ cursor: 'move' }} {...props} />;
      }}
    />
  );
}

export interface BaseTableDataClientPaging<T> {
  itemsClient: T[];
  isLoadingClient?: boolean;
  isFilterChangedClient?: boolean;
}

export interface BaseTableData<T> {
  items: T[];
  total?: number;
  currentPage?: number;
  isFetched?: boolean;
  pageSize?: any;
  isLoading?: boolean;
  isFilterChanged?: boolean;
}
export interface BaseTableProps<T> extends TableProps<T> {
  idKey: string | string[];
  data?: BaseTableData<T>;
  enableID?: boolean;
  compact?: boolean;
  enableSort?: boolean;
  onChange?: (page: PaginationProps) => void;
  handleOnDrop?: (...args) => void;
  disablePagination?: boolean;
  paginationProps?: any;
  clientPaging?: boolean;
  customPageSize?: number;
  minHeight?: 240 | 400 | 460 | 500 | 640 | '65vh' | '70vh' | null;
}

function BaseTable<T extends object>(props: BaseTableProps<T>) {
  const {
    data: {
      items,
      total,
      currentPage,
      pageSize = 8,
      isLoading,
      isFetched = true,
      isFilterChanged,
    } = {},
    idKey = 'id',
    columns,
    compact,
    enableSort = false,
    enableID = false,
    onChange,
    minHeight,
    className = '',
    handleOnDrop,
    disablePagination,
    paginationProps = {},
    ...rest
  } = props;

  const [pagination, setPagination] = useState({
    defaultCurrent: 1,
    defaultPageSize: pageSize,
    showSizeChanger: false,
  });

  const onTableChange = (pageParams) => {
    setPagination(pageParams);
    onChange && onChange(pageParams);
  };

  if (!disablePagination) {
    rest.pagination = {
      ...pagination,
      ...paginationProps,
      current: currentPage,
      position: ['bottomCenter'],
      // showSizeChanger: true,
      // showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} mục`,
      total,
    };
  } else {
    rest.pagination = false;
  }

  if (enableID && !columns?.find((i) => i.title === 'STT')) {
    columns?.unshift({
      title: 'STT',
      dataIndex: 'id',
      align: 'center',
      render: (_text: any, _record: any, index: number) => index + 1,
      width: 64,
    });
  }

  if (enableSort) {
    rest.components = {
      body: {
        wrapper: (props) => (
          <DragContainer handleOnDrop={handleOnDrop} {...props} />
        ),
        row: DragableBodyRow,
      },
    };
  }

  if (isLoading && !isFetched)
    return <SkeletonTable {...rest} rowCount={10} columns={columns} />;

  return (
    <Table
      {...rest}
      className={`${className} ${minHeight ? `min_height_${minHeight}` : ''}`}
      // locale={{
      //     emptyText: args => <EmptyContent {...args} isFilterChanged={isFilterChanged} />,
      // }}
      size={compact ? 'small' : undefined}
      columns={columns}
      onChange={onTableChange}
      dataSource={items}
      loading={isLoading}
      rowKey={(record) =>
        Array.isArray(idKey)
          ? idKey.reduce((acc, current) => `${acc}-${record[current]}`, '')
          : record[idKey]
      }
    />
  );
}

export default BaseTable;
