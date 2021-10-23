import * as yup from 'yup';

const banned = [
  'api',
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
