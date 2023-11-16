import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'
const Admincard = () => {
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
    function log_out() {
        localStorage.setItem('data', '')
        window.location.reload()
    }

    let priceVal = () => {
        let valuesDisplays = document.querySelectorAll('.num');
        let interval = 2000
        valuesDisplays.forEach((valuesDisplay) => {
            let startValue = 0;
            let endValue = parseInt(valuesDisplay.getAttribute("data-val"));
            let duration = Math.floor(interval / endValue);
            let counter = setInterval(function () {
                startValue += 1;
                valuesDisplay.textContent = '$' + startValue
                if (startValue == endValue) {
                    clearInterval(counter)
                }
            }, duration);
        });
    }
    setTimeout(function () {
        priceVal();
    }, 1);
    return (
        <div>
            <nav>
                <input type="checkbox" id='check' />
                <label htmlFor="check" className='checkbtn'>
                    <BiMenu />
                </label>
                <label className='logo'>XS style</label>
                <ul className='navbar'>
                    <li><a className='active' href="#">Home</a></li>
                    <li><a href="#">Product</a></li>
                    <li><a href="#">Korzina</a></li>
                    <li><a href="#">Like</a></li>
                    {
                        (JSON.parse(localStorage.getItem('data'))) &&
                        <span>
                            <li><img src={JSON.parse(localStorage.getItem('data')).picture} alt="" /></li>
                            <li><a href="#">{JSON.parse(localStorage.getItem('data')).given_name}</a></li>
                            <li onClick={() => log_out()}><a href="#">log out</a></li>
                        </span>
                    }
                </ul>
            </nav>
            <div className='add_head'>
                <input onInput={(e) => setName(e.target.value)} type="text" placeholder='Name' />
                <input onInput={(e) => setPrice(Number(e.target.value))} type="number" placeholder='Narxi' />
                <input onInput={(e) => setImg(e.target.value)} type="text" placeholder='Img' />
                <button onClick={() => bos()}>+Add</button>
            </div>
            <div className='container'>
                {
                    mas.map((item, index) => {
                        return (
                            <div className='card'>
                                <div className="imgBx">
                                    <img src={item.img} alt="" />
                                    <ul className='action'>
                                        <li>
                                            <AiFillHeart />
                                            <span>Add to Wishlist</span>
                                        </li>
                                        <li>
                                            <AiOutlineShoppingCart />
                                            <span>Add to Card</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content">
                                    <div className="productName">
                                        <h3>{item.name}</h3>
                                    </div>
                                    <div className="price_rating">
                                        <h3><span className='num' data-val={item.price}>$0</span></h3>
                                    </div>
                                    <button className='del_btn' onClick={() => bos2(item.id)}>delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Admincard;
// 195821229692-gvlfn1hqlol7humtcgrls6agid4ucc7l.apps.googleusercontent.com
// https://api.npoint.io/9197a40bf34fc9e4361d