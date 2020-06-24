module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        nsis: {
          oneClick: false,
        },
        win: {
          target: [
            {
              target: 'nsis',
              arch: [
                'x64',
              ],
            },
            {
              target: 'portable',
              arch: [
                'x64',
              ],
            },
          ],
        },
      },
    },
  },
};
