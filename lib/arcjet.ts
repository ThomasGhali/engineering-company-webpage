import arcjet, { detectBot, shield, tokenBucket } from '@arcjet/next';

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
    }),
    tokenBucket({
      mode: 'LIVE',
      refillRate: 5,
      interval: 3600,
      capacity: 10,
    }),
  ],
});
