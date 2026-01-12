
{% api-layout %}
    {% api-section title="Overview" id="overview" %}
        {% api-description %}
            The Actian Data Intelligence Platform uses YAML descriptors derived from the [datacontract.com](http://datacontract.com) specification to ingest and update data products and data contracts.
            These YAML files can be uploaded to the platform through a dedicated REST API. This API can be called from external tools like the [Data Contract CLI](https://cli.datacontract.com/), or CI/CD pipelines (e.g., GitHub Actions).

            {% callout type="important" %}
            The Data Contract CLI requires the Python version recommended in the [Data Contract CLI](https://cli.datacontract.com/) documentation.
            {% /callout %}

            To use this API, generate an API key from Administration and use the API key secret in the request header with the `X-API-SECRET` parameter.
        {% /api-description %}
    {% /api-section %}

    {% api-section title="Workflow" id="workflow" %}
        {% api-description %}
            To create data products, follow this sequence:
            1. **Get upload URL**
                 {% api-endpoint method="POST" path="/api/synchronization/data-product-uploads" description="Get a URL for uploading files." %}
                 The API returns upload parameters and an ID.
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
                 The data products and data contracts YAML descriptors must be compressed in a ZIP file. The ZIP file can contain several data products and data contracts.
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
                 If successful, the endpoint returns HTTP 200.

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

