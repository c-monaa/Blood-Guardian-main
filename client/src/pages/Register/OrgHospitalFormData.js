import React from 'react';
import {Form,Input} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getAntdInputValidation } from '../../utils/helpers';
function OrgHospitalFormData({type}) {
  console.log("form data",type);
  return (
    <>
          
      {type ==='hospital' && <>
      {" "}  
        <Form.Item
            label = "Hospital Name"
            name = 'hospitalName'
            rules={getAntdInputValidation()}
        >
        <Input/>    
        </Form.Item>     
        <Form.Item name="owner" label="Owner" rules={getAntdInputValidation()}>
        <Input />    
        </Form.Item>     
        <Form.Item name="email" label="Email"rules={getAntdInputValidation()}>
        <Input />    
        </Form.Item>     
        <Form.Item name="phone" label="Phone"rules={getAntdInputValidation()}>
        <Input />    
        </Form.Item>     
        <Form.Item name="website" label="Website"rules={getAntdInputValidation()}>
        <Input />    
        </Form.Item>     
        <Form.Item name="password" label="Password"rules={getAntdInputValidation()}>
        <Input type='password' autoComplete="password"/>
        </Form.Item>      
        <Form.Item name="address" className='col-span-2' label="Address">
        <TextArea />
        </Form.Item>
      </>}

      {type ==='organization' && <>
      {" "}  
        <Form.Item
            label = "Organization Name"
            name = 'organizationName'
            rules={getAntdInputValidation()}
        >
        <Input/>    
        </Form.Item>     
        <Form.Item name="owner" label="Owner" rules={getAntdInputValidation()}>
        <Input />    
        </Form.Item>     
        <Form.Item name="email" label="Email"rules={getAntdInputValidation()}>
        <Input />    
        </Form.Item>     
        <Form.Item name="phone" label="Phone"rules={getAntdInputValidation()}>
        <Input />    
        </Form.Item>     
        <Form.Item name="website" label="Website"rules={getAntdInputValidation()}>
        <Input />    
        </Form.Item>     
        <Form.Item name="password" label="Password"rules={getAntdInputValidation()}>
        <Input type='password' autoComplete="password"/>
        </Form.Item>      
        <Form.Item name="address" className='col-span-2' label="Address">
        <TextArea />
        </Form.Item>
      </>}
    </>
  )
}

export default OrgHospitalFormData;
