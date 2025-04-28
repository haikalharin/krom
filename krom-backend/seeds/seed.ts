import mysql from 'mysql2';
import fs from 'fs';

// Membaca SQL dari file
const sql = fs.readFileSync('seeds/seed.sql', 'utf-8');
console.log("SQL File Read Successfully");

// Membuat koneksi ke database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'krom_db',
    multipleStatements: true
});

// Cek Koneksi
connection.connect((err) => {
    if (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
    console.log('Database connected successfully!');
});

// Menjalankan SQL
connection.query(sql, (err, results) => {
    if (err) {
        console.error('Error executing seed:', err);
        process.exit(1);
    }
    console.log('Seed executed successfully:', results);
    connection.end();
});
