import React, { useState, useEffect } from 'react';
import Api from '../../../../services/Api';
import { Form, Input, Select, Button,Card,Carousel  } from 'antd';
import  { SaveOutlined,CloseOutlined  } from '@ant-design/icons';
import {  notification } from 'antd';

export default function AddVocabulary(){
    const carouselRef = React.createRef();
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [categoryId,setCategoryId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [questions, setQuestions] = useState([{ content: '', A: '', B: '', C: '', D: '', answer: '' }]);
    const [word,setWord] = useState([{original:'', pronunciation:'', meaning:''}])
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    useEffect(() => {
        document.title = "Add Vocabulary"
      },[]);
    const nextSlide = () => {
        console.log(form1.getFieldsValue())
    carouselRef.current.next();
  };

  const prevSlide = () => {
    console.log(form2.getFieldsValue())
    carouselRef.current.prev();
  };
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
    const canSave = () => {
        if(categoryId && title.length && content.length && !loading  ) return true;
        else return false;
    }
    const saveLesson = () => {
        const words = form1.getFieldsValue().words;

        const questionsArr = form2.getFieldsValue().questions;
        console.log(questionsArr);
        setLoading(true);
        Api.addVocabularyLesson(categoryId,title,content, words)
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
                    setContent('');
                    form2.resetFields();
                    form1.resetFields();
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
            <h5 style={{marginBottom:'30px'}}>Add Vocabulary Lesson</h5>
            <Form.Provider>
                <Carousel ref={carouselRef}>
                    <div>
                    <div className='row'>
                        
                            <div className='col-6'>
                                
                                <Form name='form1' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                                <Form.Item label="Language" wrapperCol={{span: 10}} required labelAlign='left'>
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
                                    <Input placeholder="Enter content..." value={content} onChange={(e) => {setValue(e.target.value, setContent)}} />
                                </Form.Item>
                                
                                </Form>
                            </div>
                            <div className='col-6'>
                                <h6>Word</h6>
                                <Form form={form1} name='wordForm' labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                                    <Form.List name='words' initialValue={word}>
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
                                                label={`New word`}
                                                required
                                                labelAlign='left'
                                                name={[name, 'original']}
                                                fieldKey={[fieldKey, 'original']}
                                                style={{ marginBottom: '5px' }}
                                               
                                                >
                                                <Input placeholder="Enter new word..." />
                                                </Form.Item>
                                                
                                                <Form.Item label='Pronunciation' labelAlign='left' name={[name, 'pronunciation']} style={{ marginBottom: '5px' }} required>
                                                    <Input placeholder="Enter Pronunciation..." />
                                                </Form.Item>
                                                <Form.Item label='Meaning' labelAlign='left' name={[name, 'meaning']} style={{ marginBottom: '5px' }} required>
                                                    <Input placeholder="Enter Meaning..." />
                                                </Form.Item>
                                                </Card>
                                            ))}
                                            <Form.Item wrapperCol={{  span: 24 }} style={{marginTop:"5px"}}>
                                            <Button type="dashed" onClick={() => { add();  }} loading={loading} block>
                                                Add a new word
                                            </Button>
                                            </Form.Item>
                                        </>
                                        )}
                                        
                                    </Form.List>
                                    <Form.Item wrapperCol={{ offset: 20, span: 24 }} >
                                        <Button type='primary' onClick={nextSlide}>Next</Button>
                                        {/* <Button type="primary" icon = {<SaveOutlined />} disabled = {!canSave()} onClick={saveLesson} loading={loading}>
                                            Save
                                        </Button> */}
                                    </Form.Item>
                                </Form>
                            </div>
                        
                    </div>
                    </div>
                    <div>
                        <div className='col-6 ' style={{marginLeft:'300px'}}>
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
                            <Button type='primary' onClick={prevSlide}>Pre</Button>
                    </div>                     
                </Carousel>
            </Form.Provider>
        </>
    )
}