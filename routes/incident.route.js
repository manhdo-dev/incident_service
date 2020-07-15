const express = require('express');
const routes = express.Router();
const incident = require('../controllers/incident.controller');

/**Route create incident */
routes.post('/', incident.postIncidentController);

/**Route find incident all*/
routes.get('/', incident.getAllIncidentController);

/**Route find one incident */
routes.get('/:id', incident.getOneIncidentController);

/**Route update incident */
routes.put('/services/:id', incident.updateIncidentController);

/**Route delete incident */
routes.delete('/services/:id', incident.removeIncidentController);

/**Route create comment incident */
routes.post('/:id/comments', incident.createCommentController);

/**Route update comment incident */
routes.put('/:id/comments/cmId', incident.updateCommentController);

/**Route delete comment incident */
routes.delete('/:id/comments/cmId', incident.deleteCommentController);

module.exports = routes;