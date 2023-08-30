import React from 'react'
import { SetLoading } from '../redux/loaderSlice';
import { GetInventory, GetInventoryWithFilters } from '../apicalls/inventory';
import { getDateFormat } from '../utils/helpers';
import { useDispatch } from 'react-redux';
import { Table, message } from 'antd';

function  InventoryTable({filters, userType, limit}) {

    const [open, setOpen] = React.useState(false);
    const [data,setData] = React.useState([]);
    const dispatch = useDispatch();
    const columns = [
      {
        title: 'Inventory Type',
        dataIndex: 'inventoryType',
        render: (text) => text.toUpperCase()
      },
      {
        title: 'Blood Group',
        dataIndex: 'bloodGroup',
        render: (text) => text.toUpperCase()
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        render: (text) => text + ' ML'
      },
      {
        title: 'Reference',
        dataIndex:'reference',
        render: (text,record) => {
          // console.log("record donar: "+ record.donar);
          // console.log("record hospital: "+ record.hospital);
          if(userType === "organization"){
            return record.inventoryType === "in" ? record.donar?.name
            : record.hospital?.hospitalName;
          }else{
            return record.organization.organizationName;
          }
        },
    },  
      {
        title: 'Date',
        dataIndex: 'createdAt',
        render: (text) => getDateFormat(text)
      },

    ]


    // change columns for hospital
    if(userType === "hospital")
    {
      // remove inventory type column
      columns.splice(0,1);
      // change reference column to organzation name
      columns[2].title = "Organization Name";

      // date column should be renamed taken date 
      columns[3].title = "Consumed On"
    }


    // change columns for donar
    if(userType === "donar")
    {
      // remove inventory type column
      columns.splice(0,1);
      // change reference column to organzation name
      columns[2].title = "Organization Name";

      // date column should be renamed taken date 
      columns[3].title = "Donated On"
    }

    const getData = async()=>{
      try {
        dispatch(SetLoading(true));
        const response = await GetInventoryWithFilters(filters,limit);
        dispatch(SetLoading(false));
        if(response.success){
          console.log("showing response: "+ response.data);
          setData(response.data);
        }else{
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
        dispatch(SetLoading(false));
      }
    }

    React.useEffect(()=>{
      getData();
    },[]);
    
  return (
    <div>
        <Table columns={columns} dataSource={data} className='mt-3'/>
    </div>
  )
}

export default InventoryTable
