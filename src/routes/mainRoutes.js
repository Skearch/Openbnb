const express = require('express');

const apiRouter = express.Router();
const pagesRouter = express.Router();

const authenticationRoutes = require('./authenticationRoutes');
const propertyRoutes = require('./propertyRoutes');
const dashboardRoutes = require('./dashboardRoutes');

apiRouter.use('/authentication', authenticationRoutes);
apiRouter.use('/property', propertyRoutes);

pagesRouter.get('/account/register', (req, res) => res.render('pages/register'));
pagesRouter.get('/account/login', (req, res) => res.render('pages/login'));

pagesRouter.use('/dashboard', dashboardRoutes);

pagesRouter.get('/listing/browse', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/property/listall');
        const allProperties = await response.json();
        res.render('pages/listing', { properties: allProperties });
    } catch (error) {
        console.error('Error fetching all properties:', error);
        res.status(500).send('Server error');
    }
});

pagesRouter.get('*', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/property/listshowcase');
        const showcasedProperties = await response.json();
        res.render('pages/index', { showcasedProperties });
    } catch (error) {
        console.error('Error fetching showcased properties:', error);
        res.status(500).send('Server error');
    }
});

module.exports = { api: apiRouter, pages: pagesRouter };