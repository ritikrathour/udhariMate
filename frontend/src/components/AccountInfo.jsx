const AccountInfo = ({createdAt}) => { 
    return (
        <>
            <div className="flex flex-col sm:w-[500px] w-full py-3 px-5 mt-4">
                <h2 className="font-medium">Account Information</h2>
                <div className="mt-4 flex flex-col gap-2">
                    <div className="flex justify-between border-b-2 border-gray-300">
                        <h4 className="text-sm font-medium">Member Since</h4>
                        <span className="text-[12px] font-semibold">{createdAt?.slice(0,10)}</span>
                    </div>
                    <div className="flex justify-between">
                        <h4 className="text-sm font-medium">Account Status</h4>
                        <span className="text-green-600 text-sm font-medium">Active</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AccountInfo;