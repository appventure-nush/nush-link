import express from 'express';
import * as yup from 'yup';
import connection from '../config/database';
import config from '../config/config';
import filter from '../util/filter';

const router = express.Router({ mergeParams: true });

const schema = yup.object().shape({
  alias: filter.aliasFilter,
});

router.get(
  '/:alias',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { alias } = req.params;
      await schema.validate({
        alias,
      });

      await connection.query(
        `SELECT original FROM ${config.DB_URL_REDIRECT_TABLE} WHERE alias = ?;`,
        [alias],
        (error, result) => {
          if (error) next(new Error(`Error during sql: ${error.message}`));
          if (result.length === 1) {
            res.redirect(result[0].original);
          } else {
            res.redirect('/#404');
          }
        },
      );
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:alias/p',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { alias } = req.params;
      await schema.validate({
        alias,
      });

      await connection.query(
        `SELECT alias FROM ${config.DB_URL_REDIRECT_TABLE} WHERE alias = ?;`,
        [alias],
        (error, result) => {
          if (error) next(new Error(`Error during sql: ${error.message}`));
          if (result.length === 1) {
            res.redirect(`/#p/${alias}`);
          } else {
            res.redirect('/#404');
          }
        },
      );
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:alias/data',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { alias } = req.params;
      await schema.validate({
        alias,
      });

      await connection.query(
        `SELECT original, creatorName, creatorEmail, createdOn FROM ${config.DB_URL_REDIRECT_TABLE} WHERE alias = ?;`,
        [alias],
        (error, result) => {
          if (error) next(new Error(`Error during sql: ${error.message}`));
          if (result.length === 1) {
            res.json({
              success: true,
              url: result[0].original,
              creator: result[0].creatorName,
              creatorEmail: result[0].creatorEmail,
              createdOn: new Date(result[0].createdOn).toISOString(),
            });
          } else {
            res.json({
              success: false,
              error: 'No alias found',
            });
          }
        },
      );
    } catch (error) {
      next(error);
    }
  },
);

export = router;
