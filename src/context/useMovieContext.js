import { useContext } from 'react';
import { MovieContext } from './MovieContextBase';

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
}
