const incidentType = require('../incidentType.model');
const Reserr = require('../resError');

module.exports = {
    /**
     * Function to create new incident type 
     * @param {object} data [Data from request data]
     */
    createIncidentTypeRepository: async(data) => {

        try {
            if (!data) {
                throw Reserr(400, "Invalid data");
            }

            // console.log(data);
            var createIncidentType = new incidentType(data);

            var result = await createIncidentType.save();

            var listShowItems = ['name', 'createAt', 'createBy', 'modifiedBy', 'modifiedAt'];

            var obj = {};

            for (var i = 0; i < listShowItems.length; i++) {
                //console.log(i);
                obj[listShowItems[i]] = result[listShowItems[i]];
            }
            return obj;
        } catch (error) {
            //console.log(error);
            throw ResErr(500, "Unexpected error");
        }
    },

    /**
     * Function to get all incident type 
     * @param {object} [query from request data]
     * @param {object} [sort from request data]
     * @param {object} [limit from request data]
     * @param {object} [skip from request data]
     */
    getAllIncidentTypeRepository: async(query, sort, limit, skip) => {

        try {
            var docs = await incidentType.find(query).sort(sort).limit(limit).skip(skip);
            return docs;
        } catch (error) {
            console.log(error);
            throw ResErr(400, "Bad request");
        }
    },

    /**
     * Function to get one incident type
     * @param {object} id [Id from request params id]
     */
    getOneIncidentTypeRepository: async(id) => {

        try {
            var result = await incidentType.findById(id);
            return result;
        } catch (error) {
            throw Reserr(500, "Unexpected error");
        }
    },

    /**
     * Function to update incident type
     * @param {object} id [Id from request params id]
     * @param {object} data [data from request data]
     */
    updateIncidentTypeRepository: async(id, data) => {

        try {
            var result = await incidentType.findByIdAndUpdate(id, data);
            return result;
        } catch (error) {
            throw Reserr(500, "Unexpected error");
        }
    },

    /**
     * Function to update incident type
     * @param {object} id [Id from request params id]
     * @param {object} data [data from request data]
     */
    removeIncidentTypeRepository: async(id, data) => {

        try {
            var result = await incidentType.findByIdAndRemove(id, data);
            return result;
        } catch (error) {
            throw Reserr(500, "Unexpected error");
        }
    }
};