import React from 'react';
import { Plus } from 'lucide-react';

const GenerateCaptionButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
            <Plus size={18} strokeWidth={2} />
            <span>Generate Caption</span>
        </button>
    );
};

export default GenerateCaptionButton;