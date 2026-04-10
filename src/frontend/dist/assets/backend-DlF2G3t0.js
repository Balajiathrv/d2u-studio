import { P as ProtocolError, T as TimeoutWaitingForResponseErrorCode, D as utf8ToBytes, E as ExternalError, M as MissingRootKeyErrorCode, F as Certificate, G as lookupResultToBuffer, H as RequestStatusResponseStatus, U as UnknownError, I as RequestStatusDoneNoReplyErrorCode, J as RejectError, K as CertifiedRejectErrorCode, N as UNREACHABLE_ERROR, O as InputError, Q as InvalidReadStateRequestErrorCode, V as ReadRequestType, W as Principal, X as IDL, Y as MissingCanisterIdErrorCode, Z as HttpAgent, _ as encode, $ as QueryResponseStatus, a0 as UncertifiedRejectErrorCode, a1 as isV3ResponseBody, a2 as isV2ResponseBody, a3 as UncertifiedRejectUpdateErrorCode, a4 as UnexpectedErrorCode, a5 as decode, a6 as Variant, a7 as Record, a8 as Vec, a9 as Service, aa as Func, ab as Nat, ac as Bool, ad as Opt, ae as Text, af as Null, ag as Int } from "./index-DzRidtFL.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a = agent.createReadStateRequest) == null ? void 0 : _a.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
const ProjectCategory$1 = Variant({
  "Interior": Null,
  "Architectural": Null,
  "SpacePlanning": Null,
  "Renovation": Null
});
const ProjectInput = Record({
  "title": Text,
  "featured": Bool,
  "imageUrls": Vec(Text),
  "description": Text,
  "scope": Text,
  "outcomes": Text,
  "materials": Vec(Text),
  "category": ProjectCategory$1
});
const ProjectId = Nat;
const Project = Record({
  "id": ProjectId,
  "title": Text,
  "featured": Bool,
  "imageUrls": Vec(Text),
  "description": Text,
  "scope": Text,
  "outcomes": Text,
  "materials": Vec(Text),
  "category": ProjectCategory$1
});
const InquiryId = Nat;
const ServiceType$1 = Variant({
  "Interior": Null,
  "Architectural": Null,
  "SpacePlanning": Null,
  "Consultation": Null,
  "Renovation": Null
});
const Timestamp = Int;
const Inquiry = Record({
  "id": InquiryId,
  "serviceType": ServiceType$1,
  "projectDescription": Text,
  "name": Text,
  "email": Text,
  "timestamp": Timestamp,
  "phone": Text
});
Service({
  "addHeroImage": Func([Text], [Nat], []),
  "changeAdminCredentials": Func(
    [Text, Text, Text],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "createProject": Func([ProjectInput], [ProjectId], []),
  "deleteProject": Func(
    [ProjectId],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "getFeaturedProjects": Func([], [Vec(Project)], ["query"]),
  "getHeroImages": Func([], [Vec(Text)], ["query"]),
  "getInquiry": Func([InquiryId], [Opt(Inquiry)], ["query"]),
  "getProject": Func([ProjectId], [Opt(Project)], ["query"]),
  "listInquiries": Func([], [Vec(Inquiry)], ["query"]),
  "listProjects": Func(
    [Opt(ProjectCategory$1)],
    [Vec(Project)],
    ["query"]
  ),
  "removeHeroImage": Func(
    [Nat],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "reorderHeroImages": Func([Vec(Text)], [], []),
  "setProjectFeatured": Func(
    [ProjectId, Bool],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "submitInquiry": Func(
    [Text, Text, Text, Text, ServiceType$1],
    [Inquiry],
    []
  ),
  "updateProject": Func(
    [ProjectId, ProjectInput],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "validateAdminCredentials": Func([Text, Text], [Bool], [])
});
const idlFactory = ({ IDL: IDL2 }) => {
  const ProjectCategory2 = IDL2.Variant({
    "Interior": IDL2.Null,
    "Architectural": IDL2.Null,
    "SpacePlanning": IDL2.Null,
    "Renovation": IDL2.Null
  });
  const ProjectInput2 = IDL2.Record({
    "title": IDL2.Text,
    "featured": IDL2.Bool,
    "imageUrls": IDL2.Vec(IDL2.Text),
    "description": IDL2.Text,
    "scope": IDL2.Text,
    "outcomes": IDL2.Text,
    "materials": IDL2.Vec(IDL2.Text),
    "category": ProjectCategory2
  });
  const ProjectId2 = IDL2.Nat;
  const Project2 = IDL2.Record({
    "id": ProjectId2,
    "title": IDL2.Text,
    "featured": IDL2.Bool,
    "imageUrls": IDL2.Vec(IDL2.Text),
    "description": IDL2.Text,
    "scope": IDL2.Text,
    "outcomes": IDL2.Text,
    "materials": IDL2.Vec(IDL2.Text),
    "category": ProjectCategory2
  });
  const InquiryId2 = IDL2.Nat;
  const ServiceType2 = IDL2.Variant({
    "Interior": IDL2.Null,
    "Architectural": IDL2.Null,
    "SpacePlanning": IDL2.Null,
    "Consultation": IDL2.Null,
    "Renovation": IDL2.Null
  });
  const Timestamp2 = IDL2.Int;
  const Inquiry2 = IDL2.Record({
    "id": InquiryId2,
    "serviceType": ServiceType2,
    "projectDescription": IDL2.Text,
    "name": IDL2.Text,
    "email": IDL2.Text,
    "timestamp": Timestamp2,
    "phone": IDL2.Text
  });
  return IDL2.Service({
    "addHeroImage": IDL2.Func([IDL2.Text], [IDL2.Nat], []),
    "changeAdminCredentials": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "createProject": IDL2.Func([ProjectInput2], [ProjectId2], []),
    "deleteProject": IDL2.Func(
      [ProjectId2],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "getFeaturedProjects": IDL2.Func([], [IDL2.Vec(Project2)], ["query"]),
    "getHeroImages": IDL2.Func([], [IDL2.Vec(IDL2.Text)], ["query"]),
    "getInquiry": IDL2.Func([InquiryId2], [IDL2.Opt(Inquiry2)], ["query"]),
    "getProject": IDL2.Func([ProjectId2], [IDL2.Opt(Project2)], ["query"]),
    "listInquiries": IDL2.Func([], [IDL2.Vec(Inquiry2)], ["query"]),
    "listProjects": IDL2.Func(
      [IDL2.Opt(ProjectCategory2)],
      [IDL2.Vec(Project2)],
      ["query"]
    ),
    "removeHeroImage": IDL2.Func(
      [IDL2.Nat],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "reorderHeroImages": IDL2.Func([IDL2.Vec(IDL2.Text)], [], []),
    "setProjectFeatured": IDL2.Func(
      [ProjectId2, IDL2.Bool],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "submitInquiry": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text, ServiceType2],
      [Inquiry2],
      []
    ),
    "updateProject": IDL2.Func(
      [ProjectId2, ProjectInput2],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "validateAdminCredentials": IDL2.Func([IDL2.Text, IDL2.Text], [IDL2.Bool], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
var ProjectCategory = /* @__PURE__ */ ((ProjectCategory2) => {
  ProjectCategory2["Interior"] = "Interior";
  ProjectCategory2["Architectural"] = "Architectural";
  ProjectCategory2["SpacePlanning"] = "SpacePlanning";
  ProjectCategory2["Renovation"] = "Renovation";
  return ProjectCategory2;
})(ProjectCategory || {});
var ServiceType = /* @__PURE__ */ ((ServiceType2) => {
  ServiceType2["Interior"] = "Interior";
  ServiceType2["Architectural"] = "Architectural";
  ServiceType2["SpacePlanning"] = "SpacePlanning";
  ServiceType2["Consultation"] = "Consultation";
  ServiceType2["Renovation"] = "Renovation";
  return ServiceType2;
})(ServiceType || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async addHeroImage(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addHeroImage(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addHeroImage(arg0);
      return result;
    }
  }
  async changeAdminCredentials(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.changeAdminCredentials(arg0, arg1, arg2);
        return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.changeAdminCredentials(arg0, arg1, arg2);
      return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async createProject(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createProject(to_candid_ProjectInput_n2(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createProject(to_candid_ProjectInput_n2(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async deleteProject(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteProject(arg0);
        return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteProject(arg0);
      return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async getFeaturedProjects() {
    if (this.processError) {
      try {
        const result = await this.actor.getFeaturedProjects();
        return from_candid_vec_n6(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFeaturedProjects();
      return from_candid_vec_n6(this._uploadFile, this._downloadFile, result);
    }
  }
  async getHeroImages() {
    if (this.processError) {
      try {
        const result = await this.actor.getHeroImages();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getHeroImages();
      return result;
    }
  }
  async getInquiry(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getInquiry(arg0);
        return from_candid_opt_n11(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getInquiry(arg0);
      return from_candid_opt_n11(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProject(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProject(arg0);
        return from_candid_opt_n16(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProject(arg0);
      return from_candid_opt_n16(this._uploadFile, this._downloadFile, result);
    }
  }
  async listInquiries() {
    if (this.processError) {
      try {
        const result = await this.actor.listInquiries();
        return from_candid_vec_n17(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listInquiries();
      return from_candid_vec_n17(this._uploadFile, this._downloadFile, result);
    }
  }
  async listProjects(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listProjects(to_candid_opt_n18(this._uploadFile, this._downloadFile, arg0));
        return from_candid_vec_n6(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listProjects(to_candid_opt_n18(this._uploadFile, this._downloadFile, arg0));
      return from_candid_vec_n6(this._uploadFile, this._downloadFile, result);
    }
  }
  async removeHeroImage(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.removeHeroImage(arg0);
        return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.removeHeroImage(arg0);
      return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async reorderHeroImages(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.reorderHeroImages(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.reorderHeroImages(arg0);
      return result;
    }
  }
  async setProjectFeatured(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.setProjectFeatured(arg0, arg1);
        return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setProjectFeatured(arg0, arg1);
      return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async submitInquiry(arg0, arg1, arg2, arg3, arg4) {
    if (this.processError) {
      try {
        const result = await this.actor.submitInquiry(arg0, arg1, arg2, arg3, to_candid_ServiceType_n19(this._uploadFile, this._downloadFile, arg4));
        return from_candid_Inquiry_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.submitInquiry(arg0, arg1, arg2, arg3, to_candid_ServiceType_n19(this._uploadFile, this._downloadFile, arg4));
      return from_candid_Inquiry_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateProject(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateProject(arg0, to_candid_ProjectInput_n2(this._uploadFile, this._downloadFile, arg1));
        return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateProject(arg0, to_candid_ProjectInput_n2(this._uploadFile, this._downloadFile, arg1));
      return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async validateAdminCredentials(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.validateAdminCredentials(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.validateAdminCredentials(arg0, arg1);
      return result;
    }
  }
}
function from_candid_Inquiry_n12(_uploadFile, _downloadFile, value) {
  return from_candid_record_n13(_uploadFile, _downloadFile, value);
}
function from_candid_ProjectCategory_n9(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n10(_uploadFile, _downloadFile, value);
}
function from_candid_Project_n7(_uploadFile, _downloadFile, value) {
  return from_candid_record_n8(_uploadFile, _downloadFile, value);
}
function from_candid_ServiceType_n14(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n15(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n11(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Inquiry_n12(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n16(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Project_n7(_uploadFile, _downloadFile, value[0]);
}
function from_candid_record_n13(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    serviceType: from_candid_ServiceType_n14(_uploadFile, _downloadFile, value.serviceType),
    projectDescription: value.projectDescription,
    name: value.name,
    email: value.email,
    timestamp: value.timestamp,
    phone: value.phone
  };
}
function from_candid_record_n8(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    title: value.title,
    featured: value.featured,
    imageUrls: value.imageUrls,
    description: value.description,
    scope: value.scope,
    outcomes: value.outcomes,
    materials: value.materials,
    category: from_candid_ProjectCategory_n9(_uploadFile, _downloadFile, value.category)
  };
}
function from_candid_variant_n1(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n10(_uploadFile, _downloadFile, value) {
  return "Interior" in value ? "Interior" : "Architectural" in value ? "Architectural" : "SpacePlanning" in value ? "SpacePlanning" : "Renovation" in value ? "Renovation" : value;
}
function from_candid_variant_n15(_uploadFile, _downloadFile, value) {
  return "Interior" in value ? "Interior" : "Architectural" in value ? "Architectural" : "SpacePlanning" in value ? "SpacePlanning" : "Consultation" in value ? "Consultation" : "Renovation" in value ? "Renovation" : value;
}
function from_candid_vec_n17(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Inquiry_n12(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n6(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Project_n7(_uploadFile, _downloadFile, x));
}
function to_candid_ProjectCategory_n4(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n5(_uploadFile, _downloadFile, value);
}
function to_candid_ProjectInput_n2(_uploadFile, _downloadFile, value) {
  return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_ServiceType_n19(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n20(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n18(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(to_candid_ProjectCategory_n4(_uploadFile, _downloadFile, value));
}
function to_candid_record_n3(_uploadFile, _downloadFile, value) {
  return {
    title: value.title,
    featured: value.featured,
    imageUrls: value.imageUrls,
    description: value.description,
    scope: value.scope,
    outcomes: value.outcomes,
    materials: value.materials,
    category: to_candid_ProjectCategory_n4(_uploadFile, _downloadFile, value.category)
  };
}
function to_candid_variant_n20(_uploadFile, _downloadFile, value) {
  return value == "Interior" ? {
    Interior: null
  } : value == "Architectural" ? {
    Architectural: null
  } : value == "SpacePlanning" ? {
    SpacePlanning: null
  } : value == "Consultation" ? {
    Consultation: null
  } : value == "Renovation" ? {
    Renovation: null
  } : value;
}
function to_candid_variant_n5(_uploadFile, _downloadFile, value) {
  return value == "Interior" ? {
    Interior: null
  } : value == "Architectural" ? {
    Architectural: null
  } : value == "SpacePlanning" ? {
    SpacePlanning: null
  } : value == "Renovation" ? {
    Renovation: null
  } : value;
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
export {
  ProjectCategory as P,
  ServiceType as S,
  createActor as c
};
