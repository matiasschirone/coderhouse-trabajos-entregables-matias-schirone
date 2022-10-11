import mongoose from 'mongoose';
import { mongodb } from './config.js';

mongoose.set('useFindAndModify', false);
mongoose.connect(mongodb.URI, {
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));