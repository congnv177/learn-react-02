import React, {useState} from "react";
import "./css/AddCategory.css";
import axios from 'axios';
import ReactDOM from "react-dom";
import Category from "./Category";

const AddCategory = () => {
    const [values, setValues] = useState({
        name: '',
        code: '',
        description: '',
    });

    const handleSave = async (e) => {
        e.preventDefault();

        const {name, code, description} = values;
        const category = {name, code, description};
        await axios.post('http://localhost:8080/admin/categories', category, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:8080',
                    "Access-Control-Allow-Credentials": 'true'
                }
            })
            .then((response) => {
                ReactDOM.render(
                    <Category />,
                    document.getElementById('root')
                );
            })
            .catch((error) => {

            })
    }

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    }

    const handleBack = () => {
        ReactDOM.render(
            <Category />,
            document.getElementById('root')
        );
    }

    return (
        <div className="category--form">
            <div className='add-category--form' >
                <div>
                    <label className='add-form-label'>Tên loại</label>
                    <input className='add--form-input' type="text" value={values.name} onChange={handleChange('name')}/>
                    <label className='add-form-label'>Mã</label>
                    <input className='add--form-input' type="text" value={values.code} onChange={handleChange('code')}/>
                    <label className='add-form-label'>Mô tả</label>
                    <input className='add--form-input' type="text" value={values.description} onChange={handleChange('description')}/>
                </div>
                <div className='action--btn'>
                    <button className='login--form-btn' type="submit" onClick={handleSave}>Lưu</button>
                    <button className='login--form-btn' type="submit" onClick={handleBack}>Thoát</button>
                </div>
            </div>
        </div>
    )
}

export default AddCategory;