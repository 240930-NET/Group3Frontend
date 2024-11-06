import { useEffect, useState } from 'react';
import { apiClient } from '../api/api.jsx';
import { setAuthToken } from '../api/api.jsx';

import './HomePage.css';

function HomePage() {
  const [bookshelfList, setBookshelfList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookshelves = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
          setAuthToken(token);
        }
        //Change endpoint to get user's library id
        const userId = await apiClient.get('/user/userId');
        console.log("User ID is: "+userId.data);
        const user = await apiClient.get('/user/GetUserById/'+userId.data);
        const libraryId = user.data.libraryId;
        console.log("Library ID is: "+libraryId);
        const response = await apiClient.get('/library/'+libraryId+'/bookshelves');
        const bookshelves = response.data;

        const bookshelfList = bookshelves.map(bookshelf => 
            <div key = {bookshelf.bookshelfId} className='bookshelf'>
                <p>{bookshelf.name}</p>
                <button>Edit</button>
            </div>);
        setBookshelfList(bookshelfList);
    } catch (error) {
        console.error("On HomePage: Error fetching bookshelves:", error.response?.data || error.message);
    } finally {
        setLoading(false); 
    }
};

useEffect(() => {
    fetchBookshelves();
}, []);

  return (
    <div className="home-page">
      <h1>Welcome to ABCDoubleE Book Tracker!</h1>
      <p>You can track all your books in this application.</p>
      <div className='bookshelves'>
        <h1>Bookshelves</h1>
        <div className='bookshelvesGrid'>{bookshelfList}</div>
        <div>
          <button>Add Bookshelf</button>
          <button>Search for a book</button>
          <button className='deleteButton'>Delete Bookshelf</button>
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
