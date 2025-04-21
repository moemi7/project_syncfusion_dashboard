import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { addUser, getAllUsers } from '../indexeddb/store';
import { useState, useEffect } from 'react';

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };

  
    const [users, setUsers] = useState([]);
  
  useEffect(() => {
    (async () => {

  
      const allUsers = await getAllUsers();
      setUsers(allUsers);
      console.log(allUsers);
  
    })();
  }, []);
  
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <ul>
        {users.map((user) => (<li>{user.name}</li>))}

      </ul>
      <Header category="Page" title="Orders" />
      <ul>
        {users.map((user) => (<li>{user.name}</li>))}

      </ul>

      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};
export default Orders;
