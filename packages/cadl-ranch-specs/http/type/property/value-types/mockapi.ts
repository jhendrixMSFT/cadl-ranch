import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

interface MockApiGetPut {
  get: MockApi;
  put: MockApi;
}

/**
 * Return the get and put operations
 * @param route The route within /models/properties for your function.
 * @param value The value you are expecting and will return.
 */
function createMockApis(route: string, value: any): MockApiGetPut {
  const url = `/type/property/value-types/${route}`;
  const body = { property: value };
  return {
    get: mockapi.get(url, (req) => {
      return {
        status: 200,
        body: json(body),
      };
    }),
    put: mockapi.put(url, (req) => {
      const expectedBody = JSON.parse(JSON.stringify(body));
      req.expect.coercedBodyEquals(expectedBody);
      return {
        status: 204,
      };
    }),
  };
}

const booleanMock = createMockApis("boolean", true);
Scenarios.Type_Property_ValueTypes_Boolean_get = passOnSuccess(booleanMock.get);
Scenarios.Type_Property_ValueTypes_Boolean_put = passOnSuccess(booleanMock.put);

const stringMock = createMockApis("string", "hello");
Scenarios.Type_Property_ValueTypes_String_get = passOnSuccess(stringMock.get);
Scenarios.Type_Property_ValueTypes_String_put = passOnSuccess(stringMock.put);

const bytesMock = createMockApis("bytes", "aGVsbG8sIHdvcmxkIQ==");
Scenarios.Type_Property_ValueTypes_Bytes_get = passOnSuccess(bytesMock.get);
Scenarios.Type_Property_ValueTypes_Bytes_put = passOnSuccess(bytesMock.put);

const intMock = createMockApis("int", 42);
Scenarios.Type_Property_ValueTypes_Int_get = passOnSuccess(intMock.get);
Scenarios.Type_Property_ValueTypes_Int_put = passOnSuccess(intMock.put);

const floatMock = createMockApis("float", 42.42);
Scenarios.Type_Property_ValueTypes_Float_get = passOnSuccess(floatMock.get);
Scenarios.Type_Property_ValueTypes_Float_put = passOnSuccess(floatMock.put);

const decimalMock = createMockApis("decimal", 0.33333);
Scenarios.Type_Property_ValueTypes_Decimal_get = passOnSuccess(decimalMock.get);
Scenarios.Type_Property_ValueTypes_Decimal_put = passOnSuccess(decimalMock.put);

const decimal128Mock = createMockApis("decimal128", 0.33333);
Scenarios.Type_Property_ValueTypes_Decimal128_get = passOnSuccess(decimal128Mock.get);
Scenarios.Type_Property_ValueTypes_Decimal128_put = passOnSuccess(decimal128Mock.put);

const datetimeMock = createMockApis("datetime", "2022-08-26T18:38:00Z");
Scenarios.Type_Property_ValueTypes_Datetime_get = passOnSuccess(datetimeMock.get);
Scenarios.Type_Property_ValueTypes_Datetime_put = passOnSuccess(datetimeMock.put);

const durationMock = createMockApis("duration", "P123DT22H14M12.011S");
Scenarios.Type_Property_ValueTypes_Duration_get = passOnSuccess(durationMock.get);
Scenarios.Type_Property_ValueTypes_Duration_put = passOnSuccess(durationMock.put);

const enumMock = createMockApis("enum", "ValueOne");
Scenarios.Type_Property_ValueTypes_Enum_get = passOnSuccess(enumMock.get);
Scenarios.Type_Property_ValueTypes_Enum_put = passOnSuccess(enumMock.put);

const extensibleEnumMock = createMockApis("extensible-enum", "UnknownValue");
Scenarios.Type_Property_ValueTypes_ExtensibleEnum_get = passOnSuccess(extensibleEnumMock.get);
Scenarios.Type_Property_ValueTypes_ExtensibleEnum_put = passOnSuccess(extensibleEnumMock.put);

const modelMock = createMockApis("model", { property: "hello" });
Scenarios.Type_Property_ValueTypes_Model_get = passOnSuccess(modelMock.get);
Scenarios.Type_Property_ValueTypes_Model_put = passOnSuccess(modelMock.put);

const collectionsStringMock = createMockApis("collections/string", ["hello", "world"]);
Scenarios.Type_Property_ValueTypes_CollectionsString_get = passOnSuccess(collectionsStringMock.get);
Scenarios.Type_Property_ValueTypes_CollectionsString_put = passOnSuccess(collectionsStringMock.put);

const collectionsIntMock = createMockApis("collections/int", [1, 2]);
Scenarios.Type_Property_ValueTypes_CollectionsInt_get = passOnSuccess(collectionsIntMock.get);
Scenarios.Type_Property_ValueTypes_CollectionsInt_put = passOnSuccess(collectionsIntMock.put);

const collectionsModelMock = createMockApis("collections/model", [{ property: "hello" }, { property: "world" }]);
Scenarios.Type_Property_ValueTypes_CollectionsModel_get = passOnSuccess(collectionsModelMock.get);
Scenarios.Type_Property_ValueTypes_CollectionsModel_put = passOnSuccess(collectionsModelMock.put);

const dictionaryStringMock = createMockApis("dictionary/string", { k1: "hello", k2: "world" });
Scenarios.Type_Property_ValueTypes_DictionaryString_get = passOnSuccess(dictionaryStringMock.get);
Scenarios.Type_Property_ValueTypes_DictionaryString_put = passOnSuccess(dictionaryStringMock.put);

const neverMock = createMockApis("never", undefined);
Scenarios.Type_Property_ValueTypes_Never_get = passOnSuccess(neverMock.get);
Scenarios.Type_Property_ValueTypes_Never_put = passOnSuccess(neverMock.put);

const unknownStringMock = createMockApis("unknown/string", "hello");
Scenarios.Type_Property_ValueTypes_UnknownString_get = passOnSuccess(unknownStringMock.get);
Scenarios.Type_Property_ValueTypes_UnknownString_put = passOnSuccess(unknownStringMock.put);

const unknownIntMock = createMockApis("unknown/int", 42);
Scenarios.Type_Property_ValueTypes_UnknownInt_get = passOnSuccess(unknownIntMock.get);
Scenarios.Type_Property_ValueTypes_UnknownInt_put = passOnSuccess(unknownIntMock.put);

const unknownDictMock = createMockApis("unknown/dict", { k1: "hello", k2: 42 });
Scenarios.Type_Property_ValueTypes_UnknownDict_get = passOnSuccess(unknownDictMock.get);
Scenarios.Type_Property_ValueTypes_UnknownDict_put = passOnSuccess(unknownDictMock.put);

const unknownArrayMock = createMockApis("unknown/array", ["hello", "world"]);
Scenarios.Type_Property_ValueTypes_UnknownArray_get = passOnSuccess(unknownArrayMock.get);
Scenarios.Type_Property_ValueTypes_UnknownArray_put = passOnSuccess(unknownArrayMock.put);

const stringLiteralMock = createMockApis("string/literal", "hello");
Scenarios.Type_Property_ValueTypes_StringLiteral_get = passOnSuccess(stringLiteralMock.get);
Scenarios.Type_Property_ValueTypes_StringLiteral_put = passOnSuccess(stringLiteralMock.put);

const intLiteralMock = createMockApis("int/literal", 42);
Scenarios.Type_Property_ValueTypes_IntLiteral_get = passOnSuccess(intLiteralMock.get);
Scenarios.Type_Property_ValueTypes_IntLiteral_put = passOnSuccess(intLiteralMock.put);

const floatLiteralMock = createMockApis("float/literal", 42.42);
Scenarios.Type_Property_ValueTypes_FloatLiteral_get = passOnSuccess(floatLiteralMock.get);
Scenarios.Type_Property_ValueTypes_FloatLiteral_put = passOnSuccess(floatLiteralMock.put);

const booleanLiteralMock = createMockApis("boolean/literal", true);
Scenarios.Type_Property_ValueTypes_BooleanLiteral_get = passOnSuccess(booleanLiteralMock.get);
Scenarios.Type_Property_ValueTypes_BooleanLiteral_put = passOnSuccess(booleanLiteralMock.put);

const unionStringLiteralMock = createMockApis("union/string/literal", "world");
Scenarios.Type_Property_ValueTypes_UnionStringLiteral_get = passOnSuccess(unionStringLiteralMock.get);
Scenarios.Type_Property_ValueTypes_UnionStringLiteral_put = passOnSuccess(unionStringLiteralMock.put);

const unionIntLiteralMock = createMockApis("union/int/literal", 42);
Scenarios.Type_Property_ValueTypes_UnionIntLiteral_get = passOnSuccess(unionIntLiteralMock.get);
Scenarios.Type_Property_ValueTypes_UnionIntLiteral_put = passOnSuccess(unionIntLiteralMock.put);

const unionFloatLiteralMock = createMockApis("union/float/literal", 43.43);
Scenarios.Type_Property_ValueTypes_UnionFloatLiteral_get = passOnSuccess(unionFloatLiteralMock.get);
Scenarios.Type_Property_ValueTypes_UnionFloatLiteral_put = passOnSuccess(unionFloatLiteralMock.put);
