// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

// Watch the workspace for changes
config.watchFolders = [workspaceRoot];

module.exports = config;
