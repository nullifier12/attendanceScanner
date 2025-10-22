// Global type declarations to prevent missing type definition errors

declare module 'babel_generator' {
  const content: any;
  export = content;
}

declare module 'babel_template' {
  const content: any;
  export = content;
}

declare module 'graceful-fs' {
  const content: any;
  export = content;
}

declare module 'hammerjs' {
  const content: any;
  export = content;
}

// Additional global declarations for common packages
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.jpeg' {
  const value: any;
  export default value;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}







