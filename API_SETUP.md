# OpenWeatherMap API Integration Guide

## 📋 Overview
Halaman **Weather** (tab Explore) sudah terintegrasi dengan **OpenWeatherMap API** menggunakan API Key authentication.

## 🔑 Cara Setup API Key

### 1. Buat Account di OpenWeatherMap
- Kunjungi: https://openweathermap.org/api
- Klik "Sign Up" 
- Isi form registrasi
- Verifikasi email Anda

### 2. Generate API Key
- Login ke dashboard OpenWeatherMap
- Pergi ke bagian "API keys"
- Copy API key yang tersedia (biasanya sudah ada satu default)

### 3. Set API Key di Proyek
- Buka file: `constants/api.ts`
- Ganti `'YOUR_API_KEY_HERE'` dengan API key Anda:

```typescript
export const OPENWEATHER_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
```

Contoh:
```typescript
export const OPENWEATHER_API_KEY = 'YOUR_API_KEY_HERE';
```

## 🎯 Fitur yang Sudah Diimplementasikan

✅ **API Key Authentication** - Menggunakan API key untuk autentikasi
✅ **Error Handling** - Menangani error dengan pesan yang jelas
✅ **Loading State** - Menampilkan loading indicator saat fetch
✅ **Real-time Data** - Menampilkan data cuaca terkini untuk Jakarta
✅ **Responsive UI** - Tampilan yang menarik dan responsif
✅ **Refresh Button** - Tombol untuk update data secara manual

## 📊 Data yang Ditampilkan

- 🌡️ Suhu saat ini (°C)
- 🤔 Feels like temperature
- ☁️ Kondisi cuaca
- 💧 Kelembaban (%)
- 🌪️ Tekanan udara (hPa)
- 💨 Kecepatan angin (m/s)
- ☁ Persentase awan (%)

## 🧪 Testing

1. Jalankan aplikasi: `npm start`
2. Tekan tab "Explore"
3. Aplikasi akan fetch data cuaca Jakarta secara otomatis
4. Jika error "API key not configured", pastikan sudah set di `constants/api.ts`

## 🔗 API Endpoint

```
https://api.openweathermap.org/data/2.5/weather
Parameters:
- lat: latitude (-6.2088 for Jakarta)
- lon: longitude (106.8456 for Jakarta)
- appid: API key
- units: metric (untuk suhu dalam Celsius)
```

## 📝 Notes

- API key gratis memiliki rate limit (free tier: 60 calls/minute)
- Jangan commit API key ke repository (gunakan .env untuk production)
- Lokasi saat ini di-hardcode ke Jakarta, bisa diubah dengan mengubah DEFAULT_LATITUDE dan DEFAULT_LONGITUDE
