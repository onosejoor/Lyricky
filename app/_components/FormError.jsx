"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

const FormError = ({ error }) => {
  useEffect(() => {
     toast.error(error);;
  }, []);
 
};

export default FormError;
