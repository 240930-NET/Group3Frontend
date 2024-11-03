// src/pages/UserPage.js
import { useEffect, useState } from 'react';
import { apiClient } from '../api/api';
import { setAuthToken } from '../api/api.jsx';


function UserPage() {
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
              setAuthToken(token);
              //console.log("on UserPage: Token set on reload:", token);
            }
            const response = await apiClient.get('/user/profile');
            setFullName(response.data.fullName);
            setUserName(response.data.userName);
        } catch (error) {
            console.error("On UserPage: Error fetching user profile:", error.response?.data || error.message);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome, {fullName || 'User'}!</h1>
            <p>Username: {userName}</p>
            <p>This is your user page. Here you can see your profile information and other details.</p>
        </div>
    );
}

export default UserPage;
