import * as pt from "pareto-core-types"

import * as tokens from "api-astn-handlers"

import * as def from "../types/definitions.p"

export type IGroupHandler<PAnnotation> = {
    readonly "onUnexpectedProperty": ($: {
        readonly "token": tokens.TSimpleStringToken<PAnnotation> //cannot be shorthand, so there must be a token, so no null
        readonly "expectedProperties": pt.Dictionary<null>
        readonly "groupDefinition": def.TGroupDefinition
    }) => void
    readonly "onProperty": ($: {
        readonly "key": string
        readonly "token": null | tokens.TSimpleStringToken<PAnnotation>
        readonly "definition": def.TValueDefinition
    }) => ITypedValueHandler<PAnnotation>
    readonly "onClose": ($: {
        readonly "token": null | tokens.TCloseObjectToken<PAnnotation>
    }) => void
}

export type IDictionaryHandler<PAnnotation> = {
    readonly "onEntry": ($: {
        readonly "token": tokens.TSimpleStringToken<PAnnotation>
    }) => ITypedValueHandler<PAnnotation>
    readonly "onClose": ($: {
        readonly "token": null | tokens.TCloseObjectToken<PAnnotation>
    }) => void
}

export type IListHandler<PAnnotation> = {
    readonly "onClose": ($: {
        readonly "token": null | tokens.TCloseArrayToken<PAnnotation>
    }) => void
    readonly "onElement": ($: {}) => ITypedValueHandler<PAnnotation>
}

export type ITypedTaggedUnionHandler<PAnnotation> = {
    readonly "onOption": ($: {
        readonly "name": string
        readonly "token": null | tokens.TSimpleStringToken<PAnnotation>
        readonly "definition": def.TOptionDefinition
    }) => ITypedValueHandler<PAnnotation>
    readonly "onUnexpectedOption": ($: {
        readonly "token": tokens.TSimpleStringToken<PAnnotation>
        readonly "expectedOptions": pt.Dictionary<null>
        readonly "defaultOption": string //the unmarshaller will initialize the default option.
    }) => ITypedValueHandler<PAnnotation>
    readonly "onEnd": ($: {}) => void
}

export type ITypedValueHandler<PAnnotation> = {
    readonly "onGroup": ($: {
        readonly "type": def.TGroupType<PAnnotation>
        readonly "definition": def.TGroupDefinition
    }) => IGroupHandler<PAnnotation>
    readonly "onList": ($: {
        readonly "token": null | tokens.TOpenArrayToken<PAnnotation>
        readonly "definition": def.TListDefinition
    }) => IListHandler<PAnnotation>
    readonly "onDictionary": ($: {
        readonly "token": null | tokens.TOpenObjectToken<PAnnotation>
        readonly "definition": def.TDictionaryDefinition
    }) => IDictionaryHandler<PAnnotation>
    readonly "onTypeReference": ($: {
        readonly "definition": def.TTypeReferenceDefinition
    }) => ITypedValueHandler<PAnnotation>
    readonly "onTaggedUnion": ($: {
        readonly "definition": def.TTaggedUnionDefinition
        readonly "token": null | tokens.TTaggedUnionToken<PAnnotation>
    }) => ITypedTaggedUnionHandler<PAnnotation>
    readonly "onSimpleString": ($: {
        readonly "value": string
        readonly "token": null | tokens.TSimpleStringToken<PAnnotation>
        readonly "definition": def.TSimpleStringDefinition
    }) => void
    readonly "onMultilineString": ($: {
        readonly "token": null | tokens.TMultilineStringToken<PAnnotation>
        readonly "definition": def.TMultiLineStringDefinition
    }) => void
}

export type ITypedHandler<PAnnotation> = {
    readonly "root": ITypedValueHandler<PAnnotation>
    readonly "onEnd": () => void
}