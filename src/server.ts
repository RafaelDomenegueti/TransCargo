import app from './app';
import { ENV } from './utils/env';

const PORT = ENV.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
