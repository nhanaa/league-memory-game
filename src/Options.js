const Options = ({isOn, handleToggle}) => {
    return (  
        <div className="music-control">
            <label className="music-switch-label"><span>Music: </span></label>
            <input 
                checked={isOn}
                onChange={handleToggle}
                type="checkbox" 
                className="music-switch"
            />
        </div>
    );
}
 
export default Options;