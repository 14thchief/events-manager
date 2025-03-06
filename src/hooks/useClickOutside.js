import {
  useState,
  useEffect,
  useRef,
  useCallback,
  // MutableRefObject,
} from "react";

const useClickOutside = () => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // const dropdownListRef = useRef<MutableRefObject<HTMLElement>[]>([]);

  // if (
  //   dropdownListRef.current &&
  //   dropdownListRef.current.length !== arrayLength
  // ) {
  //   dropdownListRef.current = Array(arrayLength || 0)
  //     .fill(null)
  //     .map((_, i) => dropdownListRef.current[i] || useRef(null));
  // }

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return {
    open,
    setOpen,
    dropdownRef: dropdownRef,
  };
};

export default useClickOutside;
