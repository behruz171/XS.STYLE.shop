import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoginSocialGoogle } from 'reactjs-social-login'
import {GoogleLoginButton} from 'react-social-login-buttons'

const Card = () => {
    const [mas, setMas] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')

    useEffect(() => {
        run()
    }, []);

    function bos() {
        if (name === '' || img === '' || price == '') {
            console.log(undefined);
        } else {
            axios.post('https://65003fc418c34dee0cd495f6.mockapi.io/api/v1/users', { 'name': name, 'img': img, 'price': price })
                .then(ress => {
                    run()
                    console.log(ress);
                })
        }
    }

    function bos2(id) {
        axios.delete(`https://65003fc418c34dee0cd495f6.mockapi.io/api/v1/users/${id}`)
            .then(ress => {
                run()
                console.log(ress);
            })
    }

    function run() {
        axios.get("https://65003fc418c34dee0cd495f6.mockapi.io/api/v1/users")
            .then(ress => {
                console.log(ress.data);
                setMas(ress.data)
            })
    }
    return (
        <div>
            <input onInput={(e) => setName(e.target.value)} type="text" placeholder='Name' />
            <input onInput={(e) => setPrice(Number(e.target.value))} type="number" placeholder='Narxi' />
            <input onInput={(e) => setImg(e.target.value)} type="text" placeholder='Img' />
            <button onClick={() => bos()}>+Add</button>
            <LoginSocialGoogle
                client_id={"195821229692-gvlfn1hqlol7humtcgrls6agid4ucc7l.apps.googleusercontent.com"}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                    console.log(data);
                }}

                onReject={(err) => {
                    console.log(err);
                }}
            >
                <GoogleLoginButton></GoogleLoginButton>
            </LoginSocialGoogle>
            {
                mas.map((item, index) => {
                    return (
                        <div className='card'>
                            <img src={item.img} alt="" />
                            <h2>{item.name}</h2>
                            <h2>{item.price} $</h2>
                            <h2>| {item.id} |</h2>
                            <button onClick={() => bos2(item.id)}>deleta</button>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Card;

// https://api.npoint.io/9197a40bf34fc9e4361d