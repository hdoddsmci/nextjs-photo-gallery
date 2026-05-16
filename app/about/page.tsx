

// export default function AboutPage(){
//     return (
//         <div className="p-10 text-center">
//             <h1 className="Text-3xl font-bold"> About this gallery</h1>
//             <p>This is a live test</p>
//         </div>
//     );
// }
// export default function AboutPage(){
//     return(
//         <div className="p-10 text-center">
//             <h1 className="Text-3x1 font-bold">about this gallary</h1>
//         </div>
//     )
// }

"use clinent";
import { useState } from "react";

export default function Counter(){
    const [ count,setCount] = useState(0);

    return(
        <button
        onClick={( ) => setCount( count +1)}
        className=" bg-blue_500 text-white p-2 rounded"
    >
        Clicked {count} times
    </button>
    );

}