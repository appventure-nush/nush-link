import express from 'express';

const router = express.Router();

router.post(
  '/login',
  async (
    req: express.Request,
    res: express.Response,
  ) => {
    const { id_token: idToken } = req.body;
    if (!idToken) {
      return res.json({
        error: true,
        message: 'ID token missing',
      });
    }
    res.cookie('token', idToken, {
      secure: true,
      httpOnly: true,
      // one month
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.redirect('/');
  },
);

export = router;
