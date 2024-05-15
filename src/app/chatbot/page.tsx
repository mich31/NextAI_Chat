export default function Page(){
    return (
        <div className='flex flex-row'>
            <div className='min-h-screen basis-1/4 bg-blue-300 p-2'>Conversations</div>
            <div className='flex min-h-screen basis-3/4 flex-col bg-white'>
                <div className='mx-auto w-9/12 basis-11/12 bg-slate-100 px-2 py-2'>Response</div>
                <div className='mx-auto w-9/12 basis-1/12'>
                    <input type='text' className='min-w-full rounded-lg border-2 border-blue-300 px-2 py-2' placeholder='Message' />
                </div>
            </div>
        </div>

    );
}
