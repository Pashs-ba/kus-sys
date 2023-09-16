import {BaseFileType} from "./types.ts";
import {MAIN_PATH} from "../../config.ts";

export default function BaseFile({
                                     required,
                                     disabled,
                                     additionalClasses,
                                     multiple,
                                     onInput,
                                     url,
                                     accept
                                 }: BaseFileType) {
    return (
        <>
            <input required={required}
                   disabled={disabled}
                   className={`form-control ${additionalClasses}`}
                   type={"file"}
                   multiple={multiple}
                   onChange={onInput}
                   accept={accept}

            />
            {url ?
                <div className={"form-text"}>
                    <a href={MAIN_PATH + "/data" + url.slice(2)}>Загруженный файл</a>
                </div> : null
            }

        </>
    )
}