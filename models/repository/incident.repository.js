const incident = require('../incident.model');
const ResErr = require('../resError');

module.exports = {
    /**
     * Function to create new incident
     * @param {object} data [Data from request data]
     */
    createIncidentRepository: async(data) => {

        try {
            if (!data) {
                throw ResErr(400, "Invalid data");
            }

            var createIncident = new incident(data);

            var result = await createIncident.save();

            var listShowItems = [
                'propertyId',
                'typeId',
                'details',
                'incidentDate',
                'title',
                'comments',
                'createAt',
                'createBy',
                'modifiedBy',
                'modifiedAt'
            ];

            var obj = {};

            for (var i = 0; i < listShowItems.length; i++) {
                //console.log(listShowItems[i]);
                obj[listShowItems[i]] = result[listShowItems[i]]
            }
            //console.log(obj);
            return obj;
        } catch (error) {
            throw ResErr(500, "Unexpected error");
        }
    },

    /**
     * Function to get all incident
     * @param {object} [query from request data]
     * @param {object} [sort from request data]
     * @param {object} [limit from request data]
     * @param {object} [skip from request data]
     */
    getAllIncidentRepository: async(query, sort, limit, skip) => {

        try {
            var model = incident;

            var condition = {
                removed: false
            };

            if (query.propertyId) {
                condition['propertyId'] = query.propertyId
            }

            if (query.typeId) {
                condition['typeId'] = query.typeId
            }

            if (query.title) {
                condition['title'] = query.title
            }

            if (query.incidentDate) {
                condition['incidentDate'] = query.incidentDate
            }

            var model = await model.find(condition);

            return model;
        } catch (error) {
            // console.log(error);
            throw ResErr(400, "Bad request");
        }
    },

    /**
     * Function to get one incident
     * @param {object} id [Id from request params id]
     */
    getOneIncidentRepository: async(id) => {

        try {
            var result = incident.findById(id);
            return result;
        } catch (error) {
            return ResErr(500, "Unexpected error");
        }
    },

    /**
     * Function to update incident
     * @param {object} id [Id from request params id]
     * @param {object} data [Data from request data]
     */
    updateIncidentRepository: async(id, data) => {

        try {
            if (!data) {
                throw ResErr(400, "Invalid data");
            }

            var result = await incident.finByIdAndUpdate(id, data);
            return result;
        } catch (error) {
            return ResErr(500, "Unexpected error");
        }
    },

    /**
     * Function to remove incident
     * @param {object} id [Id from request params id]
     * @param {object} data [Data from request data]
     */
    removeIncidentRepository: async(id, data) => {

        try {
            if (!data) {
                throw ResErr(400, "Invalid data");
            }

            var result = await incident.findByIdAndRemove(id, data);
            return result;
        } catch (error) {
            return ResErr(500, "Unexpected error");
        }
    },

    /**
     * Function to create comment
     * @param {object} id [id from request param id]
     * @param {object} data [data from request data]
     */
    createComment: async(id, data) => {

        try {

            var options = {
                upsert: true,
                save: true
            }

            var docs = {
                $push: {
                    comments: data
                },
                options
            }

            var result = await incident.finByIdAndUpdate(id, docs);
            return result;
        } catch (error) {
            return ResErr(500, "Unexpected error");
        }
    },

    /**
     * Function to update comment
     * @param {object} id [id from request param id]
     * @param {object} cmId [cmId from commnent]
     * @param {object} data [data from request data]
     */
    updateComment: async(id, cmId, data) => {

        try {
            if (!data) {
                throw ResErr(400, "Invalid data");
            };

            var condition = {
                "_id": id,
                "comments": {
                    $elemMatch: {
                        "_id": cmId
                    }
                }
            };

            var dataUpdate = {
                "comments.$[element].comment": data.comment,
                "comments.$[element].createBy": data.createBy,
                "comments.$[element].createAt": data.createAt
            };

            var docs = {
                $set: dataUpdate
            };

            var options = {
                arrayFilter: [{
                    "element._id": cmId
                }]
            };

            var result = await incident.updateOne(condition, docs, options);
            return result;
        } catch (error) {
            return ResErr(500, "Unexpected error");
        }

    },

    /**
     * Function to delete comment
     * @param {object} id [id from request param id]
     * @param {object} cmId [cmId from commnent]
     * @param {object} data [data from commnent]
     */
    deleteComment: async(id, cmId, data) => {

        try {
            var condition = {
                "_id": cmId,
                "comments": {
                    $elemMatch: {
                        "_id": cmId
                    }
                }
            };

            var deleteData = {
                "comments.$[element].active": false
            };

            var docs = {
                $set: deleteData
            };

            var options = {
                arrayFilter: [{
                    "element._id": cmId
                }]
            };

            var result = await incident.updateOne(condition, docs, options);
            return result;
        } catch (error) {
            return ResErr(500, "Unexpected error");
        }
    }
};