import './App.css';
import api from './api/axiosConfix';
import {useState, useEffect} from "react";
import Layout from "./components/layout";
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home'

function App() {

  const [movie, setMovies]=useState();
  const getMovies=async()=>{
    try{
      const response=await api.get('/api/v1/Movies');

      setMovies(response.data);
    } catch (err){
      console.log(err);
    }

  }



  useEffect(()=>{
    getMovies();
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home />}> </Route>


        </Route>
      </Routes>
    </div>
  );
}

export default App;
