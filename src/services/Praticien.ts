import Praticien from "../models/Praticien";
import IPraticien from "../models/interfaces/IPraticien";

class PraticienService {

    async createPraticien(data: IPraticien) {
        return await Praticien.create(data);
    }

    async getPraticiens() {
        return await Praticien.find();
    }

    async getPraticienById(id: string) {
        return await Praticien.findById(id);
    }
}

export default new PraticienService();
