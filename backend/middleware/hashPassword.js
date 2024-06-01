import Bcrypt from 'bcrypt';

export async function hashPassword(password){
    const saltRounds = 10;
    return await Bcrypt.hash(password, saltRounds);
}