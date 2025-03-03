import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://gemini-summarizer-frontend.vercel.app',  // Add your Vercel frontend URL
  'https://indiatoday-ivory.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
})); 