// src/pages/UserPage.js
import { useEffect, useState } from 'react';
import axios from 'axios';

function UserPage() {
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await axios.get('/api/user/profile');
            setFullName(response.data.fullName);
            setUserName(response.data.userName);
          } catch (error) {
            console.error('Error fetching user profile:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserProfile();
      }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome, {fullName || 'User'}!</h1>
            <p>This is your user page. Here you can see your profile information and other details.</p>
        </div>
    );
}

export default UserPage;
