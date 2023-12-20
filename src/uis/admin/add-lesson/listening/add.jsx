import React, { useState, useEffect } from 'react';
import Api from '../../../../services/Api';
import { Form, Input, Select, Button } from 'antd';
import  { SaveOutlined } from '@ant-design/icons';
import {  notification } from 'antd';

const validUrl = new RegExp(`(?:http(?:s)?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'<> #]+)`);
export default function AddListening(){
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [categoryId,setCategoryId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [visile, setVisible] = useState(false);
    useEffect(() => {
        setLoading(true)
        Api.getAllCategory().then(res => {
            setLanguages(res.data.data)
        })
        setLoading(false)
    },[]);

    const setValue = (value,setValueFunc) => {
      setValueFunc(value);
    }
     const onclickView = () => {
        setVisible(!visile);
     }
     const canSave = () => {
      if(categoryId && title.length && content.length && validUrl.test(url) && !loading) return true;
      else return false;
     }
     const saveLesson = () => {
      setLoading(true);
      Api.addListeningLesson(categoryId,title,content,url)
      .then(res => {
        console.log(res)
        setLoading(false)
        if(res.data.error === false){
          api['success']({
            message: 'Success',
            description:
              'You have add new lesson successfully!',
              duration:2
          });
          setTitle('');
          setContent('');
          setUrl('');
          setVisible(false)
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        api['error']({
          message: 'Failed',
          description:
            err.response.data.message,
            duration:2
        });
      });
     }
    return (
      <>
        {contextHolder}
        <h5 style={{marginBottom:'30px'}}>Add Listening Lesson</h5>
        <div className='row'>
          <div className='col-7'>
            <Form  labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Language" wrapperCol={{span: 8}} required labelAlign='left'>
                <Select 
                  placeholder="--Select language"
                  options={languages.map(item => {
                      return {
                          value: item.id,
                          label: item.name
                      }
                  })}
                  onChange={(value) => {setValue(value,setCategoryId)}}
                >
                </Select>
              </Form.Item>
              <Form.Item label="Title" required  labelAlign='left'>
                <Input placeholder="Enter title..." value={title} onChange={(e) => {setValue(e.target.value, setTitle)}}/>
              </Form.Item>
              <Form.Item label="Content" required  labelAlign='left'>
                <Input.TextArea placeholder="Enter content..." rows={4} value={content} onChange={(e) => {setValue(e.target.value, setContent)}} />
              </Form.Item>
              <Form.Item label="URL" name="url" required labelAlign='left'>
                  <div style={{display: "flex", gap:"5px"}}>
                      <Input placeholder="Enter URL..." value={url} onChange={(e) => {setValue(e.target.value, setUrl)}}/>
                      <Button type="primary" disabled = {!validUrl.test(url)} onClick={onclickView}>{visile ? 'Turn off view': 'View'}</Button>
                  </div>
                
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4, span: 24 }} >
                <Button type="primary" icon = {<SaveOutlined />} disabled = {!canSave()} onClick={saveLesson} loading={loading}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className='col-5'>
            <div style={{width: '500px', height:'400px', display: visile ? 'block' : 'none'}} id='video-review'>
              <iframe
                    title={title}
                    width="100%"
                    height="100%"
                    src={url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </div>
      </>
    )
}