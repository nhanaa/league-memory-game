import './Options.css';

const Options = ({isOn, handleToggle}) => {
    return (  
        <div className="music-control">
            <span className="music-label">Music: </span>
            <label className="music-switch">
                <input 
                    checked={isOn}
                    onChange={handleToggle}
                    type="checkbox" 
                />
                <span className="slider"></span>
            </label>

        </div>
    );
}
 
export default Options;