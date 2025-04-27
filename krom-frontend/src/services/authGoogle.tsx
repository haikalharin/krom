import React from 'react';
import axios from 'axios';

const AuthenticateGoogle = () => {
    // Fungsi untuk mengarahkan pengguna ke halaman autentikasi Google
    const handleGoogleAuth = async () => {
        try {
            // Panggil backend untuk mendapatkan URL autentikasi Google
            const response = await axios.get('/auth/google'); // Ganti URL sesuai dengan endpoint backend kamu
            window.location.href = response.data.authUrl; // Arahkan ke halaman autentikasi Google
        } catch (error) {
            console.error('Error fetching Google auth URL:', error);
        }
    };

    return (
        <div>
            <button onClick={handleGoogleAuth}>Login dengan Google</button>
        </div>
    );
};

export default AuthenticateGoogle;
