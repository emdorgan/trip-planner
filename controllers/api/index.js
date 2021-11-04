const router = require('express').Router();
const userRouter = require('./userRoutes');
const tripRouter = require('./tripRoutes');
const locationRouter = require('./locationRoutes');
const packlistRouter = require('./packlistRoutes');
const journalRouter = require('./journalRoutes');
const imageRoutes = require('./imageRoutes');

router.use('/images', imageRoutes);
router.use('/users', userRouter);
router.use('/trips', tripRouter);
router.use('/locations', locationRouter);
router.use('/packlists', packlistRouter);
router.use('/journals', journalRouter);

module.exports = router;



