import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons'
const UserCard = () => {
    const [mas, setMas] = useState([])


    useEffect(() => {
        run()
    }, []);


    function run() {
        axios.get("https://65003fc418c34dee0cd495f6.mockapi.io/api/v1/users")
            .then(ress => {
                console.log(ress.data);
                setMas(ress.data)
            })
    }
    return (
        <div>
        {
            mas.map((item, index) => {
                return (
                    <div className='card'>
                        <img src={item.img} alt="" />
                        <h2>{item.name}</h2>
                        <h2>{item.price} $</h2>
                        <h2>| {item.id} |</h2>
                    </div>
                )
            })
        }
    </div>
    );
}

export default UserCard;
