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

const stores = [
  { id: 1, name: 'Drogaria Araújo', location: location(-19.963002, -43.964006), products },
  { id: 2, name: 'Droga Raia', location: location(-19.959649, -43.965991), products },
]

const sickUsers = [
  { id: 1, location: location(-19.9659916, -43.9722723), isSick: true },
  { id: 2, location: location(-19.975164, -43.968839), isSick: true },
]

export const get = (route: string) => {
  // return axios.get(process.env.API_URL + route)
  return new Promise((res) => {
    if (route === '/stores')
      return res({ data: stores })
    else if (route === '/sickUsers')
      return res({ data: sickUsers })
  })
}