const location = (lat: number, lng: number) => ({
  lat,
  lng
})

export type Hospital = {
  id: number;
  name: string;
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

const sickUsers = [
  { id: 1, location: location(-19.9659916, -43.9722723), isSick: true },
  { id: 2, location: location(-19.975164, -43.968839), isSick: true },
]

const mockedCases: Case[] = [
  { id: 1, neighborhood: 'Estoril', location: location(-19.961755, -43.961543), serious: 5, nonSerious: 7, deaths: 0 },
  { id: 2, neighborhood: 'Buritis', location: location(-19.975713, -43.968317), serious: 12, nonSerious: 10, deaths: 2 },
];

const mockedHospitals: Hospital[] = [
  { id: 1, name: 'Hermes Pardini', location: location(-19.960919, -43.969963) }
]

export const get = (route: string) => {
  // return axios.get(process.env.API_URL + route)
  return new Promise((res) => {
    if (route === '/sickUsers')
      return res({ data: sickUsers })
    else if (route === '/cases')
      return res({ data: mockedCases })
    else if (route === '/hospitals')
      return res({ data: mockedHospitals })
  })
}