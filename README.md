# YellowDex - Pokemon Yellow Style Pokedex

A retro-styled Pokedex application built with React, Tailwind CSS, and Express, inspired by the classic Pokemon Yellow Game Boy aesthetic.

## 🚀 Local Setup (MacBook Air M1)

Since you are using a MacBook Air M1, you have native support for Node.js. Follow these steps to get the app running:

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed. You can check this by running:
```bash
node -v
```
If not installed, download it from [nodejs.org](https://nodejs.org/).

### 2. Installation
Clone or download the project folder, then open your terminal in the project root and run:
```bash
npm install
```

### 3. Running the App
Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

---

## 🌐 Local Network Access

To access this app from other devices on your local network (like your phone or another laptop):

### 1. Find your Local IP Address
On your MacBook Air M1:
1. Open **System Settings**.
2. Go to **Network**.
3. Select your active connection (usually Wi-Fi).
4. Look for the IP address (e.g., `192.168.1.XX`).

### 2. Accessing the App
The server is configured to listen on `0.0.0.0`, which means it accepts connections from your local network. On your other device, open a browser and enter:
```
http://<YOUR_LOCAL_IP>:3000
```
*(Replace `<YOUR_LOCAL_IP>` with the address you found in the previous step, e.g., `http://192.168.1.15:3000`)*

---

## 🛠 Tech Stack
- **Frontend**: React 19, Tailwind CSS 4, Motion (Framer Motion)
- **Backend**: Express (Node.js)
- **Icons**: Lucide React
- **Styling**: Retro Game Boy Color / Pokemon Yellow aesthetic
