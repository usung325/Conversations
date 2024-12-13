// export default function TextContent({author, body, choreo, performer}) {
//     return (
//         <div className="h-full items-center justify-center flex pt-[20vh] pointer-events-none">
//             <div className="flex-auto items-start">
//                 <div className="flex flex-col items-start gap-2 mb-5">
//                     <p>by {author}</p>
//                     {/* <pre className="w-fit font-sans text-[.8em]"> 
//                         {body}
//                     </pre> */}
//                     {/* <p className="w-[25em]"> 
//                         {body}
//                     </p> */}
//                         {body.split('\n').map((line, i) => (
//                             <p key={i} className="w-[25em]">{line}</p>
//                         ))}
//                 </div>

//                 <div className="flex flex-col gap-3">
//                     <p>choreo: {choreo}</p>
//                     <p>performance: {performer}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }
export default function TextContent({author, body, choreo, performer}) {
    return (
        // Remove the pt-[20vh] and use flex with min-h-screen
        <div className="h-[calc(100vh-5rem)] flex items-center justify-center pointer-events-none">
            {/* Container for the actual content */}
            <div className="flex flex-col justify-between">
                {/* Top section with author and body */}
                <div className="flex flex-col items-start gap-2 mb-5">
                    <p className="ml-auto">by {author}</p>
                    <div className="flex flex-col">
                        {body.split('\n').map((line, i) => (
                            <p key={i} className="w-[25em] mt-2">{line}</p>
                        ))}
                    </div>
                </div>

                {/* Bottom section with choreo and performer */}
                <div className="flex flex-col gap-3 ">
                    <p>choreo: {choreo}</p>
                    <p>performance: {performer}</p>
                </div>
            </div>
        </div>
    )
}