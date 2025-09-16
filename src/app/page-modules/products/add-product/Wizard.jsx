import { useState } from "react";
import { useDispatch } from "react-redux";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";
import useProducts from "../../../hooks/useProduct";

const Wizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const { addProduct } = useProducts();

  const handleNext = (data) => {
    setFormData(data);
    setStep(2);
  };

  const handleSubmit = (finalData) => {
    console.log(finalData, "final");
    if (finalData) {
      dispatch(addProduct(finalData));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb />
      <div className="mt-10">
        {step === 1 && <StepOne onNext={handleNext} />}
        {step === 2 && <StepTwo onSubmit={handleSubmit} prevData={formData} />}
      </div>
    </div>
  );
};

export default Wizard;
