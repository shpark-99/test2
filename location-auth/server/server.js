const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// 📌 SQLite 데이터베이스 연결 (파일이 없으면 자동 생성됨)
const dbPath = path.join(__dirname, 'database', 'db.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(err.message);
    console.log('📌 SQLite DB 연결됨');
});

// 📌 테이블 자동 생성 (관리자 위치 저장)
db.run(`CREATE TABLE IF NOT EXISTS admin_locations (
    adminID TEXT PRIMARY KEY,
    latitude REAL,
    longitude REAL
)`);

// 📌 관리자 위치 저장 API
app.post('/setAdminLocation', (req, res) => {
    const { adminID, latitude, longitude } = req.body;
    db.run(`INSERT OR REPLACE INTO admin_locations VALUES (?, ?, ?)`, 
        [adminID, latitude, longitude], 
        (err) => res.json({ message: "위치 저장 완료" }));
});

// 📌 관리자 위치 조회 API
app.get('/getAdminLocation', (req, res) => {
    db.get(`SELECT latitude, longitude FROM admin_locations WHERE adminID = ?`, 
        [req.query.adminID], (err, row) => res.json(row || { error: "위치 없음" }));
});

// 서버 실행
app.listen(PORT, () => console.log(`🚀 서버 실행 중: http://localhost:${PORT}`));
