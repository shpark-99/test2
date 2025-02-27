```javascript
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('📌 SQLite DB 연결됨');
});

db.run(`CREATE TABLE IF NOT EXISTS admin_locations (
    adminID TEXT PRIMARY KEY,
    latitude REAL,
    longitude REAL
)`);

app.post('/setAdminLocation', (req, res) => {
    const { adminID, latitude, longitude } = req.body;
    db.run(`INSERT OR REPLACE INTO admin_locations VALUES (?, ?, ?)`, 
        [adminID, latitude, longitude], 
        (err) => res.json({ message: "위치 저장 완료" }));
});

app.get('/getAdminLocation', (req, res) => {
    db.get(`SELECT latitude, longitude FROM admin_locations WHERE adminID = ?`, 
        [req.query.adminID], (err, row) => res.json(row || { error: "위치 없음" }));
});

app.listen(3000, () => console.log(`🚀 서버 실행: http://localhost:3000`));
```
