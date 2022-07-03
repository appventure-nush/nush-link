import * as yup from 'yup';

const banned = [
  'api',
];
const allowedRegex = new RegExp('^[a-z0-9_-]+$');
const aliasFilter = yup
  .string()
  .trim()
  .lowercase()
  .max(255, "Alias too long")
  .notOneOf(banned)
  .matches(allowedRegex)
  .required();

export default {
  banned,
  allowedRegex,
  aliasFilter,
};
