import app from './app.js';
import { sequelize } from './db.js';

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        app.listen(PORT, () => console.log(`API em http://localhost:${PORT}`));
    } catch (e) {
        console.error('Falha ao conectar no DB:', e.message);
        process.exit(1);
    }
})();
