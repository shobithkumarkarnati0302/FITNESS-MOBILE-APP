import axios from 'axios';
import { API_NINJAS_KEY } from '@env';

const getExercisesByMuscle = async muscle => {
  const response = await axios.get(
    `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
    {
      headers: {
        'X-Api-Key': API_NINJAS_KEY,
      },
    },
  );
  return response.data;
};

export default getExercisesByMuscle;
