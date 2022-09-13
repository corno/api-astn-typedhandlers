/*eslint
    "camelcase": 0,
    "no-underscore-dangle": 0,
    "quote-props": 0
*/
import * as pt from "pareto-core-types"

export type T__types = {
    readonly "value": T__value
}

export type T__root = {
    readonly "root type": pt.Reference<T__types>
    readonly "types": pt.Dictionary<T__types>
}

export type T__simple_string = {
    readonly "default value": string
    readonly "quoted": boolean
}

export type T__dictionary = {
    readonly "key": T__simple_string
    readonly "value": T__value
}

export type T__properties = {
    readonly "value": T__value
}

export type T__group = {
    readonly "properties": pt.Dictionary<T__properties>
}

export type T__list = {
    readonly "value": T__value
}

export type T__multiline_string = { }

export type T__simple_string_type = {
    readonly "default value": string
    readonly "quoted": boolean
}

export type T__options = {
    readonly "value": T__value
}

export type T__tagged_union = {
    readonly "default option": pt.Reference<T__options>
    readonly "options": pt.Dictionary<T__options>
}

export type T__type_reference = {
    readonly "type": pt.Reference<T__types>
}

export type T__type_TU =
    | ["dictionary", T__dictionary]
    | ["group", T__group]
    | ["list", T__list]
    | ["multiline string", T__multiline_string]
    | ["simple string", T__simple_string_type]
    | ["tagged union", T__tagged_union]
    | ["type reference", T__type_reference]

export type T__value = {
    readonly "type": T__type_TU
}
