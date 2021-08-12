import React from "react";
import "./Login.css"
import ReactDOM from "react-dom";
import Category from "./Category";

const Form = ({onSubmit}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
        <form className='login--form' onSubmit={handleSubmit}>
            <div>
                <label className='login--form-label'>Tài khoản:</label>
                <input ref={usernameRef} type='text' className='login--form-input'/>
            </div>
            <div>
                <label className='login--form-label'>Mật khẩu:</label>
                <input ref={passwordRef} type='password' className='login--form-input'/>
            </div>
            <div>
                <button className='login--form-btn' type="submit">Đăng nhập</button>
            </div>
        </form>
    );
};

const Login = () => {
    const handleSubmit = data => {
        if (data.username == null || data.username.length < 6) {
            alert("Tài khoản phải lớn hơn hoặc bằng 6 ký tự");
        } else if (data.password == null || data.password.length < 6) {
            alert("Mật khẩu phải lớn hơn hoặc bằng 6 ký tự");
        } else {
            ReactDOM.render(
                <Category />,
                document.getElementById('root')
            );
        }
    };
    
    return (
        <div className='login'>
            <Form onSubmit={handleSubmit}/>
        </div>
    );
};

export default Login