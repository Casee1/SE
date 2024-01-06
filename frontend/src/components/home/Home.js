import Hero from '../hero/Hero';
import { useUser } from '../context/UserContext';

const Home = ({movies}) => {
  const { username } = useUser();
  console.log('Current username:', username);
  return (
    <Hero movies = {movies} />
  )
}

export default Home