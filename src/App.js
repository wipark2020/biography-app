import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import buildBioCards from './components/bioCard';
import BioData from './assets/bioData.json';
import { Snackbar, Alert } from '@mui/material';

function App() {
  const [biographies, setBiographies] = useState(BioData);
  const [favoriteBiographies, setFavoriteBiographies] = useState([]);
  const [favBioTotal, setFavBioTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOccupation, setFilterOccupation] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [sortOrder, setSortOrder] = useState(''); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterOccupation = (event) => {
    setFilterOccupation(event.target.value);
  };

  const handleFilterGender = (event) => {
    setFilterGender(event.target.value);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const toggleFavoriteBiography = (bio) => {
    setFavoriteBiographies(prev => {
      const isFavorite = prev.some(item => item.id === bio.id);
      if (isFavorite) {
        setSnackbarMessage(`${bio.name} has been removed from favorites.`);
        setSnackbarSeverity('warning');
      } else {
        setSnackbarMessage(`${bio.name} has been added to favorites.`);
        setSnackbarSeverity('success');
      }

      setSnackbarOpen(true);
      return isFavorite
        ? prev.filter(item => item.id !== bio.id)
        : [...prev, bio];
    });
  };
  

  useEffect(() => {
    setFavBioTotal(favoriteBiographies.length);
  }, [favoriteBiographies]);

  const filteredBiographies = biographies.filter((bio) => {
    return bio.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (filterOccupation ? bio.occupation === filterOccupation : true) &&
           (filterGender ? bio.gender === filterGender : true);
  }).map(bio => ({
    ...bio,
    isFavorite: favoriteBiographies.some(favBio => favBio.id === bio.id)
  }));

  if (sortOrder === 'name') {
    filteredBiographies.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === 'age') {
    filteredBiographies.sort((a, b) => a.age - b.age);
  }

  const resetFilters = () => {
    setSearchTerm('');
    setFilterOccupation('');
    setFilterGender('');
    setSortOrder('');
  };

  return (
    <div className='App'>
      <Header />
      <Snackbar className = 'alert' open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <h4>{filteredBiographies.length} Biographies</h4>
      <div>
        <input
          className='search-input'
          type='text'
          placeholder='Search biographies...'
          value={searchTerm}
          onChange={handleSearch} />
        <select className = "select" onChange={handleFilterOccupation} value={filterOccupation}>
          <option value="">Select Occupation</option>
          <option value="Actor">Actor</option>
          <option value="Athlete">Athlete</option>
          <option value="Musician">Musician</option>
        </select>
        <select className = "select" onChange={handleFilterGender} value={filterGender}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button className = "sort" onClick={() => setSortOrder('name')}>Sort by Name</button>
        <button className = "sort" onClick={() => setSortOrder('age')}>Sort by Age</button>
        <button className = "reset" onClick={resetFilters}>Reset Filters</button>
      </div>
      {filteredBiographies.length === 0 ? (
        <p>No biographies found</p>
      ) : (
        buildBioCards(filteredBiographies, toggleFavoriteBiography)
      )}
      <h4>{favBioTotal} Favorite Biographies</h4>
      {favBioTotal === 0 ? (
        <p>Click the star icon to add a biography to your favorites</p>
      ) : (
        buildBioCards(favoriteBiographies.map(bio => ({
          ...bio,
          isFavorite: true 
        })), toggleFavoriteBiography)
      )}
    </div>
  );
}

export default App;
