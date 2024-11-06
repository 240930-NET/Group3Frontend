import { useEffect, useState } from 'react';
import { apiClient } from '../api/api.jsx';
import { setAuthToken } from '../api/api.jsx';

import './HomePage.css';

function HomePage() {
  const [bookshelfList, setBookshelfList] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [libraryId, setLibraryId] = useState(-1);
  const [addBookshelfName, setAddBookshelfName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBookshelves = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
          setAuthToken(token);
        }
        const userId = await apiClient.get('/user/userId');
        setUserId(userId.data);
        const user = await apiClient.get('/user/GetUserById/'+userId.data);
        const libraryId = user.data.libraryId;
        setLibraryId(libraryId);
        const response = await apiClient.get('/library/'+libraryId+'/bookshelves');
        const bookshelves = response.data;
        setBookshelfList(bookshelves);
    } catch (error) {
        console.error("On HomePage: Error fetching bookshelves:", error.response?.data || error.message);
    } finally {
        setLoading(false); 
    }
};

useEffect(() => {
  fetchBookshelves();
}, []);

const addBookshelf = async (e) => {
  e.preventDefault();
  try {
      const name = addBookshelfName;
      const response = await apiClient.post('/library/'+libraryId+'/bookshelves', {
        name
      });
      const newResponse = await apiClient.get('/library/'+libraryId+'/bookshelves');
      const bookshelves = newResponse.data;
      setBookshelfList(bookshelves);
      return response.data;
  } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to add a bookshelf.";
      throw new Error(errorMessage);
  }
}

const deleteBookshelf = async (e, bookshelfId, currentLibraryId) => {
  e.preventDefault();
  try {
      const response = await apiClient.delete('/library/'+currentLibraryId+'/bookshelves/'+bookshelfId);
      setBookshelfList((bookshelfList) => bookshelfList.filter(bookshelf=> bookshelf.bookshelfId !== bookshelfId));
      return response.data;
  } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete a bookshelf.";
      throw new Error(errorMessage);
  }

}

  return (
    <div className="home-page">
      <h1>Welcome to ABCDoubleE Book Tracker!</h1>
      <p>You can track all your books in this application.</p>
      <div className='bookshelves'>
        <h1>Bookshelves</h1>
        <div className='bookshelvesGrid'>
        {bookshelfList.map(bookshelf => (
          <div key={bookshelf.bookshelfId} className="bookshelf">
            <p>{bookshelf.name}</p>
            <button className='editButton'>Edit</button>
            <button className="deleteButton"onClick={(e) => deleteBookshelf(e, bookshelf.bookshelfId, libraryId)}>Delete</button>
            </div> ))} 
        </div>
        <div className='libraryFunctions'>
          <div className='addBookshelf'>
            <label htmlFor="addBookshelfInput">New Bookshelf:</label>
            <input id="addBookshelfInput" type="text" placeholder= "Enter the name of the bookshelf" 
            onChange={(e) => setAddBookshelfName(e.target.value)}/>
            <button className="addButton" onClick={addBookshelf}>Add Bookshelf</button>
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
