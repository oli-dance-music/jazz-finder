//Load the package
const yaml = require('js-yaml');
const fs = require('fs');
//Read the Yaml file
const data = fs.readFileSync('src/JAZZSET_AUTO_UNCLEANED.yaml', 'utf8');
//Convert Yml object to JSON
const yamlData = yaml.loadAll(data);
//Write JSON to Yml
const jsonData = JSON.stringify(yamlData);
fs.writeFileSync('src/JazzData.json', jsonData, 'utf8');
