const fs = require('fs');
const path = require('path');
const libCoverage = require('istanbul-lib-coverage');
const libReport = require('istanbul-lib-report');
const reports = require('istanbul-reports');

// Leer el coverage-final.json si existe
const coveragePath = path.join(__dirname, 'coverage', 'libreria-frontend', 'coverage-final.json');

if (!fs.existsSync(coveragePath)) {
  console.log('No se encontró coverage-final.json');
  console.log('Archivos disponibles:');
  const files = fs.readdirSync(path.join(__dirname, 'coverage', 'libreria-frontend'));
  console.log(files);
  process.exit(1);
}

const coverageMap = libCoverage.createCoverageMap(
  JSON.parse(fs.readFileSync(coveragePath, 'utf8'))
);

const context = libReport.createContext({
  dir: path.join(__dirname, 'coverage', 'libreria-frontend'),
  coverageMap
});

reports.create('lcov').execute(context);
console.log('lcov.info generado exitosamente!');