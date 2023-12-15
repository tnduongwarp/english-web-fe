import React, { useState, useEffect } from 'react';
import { SearchOutlined, LoadingOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Table, message, Popconfirm, Select } from 'antd';
import Api from '../../../services/Api';
import { format } from 'date-fns';
import './style.css';

export default function UserManagement(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([]);
    const [key, setKey] = useState('');
    const confirm = (e,id) => {
        console.log(id);
        Api.deleteUserById(id).then(res => {
            if(res.status ===200) {
                let newdata = data.filter(item =>(item.key !== id));
                console.log(newdata)
                setData(newdata);
                let newfilterdata = filterData.filter(item =>(item.key !== id));
                setFilterData(newfilterdata)
                message.success('Delete Successfully');
            }else 
            message.error('Internal Server Error');
        })
        
      };
    const cancel = (e) => {
      };
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Role',
        dataIndex: 'role',
      },
      {
        title: 'Registration Day',
        dataIndex: 'registration_date',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => ( 
            <Popconfirm
                title="Delete user"
                description="Are you sure to delete this user?"
                onConfirm={(e) => confirm(e,record.key)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
               <DeleteFilled style={{ cursor:"pointer", color:"red"}} />
            </Popconfirm>
        ),
      },
    ];
   
    useEffect(() => {
      setLoading(true);
      // ajax request after empty completing
      Api.getAllUser().then( res => {
        console.log(res);
        let users = res.data.data;
        let data = [];
        for(let i = 0; i< users.length; i++){
            data.push({
                key: users[i].id,
                username: users[i].username,
                email: users[i].email,
                role: users[i].role,
                registration_date: format(new Date(users[i].registration_date), 'yyyy-MM-dd')
            })
        }
        setData(data);
        setFilterData(data);
        setLoading(false);
      })
    }, []);
    const onclickButton = () => {
        let newdata = data.filter(item => (item.username.includes(key)));
        setFilterData(newdata)
    }
    const handleChange = (value) => {
      console.log(`selected ${value}`);
      setKey('');
      switch(value){
        case 0: setFilterData(data); break;
        case 1: {
          const threeDaysAgo = new Date();
          threeDaysAgo.setDate(threeDaysAgo.getDate()-3);
          threeDaysAgo.setHours(0,0,0,0);
          let newdata = data.filter(item => {
            if(new Date(item.registration_date).getTime() >= threeDaysAgo.getTime()) return true;
            else return false
          })
          setFilterData(newdata);
          break;
        };
        case 2 : {
          const aWeekAgo = new Date();
          aWeekAgo.setDate(aWeekAgo.getDate()-7);
          aWeekAgo.setHours(0,0,0,0);
          let newdata = data.filter(item => {
            if(new Date(item.registration_date).getTime() >= aWeekAgo.getTime()) return true;
            else return false
          })
          setFilterData(newdata);
          break;
        };
        case 3: {
          const aMonthAgo = new Date();
          aMonthAgo.setDate(aMonthAgo.getDate()-30);
          aMonthAgo.setHours(0,0,0,0);
          let newdata = data.filter(item => {
            if(new Date(item.registration_date).getTime() >= aMonthAgo.getTime()) return true;
            else return false
          })
          setFilterData(newdata);
          break;
        }
        default: setFilterData(data)
      }
    };
    return (
        <>
        {
            loading ? <LoadingOutlined /> :
            <div>
                <div className='search'>
                    <div>
                      <input style={{padding: '3px'}} type="text" placeholder='Search user...' value={key} onChange={(e) => setKey(e.target.value)}/>
                      <Button type="primary" icon={<SearchOutlined />}  onClick={onclickButton}>
                          Search
                      </Button>
                    </div>
                    <div>
                    <Select
                      defaultValue = 'All'
                      style={{ width: 120 }}
                      onChange={handleChange}
                      options={[
                        { value: 0, label: 'All' },
                        { value: 1, label: '3 days ago' },
                        { value: 2, label: 'This week' },
                        { value: 3, label: 'This month'},
                      ]}
                    />
                    </div>
                </div>
                <Table columns={columns} dataSource={filterData} pagination={{ pageSize: 6}} loading = {loading}/>
            </div>
        }
        </>
        
    )
}