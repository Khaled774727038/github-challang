import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('Khaled774727038');
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}?client_id=f2f9fdf58f6c20117bcf&client_secret=8b7f0f7fd90becbbb189dc1fab45bd631d7a7b9c&sort=created`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(userData && userData.repos_url);
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    if (userData) {
      fetchRepositories();
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${username}?client_id=f2f9fdf58f6c20117bcf&client_secret=8b7f0f7fd90becbbb189dc1fab45bd631d7a7b9c&sort=created`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <h1>GitHub User Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
      </form>
      {userData && (
        <div>
          <h2>User Data</h2>
          <p>Username: {userData.login}</p>
          <p>Name: {userData.name}</p>
          <p>Location: {userData.location}</p>
          <p>Public Repositories: {userData.public_repos}</p>
          <img src={userData.avatar_url} alt="User Avatar" style={{ width: '100px', borderRadius: '50%' }} />
        </div>
      )}
      <h2>Repositories</h2>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
