import axios from 'axios'
const baseUrl = 'http://api.weatherapi.com/v1/current.json'

const getByCapital = (capital, api_key) => {
  const query = `${baseUrl}?key=${api_key}&q=${capital}&aqi=no`
  const request = axios.get(query)
  return request.then(response => response.data)
}

export default { getByCapital }
