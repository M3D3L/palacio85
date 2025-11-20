const {createServer} = require('./dist/node');

// This function accepts an optional
// `cache` instance parameter: https://developer.mozilla.org/en-US/docs/Web/API/Cache.
createServer({
  cache: customCacheImplementation,
}).then(({app}) => {
  app.use(/* ... */);

  app.listen(3000, () => {
    console.log(`Server ready`);
  });
});
