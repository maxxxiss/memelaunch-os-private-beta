# Rate Limits

## Default limits

- Auth endpoints: 10 requests per minute per IP
- Read endpoints: 60 requests per minute per user
- Write endpoints: 20 requests per minute per user

## Headers

Rate limit headers will be added in future:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`
