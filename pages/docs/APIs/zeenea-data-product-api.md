
{% api-layout %}
    {% api-section title="Overview" id="overview" %}
        {% api-description %}
            The Actian Data Intelligence Platform leverages these standards managed by [Bitol](https://bitol.io/) (a Linux Foundation project):
            - [Open Data Contract Standard (ODCS)](https://github.com/bitol-io/open-data-contract-standard)
            - [Open Data Product Standard (ODPS)](https://github.com/bitol-io/open-data-product-standard)

            These YAML files can be uploaded to the platform through a dedicated REST API.

            {% callout type="note" %}
            Before supporting ODCS, the Actian Data Intelligence Platform used the specifications from DataContract.com. If you have existing data contracts using this specification, we recommend using an external tool, such as [Data Contract CLI](https://cli.datacontract.com/), to migrate these data contracts. You can also reference Bitol services described on our [Actian Data Intelligence Platform Substack](https://dataintelligenceplatform.substack.com/p/so-you-want-to-work-with-data-contracts).
            {% /callout %}

            To use this API, you must generate an API key from the Administration page with a permission scope of **Admin** or **Scanner**, and include the API key secret in the request header using the `X-API-SECRET` parameter.
        {% /api-description %}
    {% /api-section %}

    {% api-section title="Workflow" id="workflow" %}
        {% api-description %}
            To create data products, follow this sequence of API calls:
            1. **Get upload URL**
                 {% api-endpoint method="POST" path="/api/synchronization/data-product-uploads" description="Get a URL for uploading YAML files." %}
                 The endpoint returns upload parameters and an ID.
                 {% api-code title="Sample Response" %}
                 ```json
                 {
                     "id": "ad8ac27f-692d-4174-8f84-2ebf00f0e099",
                     "uploadParameters": {
                         "url": "...",
                         "headers": {
                             "x-amz-server-side-encryption": "aws:kms",
                             "x-amz-server-side-encryption-aws-kms-key-id": "..."
                         }
                     },
                     "maximumFileSizeInBytes": 52428800
                 }
                 ```
                 {% /api-code %}

            2. **Upload YAML ZIP**
                 {% api-endpoint method="PUT" path="[upload URL from step 1]" description="Upload the ZIP file containing YAML descriptors." %}
                 Include the headers from the previous response.
                 {% callout type="important" %}
                 Ensure that the data products and data contracts YAML descriptors are compressed in a ZIP file. The ZIP file can contain multiple data products and data contracts.
                 {% /callout %}
                 If successful, the endpoint returns HTTP 200.

            3. **Trigger Processing**
                 {% api-endpoint method="POST" path="/api/synchronization/data-product-uploads/{id}/process" description="Trigger file processing." %}
                 Add header: `Content-Type: application/json`.
                 Body:
                 {% api-code title="Request Body" %}
                 ```json
                 {
                     "catalogCode": "default"
                 }
                 ```
                 {% /api-code %}
                 If `catalogCode` is missing or permissions are insufficient, the endpoint returns HTTP 500. If successful, returns HTTP 204.

            4. **Check Status**
                 {% api-endpoint method="GET" path="/api/synchronization/data-product-uploads/{id}" description="Get processing status." %}
                 {% api-code title="Sample Response" %}
                 ```json
                 {
                     "result": {
                         "processed": 1,
                         "upserted": 1,
                         "errors": []
                     },
                     "id": "17abafee-8dd4-4884-bd08-67260e59e13f",
                     "status": "Processed"
                 }
                 ```
                 {% /api-code %}
                 - **processed**: Number of YAML descriptors parsed.
                 - **upserted**: Number of data products upserted.
                 - **status**: Job status (`Created`, `Processing`, `Processed`).
        {% /api-description %}
    {% /api-section %}
{% /api-layout %}
       * **Created**: The URL has been created and is awaiting upload.

