import axios from 'axios';
const handleLoginApi = (userEmail,userPassword) => {
    return axios.post('http://localhost:5000/admin/login',{email: userEmail,password: userPassword});

}

export {handleLoginApi }
