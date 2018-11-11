const db = require('../config/database');
const controller = {};

controller.newGoods = async (req, res) => {
    const text = `INSERT INTO goods(name, unit, pack, count) 
    VALUES($1, $2, $3, $4)
    RETURNING *`;
    const item = [
        req.body.goodsName,
        req.body.unit,
        req.body.pack,
        req.body.count,
    ];
    try {
        const result = await db.query(text, item);
        console.log(result.rows[0]);
        res.status(201).send({ message: 'Товар добавлен в БД', goods:result.rows[0]});
    } catch (err) {
        console.log(err.stack)
    }
};

controller.newStore = async (req, res) => {
    const text = `INSERT INTO stores(address, specequip, area) 
    VALUES($1, $2, $3)
    RETURNING *`;
    const store = [
        req.body.address,
        req.body.specequip,
        req.body.area,
    ];
    try {
        const result = await db.query(text, store);
        console.log(result.rows[0]);
        res.status(201).send({ message: 'Склад добавлен в БД', goods:result.rows[0]});
    } catch (err) {
        console.log(err.stack)
    }
};

controller.newMove = async (req, res) => {
    const text = `INSERT INTO movement_goods(goodsid, storeid, importtime, exporttime) 
    VALUES($1, $2, $3, $4)
    RETURNING *`;
    const move = [
        req.body.goodsid,
        req.body.storeid,
        req.body.importtime,
        req.body.exporttime,
    ];
    console.log(move);
    try {
        const result = await db.query(text, move);
        console.log(result);
        console.log(result.rows[0]);
        res.status(201).send({ message: 'Движение добавлено в БД', move:result.rows[0]});
    } catch (err) {
        console.log(err.stack)
    }
};

controller.allGoods = async (req, res) => {
    const text = `SELECT id, name, unit, pack, count FROM goods`;

    try {
        const { rows } = await db.query(text);
        res.status(201).send(rows);
    } catch (err) {
        console.log(err.stack)
    }
};

controller.allStores = async (req, res) => {
    const text = `SELECT id, address, specequip, area FROM stores`;
    try {
        const { rows } = await db.query(text);
        res.status(201).send(rows);
    } catch (err) {
        console.log(err.stack)
    }
};

controller.allMoves = async (req, res) => {
    const text = `SELECT a.id, goods.name, stores.address, a.importtime, a.exporttime 
    FROM movement_goods AS a
    JOIN goods ON goods.id=a.goodsid
    JOIN stores ON stores.id=a.storeid
    `;
    try {
        const { rows } = await db.query(text);
        res.status(201).send(rows);
    } catch (err) {
        console.log(err.stack)
    }
};

controller.editGoods = async (req, res) => {
    const {id} = req.params;
    const text = `UPDATE goods SET 
    name=$1,
    unit=$2,
    pack=$3,
    count=$4
    WHERE id=$5`;
    const item = [
        req.body.goodsName,
        req.body.unit,
        req.body.pack,
        req.body.count,
        req.body.id,
    ];
    try {
        const result = await db.query(text, item);
        console.log(result);
        res.status(201).send({ message: 'Товар успешно изменен'});
    } catch (err) {
        console.log(err.stack)
    }
};

controller.editMove = async (req, res) => {
    const {id} = req.params;
    const text = `UPDATE movement_goods SET 
    goodsid=$1,
    storeid=$2,
    importtime=$3,
    exporttime=$4
    WHERE id=$5`;
    const item = [
        req.body.goodsid,
        req.body.storeid,
        req.body.importtime,
        req.body.exporttime,
        req.body.id,
    ];
    try {
        const result = await db.query(text, item);
        console.log(result);
        res.status(201).send({ message: 'Товар успешно изменен'});
    } catch (err) {
        console.log(err.stack)
    }
};

controller.deleteGoods = async (req, res) => {
    const {id} = req.params;
    const text = `DELETE FROM goods
    WHERE id=$1`;
    const item = [
        id
    ];
    try {
        const result = await db.query(text, item);
        console.log(result);
        res.status(201).send({ message: 'Товар успешно удален'});
    } catch (err) {
        console.log(err.stack)
    }
};

controller.deleteMove = async (req, res) => {
    const {id} = req.params;
    const text = `DELETE FROM movement_goods
    WHERE id=$1`;
    const item = [
        id
    ];
    try {
        const result = await db.query(text, item);
        console.log(result);
        res.status(201).send({ message: 'Товар успешно удален'});
    } catch (err) {
        console.log(err.stack)
    }
};

controller.editStore = async (req, res) => {
    const {id} = req.params;
    const text = `UPDATE stores SET 
    address=$1,
    specequip=$2,
    area=$3
    WHERE id=$4`;
    const item = [
        req.body.address,
        req.body.specequip,
        req.body.area,
        req.body.id,
    ];
    console.log(item);
    try {
        const result = await db.query(text, item);
        console.log(result);
        res.status(201).send({ message: 'Склад успешно изменен'});
    } catch (err) {
        console.log(err.stack)
    }
};

controller.deleteStore = async (req, res) => {
    const {id} = req.params;
    const text = `DELETE FROM stores
    WHERE id=$1`;
    const item = [
        id
    ];
    try {
        const result = await db.query(text, item);
        console.log(result);
        res.status(201).send({ message: 'Склад успешно удален'});
    } catch (err) {
        console.log(err.stack)
    }
};

controller.getGoodsMove = async (req, res) => {
    const {id} = req.params;
    const text = `SELECT goods.name, stores.address, a.importtime, a.exporttime 
                FROM movement_goods AS a
                JOIN goods on goods.id=a.goodsid
                JOIN stores on stores.id=a.storeid
                WHERE a.goodsid=$1`;
    const item = [
        id
    ];
    try {
        const {rows} = await db.query(text, item);
        console.log(rows);
        res.status(201).send(rows);
    } catch (err) {
        console.log(err.stack)
    }
};

controller.getGoodsOnStore = async (req, res) => {
    const {id} = req.params;
    const text = `SELECT goods.name, stores.address, a.importtime, a.exporttime 
FROM movement_goods AS a
JOIN goods ON goods.id=a.goodsid
JOIN stores ON stores.id=a.storeid
WHERE (a.storeid=$1) AND
((a.importtime<$2) AND 
((a.exporttime is null) OR
(a.exporttime >$3)))`;
    const item = [
        id,
        req.body.dateTo,
        req.body.dateFrom,
    ];
    console.log(item);
    try {
        const {rows} = await db.query(text, item);
        console.log(rows);
        res.status(201).send(rows);
    } catch (err) {
        console.log(err.stack)
    }
};

controller.getEmptyStore = async (req, res) => {
    const text = `SELECT address, specequip, area FROM stores
EXCEPT
(SELECT stores.address, stores.specequip, stores.area
FROM movement_goods AS a
JOIN goods ON goods.id=a.goodsid
JOIN stores ON stores.id=a.storeid
WHERE ((a.importtime<$1) AND 
((a.exporttime IS null) OR
(a.exporttime >$2))))`;
    const item = [
        req.body.dateTo,
        req.body.dateFrom,
    ];
    console.log(item);
    try {
        const {rows} = await db.query(text, item);
        console.log(rows);
        res.status(201).send(rows);
    } catch (err) {
        console.log(err.stack)
    }
};

module.exports = controller;
