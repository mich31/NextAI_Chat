export default function Page() {
    return (
        <div className='flex flex-row h-full'>
            <div className='basis-[23%] bg-slate-200 p-4'>Conversations</div>
            <div className='flex flex-col basis-[77%] overflow-hidden bg-slate-100'>
                {/* <div className='bg-background space-y-4 border-t-4 px-2 py-2 shadow-lg rounded-t-xl'></div> */}
                <div className='mx-auto w-10/12 h-full'>Messages</div>
                <div className='relative'>
                    <div className='absolute bottom-0 left-0 right-0 h-[132px]'>
                        <div className='mx-auto max-w-2xl h-full border-t shadow-xl rounded-t-xl bg-white'>
                            <div className='space-y-4'>Input</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
