import React from "react"
import Dropdown, {DropdownOption} from "./Dropdown"
import SecondaryButton from "./SecondaryButton"

export default function DropdownOptionSelect(
    {id, contentAlign, options, selectCallback, defaultOption = "select", selectedOptionId = ""} :
    {
        id: string,
        contentAlign : "left" | "right" | undefined,
        options : DropdownOption[],
        selectCallback : (event: React.MouseEvent) =>  void,
        defaultOption: string,
        selectedOptionId : string
    }
) {

    let optionsLabels : {[key: string] :  string} = { "" : defaultOption}
    options.map((option) => optionsLabels[option.id] = option.label  )

    return <Dropdown>
        <Dropdown.Trigger>
        <span className="inline-flex rounded-md mt-1">
                            <SecondaryButton
                                className='mt-lg'
                                id={id}
                            >
                                { optionsLabels[selectedOptionId]}
                                <svg
                                    className="-me-0.5 ms-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </SecondaryButton>
                        </span>
        </Dropdown.Trigger>
        <Dropdown.Content align={contentAlign}>
            {options.map((option) => {
                return <div key={option.id}>
                    <button type='button' id={option.id} onClick={selectCallback} >
                        {option.label}
                    </button>
                </div>
            })}
        </Dropdown.Content>
    </Dropdown>
}

