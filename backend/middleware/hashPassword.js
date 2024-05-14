import Bcrypt from 'bcrypt';

export function hashPassword(password){
    const saltRounds = 10;
    return Bcrypt.hash(password, saltRounds);
}