const incidentTypeRepository = require('../models/repository/incidentType.repository');
const Reserr = require('../models/resError');

module.exports = {
    /**
     * Post new group incident
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    postIncidentTypeController: (req, res, next) => {

        var data = req.body;
        try {
            incidentTypeRepository.createIncidentTypeRepository(data).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(400, "Invalid data")
            })
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    },

    /**
     * Get all incident type
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    getAllIncidentTypeController: (req, res, next) => {

        var query = req.query;
        var limit = req.query.limit;
        var sort = req.query.sort;
        var skip = req.query.skip;
        try {
            incidentTypeRepository.getAllIncidentTypeRepository(query, sort, limit, skip).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(500, "Unexpected error");
            })
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    },

    /**
     * Get one incident type
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    getOneIncidentTypeController: (req, res, next) => {

        var id = req.params.id;
        try {
            incidentTypeRepository.getOneIncidentTypeRepository(id).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(500, "Unexpected error");
            })
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    },

    /**
     * Update incident type
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    updateIncidentTypeController: (req, res, next) => {

        var id = req.params.id;
        var data = req.body;
        try {
            incidentTypeRepository.updateIncidentTypeRepository(id, data).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(500, "Unexpected error");
            })
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    },

    /**
     * Remove incident type
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    removeIncidentTypeController: (req, res, next) => {

        var id = req.params.id;
        var data = req.body;
        try {
            incidentTypeRepository.removeIncidentTypeRepository(id, data).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(500, "Unexpected error");
            })
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }
};