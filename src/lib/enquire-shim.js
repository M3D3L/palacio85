if (typeof window === 'undefined') {
  global.window = global.window || {};
  global.window.matchMedia = global.window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
    };
  };
}
