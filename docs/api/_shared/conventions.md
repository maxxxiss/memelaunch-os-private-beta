# API Conventions

## Naming

- Routes: kebab-case (`/api/launch-projects`)
- Query params: kebab-case
- JSON keys: camelCase

## Pagination

Cursor-based pagination (future):
- `cursor` string
- `limit` number (max 100)

## Sorting

Future endpoints will support:
- `sort_by` field
- `sort_order` asc/desc

## Filtering

Future endpoints will support:
- Field filters in query params
- Array values as comma-separated
