Actian Model Context Protocol (MCP) Server
==========================================

The Actian MCP Server uses the open-source Model Context Protocol (MCP) standard to enable AI agents to access contextual metadata from external systems. This protocol provides a standardized way for large language models (LLMs) and automation frameworks to retrieve the context they need to provide accurate and reliable results.

The Actian MCP Server (Beta) acts as a secure bridge between the Actian Data Intelligence Platform and AI tools, such as Claude, Cursor, Windsurf, and Microsoft Copilot Studio. With the Actian MCP Server, you can search and find assets at both the semantic layer and the data model level, using real-time context from Studio and Explorer applications within the Actian Data Intelligence Platform.

## Actian MCP Server Tools

The Actian MCP Server provides a set of tools that enable AI agents to work directly with metadata in the Actian Data Intelligence Platform. These tools supply real-time context to AI environments, making it easier to search, explore, and update metadata without leaving your workflow.

The tools include the following:

### Find Glossary Definition

The `find_glossary_definition` tool retrieves the stored definitions of a glossary term from the data catalog. If there are multiple glossary items with the same name, the tool returns up to 10 matching definitions.

This tool allows you to easily look up the written definition of any business term in your company's glossary.

For example, if you query `Customer Lifetime Value`, the tool returns the exact definition text that was stored in the glossary, such as: _The predicted net profit attributed to the entire future relationship with a customer, calculated using historical purchase data and retention rates_.

### Get Glossary Implementations

The `get_glossary_implementations` tool retrieves all data assets (such as datasets) that are linked as implementations of a specified glossary term using the **Implements** predicate.

This tool allows you to easily look up all the actual data tables and files that contain information related to a specific business term.

For example, if you search for `Customer`, the tool returns that this concept is implemented in datasets like `customer_profile_table`, `customer_transactions`, and `customer_support_tickets`. This shows you exactly where that business concept exists in your data infrastructure.

### Get Dataset Data Model

The `get_dataset_data_model` tool retrieves the relational data model for a specified dataset, including fields, relations, and connected datasets.

In other words, you can use this tool to understand how your data tables connect to each other and see the **family tree** of your data relationships.

For example, if you query the `orders` table, the tool can show that it connects to the `customers`, `products`, and `shipping` tables. This helps you understand the full data model for e-commerce analytics.

### Semantic Search Glossary

The `semantic_search_glossary` tool performs an AI-powered semantic search to find glossary terms conceptually related to a given query, reference, or question, focusing on the meaning rather than exact keywords.

This tool allows you to easily find business terms that are similar in meaning, even if they use different words.

For example, if you search for `revenue`, the tool returns related terms like `income`, `sales`, `gross profit`, and `billing`. These terms are conceptually connected even if they don't share the same keywords.

## Deployment Options

We currently provide only remote connections to Actian MCP Servers. 

Our remote deployment is a per-tenant MCP Server managed by Actian. It supports API Key authentication and is currently available in Beta.
