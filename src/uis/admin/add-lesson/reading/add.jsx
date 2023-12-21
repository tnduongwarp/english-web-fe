import React, { useState, useEffect } from 'react';
import Api from '../../../../services/Api';
import { Form, Input, Select, Button,Card } from 'antd';
import  { SaveOutlined,CloseOutlined  } from '@ant-design/icons';
import {  notification } from 'antd';
import './style.css'
export default function AddReading(){
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [categoryId,setCategoryId] = useState(null);
    const [title, setTitle] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [form2] = Form.useForm();
    const [questions, setQuestions] = useState([{ content: '', A: '', B: '', C: '', D: '', answer: '' }]);
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
    // const checkValidQuestion = () => {
    //     const questionsInput = form2.getFieldsValue().questions;
    //     if(questionsInput.length === 0) return false;
    //     for(let i = 0; i< questionsInput.length; i++){
    //         if(!questionsInput[i].content || !questionsInput[i].A ||!questionsInput[i].B || !questionsInput[i].C || !questionsInput[i].D || !questionsInput[i].answer ) return false
    //     }
    //     console.log('here')
    //     return true;
    // }
    const canSave = () => {
        if(categoryId && title.length && paragraph.length && !loading  ) return true;
        else return false;
    }
    const saveLesson = () => {
        const questionsArr = form2.getFieldsValue().questions;
        console.log(questionsArr);
        setLoading(true);
        Api.addReadingLesson(categoryId,title,paragraph)
        .then(res => {
            console.log(res)
            // setLoading(false)
            if(res.data.error === false){
            const lessonId = res.data.data.id;
            Api.addQuiz(questionsArr, lessonId)
            .then(res => {
                setLoading(false)
                if(res.data.error === false){
                    api['success']({
                        message: 'Success',
                        description:
                        'You have add new lesson successfully!',
                        duration:2
                    });
                    setTitle('');
                    setParagraph('');
                    form2.resetFields();
                    // setQuestions([{ content: '', A: '', B: '', C: '', D: '' }])
                }
            })
            .catch(err => console.log(err))
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
            <Form.Provider
             >
            <div className='col-6'>
                
                <Form name='form1' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
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
                <Form.Item label="Paragraph" required  labelAlign='left'>
                    <Input.TextArea placeholder="Enter paragraph..." rows={15} value={paragraph} onChange={(e) => {setValue(e.target.value, setParagraph)}} />
                </Form.Item>
                
                </Form>
            </div>
            <div className='col-6'>
                <h6>Quiz</h6>
                <Form form={form2} name='quizForm' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
      <Form.List name='questions' initialValue={questions}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              
                <Card
                size="small"
                title = {null}
                key={key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(name);
                    }}
                  />
                }
              >
                <Form.Item
                  label={`Câu hỏi ${name + 1}`}
                  required
                  labelAlign='left'
                  name={[name, 'content']}
                  fieldKey={[fieldKey, 'content']}
                  style={{ marginBottom: '5px' }}
                  wrapperCol={{ span: 17 }}
                >
                  <Input placeholder="Enter question..." />
                </Form.Item>
                <div className='multichoice'>
                  <Form.Item label='A' name={[name, 'A']} style={{ marginBottom: '5px' }} required>
                    <Input placeholder="Enter A..." />
                  </Form.Item>
                  <Form.Item label='B' name={[name, 'B']} style={{ marginBottom: '5px' }} required>
                    <Input placeholder="Enter B..." />
                  </Form.Item>
                  <Form.Item label='C' name={[name, 'C']} style={{ marginBottom: '5px' }} required>
                    <Input placeholder="Enter C..." />
                  </Form.Item>
                  <Form.Item label='D' name={[name, 'D']} style={{ marginBottom: '5px' }} required>
                    <Input placeholder="Enter D..." />
                  </Form.Item>
                  <Form.Item label='Answer' name={[name, 'answer']} style={{ marginBottom: '5px' }} required>
                    <Input placeholder="Enter Answer..." />
                  </Form.Item>
                </div>
                
                </Card>
            ))}
            <Form.Item wrapperCol={{  span: 24 }} style={{marginTop:"5px"}}>
              <Button type="dashed" onClick={() => { add();  }} loading={loading} block>
                Add a Question
              </Button>
            </Form.Item>
          </>
        )}
        
      </Form.List>
        <Form.Item wrapperCol={{ offset: 20, span: 24 }} >
            <Button type="primary" icon = {<SaveOutlined />} disabled = {!canSave()} onClick={saveLesson} loading={loading}>
                Save
            </Button>
        </Form.Item>
    </Form>
            </div>
            </Form.Provider>
            </div>
        </>
    )
}
//setQuestions([...questions,{ content: '', A: '', B: '', C: '', D: '' }])