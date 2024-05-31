import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import './TagInput.css';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            onChange([...tags, inputValue.trim()]);
            setInputValue('');
        } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            e.preventDefault();
            onChange(tags.slice(0, -1));
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleRemoveTag = (index: number) => {
        onChange(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="tag-input">
            <ul className="tag-list">
                {tags.map((tag, index) => (
                    <li key={index} className="tag">
                        {tag}
                        <button type="button" className="remove-tag" onClick={() => handleRemoveTag(index)}>
                            &times;
                        </button>
                    </li>
                ))}
                <li className="tag-input-field">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a tag"
                    />
                </li>
            </ul>
        </div>
    );
};

export default TagInput;
