require('dotenv').config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

module.exports = {
  packagerConfig: {
    osxSign: {} // object must exist even if empty
  },
  rebuildConfig: {},
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'dassoop',
          name: 'Updater'
        },
        prerelease: false,
        draft: true
      }
    }
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
