import React, {useState} from 'react';
import {Typography} from 'antd';
const {Paragraph} = Typography;
import {ProForm, ProFormText} from '@ant-design/pro-components';
import ProFormSchedule from './ProFormSchedule';
import './App.css';

function App() {
  const [formValues, setFormValues] = useState({});
  return (
    <>
      <h1>React Schedule + Ant Design</h1>
      <ProForm
        onFinish={async values => {
          console.log(values);
          setFormValues(values);
        }}>
        <ProFormText name="name" label="姓名" />
        <ProForm.Item name="schedule" label="日程">
          <ProFormSchedule />
        </ProForm.Item>
      </ProForm>

      <Paragraph style={{marginTop: 24}}>
        <pre style={{border: 'none', textAlign: 'left'}}>
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </Paragraph>
    </>
  );
}

export default App;
