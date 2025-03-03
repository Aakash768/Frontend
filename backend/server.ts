import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173', 'https://indiatoday-ivory.vercel.app/'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
})); 