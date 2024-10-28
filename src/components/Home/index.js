import React, { useEffect } from 'react';  
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../utils/store';

const Home = () => {
    const { email, setEmail } = useAuthStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!email) {
            navigate('/login');
        }
    }, [email, navigate]); 

    if (!email) {
        return null;
    }
    return (
        <div className="home-container">
            <h1>Home</h1>
            <Button color="danger" variant="solid" onClick={() => {
                setEmail('');
            }}>Logout</Button>  
        </div>
    );
};

export default Home;