import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../../features/products/productsSlice";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";

const Wizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData(data);
    setStep(2);
  };

  const handleSubmit = (finalData) => {
    dispatch(addProduct(finalData));
    navigate("/product-list");
    setFormData(null);
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
