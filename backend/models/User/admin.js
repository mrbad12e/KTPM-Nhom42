import User from './user.js';
import client from '../../config/db.js';

export default class Admin extends User {
    constructor(id, role) {
        super(id, role);
        this.adminSetup();
    }
    async adminSetup() {
        try {
            await this.setup();
            const query = `
            GRANT ALL PRIVILEGES ON DATABASE sms TO "${this.id}";
            SET SESSION AUTHORIZATION "${this.id}"
            `;
            await client.query(query);
        } catch (error) {
            throw error;
        }
    }
}