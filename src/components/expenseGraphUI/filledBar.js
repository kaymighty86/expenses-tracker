import "./filledBar.css";

/**
 * A filled bar UI. The fill level can be set between 0.0 to 1.0
 * @param {number} fillValue - the fill value of the bar between 0.0 to 1.0
 */
const FilledBar = ({fillValue}) => {

    return (
        <div className="bar">
            <div className="barfill" style={{height: `${fillValue * 100}%`}}></div>
        </div>
    );
}

export default FilledBar;