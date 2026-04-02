import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

// Simple Gen 1 Pokemon Data (Subset for Pokemon Yellow)
const pokemonData = [
  { id: 1, name: "Bulbasaur", types: ["Grass", "Poison"], description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON." },
  { id: 4, name: "Charmander", types: ["Fire"], description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail." },
  { id: 7, name: "Squirtle", types: ["Water"], description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth." },
  { id: 25, name: "Pikachu", types: ["Electric"], description: "It keeps its tail raised to monitor its surroundings. If you pull its tail, it will bite you." },
  { id: 39, name: "Jigglypuff", types: ["Normal"], description: "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep." },
  { id: 52, name: "Meowth", types: ["Normal"], description: "Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change." },
  { id: 63, name: "Abra", types: ["Psychic"], description: "Using its ability to read minds, it will identify impending danger and TELEPORT to safety." },
  { id: 94, name: "Gengar", types: ["Ghost", "Poison"], description: "Under a full moon, this POKéMON likes to mimic the shadows of people and laugh at their fright." },
  { id: 133, name: "Eevee", types: ["Normal"], description: "Its genetic code is irregular. It may mutate if it is exposed to radiation from element STONEs." },
  { id: 143, name: "Snorlax", types: ["Normal"], description: "Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful." },
  { id: 150, name: "Mewtwo", types: ["Psychic"], description: "It was created by a scientist after years of horrific gene splicing and DNA engineering experiments." }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Routes
  app.get("/api/pokemon", (req, res) => {
    res.json(pokemonData);
  });

  app.get("/api/pokemon/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemonData.find(p => p.id === id);
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ error: "Pokemon not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
