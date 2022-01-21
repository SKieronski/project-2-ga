import React, { useEffect, useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

const App = () => {
  //Our event data will use hooks to update without page refreshes
  const [eventData, setEventData] = useState(null);
  
  //Init Form state
  const initFormState = {
    queryType: "",
    searchString: "",
  }
  
  // Form state
  const [formState, setFormState] = useState("Chicago");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formState);
    //Reset the form
    setFormState(initFormState);
  }

  //query options needed to fetch event data
  const queryOptions = {
    client_id : process.env.REACT_APP_SEATGEEK_CLIENT_ID,
    client_secret : process.env.REACT_APP_SEATGEEK_CLIENT_SECRET,
  }
  
  //Fetch the event info
  const getEventInfo = () => {
    fetch(`https://api.seatgeek.com/2/events?venue.city=Chicago&taxonomies.name=concert&client_id=${queryOptions.client_id}&client_secret=${queryOptions.client_secret}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      setEventData(response);
    })
    .catch(err => {
      console.error(err);
    });
  };

  useEffect(getEventInfo, []);

  return (
    <div className="App">
      <header className="App-header">
        <SearchForm handleSubmit={handleSubmit} />
      </header>
      <SearchResults eventData={eventData} />
    </div>
  );
}

export default App;
