import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Category from "./Category";
import axios from "axios";
import './css/DetailCategory.css';
import Login from "./Login";

const requestOptions = {
    method: 'GET',
    headers: authHeader(),
};

export function authHeader() {
    return {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        "Access-Control-Allow-Credentials": 'true'
    };
}

const DetailCategory = ({ id }) => {
    const [category, setCategory] = useState({
        name: '',
        code: '',
        description: '',
    });

    useEffect(() => {
        fetch(`http://localhost:8080/admin/categories/${id}`, requestOptions)
           .then(res => res.json())
           .then(
               (result) => {
                   setCategory(result);
               }
           )
    }, []);

    const handleBack = () => {
        ReactDOM.render(
            <Category />,
            document.getElementById('root')
        );
    }

    const handleChange = name => e => {
        setCategory({ ...category, [name]: e.target.value });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const {name, code, description} = category;
        const categoryUpdate = {name, code, description};
        await axios.put(`http://localhost:8080/admin/categories/${id}`, categoryUpdate, {
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

    const handleLogout = () => {
        ReactDOM.render(
            <Login />,
            document.getElementById('root')
        );
    }

    return (
        <div className="category--form">
            <div className='detail-category--form' >
                <div>
                    <label className='detail-form-label'>Tên loại</label>
                    <input className='detail--form-input' type="text" value={category.name} onChange={handleChange('name')}/>
                    <label className='detail-form-label'>Mô tả</label>
                    <input className='detail--form-input' type="text" value={category.description} onChange={handleChange('description')}/>
                </div>

                <div className='detail-action--btn'>
                    <button className='login--form-btn' type="submit" onClick={handleUpdate}>Cập nhật</button>
                    <button className='login--form-btn' type="submit" onClick={handleBack}>Quay lại</button>
                </div>
            </div>
            <div className='logout-action--btn'>
                <button className='login--form-btn' type="submit" onClick={handleLogout}>Đăng xuất</button>
            </div>
        </div>
    );
}

export default DetailCategory;