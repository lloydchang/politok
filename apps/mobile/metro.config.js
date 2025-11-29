// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const path = require('path');
const workspaceRoot = path.resolve(__dirname, '.');
const projectRoot = __dirname;

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

// Explicitly set the project root to prevent Metro from looking in parent directories
config.projectRoot = projectRoot;

// Block the parent directory's node_modules
config.resolver.blockList = [
];

config.resolver.unstable_enablePackageExports = true;

module.exports = config;
