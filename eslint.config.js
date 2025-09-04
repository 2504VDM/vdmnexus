import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Base config
  js.configs.recommended,
  
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**', 
      '**/out/**',
      '**/build/**',
      '**/dist/**',
      '**/*.d.ts',
      '**/.DS_Store',
    ],
  },
  
  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      
      // Security rules voor VDM Nexus multi-tenant platform
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error', 
      'no-script-url': 'error',
      
      // TypeScript specifiek
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error', // Dit is een gewone ESLint rule, niet TypeScript-specifiek
    },
  },
  
  // Next.js web app
  ...compat.extends('next/core-web-vitals', 'next/typescript').map(config => ({
    ...config,
    files: ['apps/web/**/*.{js,jsx,ts,tsx}'],
    rules: {
      ...config.rules,
      // Extra security
      'react/no-danger': 'error',
      'react/no-danger-with-children': 'error',
      // Fix voor App Router (geen pages directory)
      '@next/next/no-html-link-for-pages': 'off',
    },
  })),
  
  // API files
  {
    files: ['apps/api/**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js globals
        process: 'readonly',
        Buffer: 'readonly', 
        console: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
      },
    },
    rules: {
      // Backend security
      'no-eval': 'error',
      'no-new-func': 'error',
      'no-process-exit': 'warn',
      'no-global-assign': 'error',
      'no-implicit-globals': 'error',
    },
  },
  
  // Shared packages
  {
    files: ['packages/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-eval': 'error',
    },
  },
];