import React, { useState, useEffect } from 'react';
import { SearchOutlined, LoadingOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Table, message, Popconfirm } from 'antd';
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
    return (
        <>
        {
            loading ? <LoadingOutlined /> :
            <div>
                <div className='search'>
                    <input type="text" placeholder='Search user...' value={key} onChange={(e) => setKey(e.target.value)}/>
                    <Button type="primary" icon={<SearchOutlined />}  onClick={onclickButton}>
                        Search
                    </Button>
                </div>
                <Table columns={columns} dataSource={filterData} pagination={{ pageSize: 6}} loading = {loading}/>
            </div>
        }
        </>
        
    )
}