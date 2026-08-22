// // rafce
// import { useState, useEffect, useRef } from "react";

// const Contact = () => {
//   const [count, setCount] = useState(0);
//   const [plus, setPlus] = useState(0);
//   const inc = useRef(0);

//   // useEffect(() => {
//   //   inc.current++;
//   // }, [plus, count]);

//   function handleClick() {
//     inc.current = inc.current + 1;
//     console.log(inc.current);
//   }
//   return (
//     <>
//       <div>counter</div>
//       <button
//         className=" border-2 border-black p-2"
//         onClick={() => setCount((data) => data + 10)}
//       >
//         inc count : {count}
//       </button>
//       <button onClick={() => setPlus((el) => el + 5)}>plus: {plus}</button>{" "}
//       <br />
//       <button onClick={handleClick}>inc: {inc.current}</button>
//     </>
//   );
// };

// export default Contact;
