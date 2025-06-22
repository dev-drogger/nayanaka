import { useRef } from "react";
import { useInView } from "framer-motion";
const image = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return <div>image</div>;
};

export default image;
