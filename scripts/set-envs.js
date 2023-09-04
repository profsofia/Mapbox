require('dotenv').config();
const {writeFileSync, mkdirSync} = require('fs');


const targetPath ='./src/environments/environments.ts';

const envFileContent = `
export const environments ={
  mapbox_key: "${process.env['MAPBOX_KEY']}",
  };
`;

//si ya existe la vuelve a crear con el recursive en true
mkdirSync('./src/environments', {recursive: true});

writeFileSync(targetPath, envFileContent);
