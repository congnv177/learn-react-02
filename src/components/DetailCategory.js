import React, {useContext, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Category from "./Category";
import axios from "axios";
import './css/DetailCategory.css';
import Login from "./Login";
import UserContext from "../UserContext";

const DetailCategory = ({ id }) => {
    const user = useContext(UserContext);
    const [category, setCategory] = useState({
        name: '',
        code: '',
        description: '',
    });
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        "Access-Control-Allow-Credentials": 'true',
        'Authorization': `Bearer ${user.accessToken}`,
    }

    useEffect(() => {
        fetch(`http://localhost:8080/admin/categories/${id}`, { headers })
           .then(res => res.json())
           .then(
               (result) => {
                   setCategory(result);
               }
           )
    }, []);

    const handleBack = () => {
        ReactDOM.render(
            <UserContext.Provider value={user}>
                <Category />
            </UserContext.Provider>,
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
                "Access-Control-Allow-Credentials": 'true',
                'Authorization': `Bearer ${user.accessToken}`,
            }
        })
        .then((response) => {
            ReactDOM.render(
                <UserContext.Provider value={user}>
                    <Category />
                </UserContext.Provider>,
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