{% callout type="info" %}
Zeenea provides a set of public APIs to manage your catalog and its contents. This page gives an overview of the available APIs and their technologies.
{% /callout %}

## List of APIs

| API | Technology | Description |
|-----|------------|-------------|
| Exploration and mutation | GraphQL | Retrieve and edit any Item's documentation |
| Catalog Design | GraphQL | Manage your catalog metamodel, Item types, and available properties |
| User Management | SCIM | Manage Users, Contacts, and Permission sets |
| Audit Trail API | REST | Track all Add, Update, and Delete events on all Items' metadata |
| Data Product API | REST | Ingest and update data products and data contracts |
| Access Request API | REST | Manage access requests |

For each API, dedicated documentation is available to help you understand its use cases, current limits, and example requests.

For more information about the lifecycle of APIs, see [Zeenea API Lifecycle](./zeenea-api-lifecycle.md).

## API Key Authentication

To use the APIs, authenticate using an API key:

1. Create a new API key in Zeenea Administration. For detailed steps, see [Create an API key](../Zeenea_Administration/zeenea-managing-api-keys.md#create-an-api-key).
2. In your HTTP requests, add the following header:

   `X-API-SECRET: $APISECRET`

   Replace `$APISECRET` with the API secret you retrieved when creating the key.


 