// src/pages/UserPage.js
import { useEffect, useState } from 'react';
import { apiClient } from '../api/api';

function UserPage() {
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {

            const response = await apiClient.get('/user/profile');
            console.log("User profile data:", response.data);
            setFullName(response.data.fullName);
            setUserName(response.data.userName);
        } catch (error) {
            console.error("Error fetching user profile:", error.response?.data || error.message);
        } finally {
            setLoading(false); // Stop loading once request is complete
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
