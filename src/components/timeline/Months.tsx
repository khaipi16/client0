import React, { useState } from "react";
import { Blog } from "../blog/Blog";

interface MonthProps {
    month: string;
    children: React.ReactNode
}

export const Month: React.FC<MonthProps> = ({ month, children }) => {
    const [extend, setExtend] = useState(false);

    const toggleExtend = () => {
        setExtend(!extend);
    };

    return (
        <div className={`month ${extend ? 'expanded' : ''}`}>
            <button className="btn btn-link month-title month-title" onClick={toggleExtend}>
                {month}
                {extend ? '-' : '+'}
            </button>
            {extend && children}
        </div>
        
    )

}