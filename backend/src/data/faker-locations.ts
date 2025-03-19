import { 
  Faker, faker, fakerAR, fakerCS_CZ, fakerDE, fakerDE_AT, fakerDE_CH, fakerEL, fakerEN, fakerEN_AU, fakerEN_GB, fakerEN_IN, fakerEN_US, 
  fakerES, fakerES_MX, fakerFA, fakerFI, fakerFR, fakerHE, fakerHR, fakerHY, fakerIT, fakerJA, fakerKO, 
  fakerMK, fakerNE, fakerNL, fakerPL, fakerPT_BR, fakerPT_PT, fakerRO, fakerRU, fakerSK, fakerSR_RS_latin, 
  fakerUK, fakerVI, fakerZH_CN 
} from "@faker-js/faker";

const fakerLocales: { [key: string]: Faker } = {
  "Argentina": fakerES, "France": fakerFR, "Spain": fakerES,
  "England": fakerEN_GB, "Brazil": fakerPT_BR, "Portugal": fakerPT_PT,
  "Netherlands": fakerNL, "Italy": fakerIT, "Germany": fakerDE,
  "Belgium": fakerNL, "Uruguay": fakerES, "Colombia": fakerES,
  "Croatia": fakerHR, "Morocco": fakerFR, "Japan": fakerJA,
  "United States": fakerEN_US, "Senegal": fakerFR, "Iran": fakerFA,
  "Mexico": fakerES_MX, "Switzerland": fakerDE_CH, "Algeria": fakerFR,
  "South Korea": fakerKO, "Poland": fakerPL, "Tunisia": fakerFR,
  "Ecuador": fakerES, "Saudi Arabia": fakerAR, "Ukraine": fakerUK,
  "Serbia": fakerSR_RS_latin, "Nigeria": fakerEN, "Australia": fakerEN_AU,
  "Romania": fakerRO, "Czech Republic": fakerCS_CZ, "Ghana": fakerEN,
  "Costa Rica": fakerES, "Cameroon": fakerFR, "Paraguay": fakerES,
  "Chile": fakerES, "Peru": fakerES, "Bosnia and Herzegovina": fakerSR_RS_latin || fakerHR,
  "Israel": fakerHE, "Slovakia": fakerSK, "North Macedonia": fakerMK, "Finland": fakerFI,
  "Iraq": fakerAR, "New Zealand": fakerEN, "Hong Kong": fakerZH_CN,
  "Bulgaria": fakerRU, "Montenegro": fakerRU, "Kuwait": fakerAR,
  "Libya": fakerAR, "Zambia": fakerEN, "Malaysia": fakerAR,
  "Congo DR": fakerFR, "Sudan": fakerAR, "Georgia": fakerSR_RS_latin,
  "Jordan": fakerAR, "Singapore": fakerAR, "Venezuela": fakerES,
  "Oman": fakerAR, "Mauritius": fakerFR, "Togo": fakerFR,
  "Mozambique": fakerPT_PT, "Syria": fakerAR, "Cote d'Ivoire": fakerFR,
  "Trinidad and Tobago": fakerEN, "El Salvador": fakerES, "Afghanistan": fakerFA,
  "Angola": fakerPT_PT, "Guatemala": fakerES, "Palestine": fakerAR,
  "Zanzibar": fakerEN, "Benin": fakerFR, "Nicaragua": fakerES,
  "Honduras": fakerES, "Guinea": fakerFR, "Armenia": fakerHY,
  "Bahrain": fakerAR, "Lebanon": fakerAR, "Tanzania": fakerEN,
  "India": fakerEN_IN, "Cuba": fakerES, "Mali": fakerFR,
  "Kyrgyzstan": fakerAR, "Eswatini": fakerEN, "Liberia": fakerEN,
  "Vietnam": fakerVI, "Seychelles": fakerFR, "Mauritania": fakerAR,
  "Zimbabwe": fakerEN, "Malawi": fakerEN, "Nepal": fakerNE,
  "Guyana": fakerEN, "Rwanda": fakerFR, "Gabon": fakerFR,
  "Austria": fakerDE_AT, "Northern Ireland": fakerEN_GB, "Greece": fakerEL,
  "Denmark": fakerEN_GB, "Scotland": fakerEN_GB, "Russia": fakerRU
};

export default fakerLocales;