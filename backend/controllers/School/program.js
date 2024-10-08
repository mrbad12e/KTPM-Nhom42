import Program from "../../models/School/program.js";

export default class ProgramControllers {
    // static async createProgram(req, res, next) {}

    static async getProgram(req, res, next) {
        try {
            res.status(200).json({ 
                program: await Program.getProgram(req, res, next)
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // static async updateProgram(req, res, next) {}

    // static async deleteProgram(req, res, next) {}
}