export const parseHTML = function(str) {
  return document.createRange().createContextualFragment(str).children[0];
};

export const isNumber = function(number) {
  return /[0-9]+/.test(number);
};
