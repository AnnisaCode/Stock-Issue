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

// Helper functions
async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If the file doesn't exist, return an empty structure
        if (error.code === 'ENOENT') {
            return { stockIssues: [] };
        }
        throw error;
    }
}

async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Routes - Now with /api prefix for local proxy
app.get('/api/stockissue', async (req, res) => {
    const data = await readData();
    res.json(data.stockIssues);
});

app.get('/api/stockissue/:id', async (req, res) => {
    const data = await readData();
    const stockIssue = data.stockIssues.find(si => si.id === req.params.id);
    res.json(stockIssue);
});

app.post('/api/stockissue', async (req, res) => {
    const data = await readData();
    const newStockIssue = { id: uuidv4(), ...req.body, details: [] };
    data.stockIssues.push(newStockIssue);
    await writeData(data);
    res.status(201).json(newStockIssue);
});

app.put('/api/stockissue/:id', async (req, res) => {
    const data = await readData();
    const index = data.stockIssues.findIndex(si => si.id === req.params.id);
    data.stockIssues[index] = { ...data.stockIssues[index], ...req.body };
    await writeData(data);
    res.json(data.stockIssues[index]);
});

app.delete('/api/stockissue/:id', async (req, res) => {
    const data = await readData();
    data.stockIssues = data.stockIssues.filter(si => si.id !== req.params.id);
    await writeData(data);
    res.status(204).send();
});

app.post('/api/stockissue/:id/details', async (req, res) => {
    const data = await readData();
    const stockIssue = data.stockIssues.find(si => si.id === req.params.id);
    const newDetail = { id: uuidv4(), ...req.body };
    stockIssue.details.push(newDetail);
    await writeData(data);
    res.status(201).json(newDetail);
});

app.put('/api/stockissue/:id/details/:detailId', async (req, res) => {
    const data = await readData();
    const stockIssue = data.stockIssues.find(si => si.id === req.params.id);
    const detailIndex = stockIssue.details.findIndex(d => d.id === req.params.detailId);
    stockIssue.details[detailIndex] = { ...stockIssue.details[detailIndex], ...req.body };
    await writeData(data);
    res.json(stockIssue.details[detailIndex]);
});

app.delete('/api/stockissue/:id/details/:detailId', async (req, res) => {
    const data = await readData();
    const stockIssue = data.stockIssues.find(si => si.id === req.params.id);
    stockIssue.details = stockIssue.details.filter(d => d.id !== req.params.detailId);
    await writeData(data);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 