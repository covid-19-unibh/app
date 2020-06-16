const location = (lat: number, lng: number) => ({
  lat,
  lng
})

export type Hospital = {
  id: number;
  name: string;
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
    if (route === '/cases')
      return res({ data: mockedCases })
    else if (route === '/hospitals')
      return res({ data: mockedHospitals })
  })
}