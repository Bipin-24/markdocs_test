# Adding a Looker Connection

{% callout type="info" %}
To connect to the Looker platform, the running user must have access to the required Dashboards.

You can find a link to the configuration template in [Zeenea Connector Downloads](zeenea-connectors-list.md).
{% /callout %}

## Supported Versions

The Looker connector is compatible with the SaaS Looker instances hosted on Google Cloud (`*.cloud.looker.com`).

{% callout type="warning" %}
Legacy AWS-hosted Looker instances (URLs without `cloud`) are not supported.
{% /callout %}

## Installing the Plugin

You can download the Looker plugin from [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information about how to install a plugin, see [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

## Declaring the Connection

Connectors are created and configured through a dedicated configuration file located in the `/connections` folder of the relevant scanner. The scanner frequently checks for any change and resynchronises automatically.

For more information about managing connections, see [Managing Connections](../Zeenea_Administration/zeenea-managing-connections.md).

To establish a connection with Looker, fill in the following parameters in the dedicated configuration file using a **JSON-Style** format:

{% callout type="note" %}
Configuration examples below use Markdoc fenced code blocks for clarity.
{% /callout %}

{% table %}
| Parameter         | Expected value |
|-------------------|---------------|
| `name`            | Specifies the display name for the connection. |
| `code`            | Defines the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner. |
| `connector_id`    | The type of connector to be used for the connection. The value must be `looker` and must not be modified. |
| `enabled`         | A boolean value to enable or disable the connection. The default value is `true`. |
| `catalog_code`    | Defines the catalog code associated with the connection ("default" when empty). |
| `secret_manager`  | Configuration for a secret manager. Works only with Scanner version 73 or later and requires a functional secret manager configured in the scanner configuration file. |
| `connection`      | Connection settings. |
| `lineage`         | (Optional) A boolean value to activate the automatic lineage feature. The default value is `true`. |
| `proxy`           | Proxy configuration. |
| `tls`             | TLS Truststore settings. |
{% /table %}

### Example: Secret Manager Configuration

```json
secret_manager {
  enabled = true
  key = "my-secret-key"
}
```

### Example: Connection Settings

```json
connection {
  tenant = "your-tenant"
  oauth {
    client_id = "your-client-id"
    client_secret = "your-client-secret"
    timeout = 10000
  }
  fetch_offset_size = 100
}
```

### Example: Proxy Configuration

```json
proxy {
  scheme = "https"
  hostname = "proxy.example.com"
  port = 443
  username = "proxyuser"
  password = "proxypass"
}
```

### Example: TLS Truststore Settings

```json
tls {
  truststore {
    path = "/path/to/truststore"
    password = "truststore-password"
    type = "PKCS12"
  }
}
```

## User Permissions

{% callout type="info" %}
To collect metadata, the running user's permissions must allow them to access and read dashboards that need cataloging.
{% /callout %}

## Data Extraction

To extract information from Looker, the connector will scan all Dashboards the running user has access to and transform them into **Visualization** objects in Zeenea. Data sources are referenced as **Datasets**. Fields are recreated as **Field**-type objects in Zeenea. For each Looker Dataset, a **Data Process** is created to represent the lineage with the origin Dataset.

{% callout type="info" %}
The connector executes the following requests:
{% /callout %}

```bash
GET /api/4.0/dashboards/{dashboard-id}/search
GET /api/4.0/connections/
GET /api/4.0/folders/{folder-id}/ancestors
GET /api/4.0/lookml_models/{model-name}/explores/{dataset-name}
POST /login
```

## Collected Metadata

### Inventory

The inventory collects the list of Dashboards (along with their data sources) that the user can access.

### Lineage

The Looker connector is able to retrieve the lineage between datasets that have been imported to the catalog. Datasets from other connections must have been previously imported to the catalog to be linked to the Looker dataset through a new Data Process object. This feature is available for the following systems and, for it to work, an additional parameter is needed in the source system connection as configured in the Looker connection configuration panel.

{% table %}
| Source System | Possible value of `alias` parameter to be set in source system configuration file |
|---------------|----------------------------------------------------------------------------------|
| [BigQuery](./zeenea-connector-google-bigquery.md) | BigQuery project name |
{% /table %}

{% callout type="note" %}
The connector creates a data process object for each dataset from Looker to represent the link with the source dataset (even if the source dataset is not present in the catalog).
{% /callout %}

### Visualization

A Visualization is a Looker Dashboard.

- **Name**: Dashboard name
- **Source Description**: Dashboard label
- **Datasets**: All datasets referenced in the Dashboard
- **Technical Data**: Creation date, Parent space, Last visualization date, Number of views by web UI

### Dataset

A dataset is a Data source used in a Looker Dashboard.

- **Name**: Dataset name
- **Source Description**: Dataset label
- **Technical Data**: Explore name, Schema name, Model name, Connection name

### Field

Dataset field. Can be used as a Dashboard report data.

- **Name**: Field name
- **Source Description**: Field label
- **Type**: Field type
- **Can be null**: false (default)
- **Multivalued**: false (default)
- **Primary Key**: false (default)
- **Technical Data**: Field type: dimension or measure

### Data Process

To represent the data flow from an external source, a Zeenea Data Process will be created for each Looker Dataset.

* **Name**: `import input/output_dataset name`

## Object Identifier Keys

{% table %}
* Object
* Identification Key
* Description
---
* Visualization
* `code/identifier`
* **code**: Unique identifier of the connection noted in the configuration file  
  **identifier**: Looker technical object identifier
---
* Dataset
* `code/dataset/identifier`
* **code**: Unique identifier of the connection noted in the configuration file  
  **identifier**: Looker technical object identifier
---
* Field
* `code/dataset/identifier/field-name`
* **code**: Unique identifier of the connection noted in the configuration file  
  **identifier**: Looker technical object identifier  
  **field-name**
---
* Data Process
* `code/transformation/model-name/dataset-name`
* **code**: Unique identifier of the connection noted in the configuration file  
  **model-name**  
  **dataset-name**
{% /table %}

