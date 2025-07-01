/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication routes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user or admin
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists or invalid role
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login with JWT token
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management routes
 */

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Create a new event (only for authenticated users)
 *     tags: [Events]
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tech Conference 2025
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-15
 *               capacity:
 *                 type: integer
 *                 example: 200
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid input (missing fields or bad date format)
 *       401:
 *         description: Unauthorized (no or invalid token)
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get all events with optional filters
 *     tags: [Events]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events from this start date
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events up to this end date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of events
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Update an event (admin only)
 *     tags: [Events]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated event information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Delete an event (admin only)
 *     tags: [Events]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Book an event (user only)
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - seatsBooked
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: ID of the event to book
 *               seatsBooked:
 *                 type: integer
 *                 description: Number of seats to book
 *     responses:
 *       201:
 *         description: Booking successful
 *       400:
 *         description: Bad request or already booked
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /bookings/export:
 *   get:
 *     summary: Export all bookings as a CSV file (admin only)
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Bookings CSV file
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       403:
 *         description: Access denied (not admin)
 *       500:
 *         description: Failed to export bookings
 */
