import { useEffect, useState } from 'react';
import { apiClient } from '../api/api';
import { setAuthToken } from '../api/api.jsx';


function UserPage() {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState('');


    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
              setAuthToken(token);
              //console.log("on UserPage: Token set on reload:", token);
            }
            const response = await apiClient.get('/user/profile');
            setUserId(response.data.userId);          
            setFullName(response.data.fullName);
            setUserName(response.data.userName);
        } catch (error) {
            console.error("On UserPage: Error fetching user profile:", error.response?.data || error.message);
        } finally {
            setLoading(false); 
        }
    };

    const deleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                setAuthToken(token);
            }
            const response = await apiClient.delete('/user/DeleteUser');
            setUserId(response.data.userId);
            alert("Account successfully deleted");
        }
        catch (error) {
            console.error("Error deleting account:", error.response?.data || error.message)
            alert("There was a problem deleting your account. Please try again");
        }
    };

    const updateAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                setAuthToken(token);
            }
            // Create the user data object
            const userData = {
                userName: userName,  // Using the existing userName state
                fullName: fullName,  // Using the existing fullName state
                password: password    // Using the existing password state
            };
            console.log('erin test', userData);

            // Assuming userId is stored in state or passed as a prop
            const response = await apiClient.put('/user/UpdateUser', userData);
            setUserId(response.data.userId);

            if (response.status === 200) {
                alert("Account successfully updated");
            }
        }
        catch (error) {
            console.error("Error updating account:", error.response?.data || error.message)
            alert("There was a problem updating your account. Please try again");
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
            <button onClick={deleteAccount} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}> 
                Delete Profile
            </button>
            <button onClick={() =>setIsModalOpen(true)} style={{ marginTop: '20px', backgroundColor: 'green', color: 'white'}}>
                Edit Profile
            </button>

            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    width: '250px',
                    border: '1px solid #ccc'
                }}>
                    <h2>Edit Profile</h2>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button onClick={updateAccount}>Save Changes</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
            )}





        </div>
    );


}

export default UserPage;