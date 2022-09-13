import * as pt from "pareto-core-types"
import * as def from "../types/definitions"
import * as tokens from "api-astn-handlers"

export type IGroupHandler<Annotation> = {
    readonly "onUnexpectedProperty": ($: {
        readonly "token": tokens.SimpleStringToken<Annotation> //cannot be shorthand, so there must be a token, so no null
        readonly "expectedProperties": pt.Dictionary<null>
        readonly "groupDefinition": def.TGroupDefinition
    }) => void
    readonly "onProperty": ($: {
        readonly "key": string
        readonly "token": null | tokens.SimpleStringToken<Annotation>
        readonly "definition": def.TValueDefinition
    }) => ITypedValueHandler<Annotation>
    readonly "onClose": ($: {
        readonly "token": null | tokens.CloseObjectToken<Annotation>
    }) => void
}

export type IDictionaryHandler<Annotation> = {
    readonly "onEntry": ($: {
        readonly "token": tokens.SimpleStringToken<Annotation>
    }) => ITypedValueHandler<Annotation>
    readonly "onClose": ($: {
        readonly "token": null | tokens.CloseObjectToken<Annotation>
    }) => void
}

export type IListHandler<Annotation> = {
    readonly "onClose": ($: {
        readonly "token": null | tokens.CloseArrayToken<Annotation>
    }) => void
    readonly "onElement": ($: {}) => ITypedValueHandler<Annotation>
}

export type ITypedTaggedUnionHandler<Annotation> = {
    readonly "onOption": ($: {
        readonly "name": string
        readonly "token": null | tokens.SimpleStringToken<Annotation>
        readonly "definition": def.TOptionDefinition
    }) => ITypedValueHandler<Annotation>
    readonly "onUnexpectedOption": ($: {
        readonly "token": tokens.SimpleStringToken<Annotation>
        readonly "expectedOptions": pt.Dictionary<null>
        readonly "defaultOption": string //the unmarshaller will initialize the default option.
    }) => ITypedValueHandler<Annotation>
    readonly "onEnd": ($: {}) => void
}

export type ITypedValueHandler<Annotation> = {
    readonly "onGroup": ($: {
        readonly "type": def.TGroupType<Annotation>
        readonly "definition": def.TGroupDefinition
    }) => IGroupHandler<Annotation>
    readonly "onList": ($: {
        readonly "token": null | tokens.OpenArrayToken<Annotation>
        readonly "definition": def.TListDefinition
    }) => IListHandler<Annotation>
    readonly "onDictionary": ($: {
        readonly "token": null | tokens.OpenObjectToken<Annotation>
        readonly "definition": def.TDictionaryDefinition
    }) => IDictionaryHandler<Annotation>
    readonly "onTypeReference": ($: {
        readonly "definition": def.TTypeReferenceDefinition
    }) => ITypedValueHandler<Annotation>
    readonly "onTaggedUnion": ($: {
        readonly "definition": def.TTaggedUnionDefinition
        readonly "token": null | tokens.TaggedUnionToken<Annotation>
    }) => ITypedTaggedUnionHandler<Annotation>
    readonly "onSimpleString": ($: {
        readonly "value": string
        readonly "token": null | tokens.SimpleStringToken<Annotation>
        readonly "definition": def.TSimpleStringDefinition
    }) => void
    readonly "onMultilineString": ($: {
        readonly "token": null | tokens.MultilineStringToken<Annotation>
        readonly "definition": def.TMultiLineStringDefinition
    }) => void
}

export type ITypedHandler<Annotation> = {
    readonly "root": ITypedValueHandler<Annotation>
    readonly "onEnd": () => void
}