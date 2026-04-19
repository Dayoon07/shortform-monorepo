export const cl: string = window.location.protocol === "http:" 
    ? `${window.location.origin}/shortform-client` 
    : `${window.location.origin}`;