import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '@/constants/api';

interface WeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}

export default function WeatherScreen() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      if (OPENWEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
        throw new Error('API key not configured. Please set OPENWEATHER_API_KEY in constants/api.ts');
      }

      const response = await fetch(
        `${OPENWEATHER_BASE_URL}/weather?lat=${DEFAULT_LATITUDE}&lon=${DEFAULT_LONGITUDE}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. API key mungkin belum aktif, silakan tunggu beberapa saat lagi.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.appTitle}>Aplikasi Cuaca</Text>

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Memuat data cuaca...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>⚠️ Terjadi Kesalahan</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <TouchableOpacity onPress={fetchWeather} style={styles.button}>
              <Text style={styles.buttonText}>Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        ) : weather ? (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.weatherCard}>
              <Text style={styles.cityName}>
                {weather.name}, {weather.sys.country}
              </Text>
              
              <Text style={styles.weatherMain}>
                {weather.weather[0].main}
              </Text>
              
              <Text style={styles.weatherDescription}>
                {weather.weather[0].description}
              </Text>

              <Text style={styles.temperature}>
                {Math.round(weather.main.temp)}°C
              </Text>
              
              <Text style={styles.feelsLike}>
                Terasa seperti {Math.round(weather.main.feels_like)}°C
              </Text>

              <View style={styles.divider} />

              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Kelembaban</Text>
                  <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Angin</Text>
                  <Text style={styles.detailValue}>{Math.round(weather.wind.speed)} m/s</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Tekanan</Text>
                  <Text style={styles.detailValue}>{weather.main.pressure} hPa</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Awan</Text>
                  <Text style={styles.detailValue}>{weather.clouds.all}%</Text>
                </View>
              </View>

              <TouchableOpacity onPress={fetchWeather} style={styles.button}>
                <Text style={styles.buttonText}>Perbarui Data</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8E8E93',
  },
  errorText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 20,
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  weatherMain: {
    fontSize: 20,
    fontWeight: '500',
    color: '#007AFF',
    marginTop: 8,
  },
  weatherDescription: {
    fontSize: 16,
    color: '#8E8E93',
    textTransform: 'capitalize',
    marginBottom: 16,
  },
  temperature: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  feelsLike: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    width: '100%',
    marginVertical: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  detailItem: {
    width: '48%',
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
