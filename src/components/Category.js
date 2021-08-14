import React, {useEffect, useState} from "react";
import './css/Category.css';
import Pagination from "./Pagination";
import AddCategory from "./AddCategory";
import ReactDOM from "react-dom";
import Login from "./Login";

const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    // headers: new Headers({'Access-Control-Allow-Origin': '*', 'cookie': '_admin_session_id=882009f8-aaf0-e1e0-fcdb-a3cd60222584'})
};

export function authHeader() {
    return {
        //'cookie': '_admin_session_id=ae71ad60-00a0-5ae5-ff65-2f32416b61c7',
        //'Content-Type': 'application/json'
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        "Access-Control-Allow-Credentials": 'true'
    };
}

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResult, setTotalResult] = useState(1);
    const [limit] = useState(10);

    useEffect(() => {
        // fetch(`http://localhost:8080/admin/categories?page=${currentPage}&limit=${limit}`, requestOptions)
        //    .then(res => res.json())
        //    .then(
        //        (result) => {
        //            setCategories(result.categories);
        //            setTotalResult(result.metadata.total)
        //        }
        //    )
        async function fetchMyAPI() {
            let response = await fetch(`http://localhost:8080/admin/categories?page=${currentPage}&limit=${limit}`, requestOptions)
            response = await response.json()
            setCategories(response.categories)
            setTotalResult(response.metadata.total)
        }
        fetchMyAPI()
    }, [currentPage]);

    // Change page
    function handleClick(pageNumber) {
        setCurrentPage(pageNumber);
    }

    const handleAddCategory = () => {
        ReactDOM.render(
            <AddCategory />,
            document.getElementById('root')
        );
    }

    const handleLogout = () => {
        ReactDOM.render(
            <Login />,
            document.getElementById('root')
        );
    }

    return (
        <div>
            <div className='action--btn'>
                <button className='login--form-btn' onClick={handleAddCategory}>
                    Tạo mới</button>
                <button className='login--form-btn' onClick={handleLogout}>
                    Đăng xuất</button>
            </div>
            <table className='Table'>
                <thead>
                <tr>
                    <th className='headerIndex'>STT</th>
                    <th className='headerName'>Tên</th>
                    <th className='headerDescription'>Mô tả</th>
                </tr>
                </thead>
                <tbody>
                {
                    categories.map((item, index) => (
                        <tr key={item.id}>
                            <td className='lineIndex'>{item.id}</td>
                            <td className='lineName'>{item.name}</td>
                            <td className='lineDescription'>{item.description}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <Pagination
                limit={limit}
                totalPosts={totalResult}
                handleClick={handleClick}
            />
        </div>
    );
};

export default (CategoryList);