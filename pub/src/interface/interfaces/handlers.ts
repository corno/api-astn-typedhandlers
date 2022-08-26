import * as pt from "pareto-core-types"
import * as def from "../types/definitions"
import * as tokens from "api-astn-handlers"

export type IGroupHandler<Annotation> = {
    onUnexpectedProperty($: {
        token: tokens.SimpleStringToken<Annotation> //cannot be shorthand, so there must be a token, so no null
        expectedProperties: pt.Dictionary<null>
        groupDefinition: def.GroupDefinition
    }): void
    onProperty($: {
        key: string
        token: null | tokens.SimpleStringToken<Annotation>
        definition: def.ValueDefinition
    }): ITypedValueHandler<Annotation>
    onClose($: {
        token: null | tokens.CloseObjectToken<Annotation>
    }): void
}

export type IDictionaryHandler<Annotation> = {
    onEntry($: {
        token: tokens.SimpleStringToken<Annotation>
    }): ITypedValueHandler<Annotation>
    onClose($: {
        token: null | tokens.CloseObjectToken<Annotation>
    }): void
}

export type IListHandler<Annotation> = {
    onClose($: {
        token: null | tokens.CloseArrayToken<Annotation>
    }): void
    onElement($: { }): ITypedValueHandler<Annotation>
}

export type ITypedTaggedUnionHandler<Annotation> = {
    onOption($: {
        name: string
        token: null | tokens.SimpleStringToken<Annotation>
        definition: def.OptionDefinition
    }): ITypedValueHandler<Annotation>
    onUnexpectedOption($: {
        token: tokens.SimpleStringToken<Annotation>
        expectedOptions: pt.Dictionary<null>
        defaultOption: string //the unmarshaller will initialize the default option.
    }): ITypedValueHandler<Annotation>
    onEnd($: { }): void
}

export type IGroupType<Annotation> =
    | ["verbose", tokens.OpenObjectToken<Annotation>]
    | ["shorthand", tokens.OpenArrayToken<Annotation>]
    | ["mixin", {}]
    | ["omitted", {}]

export type ITypedValueHandler<Annotation> = {
    onGroup($: {
        type: IGroupType<Annotation>
        definition: def.GroupDefinition
    }): IGroupHandler<Annotation>
    onList($: {
        token: null | tokens.OpenArrayToken<Annotation>
        definition: def.ListDefinition
    }): IListHandler<Annotation>
    onDictionary($: {
        token: null | tokens.OpenObjectToken<Annotation>
        definition: def.DictionaryDefinition
    }): IDictionaryHandler<Annotation>
    onTypeReference($: {
        definition: def.TypeReferenceDefinition
    }): ITypedValueHandler<Annotation>
    onTaggedUnion($: {
        definition: def.TaggedUnionDefinition
        token: null | tokens.TaggedUnionToken<Annotation>
    }): ITypedTaggedUnionHandler<Annotation>
    onSimpleString($: {
        value: string
        token: null | tokens.SimpleStringToken<Annotation>
        definition: def.SimpleStringDefinition
    }): void
    onMultilineString($: {
        token: null | tokens.MultilineStringToken<Annotation>
        definition: def.MultiLineStringDefinition
    }): void
}

export type ITypedHandler<Annotation> = {
    root: ITypedValueHandler<Annotation>
    onEnd: () => void
}