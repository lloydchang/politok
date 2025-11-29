// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

// Watch the workspace for changes
config.watchFolders = [workspaceRoot];

// Force Metro to use the mobile app's React version (critical for avoiding version conflicts)
config.resolver.extraNodeModules = {
    'react': path.resolve(projectRoot, 'node_modules/react'),
    'react-dom': path.resolve(projectRoot, 'node_modules/react-dom'),
    'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
};

module.exports = config;
