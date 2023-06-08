import { extractStyle } from '@ant-design/static-style-extract';
import fs from 'fs';

const outputPath = './src/assets/css/antd.min.css';

console.log('==> Demora minutos (20min em media) <==', new Date());

const css = extractStyle();

fs.writeFileSync(outputPath, css);
