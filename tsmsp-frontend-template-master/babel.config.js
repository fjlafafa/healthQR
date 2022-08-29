module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            Assets: './src/Assets',
            Pages: './src/Pages',
            Globals: './src/Globals',
            Impl: './src/Impl',
            Messages: './src/Impl/Messages',
            Types: './src/Types',
            Utils: './src/Utils'
          },
        },
      ],
    ],
  };
};
