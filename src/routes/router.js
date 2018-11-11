const { Router } = require('express');
const Controller = require('../controllers/Controller');

const router = new Router();

router.post('/newGoods', Controller.newGoods);

router.post('/newStore', Controller.newStore);

router.post('/newMove', Controller.newMove);

router.get('/goods', Controller.allGoods);

router.get('/stores', Controller.allStores);

router.get('/moves', Controller.allMoves);

router.get('/goods/:id', Controller.getGoodsMove);

router.put('/goods/:id', Controller.editGoods);

router.put('/moves/:id', Controller.editMove);

router.delete('/goods/:id', Controller.deleteGoods);

router.put('/stores/:id', Controller.editStore);

router.delete('/stores/:id', Controller.deleteStore);

router.delete('/moves/:id', Controller.deleteMove);

router.post('/stores/:id', Controller.getGoodsOnStore);

router.post('/emptystore', Controller.getEmptyStore);

module.exports = router;
