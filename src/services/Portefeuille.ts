import Portefeuille from '../models/Portefeuille';

class PortefeuilleService {
    static async createPortefeuille(visiteurId: string, praticienId: string, dateDebut: Date, dateFin?: Date) {
        const portefeuille = new Portefeuille({
            visiteur: visiteurId,
            praticien: praticienId,
            dateDebutSuivi: dateDebut,
            dateFinSuivi: dateFin,
        });
        return portefeuille.save();
    }

    static async getPortefeuillesByVisiteur(visiteurId: string) {
        return Portefeuille.find({ visiteur: visiteurId }).populate('praticien');
    }

}

export default PortefeuilleService;
