export function isNullUndefinedOrEmpty(str){
  if(str === null || str === undefined){
    return true;
  } else if(str.length === 0){
    return true;
  } else {
    return false;
  }
}