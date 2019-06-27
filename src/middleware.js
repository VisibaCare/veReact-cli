const findRc = require('find-rc');

function middleware(referenceObj) {
  const filePath = findRc('ve');
  const returnObj = {
    ...referenceObj,
  };

  if (filePath) {
    const { plugins } = require(filePath);
    const getters = new Set(Object.keys(referenceObj));

    if (plugins) {
      plugins.forEach((plugin) => {
        Object.entries(plugin).forEach(([type, actions]) => {
          if (getters.has(type)) {
            Object.entries(actions).forEach(([actionType, action]) => {
              switch (actionType) {
                case 'modify':
                  returnObj[type] = action(returnObj[type]);
                  break;
                default:
                  throw new Error(`unknown type ${type}`);
              }
            });
          }
        });
      });
    }
  }

  return returnObj;
}

module.exports = middleware;
