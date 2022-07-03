import express from 'express';

export interface AuthenticatedRequest extends express.Request {
  username: string,
  email: string,
  can_create_redirect: boolean,
  can_authorize_students: boolean,
}
