import React, { useState, useEffect } from 'react';
import { SearchOutlined, LoadingOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Table, message, Popconfirm, Select } from 'antd';
import Api from '../../../services/Api';
import './style.css';

export default function ListLesson(){
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([]);
    const [key, setKey] = useState('');
    const [languages, setLanguages] = useState([]);
    const [categoryId,setCategoryId] = useState(null);
    const [courseId,setCourseId] = useState(null)
    useEffect(() => {
        setLoading(true)
        Api.getAllCategory().then(res => {
            setLanguages(res.data.data)
        })
        setLoading(false)
    },[])
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: 'Title',
          dataIndex: 'title',
        },
        {
          title: 'Content',
          dataIndex: 'content',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => ( 
              <Popconfirm
                  title="Delete lesson"
                  description="Are you sure to delete this lesson?"
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
      const onclickButton = () => {
        let newdata = data.filter(item => (item.title.includes(key) || item.content.includes(key)) );
        setFilterData(newdata)
    }
    const handleChangeLanguage = (value) => {
        setCategoryId(value)
    }
    const handleChangeListening = (value) => {
        setCourseId(value)
    };
    const onClickShow = (e) => {
        e.preventDefault();
        console.log(categoryId,courseId)
        if(categoryId && courseId){
            setKey('')
            Api.getListLessonForAdmin(courseId, categoryId)
            .then( res => {
                console.log(res)
                const tableData = res.data.data.map(item => {
                    return {
                        key:item.id,
                        id: item.id,
                        title: item.title,
                        content: item.content,
                    }
                });
                setData(tableData);
                setFilterData(tableData)
            })
        }
    }
    return (
        <div>
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
                      defaultValue = '--Select Language--'
                      style={{ width: 200, marginRight:'20px' }}
                      onChange={handleChangeLanguage}
                      options={languages.map(item => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                      })}
                    />
                    <Select
                      defaultValue = '--Select skill--'
                      style={{ width: 200 }}
                      onChange={handleChangeListening}
                      options={[
                        { value: 1, label: 'Vocabulary' },
                        { value: 2, label: 'Reading' },
                        { value: 3, label: 'Listening'},
                      ]}
                    />
                     <Button type="primary" icon={<SearchOutlined />}  onClick={onClickShow}>
                          Show
                      </Button>
                    </div>
                </div>
                <Table columns={columns} dataSource={filterData} pagination={{ pageSize: 6}} loading = {loading}/>
            </div>
            }
        </div>
    )
}