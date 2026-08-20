# Marktly

AI-tool die tweedehands producten herkent uit foto's en automatisch een
marktplaats-advertentie genereert (titel, beschrijving, prijs) voor de
Nederlandse markt (Marktplaats/Vinted).

Dit is de basisstructuur van het project: frontend en backend draaien los
van elkaar, elk met hun eigen `package.json`.

## Structuur

```
frontend/   React (Vite) + Tailwind CSS, PWA-ready
backend/    Express.js API, SQLite database
```

## Frontend starten

```bash
cd frontend
npm install
npm run dev
```

Draait standaard op http://localhost:5173

## Backend starten

```bash
cd backend
npm install
cp .env.example .env   # vul later de AI_API_KEY in
npm run dev
```

Draait standaard op http://localhost:3001. Bij het opstarten wordt
automatisch `backend/data/marktly.db` aangemaakt met het schema uit
`backend/src/db/schema.sql`.

## Database

SQLite, schema in [`backend/src/db/schema.sql`](backend/src/db/schema.sql):

- `users` — geregistreerde gebruikers
- `products` — herkende producten per foto-analyse (categorie, merk, model, staat)
- `listings` — gegenereerde advertenties per product (titel, beschrijving, prijs, platform)
- `tracking` — statistieken per gepubliceerde advertentie (dagen online, berichten, verkocht)
