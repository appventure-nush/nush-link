import express from 'express';

export interface AuthenticatedRequest extends express.Request {
  username: string,
  email: string
}
