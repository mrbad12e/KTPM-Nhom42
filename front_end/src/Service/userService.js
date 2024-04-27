import axios from 'axios';
const handleLoginApi = (userEmail,userPassword) => {
    return axios.post('http://localhost:5000/student/login',{email: userEmail,password: userPassword});

}

export {handleLoginApi }
