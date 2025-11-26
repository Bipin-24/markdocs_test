---
title: API Reference
description: Complete reference documentation for the Actian Data Intelligence Platform API
---

# {% $markdoc.frontmatter.title %}

The Actian API is organized around REST principles. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

You can use the Actian API in test mode, which doesn't affect your live data. The API key you use to authenticate requests determines whether the request is in live mode or test mode.

## Just getting started?

Check out our [Getting Started](/docs/getting-started) guide to get up and running quickly.

---

## Base URL

```
https://api.actian.com/v1
```

## Authentication

The Actian API uses API keys to authenticate requests. You can view and manage your API keys in the Actian Dashboard.

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub or client-side code.

Authentication to the API is performed via HTTP Bearer Authentication. Provide your API key as the bearer token value.

### Authenticated Request

```bash
curl https://api.actian.com/v1/catalogs \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Errors

Actian uses conventional HTTP response codes to indicate the success or failure of an API request. In general: 

- Codes in the `2xx` range indicate success
- Codes in the `4xx` range indicate an error that failed given the information provided
- Codes in the `5xx` range indicate an error with Actian's servers (these are rare)

### HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Everything worked as expected |
| 400 | Bad Request | The request was unacceptable, often due to missing a required parameter |
| 401 | Unauthorized | No valid API key provided |
| 403 | Forbidden | The API key doesn't have permissions to perform the request |
| 404 | Not Found | The requested resource doesn't exist |
| 429 | Too Many Requests | Too many requests hit the API too quickly |
| 500, 502, 503, 504 | Server Errors | Something went wrong on Actian's end |

### Error Response

```json
{
  "error": {
    "code": "resource_not_found",
    "message": "The requested catalog was not found",
    "param": "catalog_id",
    "type": "invalid_request_error"
  }
}
```

---

## Pagination

All top-level API resources have support for bulk fetches via "list" API methods. These list API methods share a common structure, taking at least these three parameters: `limit`, `starting_after`, and `ending_before`.

### Parameters

- **limit** (optional) - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
- **starting_after** (optional) - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list.
- **ending_before** (optional) - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list.

### Example Request

```bash
curl https://api.actian.com/v1/catalogs?limit=10 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "cat_1234567890",
      "object": "catalog",
      "name": "Production Catalog"
    }
  ],
  "has_more": false,
  "url": "/v1/catalogs"
}
```

---

## Expanding Responses

Many objects allow you to request additional information as an expanded response by using the `expand` request parameter. This parameter is available on all API requests.

For example, you might expand the `owner` property on a catalog to get full user details instead of just the user ID.

```bash
curl https://api.actian.com/v1/catalogs/cat_1234567890?expand[]=owner \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Rate Limiting

The Actian API has rate limits to ensure fair usage and platform stability. Rate limits are applied per API key.

| Endpoint Type | Rate Limit |
|---------------|------------|
| Standard | 100 requests per minute |
| Bulk Operations | 20 requests per minute |
| Search | 50 requests per minute |

When you exceed the rate limit, you'll receive a `429 Too Many Requests` response. We recommend implementing exponential backoff in your application.

---

## API Resources

### Catalogs

Catalogs represent a collection of data assets in your organization. You can create, retrieve, update, and delete catalogs via the API.

{% table %}
* Endpoint
* Method
* Description
---
* `/v1/catalogs`
* GET
* List all catalogs
---
* `/v1/catalogs`
* POST
* Create a new catalog
---
* `/v1/catalogs/:id`
* GET
* Retrieve a catalog
---
* `/v1/catalogs/:id`
* PUT
* Update a catalog
---
* `/v1/catalogs/:id`
* DELETE
* Delete a catalog
{% /table %}

### Data Assets

Data assets represent individual datasets, tables, or files in your catalogs.

{% table %}
* Endpoint
* Method
* Description
---
* `/v1/assets`
* GET
* List all assets
---
* `/v1/assets`
* POST
* Create a new asset
---
* `/v1/assets/:id`
* GET
* Retrieve an asset
---
* `/v1/assets/:id`
* PUT
* Update an asset
---
* `/v1/assets/:id`
* DELETE
* Delete an asset
---
* `/v1/assets/search`
* POST
* Search assets
{% /table %}

### Connections

Connections represent integrations with external data sources.

{% table %}
* Endpoint
* Method
* Description
---
* `/v1/connections`
* GET
* List all connections
---
* `/v1/connections`
* POST
* Create a new connection
---
* `/v1/connections/:id`
* GET
* Retrieve a connection
---
* `/v1/connections/:id`
* PUT
* Update a connection
---
* `/v1/connections/:id`
* DELETE
* Delete a connection
---
* `/v1/connections/:id/test`
* POST
* Test a connection
{% /table %}

---

## Example: Create a Catalog

### Request

```bash
curl https://api.actian.com/v1/catalogs \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Data Catalog",
    "description": "Primary catalog for production data assets",
    "tags": ["production", "critical"]
  }'
```

### Response

```json
{
  "id": "cat_1234567890",
  "object": "catalog",
  "name": "Production Data Catalog",
  "description": "Primary catalog for production data assets",
  "tags": ["production", "critical"],
  "created_at": "2025-11-26T10:30:00Z",
  "updated_at": "2025-11-26T10:30:00Z",
  "owner": {
    "id": "user_0987654321",
    "email": "admin@example.com",
    "name": "Admin User"
  },
  "asset_count": 0,
  "status": "active"
}
```

---

## Example: Search Data Assets

### Request

```bash
curl https://api.actian.com/v1/assets/search \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "customer transactions",
    "filters": {
      "catalog_id": "cat_1234567890",
      "tags": ["sensitive"]
    },
    "limit": 20
  }'
```

### Response

```json
{
  "object": "search_result",
  "data": [
    {
      "id": "asset_abc123",
      "object": "asset",
      "name": "customer_transactions",
      "type": "table",
      "catalog_id": "cat_1234567890",
      "description": "Daily customer transaction records",
      "tags": ["sensitive", "pii"],
      "schema": {
        "columns": [
          {"name": "transaction_id", "type": "string"},
          {"name": "customer_id", "type": "string"},
          {"name": "amount", "type": "decimal"},
          {"name": "timestamp", "type": "datetime"}
        ]
      },
      "relevance_score": 0.95
    }
  ],
  "has_more": true,
  "total_count": 47
}
```

---

## SDKs and Libraries

We provide official client libraries to make integrating with the Actian API easier:

- **Python** - `pip install actian-sdk`
- **JavaScript/Node.js** - `npm install @actian/sdk`
- **Java** - Available via Maven Central
- **Go** - `go get github.com/actian/actian-go`

### Python Example

```python
import actian

# Initialize the client
client = actian.Client(api_key="YOUR_API_KEY")

# List catalogs
catalogs = client.catalogs.list(limit=10)

for catalog in catalogs:
    print(f"{catalog.id}: {catalog.name}")

# Create an asset
asset = client.assets.create(
    catalog_id="cat_1234567890",
    name="new_dataset",
    type="table",
    description="New dataset for analytics"
)
```

### JavaScript Example

```javascript
const Actian = require('@actian/sdk');

// Initialize the client
const client = new Actian('YOUR_API_KEY');

// List catalogs
const catalogs = await client.catalogs.list({ limit: 10 });

catalogs.data.forEach(catalog => {
  console.log(`${catalog.id}: ${catalog.name}`);
});

// Create an asset
const asset = await client.assets.create({
  catalog_id: 'cat_1234567890',
  name: 'new_dataset',
  type: 'table',
  description: 'New dataset for analytics'
});
```

---

## Webhooks

Actian can send webhook events to notify your application when certain events occur in your account. You can configure webhooks in the Actian Dashboard.

### Event Types

- `catalog.created` - Triggered when a catalog is created
- `catalog.updated` - Triggered when a catalog is updated
- `catalog.deleted` - Triggered when a catalog is deleted
- `asset.created` - Triggered when an asset is created
- `asset.updated` - Triggered when an asset is updated
- `asset.deleted` - Triggered when an asset is deleted
- `connection.connected` - Triggered when a connection is successfully established
- `connection.failed` - Triggered when a connection fails

### Webhook Payload

```json
{
  "id": "evt_1234567890",
  "object": "event",
  "type": "asset.created",
  "created": "2025-11-26T10:30:00Z",
  "data": {
    "object": {
      "id": "asset_abc123",
      "object": "asset",
      "name": "customer_data",
      "catalog_id": "cat_1234567890"
    }
  }
}
```

---

## Need Help?

- **Documentation**: [docs.actian.com](https://docs.actian.com)
- **Support**: support@actian.com
- **Community**: [community.actian.com](https://community.actian.com)
- **Status**: [status.actian.com](https://status.actian.com)
