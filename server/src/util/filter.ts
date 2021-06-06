import * as yup from 'yup';

const banned = [
  'Success',
  'success',
];
const allowedRegex = new RegExp('^[a-z0-9_-]+$');
const aliasFilter = yup
  .string()
  .trim()
  .lowercase()
  .notOneOf(banned)
  .matches(allowedRegex);

export default {
  banned,
  allowedRegex,
  aliasFilter,
};
