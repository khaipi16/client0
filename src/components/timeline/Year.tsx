import { useState } from "react";
import { Month } from "./Months";

interface YearProps {
    year: string;
    children: React.ReactNode;
}

export const Year: React.FC<YearProps> = ({ year, children }) => {
    const [extend, setExtend] = useState(false);

    const toggleExtend = () => {
        setExtend(!extend);
    };


    return (
        <div className={`year ${extend ? 'expanded' : ''}`}>
            <button className="btn btn-link year-title" onClick={toggleExtend}>
                {year}
                {extend ? '-' : '+'}
            </button>
            {extend && children}
        </div>

    );
};