var _self = (typeof globalThis !== 'undefined') ? globalThis : (typeof self !== 'undefined') ? self : {};
if (typeof _self.window === 'undefined') {
  _self.window = _self;
  _self.window.matchMedia = _self.window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
    };
  };
}
