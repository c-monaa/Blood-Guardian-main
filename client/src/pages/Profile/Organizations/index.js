import React from 'react'
import { GetAllOrganizationsOfADonar, GetAllOrganizationsOfAHospital } from '../../../apicalls/users';
import { SetLoading } from '../../../redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getDateFormat } from '../../../utils/helpers';
import { Modal, Table, message } from 'antd';
import InventoryTable from '../../../components/InventoryTable';

function Organizations({userType}) {
    const [showHistoryModal, setShowHistoryModal] = React.useState(false);
    const {currentUser} = useSelector((state) => state.users);
    const[selectedOrganization, setSelectedOrganization] = React.useState(null);
    const [data,setData] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async()=>{
        try {
          dispatch(SetLoading(true));
          let response = null;
          if(userType === "hospital"){
            response = await GetAllOrganizationsOfAHospital();
          }else{
            response = await GetAllOrganizationsOfADonar();
          }

          dispatch(SetLoading(false));
          if(response.success){
            setData(response.data);
          }else{
            throw new Error(response.message);
          }
        } catch (error) {
          message.error(error.message);
          dispatch(SetLoading(false));
        }
      };

      const columns = [
            {
                title:'Name',
                dataIndex:"organizationName",
            },
            {
                title:'Email',
                dataIndex:"email",
            },
            {
                title:'Phone',
                dataIndex:"phone"
            },
            {
                title:'Address',
                dataIndex:"address"
            },
            {
                title: "Created At",
                dataIndex: "createdAt",
                render: (text) => getDateFormat(text)
            },
            {
              title: "Action",
              dataIndex: "action",
              render: (text,record) => (
                <span className="underline text-md cursor-pointer" 
                onClick={()=> {
                  setSelectedOrganization(record);
                  setShowHistoryModal(true);
                } }>
                  History
                </span>
              )
            }
      ];

      React.useEffect(()=>{
        getData();
      },[]);

  return (
    <div>
      <Table columns={columns} dataSource={data} />

      {showHistoryModal && (
         <Modal
        title = {`${userType === 'donar' ? 'Donation History' : 'Consumption History'}
        In ${selectedOrganization.organizationName}`} 
         centered
         open = {showHistoryModal}
         width={1000} 
         destroyOnClose= {() => setShowHistoryModal(false)} 
         onCancel={()=> setShowHistoryModal(false)}
         onOk={()=>setShowHistoryModal(false)}
       >
 
         <InventoryTable
           filters={{organization: selectedOrganization._id ,
               [userType] : currentUser._id,}}
         />
       </Modal> 
      )}
    </div>
  ) 
}

export default Organizations
