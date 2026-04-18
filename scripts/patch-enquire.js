const fs = require('fs');
const files = [
  'node_modules/enquire.js/src/index.js',
  'node_modules/enquire.js/src/MediaQueryDispatch.js',
];
const guard = 'if(typeof window==="undefined"){module.exports={register:function(){},unregister:function(){}};return;}\n';
files.forEach(path => {
  let code = fs.readFileSync(path, 'utf8');
  if (!code.includes('typeof window')) {
    fs.writeFileSync(path, guard + code);
    console.log('Patched: ' + path);
  } else {
    console.log('Already patched: ' + path);
  }
});
