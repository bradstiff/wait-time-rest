import * as Yup from 'yup';
import Location from 'react-app-location';

const isNullableDate = Yup.string().test('is-date', '${path}:${value} is not a valid date', date => !date || !isNaN(Date.parse(date))); 
const string = Yup.string();

const Locations = {
    Home: new Location('/'),
    WaitTime: new Location('/resorts/:slug?', { slug: string.required() }, { date: isNullableDate }), //validate the date but don't parse it; we will parse it later as utc
};

export default Locations;
