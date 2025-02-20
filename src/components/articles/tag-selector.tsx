'use client';
import React, { useEffect, useState } from 'react';
import MultipleSelector, {Option} from '../ui/multiple-selector';
import { getAllTags } from '../../request/article-request';
import { AxiosResponse } from 'axios';
import { Tags } from '../../types/article-type';
import Select from "react-select";

const OPTIONS: Option[] = [
  { label: 'Petrol Station', value: 'PetrolStation' },
  { label: 'Gas Station', value: 'Gas Station' },
  { label: 'Diesel Station', value: 'DieselStation' },
  { label: 'Kerosene Station', value: 'KeroseneStation' },
];

// const MultipleSelectorControlled = ({ onChange }: { onChange: (tags: Option[]) => void }) => {
//   const [value, setValue] = React.useState<Option[]>([]);

//   const fetchTags = async () => {
//     const response = await getAllTags()

//     const axiosResponse = response as AxiosResponse<Tags[], any>

//     if (axiosResponse.status === 200) {
//         setValue([...axiosResponse.data.map(data => {
//             return {label: data.name, value: data.name}
//         })])
//     }
//   }

//   const handleChange = (tags: Option[]) => {
//     setValue(tags);
//     onChange(tags); // Call the callback function with the selected tags
//   };

//   useEffect(() => {

//   }, [])

//   return (
//     <div className="flex w-full flex-col ">
//       <p className=" mb-3 font-medium">Tags</p>
//       <MultipleSelector
//         className='border-gray-400 border py-5'
//         value={value}
//         onChange={handleChange}
//         defaultOptions={OPTIONS}
//         placeholder="Select station type..."
//         emptyIndicator={
//           <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
//             no results found.
//           </p>
//         }
//       />
//     </div>
//   );
// };

// export default MultipleSelectorControlled;


const MultiSelector = ({ onChange }: { onChange: (tags: Option[]) => void }) => {
    const [selectedTags, setSelectedTags] = useState<{ label: string; value: string }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

    const handleChange = (selectedOptions: any) => {
        setSelectedTags(selectedOptions || []);
        onChange(selectedOptions || []);
    };

    const fetchTags = async () => {
        const response = await getAllTags();
        const axiosResponse = response as AxiosResponse<Tags[], any>;

        if (axiosResponse.status === 200) {
            const formattedOptions = axiosResponse.data.map(tag => ({
                label: tag.name, // Display tag name in dropdown
                value: tag.name // Store ID as string
            }));
            setOptions(formattedOptions);
        }
    };

    useEffect(() => {
        fetchTags().then();
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && inputValue.trim()) {
            event.preventDefault();
            const newTag = { label: inputValue, value: inputValue.toLowerCase() };

            const tagExists = options.some((tag) => tag.value === newTag.value);
            const alreadySelected = selectedTags.some((tag) => tag.value === newTag.value);

            if (!tagExists) {
                setOptions((prevOptions) => [...prevOptions, newTag]);
            }

            if (!alreadySelected) {
                setSelectedTags((prevTags) => [...prevTags, newTag]);
            }

            setInputValue(""); // Clear input
        }
    };

    return (
        <Select
            isMulti
            options={options} // Use formatted options
            value={selectedTags}
            onChange={handleChange}
            onInputChange={(input) => setInputValue(input)}
            onKeyDown={handleKeyDown}
            placeholder="Select or add tags..."
            isClearable
            className=""
        />
    );
};

export default MultiSelector