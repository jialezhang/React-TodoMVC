import routes from './routes';
import {
  create as createRouter,
  HistoryLocation,
  HashLocation
} from 'react-router';

const location = process.env.NODE_ENV === 'production' ?
  HashLocation :
  HistoryLocation;

export default createRouter({ routes, location });
