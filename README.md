# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## ESLint error
Pour eviter d'avoir les message d'erreur de ESlint, il faut ajouter dans .eslintrc.cjs:
env: { 
    browser: true, 
    es2020: true,
    "node": true,
    "jasmine": true
  },