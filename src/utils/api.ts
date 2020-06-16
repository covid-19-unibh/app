// import axios from 'axios'

const products = [
  { name: 'Máscara descartável' },
  { name: 'Álcool em gel' },
]

const location = (lat: number, lng: number) => ({
  lat,
  lng
})

export type Store = {
  id: number;
  location: { lat: number, lng: number };
};

export type User = {
  id: number;
  location: { lat: number, lng: number };
};

export type Case = {
  id: number;
  neighborhood: string;
  location: { lat: number, lng: number };
  serious: number;
  nonSerious: number;
  deaths: number;
};

const stores = [
  { id: 1, name: 'Drogaria Araújo', location: location(-19.963002, -43.964006), products },
  { id: 2, name: 'Droga Raia', location: location(-19.959649, -43.965991), products },
]

const sickUsers = [
  { id: 1, location: location(-19.9659916, -43.9722723), isSick: true },
  { id: 2, location: location(-19.975164, -43.968839), isSick: true },
]

const mockedCases: Case[] = [
  { id: 1, neighborhood: 'Estoril', location: location(-19.961755, -43.961543), serious: 5, nonSerious: 7, deaths: 0 },
  { id: 2, neighborhood: 'Buritis', location: location(-19.975713, -43.968317), serious: 12, nonSerious: 10, deaths: 2 },
];

export const get = (route: string) => {
  // return axios.get(process.env.API_URL + route)
  return new Promise((res) => {
    if (route === '/stores')
      return res({ data: stores })
    else if (route === '/sickUsers')
      return res({ data: sickUsers })
    else if (route === '/cases')
      return res({ data: mockedCases })
  })
}