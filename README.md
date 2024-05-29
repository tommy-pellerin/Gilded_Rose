## Jasmine
Faire pnpm run test pour lancer les testes.

Si on souhaite modifier le nombre de jouer à simuler, aller dans gilded_rose_spec.js et modifier : 
const days = Number(process.argv[2]) || 2;

## ESLint error
Pour eviter d'avoir les message d'erreur de ESlint, il faut ajouter dans .eslintrc.cjs:
env: { 
    browser: true, 
    es2020: true,
    "node": true,
    "jasmine": true
  },