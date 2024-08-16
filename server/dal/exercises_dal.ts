import { query } from './data_access';
import {Exercise} from '../models/exercise'

export const getExercisesByUser = async (userId: string) => {
    const results: Exercise[] = await query('SELECT * FROM "trAIn".exercises WHERE user_id = $1 AND NOT is_deleted', [userId]);
    
    return results
}