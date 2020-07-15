const express = require('express');
const routes = express.Router();
const incidentType = require('../controllers/incidentType.controller');

/**Route create incident type */
routes.post('/', incidentType.postIncidentTypeController);

/**Route get all  incident type */
routes.get('/', incidentType.getAllIncidentTypeController);

/**Route get one incident type */
routes.get('/:id', incidentType.getOneIncidentTypeController);

/**Route update incident type*/
routes.put('/:id', incidentType.updateIncidentTypeController);

/**Route remove incident type  */
routes.delete('/:id', incidentType.removeIncidentTypeController);

module.exports = routes;