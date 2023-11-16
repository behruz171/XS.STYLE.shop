import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'
import '../App.css'
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
    function log_out(){
        localStorage.setItem('data', '')
        window.location.reload()
    }
    let valuesDisplays = document.querySelectorAll('.num');
    let interval = 2000
    valuesDisplays.forEach((valuesDisplay)=>{
        let startValue = 0;
        let endValue = parseInt(valuesDisplay.getAttribute("data-val"));
        let duration = Math.floor(interval/endValue);
        let counter = setInterval(function(){
            startValue += 1;
            valuesDisplay.textContent = '$'+ startValue
            if(startValue == endValue){
                clearInterval(counter)
            }
        }, duration);
    });
    return (
        <>
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
                            <li><img src={JSON.parse(localStorage.getItem('data')).picture} alt=""/></li>
                            <li><a href="#">{JSON.parse(localStorage.getItem('data')).given_name}</a></li>
                            <li onClick={()=>log_out()}><a href="#">log out</a></li>
                        </span>
                    }
                </ul>
            </nav>
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
                                        <h3><span className='num' data-val={item.price}>0</span></h3>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default UserCard;
{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg> */ }
{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg> */ }