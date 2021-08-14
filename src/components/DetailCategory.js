import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Category from "./Category";

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
    const [category, setCategory] = useState([]);

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch(`http://localhost:8080/admin/categories/${id}`, requestOptions)
            response = await response.json()
            setCategory(response)
        }
        fetchMyAPI()
    });

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
                    <div>
                        <span>Tên danh mục: {category.name}</span>
                    </div>
                    <div>
                        <span>Mô tả danh mục: {category.description}</span>
                    </div>
                </div>

                <div className='action--btn'>
                    {/*<button className='login--form-btn' type="submit" onClick={handleSave}>Lưu</button>*/}
                    <button className='login--form-btn' type="submit" onClick={handleBack}>Quay lại</button>
                </div>
            </div>
        </div>
    );
}

export default DetailCategory;