import { COUNTRY_ISO } from './country-data';

export const getCountryISO3 = (countryCode: string) => {
    return COUNTRY_ISO[countryCode];
};
