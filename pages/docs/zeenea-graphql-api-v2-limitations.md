---
title: GraphQL API v2 — Limitations
description: Comprehensive overview of supported operations, item types, attributes, properties, and connections available in the GraphQL API v2 preview.
---

{% callout type="warning" title="Preview Limitations" %}
This documentation describes **GraphQL API v2 (Preview)** capabilities.  
Some services and features are partially implemented or have functional limitations.
{% /callout %}

# GraphQL API v2 Limitations

{% paragraph %}
This page provides a consolidated view of all supported services in the GraphQL API v2 preview, including operations, item types, attributes, properties, and connections.
{% /paragraph %}

---

## Operations

{% table %}
* Operation name
* Availability
* Description
* Comment
---
* `item`
* Ok
* Query one item from the catalog using a unique reference
* —
---
* `itemByname`
* Ok
* Query one item from the catalog using its name and type
* —
---
* `items`
* Ok
* Query a list of items of a given type from the catalog
* **Limitations:** Filters using `connections` or date-type properties are not available yet
---
* `node`
* Ok
* Direct query to a Node (Relay-compliant)
* —
---
* `createContact`
* Ok
* Create a contact
* —
---
* `createItem`
* Ok
* Create an item (all types **except** contacts)
* —
---
* `deleteContact`
* Ok
* Delete a contact
* —
---
* `deleteItem`
* Ok
* Delete an item (all types **except** contacts)
* Deleting fields is limited to **orphans**
---
* `updateContact`
* Ok
* Update a single contact
* —
---
* `updateItem`
* Ok
* Update a single item (all types **except** contacts)
* —
{% /table %}

---

## Item Types

{% table %}
* Item type
* Value
* Read
* Write
---
* Dataset
* `dataset`
* Ok
* Ok
---
* Field
* `field`
* Ok
* Ok
---
* Visualization
* `visualization`
* Ok
* Ok
---
* Data process
* `data-process`
* Ok
* Ok
---
* Contact
* `contact`
* Ok
* Ok
---
* Datasource
* `datasource`
* Ok
* N/A
---
* Category
* `category`
* Ok
* Ok
---
* Custom Item Type
* Custom item code as defined in Zeenea metamodel
* Ok
* Ok
---
* Glossary Item Type
* Glossary item code as defined in Zeenea metamodel
* Ok
* Ok
{% /table %}

---

## Basic Attributes

{% table %}
* Attribute
* Type
* Item type(s)
* Read
* Write
* Description
* Comment
---
* `id`
* String
* Any
* Ok
* N/A
* Zeenea internal identifier of the item
* —
---
* `key`
* String
* Any
* Ok
* Ok
* Forgeable unique identifier of the item
* `key = email` for contacts
---
* `name`
* String
* Any
* Ok
* Ok
* Item name in Zeenea
* Concatenation of `firstName` and `lastName` for contacts
---
* `description`
* String
* Any
* Ok
* Ok
* Item description in Zeenea
* —
---
* `lastCatalogMetadataUpdate`
* Date
* Any
* Ok
* N/A
* Date of last modification in Zeenea
* —
---
* `type`
* String
* Any
* Ok
* N/A
* Item type value
* —
---
* `completion`
* Number
* Any
* Ok
* N/A
* Documentation completion rate
* Not implemented for contacts and datasources
{% /table %}

---

## Built-in Properties

{% table %}
* Property
* Type
* Item type(s)
* Read
* Write
* Description
---
* `sourceName`
* String
* Dataset, Field, Visualization, Data Process
* Ok
* N/A
* Name of the item in the source system
---
* `sourceDescription`
* String
* Dataset, Field, Visualization, Data Process
* Ok
* N/A
* Description of the item in the source system
---
* `lastSourceMetadataUpdate`
* Date
* Dataset, Field, Visualization, Data Process
* Ok
* N/A
* Last metadata change in the source system
---
* `orphan`
* Boolean
* Dataset, Field, Visualization
* Ok
* N/A
* Item missing from the last inventory
---
* `deletionDate`
* Date
* Dataset, Field, Visualization, Data Process
* Ok
* N/A
* Deletion date in the source system
---
* `importDate`
* Date
* Dataset, Field, Visualization, Data Process
* Ok
* N/A
* Import date into the catalog
---
* `fieldType`
* String
* Field
* Ok
* N/A
* Normalized field type
---
* `fieldNativeType`
* String
* Field
* Ok
* N/A
* Native field type in the source system
---
* `canBeNull`
* Boolean
* Field
* Ok
* N/A
* Indicates nullability
---
* `multivalued`
* Boolean
* Field
* Ok
* N/A
* Supports multiple values
---
* `primaryKey`
* Boolean
* Field
* Ok
* N/A
* Is a primary key
---
* `foreignKey`
* Boolean
* Field
* Ok
* N/A
* Is a foreign key
---
* `businessKey`
* Boolean
* Field
* Ok
* Ok
* Is a business key
---
* `dataProfileEnabled`
* Boolean
* Field
* Ok
* Ok
* Data profiling enabled
---
* `dataProfilePublished`
* Boolean
* Field
* Ok
* Ok
* Data profiling published
---
* `alternativeNames`
* [String]
* All glossary types
* Ok
* Ok
* Alternative names
---
* `email`
* String
* Contact
* Ok
* Ok
* Contact email
---
* `firstName`
* String
* Contact
* Ok
* Ok
* First name
---
* `lastName`
* String
* Contact
* Ok
* Ok
* Last name
---
* `phone`
* String
* Contact
* Ok
* Ok
* Phone number
{% /table %}

---

## Connections

{% callout type="info" title="Connections Overview" %}
Connections describe relationships between items and define how entities are linked in the catalog.
{% /callout %}

{% table %}
* Source type
* Target type(s)
* Connection name
* Read
* Write
* Description
---
* `dataset`
* `field`
* `fields`
* Ok
* N/A
* Fields of a dataset
---
* `dataset`
* `dataset`
* `relations`
* Ok
* Ok
* Datasets linked through a foreign key
---
* `dataset`
* `data-process`
* `ingesters`
* Ok
* Ok
* Data processes consuming the dataset
---
* `dataset`
* `data-process`
* `producers`
* Ok
* Ok
* Data processes producing the dataset
---
* `dataset`
* `visualization`
* `visualization`
* Ok
* Ok
* Visualization embedding the dataset
---
* `dataset`
* Custom item type
* Custom code
* Ok
* Ok
* Custom items linked to the dataset
---
* `dataset`
* `category`
* `category`
* Ok
* Ok
* **DEPRECATED** dataset category
---
* `dataset`
* `contact`
* `curators`
* Ok
* Ok
* Dataset curators
---
* `dataset`
* `contact`
* Responsibility name
* Ok
* Ok
* Dataset responsibilities
{% /table %}

---

## Custom Properties

{% table %}
* Property type
* Read
* Write
* Description
---
* Template property
* Ok
* Ok
* Properties associated with the item template in Studio
---
* Source property
* Ok
* N/A
* Properties harvested from a connector
{% /table %}

{% callout type="success" title="Next Steps" %}
For usage examples, schema details, and mutations, refer to the **GraphQL API v2 reference documentation**.
{% /callout %}
