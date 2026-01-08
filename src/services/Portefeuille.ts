import Visiteur from '../models/Visiteur';
import Praticien from '../models/Praticien';

class PortefeuilleService {

    async addPraticien(idVisiteur: string, idPraticien: string) {
        const visiteur = await Visiteur.findById(idVisiteur);
        const praticien = await Praticien.findById(idPraticien);

        if (!visiteur || !praticien) {
            throw new Error('Visiteur ou praticien introuvable');
        }

        if (!visiteur.portefeuille) {
            visiteur.portefeuille = [];
        }

        if (!visiteur.portefeuille.includes(praticien._id)) {
            visiteur.portefeuille.push(praticien._id);
            await visiteur.save();
        }

        return visiteur;
    }

    async getPortefeuille(idVisiteur: string) {
        const visiteur = await Visiteur.findById(idVisiteur)
            .populate('portefeuille');

        if (!visiteur) {
            throw new Error('Visiteur introuvable');
        }

        return visiteur.portefeuille;
    }

    async removePraticien(idVisiteur: string, idPraticien: string) {
        const visiteur = await Visiteur.findById(idVisiteur);

        if (!visiteur) {
            throw new Error('Visiteur introuvable');
        }

        visiteur.portefeuille = (visiteur.portefeuille || []).filter(
            (p: any) => p.toString() !== idPraticien
        );

        await visiteur.save();

        return visiteur.portefeuille;
    }
}

export default new PortefeuilleService();
