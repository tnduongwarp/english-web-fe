import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import Api from '../../../services/Api';
export default function LanguageManagement(){
    const [loading, setLoading] = useState([false,false,false]);
    const [languages, setLanguages] = useState([]);
    useEffect(() => {
        Api.getAllCategory().then(res => {
            setLanguages(res.data.data)
        })
    },[loading])
    const onChange = (checked, categoryId, index) => {
        console.log(checked, categoryId, index);
        let state = [false,false,false];
        state[index] = true;
        setLoading(state)
        Api.updateStatusLanguage(categoryId,checked)
        .then(res => {
            setLoading([false,false,false]);
            
        })
    }
    return (
        <>
            <h5>Enable or disable a Language</h5>
            <div className='row' style={{marginTop:'20px'}}>
                <div className='col-1'></div>
                <div className='col-6'>
                    {languages.map((language, index) => (
                        <div style={{padding:'10px'}}>
                            <span style={{marginRight:'10px'}}>{language.name}</span>
                            <Switch loading={loading[index]} checked={language.isActive === 'active'} onChange={(event) => onChange(event, language.id,index)} />
                        </div>
                        
                    ))}
                </div>
            </div>
        </>
    )
}