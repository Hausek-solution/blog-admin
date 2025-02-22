'use client';
import React, { useEffect, useState } from 'react';
import MultipleSelector, {Option} from '../ui/multiple-selector';
import { getAllTags } from '../../request/article-request';
import { AxiosResponse } from 'axios';
import { Tags } from '../../types/article-type';
import Select from "react-select";

const MultiSelector = ({ onChange, previousTags }: { onChange: (tags: Option[]) => void,  previousTags: Option[] }) => {
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
            const set2 = new Set(previousTags.map(tag => tag.value));
            
            const formattedOptions = axiosResponse.data.map(tag => ({
                label: tag.name, // Display tag name in dropdown
                value: tag.name // Store ID as string
            })).filter(item => !set2.has(item.value));

            console.log(formattedOptions)
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