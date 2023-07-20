import {BaseFileType} from "./types.ts";

export default function BaseFile({
                                     required,
                                     disabled,
                                     additionalClasses,
                                     multiple,
                                     onInput
                                 }: BaseFileType) {
    return (
        <input required={required}
               disabled={disabled}
               className={`form-control ${additionalClasses}`}
               type={"file"}
               multiple={multiple}
               onChange={onInput}
        />
    )
}