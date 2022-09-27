import * as h from "api-astn-handlers"

import * as typed from "./generated_schema.p"

export type TTypeReferenceDefinition = typed.T__type_reference

export type TTypeDefinition = typed.T__types

export type TDictionaryDefinition = typed.T__dictionary

export type TListDefinition = typed.T__list

export type TGroupDefinition = typed.T__group

export type TPropertyDefinition = typed.T__properties

export type TValueDefinition = typed.T__value

export type TValueTypeDefinition = typed.T__type_TU

export type TSchema = typed.T__root

export type TOptionDefinition = typed.T__options

export type TTaggedUnionDefinition = typed.T__tagged_union

export type TSimpleStringDefinition = typed.T__simple_string

export type TMultiLineStringDefinition = typed.T__multiline_string


export type TGroupType<PAnnotation> =
    | ["verbose", h.TOpenObjectToken<PAnnotation>]
    | ["shorthand", h.TOpenArrayToken<PAnnotation>]
    | ["mixin", null]
    | ["omitted", null]
