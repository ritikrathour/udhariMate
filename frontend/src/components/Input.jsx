const Input = ({ type, placeholder, name, id, func, value, style, icon, defaultValue,IconStyle }) => {
    return (
        <>
            <div className="h-[40px] rounded-lg bg-zinc-100 flex items-center px-2 gap-2 w-full">
                <label htmlFor={name}>
                    <i className={`${icon} text-[12px] ${IconStyle}`}> </i>
                </label>
                <input className={` ${style} w-full h-full bg-transparent`} onChange={(e) => func(e)} defaultValue={defaultValue} value={value} id={id} type={type} placeholder={placeholder} name={name} required autoComplete="off"/>
            </div>
        </>
    )
}
export default Input;