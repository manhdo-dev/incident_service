const incidentRepository = require('../models/repository/incident.repository');
const Reserr = require('../models/resError');

module.exports = {
    /**
     * Post new group incident
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    postIncidentController: (req, res, next) => {

        var data = req.body;
        try {
            incidentRepository.createIncidentRepository(data).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                // console.log(err);
                throw Reserr(400, "Invalid data");
            })
        } catch (error) {
            // console.log(error);
            return res.status(error.code).json(error.message);
        }
    },

    /**
     * Get all incident
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    getAllIncidentController: (req, res, next) => {

        var query = req.query;
        var limit = req.query.limit;
        var sort = req.query.sort;
        var skip = req.query.skip;
        try {
            incidentRepository.getAllIncidentRepository(query, sort, limit, skip).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                // console.log(err);
                throw Reserr(500, "Unexpecteded error");
            })
        } catch (error) {
            //console.log(error);
            return res.status(error.code).json(error.message);
        }
    },

    /**
     * Get one incident
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    getOneIncidentController: (req, res, next) => {

        var id = req.params.id;
        try {
            incidentRepository.getOneIncidentRepository(id).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(500, "Unexpected error");
            })
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    },


    /**
     * Update incident
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    updateIncidentController: (req, res, next) => {

        var id = req.params.id;
        var data = req.body;
        try {
            incidentRepository.updateIncidentRepository(id, data).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(500, "Unexpected error");
            })
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    },

    /**
     * Delete incident
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    removeIncidentController: (req, res, next) => {

        var id = req.params.id;
        var body = req.body;
        try {
            incidentRepository.removeIncidentRepository(id, data).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(500, "Unexpected error");
            })
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    },

    /**
     * Create comment incident
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    createCommentController: (req, res, next) => {

        var id = req.params.id;
        var body = req.body;
        try {
            incidentRepository.createComment(id, data).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(500, "Unexpected error");
            })
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    },

    /**
     * Update comment incident
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    updateCommentController: (req, res, next) => {

        var id = req.params.id;
        var cmId = req.params.cmId;
        var data = req.body;
        try {
            incidentRepository.updateComment(id, cmId, data).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(500, "Unexpected error");
            })
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    },

    /**
     * Delete comment incident
     * @param {[type]} req [description]
     * @param {[type]} res [description]
     * @param {[type]} next [description]
     */
    deleteCommentController: (req, res, next) => {

        var id = req.params.id;
        var cmId = req.params.cmId;
        var data = req.body;
        try {
            incidentRepository.deleteComment(id, cmId, data).then(docs => {
                return res.status(200).json(docs);
            }).catch(err => {
                throw Reserr(500, "Unexpected error");
            })
        } catch (error) {
            return res.status(err.status).json(error.message);
        }
    }
};