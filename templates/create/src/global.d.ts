declare global {
  function preval(fn: TemplateStringsArray): any;
}

declare module '*.json' {
  const value: any;
  
  export default value;
}

import * as CSS from 'csstype';
declare module 'csstype' {
  interface Properties {
    [index: string]: any;
  }
}
