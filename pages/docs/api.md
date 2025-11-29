---
title: API Reference
description: Complete reference documentation for the Actian Data Intelligence Platform API
---

{% api-layout %}

{% api-section title="Introduction" id="introduction" %}

{% api-description %}

# API Reference

The Actian API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

The API is designed to be intuitive and developer-friendly, with comprehensive error messages and extensive documentation.

## Base URL

```
https://api.actian.com/v1
```

## Just getting started?

Check out our [Getting Started](/docs/getting-started) guide to begin using the Actian API.

{% /api-description %}

{% api-code title="Sample Request" %}

```bash
curl https://api.actian.com/v1/catalogs \
  -H "Authorization: Bearer YOUR_API_KEY"
```

{% /api-code %}

{% /api-section %}

{% api-section title="Authentication" id="authentication" %}

{% api-description %}

## Authentication

The Actian API uses API keys to authenticate requests. You can view and manage your API keys in the Actian Dashboard.

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

### API Key Format

- Test mode keys have the prefix `ak_test_`
- Live mode keys have the prefix `ak_live_`

{% /api-description %}

{% api-code title="Authentication" %}

```bash
curl https://api.actian.com/v1/catalogs \
  -H "Authorization: Bearer ak_test_1234567890abcdef"
```

{% /api-code %}

{% /api-section %}

{% api-section title="Errors" id="errors" %}

{% api-description %}

## Errors

Actian uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error that failed given the information provided. Codes in the `5xx` range indicate an error with Actian's servers.

### HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Everything worked as expected |
| 400 | Bad Request | Missing required parameter |
| 401 | Unauthorized | No valid API key provided |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Something went wrong |

### Error Attributes

- **type** - The type of error returned
- **code** - Short string indicating the error code
- **message** - Human-readable error message
- **param** - Parameter related to the error

{% /api-description %}

{% api-code title="Error Response" %}

```json
{
  "error": {
    "type": "invalid_request_error",
    "code": "resource_not_found",
    "message": "No such catalog: 'cat_invalid'",
    "param": "catalog_id"
  }
}
```

{% /api-code %}

{% /api-section %}

{% api-section title="Catalogs" id="catalogs" %}

{% api-description %}

## Catalogs

Catalog objects represent a collection of data assets in your organization. Each catalog can contain multiple assets and has its own access controls and metadata.

{% /api-description %}

{% /api-section %}

{% api-section id="create-catalog" %}

{% api-endpoint method="POST" path="/v1/catalogs" description="Create a new catalog" /%}

{% api-description %}

### Create a catalog

Creates a new catalog object with the specified parameters.

{% api-parameters %}

{% api-parameter name="name" type="string" required=true description="The name of the catalog" /%}

{% api-parameter name="description" type="string" description="A description of the catalog's purpose" /%}

{% api-parameter name="tags" type="array" description="Array of tags for categorization" /%}

{% api-parameter name="access_level" type="string" description="Access level: public, private, or restricted" /%}

{% /api-parameters %}

### Returns

Returns a catalog object if the request succeeds. The returned object will include the catalog ID and creation timestamp.

{% /api-description %}

{% api-code title="Request" %}

```bash
curl https://api.actian.com/v1/catalogs \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Catalog",
    "description": "Main production data assets",
    "tags": ["production", "critical"],
    "access_level": "private"
  }'
```

{% /api-code %}

{% api-code title="Response" %}

```json
{
  "id": "cat_1234567890",
  "object": "catalog",
  "name": "Production Catalog",
  "description": "Main production data assets",
  "tags": ["production", "critical"],
  "access_level": "private",
  "created_at": "2025-11-26T10:30:00Z",
  "updated_at": "2025-11-26T10:30:00Z",
  "asset_count": 0,
  "owner": {
    "id": "user_0987654321",
    "email": "admin@example.com"
  }
}
```

{% /api-code %}

{% /api-section %}

{% apitryit 
  endpoint="https://api.actian.com/v1/catalogs"
  method="POST"
  description="Create a new catalog in the Actian platform"
  parameters=[
    { "name": "name", "description": "The name of the catalog", "required": true },
    { "name": "description", "description": "A description of the catalog's purpose", "required": false },
    { "name": "tags", "description": "Array of tags for categorization", "required": false },
    { "name": "access_level", "description": "Access level: public, private, or restricted", "required": false }
  ]
  body={
    "name": "Production Catalog",
    "description": "Main production data assets",
    "tags": ["production", "critical"],
    "access_level": "private"
  }
/%}

{% api-section id="retrieve-catalog" %}

{% api-endpoint method="GET" path="/v1/catalogs/:id" description="Retrieve a catalog" /%}

{% api-description %}

### Retrieve a catalog

Retrieves the details of an existing catalog. Supply the unique catalog ID and Actian will return the corresponding catalog information.

{% api-parameters %}

{% api-parameter name="id" type="string" required=true description="The ID of the catalog to retrieve" /%}

{% api-parameter name="expand" type="array" description="Specifies which fields to expand (e.g., 'owner', 'assets')" /%}

{% /api-parameters %}

{% /api-description %}

{% api-code title="Request" %}

```bash
curl https://api.actian.com/v1/catalogs/cat_1234567890 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

{% /api-code %}

{% api-code title="Response" %}

```json
{
  "id": "cat_1234567890",
  "object": "catalog",
  "name": "Production Catalog",
  "description": "Main production data assets",
  "tags": ["production", "critical"],
  "access_level": "private",
  "created_at": "2025-11-26T10:30:00Z",
  "updated_at": "2025-11-26T10:30:00Z",
  "asset_count": 42,
  "owner": {
    "id": "user_0987654321",
    "email": "admin@example.com"
  }
}
```

{% /api-code %}

{% /api-section %}

{% api-section id="list-catalogs" %}

{% api-endpoint method="GET" path="/v1/catalogs" description="List all catalogs" /%}

{% api-description %}

### List all catalogs

Returns a list of catalogs. The catalogs are returned sorted by creation date, with the most recently created catalogs appearing first.

{% api-parameters %}

{% api-parameter name="limit" type="integer" description="Number of results to return (1-100, default: 10)" /%}

{% api-parameter name="starting_after" type="string" description="Cursor for pagination" /%}

{% api-parameter name="ending_before" type="string" description="Cursor for pagination" /%}

{% api-parameter name="tags" type="array" description="Filter by tags" /%}

{% /api-parameters %}

{% /api-description %}

{% api-code title="Request" %}

```bash
curl https://api.actian.com/v1/catalogs?limit=10 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

{% /api-code %}

{% api-code title="Response" %}

```json
{
  "object": "list",
  "data": [
    {
      "id": "cat_1234567890",
      "object": "catalog",
      "name": "Production Catalog",
      "asset_count": 42
    },
    {
      "id": "cat_0987654321",
      "object": "catalog",
      "name": "Development Catalog",
      "asset_count": 18
    }
  ],
  "has_more": false,
  "url": "/v1/catalogs"
}
```

{% /api-code %}

{% /api-section %}

{% api-section title="Data Assets" id="assets" %}

{% api-description %}

## Data Assets

Asset objects represent individual datasets, tables, files, or other data resources within your catalogs. Assets contain rich metadata including schema information, lineage, and quality metrics.

{% /api-description %}

{% /api-section %}

{% api-section id="create-asset" %}

{% api-endpoint method="POST" path="/v1/assets" description="Create a new asset" /%}

{% api-description %}

### Create an asset

Creates a new data asset in the specified catalog.

{% api-parameters %}

{% api-parameter name="catalog_id" type="string" required=true description="The ID of the catalog" /%}

{% api-parameter name="name" type="string" required=true description="The name of the asset" /%}

{% api-parameter name="type" type="string" required=true description="Asset type: table, file, api, or stream" /%}

{% api-parameter name="description" type="string" description="Description of the asset" /%}

{% api-parameter name="schema" type="object" description="Schema definition for the asset" /%}

{% api-parameter name="tags" type="array" description="Array of tags" /%}

{% /api-parameters %}

{% /api-description %}

{% api-code title="Request" %}

```bash
curl https://api.actian.com/v1/assets \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "catalog_id": "cat_1234567890",
    "name": "customer_transactions",
    "type": "table",
    "description": "Daily customer transactions",
    "schema": {
      "columns": [
        {"name": "id", "type": "string"},
        {"name": "amount", "type": "decimal"}
      ]
    },
    "tags": ["sensitive", "pii"]
  }'
```

{% /api-code %}

{% api-code title="Response" %}

```json
{
  "id": "asset_abc123",
  "object": "asset",
  "catalog_id": "cat_1234567890",
  "name": "customer_transactions",
  "type": "table",
  "description": "Daily customer transactions",
  "tags": ["sensitive", "pii"],
  "created_at": "2025-11-26T10:35:00Z",
  "schema": {
    "columns": [
      {"name": "id", "type": "string"},
      {"name": "amount", "type": "decimal"}
    ]
  }
}
```

{% /api-code %}

{% /api-section %}

{% api-section id="search-assets" %}

{% api-endpoint method="POST" path="/v1/assets/search" description="Search for assets" /%}

{% api-description %}

### Search assets

Search for assets using natural language queries or filters. The search supports full-text search across asset names, descriptions, and metadata.

{% api-parameters %}

{% api-parameter name="query" type="string" required=true description="Search query string" /%}

{% api-parameter name="filters" type="object" description="Additional filters (catalog_id, tags, type)" /%}

{% api-parameter name="limit" type="integer" description="Number of results (1-100, default: 10)" /%}

{% /api-parameters %}

### Returns

Returns a search result object containing matching assets with relevance scores.

{% /api-description %}

{% api-code title="Request" %}

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

{% /api-code %}

{% api-code title="Response" %}

```json
{
  "object": "search_result",
  "data": [
    {
      "id": "asset_abc123",
      "name": "customer_transactions",
      "type": "table",
      "description": "Daily transactions",
      "relevance_score": 0.95,
      "catalog_id": "cat_1234567890"
    }
  ],
  "total_count": 1,
  "has_more": false
}
```

{% /api-code %}

{% /api-section %}

{% api-section title="Connections" id="connections" %}

{% api-description %}

## Connections

Connection objects represent integrations with external data sources. Actian supports 100+ connection types including databases, cloud storage, and data warehouses.

{% /api-description %}

{% /api-section %}

{% api-section id="create-connection" %}

{% api-endpoint method="POST" path="/v1/connections" description="Create a connection" /%}

{% api-description %}

### Create a connection

Creates a new connection to an external data source.

{% api-parameters %}

{% api-parameter name="name" type="string" required=true description="Connection name" /%}

{% api-parameter name="type" type="string" required=true description="Connection type (e.g., 'snowflake', 'postgres', 's3')" /%}

{% api-parameter name="credentials" type="object" required=true description="Authentication credentials" /%}

{% api-parameter name="config" type="object" description="Connection-specific configuration" /%}

{% /api-parameters %}

{% /api-description %}

{% api-code title="Request" %}

```bash
curl https://api.actian.com/v1/connections \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Snowflake",
    "type": "snowflake",
    "credentials": {
      "account": "xy12345",
      "username": "admin",
      "password": "***"
    },
    "config": {
      "warehouse": "COMPUTE_WH",
      "database": "PROD_DB"
    }
  }'
```

{% /api-code %}

{% api-code title="Response" %}

```json
{
  "id": "conn_xyz789",
  "object": "connection",
  "name": "Production Snowflake",
  "type": "snowflake",
  "status": "active",
  "created_at": "2025-11-26T10:40:00Z",
  "last_tested": "2025-11-26T10:40:00Z"
}
```

{% /api-code %}

{% /api-section %}

{% /api-layout %}
