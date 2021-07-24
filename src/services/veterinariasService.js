import axios from 'axios'


export const getVeterinarias = async() => {
    const rpta = await axios.get('http://localhost:7100/veterinarias');
    return rpta
}