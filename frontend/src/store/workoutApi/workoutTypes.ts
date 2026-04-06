export interface Exercise {
  _id?: string;
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
  instructions: string;
  equipments: string[];
  [key: string]: unknown;
}

export interface WorkoutState {
  workouts: Exercise[];
  loading: boolean;
  error: string | null;
}