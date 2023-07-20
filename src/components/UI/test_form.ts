import {ElementType, FormElementType} from "./types.ts";

export const elements: FormElementType[] = [
    {
        label: "Test Input",
        name: "test_input",
        type: ElementType.INPUT,
        settings: {
            placeholder: "Some data",
        }
    },
    {
        label: "Test Select",
        name: "test_select",
        type: ElementType.SELECT,
        settings: {
            options: [
                {
                    text: "test",
                    value: "test"
                },
                {
                    text: "test2",
                    value: "test2"
                }
            ]
        }
    },
    {
        label: "Test Checkbox",
        name: "test_checkbox",
        type: ElementType.CHECKBOX,
        settings: {}
    },
    {
        label: "Test TextArea",
        name: "test_textarea",
        type: ElementType.TEXTAREA,
        settings: {}
    },
    {
        label: "Test Check",
        name: "test_check",
        type: ElementType.RADIO,
        settings: {
            connect_with: "some"
        }
    },
    {
        label: "Test Check2",
        name: "test_check2",
        type: ElementType.RADIO,
        settings: {
            connect_with: "some",
            checked: true
        }
    },
    {
        label: "Test File",
        name: "test_file",
        type: ElementType.FILE,
        settings: {
            multiple: true
        }
    }
]

export const multi_select_element: FormElementType[] = [
    {
        label: "test select",
        name: "test_select_1",
        type: ElementType.SELECT,
        settings: {
            multiple: true,
            options: [
                {
                    value: "some1",
                    text: "some",
                    selected: true
                },
                {
                    value: "some2",
                    text: "some",
                    selected: true
                },
                {
                    value: "some3",
                    text: "some",
                },
            ]
        }
    },
    {
        label: "test select",
        name: "test_select_2",
        type: ElementType.SELECT,
        settings: {
            multiple: true,
            options: [
                {
                    value: "some1",
                    text: "some",
                },
                {
                    value: "some2",
                    text: "some",
                },
                {
                    value: "some3",
                    text: "some",
                },
            ]
        }
    },

]

export const test_empty: FormElementType[] = [
    {
        name: "test_value",
        label: "Test value",
        type: ElementType.INPUT,
        settings:{
        }
    }
]

export const test_initial_value: FormElementType[] = [
    {
        name: "test_value",
        label: "Test value",
        type: ElementType.INPUT,
        settings:{
            value: "some"
        }
    }
]

export const test_select: FormElementType[] = [
    {
        label: "test select",
        name: "test_select",
        type: ElementType.SELECT,
        settings: {
            options: [
                {
                    text: "test",
                    value: "test"
                },
                {
                    text: "test2",
                    value: "test2"
                }
            ]
        }
    }
]
export const smart_select: FormElementType[] = [
    {
        label: "test select",
        name: "test_select",
        type: ElementType.SMART_SELECT,
        settings: {
            options: [
                {
                    text: "test",
                    value: "test"
                },
                {
                    text: "test2",
                    value: "test2"
                },
                {
                    text: "some",
                    value: "some"
                }
            ],
            multiple: true
        }
    }
]