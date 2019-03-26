import update from 'immutability-helper';

export const auto = (value: {}, object: {}) => {
  return update(object || {}, value);
};
export const autoArray = (value: {}, object: {}) => {
  return update(object || [], value);
}; 