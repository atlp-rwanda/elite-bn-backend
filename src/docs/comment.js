/**
 * @swagger
 * /api/v1/comments/trip/{id}/:
 *   post:
 *     tags:
 *       - Comments
 *     name: post comment
 *     summary: create comments on trip request
 *     consumes:
 *        - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *       - name: permission_name
 *         in: header
 *         required: true
 *       - name: id
 *         in: path
 *         type: integer
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                comment:
 *                  type: string
 *     responses:
 *       201:
 *             description: successfully created comment on trip request.
 *       400:
 *             description: Trip does not belong to you. Authorization err.
 * */

// get comments

/**
 * @swagger
 * /api/v1/comments/trip/{tripId}/:
 *  get:
 *      tags:
 *       - Comments
 *      name: get comments
 *      summary: "get all comments on the trip"
 *      description: "get all comments on the trip request"
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *       - name: permission_name
 *         in: header
 *         required: true
 *       - name: tripId
 *         in: path
 *         type: integer
 *      responses:
 *       "200":
 *         description: "You have successfully fetched comments on the trip request"
 *       "404":
 *         description: "Can not fetch comments on the trip specified."
 */
