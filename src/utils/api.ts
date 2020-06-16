const location = (lat: number, lng: number) => ({
  lat,
  lng
})

export type Hospital = {
  id: number;
  name: string;
  location: { lat: number, lng: number };
};

const mockedHospitals: Hospital[] = [
  { id: 1, name: 'Hermes Pardini', location: location(-19.960919, -43.969963) }
]

export const get = (route: string) => {
  // return axios.get(process.env.API_URL + route)
  return new Promise((res) => {
    if (route === '/hospitals')
      return res({ data: mockedHospitals })
  })
}