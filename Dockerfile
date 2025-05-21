# Gunakan image Node.js resmi
FROM node:20

# Buat direktori kerja di container
WORKDIR /app

# Copy semua file ke container
COPY . .

# Install dependencies
RUN npm install

# Expose port dari container
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "app.js"]