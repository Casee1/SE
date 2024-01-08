import Hero from '../hero/Hero';
import Recommendations from '../recomandations/Recommendations';
import { useUser } from '../context/UserContext';

const Home = ({movies, recommendations}) => {
  const {username} = useUser();
  //console.log('Current username:', username);
  return (
      <>
        <Hero movies={movies}/>
        {/*<Recommendations movies={recommendations}/>*/}
      </>
  )
}

export default Home