import React, { useState } from 'react';
import Admincard from './admin_card';
import { LoginSocialGoogle } from 'reactjs-social-login';
import UserCard from './user_card';


const Home = () => {
    const [data, setData] = useState([])
    return (
        <div>
            <LoginSocialGoogle
            className='sign_in'
                client_id={"195821229692-gvlfn1hqlol7humtcgrls6agid4ucc7l.apps.googleusercontent.com"}
                access_type="offline"
                onResolve={({ provider, data }) => {
                    console.log(data);
                    setData(data)
                    document.querySelector('.sign_in').style.display = 'none'
                }}
                onReject={(err) => {
                    console.log(err);
                }}
            >
                <button>Sign in with Google</button>
            </LoginSocialGoogle>
            {(data.sub == '103929406225523855212') ?
                <Admincard /> : <UserCard />
            }
        </div>
    );
}

export default Home;
