import "@azure-tools/typespec-azure-core";
import "@azure-tools/cadl-ranch-expect";
import "@typespec/rest";
import "@typespec/versioning";

using TypeSpec.Rest;
using TypeSpec.Http;
using TypeSpec.Versioning;
using global.Azure.Core;
using global.Azure.Core.Traits;

/**
 * WARNING this scenario is using some non standard Azure.Core operation to get Long running Rpc operation working.
 * THIS WILL MOST LIKELY BE CHANGED.
 * BE READY TO BREAK IF YOU IMPLEMENT THIS SCENARIO.
 */
#suppress "@azure-tools/typespec-azure-core/casing-style" "For spec"
@doc("Illustrates bodies templated with Azure Core with long-running operation")
@scenarioService(
  "/azure/core/lro/rpc/legacy",
  {
    versioned: Versions,
  }
)
namespace _Specs_.Azure.Core.Lro.Rpc.Legacy;

@doc("Versions of the service")
enum Versions {
  @doc("2022-12-01-preview")
  @useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
  v2022_12_01_preview: "2022-12-01-preview",
}

alias ResourceOperations = global.Azure.Core.ResourceOperations<NoConditionalRequests &
  NoRepeatableRequests &
  NoClientRequestId>;

@doc("Data of the job")
model JobData {
  @doc("Comment.")
  comment: string;
}

@resource("jobs")
@doc("Result of the job")
model JobResult {
  @doc("A processing job identifier.")
  @visibility("read")
  @key
  jobId: string;

  @doc("Comment.")
  @visibility("read")
  comment: string;

  @doc("The status of the processing job.")
  @visibility("read")
  @lroStatus
  status: JobStatus;

  @doc("Error objects that describes the error when status is \"Failed\".")
  @visibility("read")
  errors?: Foundations.ErrorResponse[];

  @doc("The results.")
  @visibility("read")
  results?: string[];
}

@doc("The status of the processing job.")
enum JobStatus {
  @doc("The operation is not started.")
  NotStarted: "notStarted",

  @doc("The operation is in progress.")
  Running: "running",

  @doc("The operation has completed successfully.")
  Succeeded: "succeeded",

  @doc("The operation has failed.")
  Failed: "failed",

  @doc("The operation has been canceled by the user.")
  Canceled: "canceled",

  @doc("The operation has partially completed.")
  PartiallyCompleted: "partiallyCompleted",
}

@scenario
@doc("POST to create resource, poll URL via operation-location header.")
@summary("POST to create resource, poll URL via operation-location header.")
@scenarioDoc("""
POST to create resource.
Poll URL via operation-location header in response.
Poll response is the (InProgress) created resource. Poll ends when resource status property is Succeeded. Last poll response could be used for final result.

Expected verb: POST
Expected request body:
```json
{
  "comment": "async job"
}
```

Expected status code: 202
Expected response header: operation-location={endpoint}/create-resource-poll-via-operation-location/jobs/job1
No response body.

Expected verb: GET
Expected URL: {endpoint}/create-resource-poll-via-operation-location/jobs/job1

Expected status code: 200
Expected response body:
```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "running"
}
```

Expected verb: GET
Expected URL: {endpoint}/create-resource-poll-via-operation-location/jobs/job1

Expected status code: 200
Expected response body:
```json
{
  "jobId": "job1",
  "comment": "async job",
  "status": "succeeded",
  "results": ["job1 result"]
}
```
""")
@route("/create-resource-poll-via-operation-location")
interface CreateResourcePollViaOperationLocation {
  @doc("Poll a Job")
  getJob is ResourceOperations.ResourceRead<JobResult>;

  @pollingOperation(CreateResourcePollViaOperationLocation.getJob)
  @doc("Creates a Job")
  @route("/jobs")
  createJob is Foundations.Operation<JobData, AcceptedResponse & Foundations.LongRunningStatusLocation<JobResult>>;
}
