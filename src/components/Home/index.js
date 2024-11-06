import React, { useEffect, useState } from 'react';  
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../utils/store';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
    const { token, setToken, refreshToken, setRefreshToken } = useAuthStore();
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (!token && !refreshToken) {
            navigate('/login');
        }
    }, [token, refreshToken, navigate]); 

    useEffect(() => {
        // Tạo một async function bên trong
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/user/profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                if (data.statusCode === 200) {
                    setEmail(data?.data?.email);
                }
                else if (data.statusCode === 401) {
                    const refreshResponse = await fetch(`${BACKEND_URL}/refresh-token`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    });
                    const refreshData = await refreshResponse.json();
                    if (refreshData.statusCode === 200) {
                        setToken(refreshData?.data?.accessToken);
                    }
                    else {
                        setToken('');
                        setRefreshToken('');
                        navigate('/login');
                    }
                }
                else {
                    setToken('');
                    setRefreshToken('');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setToken('');
                setRefreshToken('');
                navigate('/login');
            }
        };
        if (token || refreshToken) {
            fetchProfile();
        };
    }, [token, refreshToken, navigate]);

    if (!token && !refreshToken) {
        return null;
    }
    const handleLogout = async () => {
        const response = await fetch(`${BACKEND_URL}/user/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.statusCode === 401) {
            const refreshResponse = await fetch(`${BACKEND_URL}/refresh-token`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
            const refreshData = await refreshResponse.json();
            if (refreshData.statusCode === 200) {
                setToken(refreshData?.data?.accessToken);
            }
            else {
                setToken('');
                setRefreshToken('');
                navigate('/login');
            }
        }
        else if (data.statusCode === 200) {  
            setToken('');
            setRefreshToken('');
            navigate('/login');
        }
    }

    return (
        <div className="home-container">
            <h1>Home</h1>
            <p>Email: {email}</p>
            <Button color="danger" variant="solid" onClick={handleLogout}>Logout</Button>  
        </div>
    );
};

export default Home;