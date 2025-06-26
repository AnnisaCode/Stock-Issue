import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(process.cwd(), 'server', 'data.json');

// ... (seluruh isi server/index.js setelah ini tetap sama, tidak perlu diubah kecuali path DATA_FILE)
// ... existing code ... 