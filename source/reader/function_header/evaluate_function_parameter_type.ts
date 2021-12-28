import { SkriptDivider, SkriptDividerComponent } from "../../objects/SkriptDivider";
import { matcher_group } from "../../system/matcher_group";
import { reader_error } from "../../system/reader_error";

export function evaluate_function_parameter_type(script: string, divider: SkriptDivider): SkriptDivider {
    const parameter_matcher = script.match(/^(\s*)([^:]+)(:\s*)([^= ][^=]*\s*)(?:=(.+))?$/);
    if (parameter_matcher === null) {
        // somehow caused an invalid match, this should never happen since the pattern is already checked in parameter stage
        throw reader_error("invalid function header parameter", script);
    }
    // parameter type
    const parameter_type = matcher_group(parameter_matcher, 4, true);
    divider.add_component({begin_index: parameter_type.begin_index, end_index: parameter_type.end_index, component_type: "function_parameter_type"} as SkriptDividerComponent);
    return divider;
}