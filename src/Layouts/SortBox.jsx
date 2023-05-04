import './sortBox.scss'
import { SortResults } from "./SortResults";

export function SortBox({ value, onChange }) {

    return (
        <div className="sortBox">
            <h3 className="sortBox__label">Sort Results By</h3>

            <SortResults
                className="sortBox__select"
                onChange={onChange}
                value={value} />
        </div>
    );
}

