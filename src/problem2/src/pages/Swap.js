import React, { useEffect, useMemo, useState } from "react";
import InputNumber from "../components/InputNumber";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/rules";
import { stepsValues } from "../enums/steps";
import NavSteps from "../components/NavSteps";
import imageSwap from "../assets/swap.png";
import Select from "../components/Select";
import Button from "../components/Button";
import { formatCurrency } from "../utils/utils";
export default function Swap() {
  const [steps, setSteps] = useState(stepsValues);
  const [currencyList, setCurrencyList] = useState(null);
  const [formActive, setFormActive] = useState(1);
  const {
    register,
    formState: { errors },
    getValues,
    watch,
    setValue,
    setError,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const fetchListCurrency = async () => {
      const response = await fetch(
        "https://interview.switcheo.com/prices.json"
      );
      const data = await response.json();
      setCurrencyList(data);
    };
    fetchListCurrency();
  }, []);

  const priceSend = useMemo(() => {
    return currencyList?.find(
      (item) => item.currency === getValues("currency_send")
    )?.price;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues("currency_send")]);

  const priceReceive = useMemo(() => {
    return currencyList?.find(
      (item) => item.currency === getValues("currency_receive")
    )?.price;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues("currency_receive")]);

  console.log("watch", watch());
  console.log("priceSend", priceSend);

  const listCurrency = useMemo(() => {
    return currencyList?.map((item) => item.currency);
  }, [currencyList]);

  const handleNextStep = () => {
    if (formActive === 1) {
      setFormActive((prev) => {
        const newState = prev + 1;
        const newSteps = steps.map((item) => {
          if (item.formId === newState) {
            return { ...item, active: true };
          }
          return item;
        });
        setSteps(newSteps);
        return newState;
      });
    }
    if (formActive === 2) {
      setFormActive((prev) => {
        const newState = prev + 1;
        const newSteps = steps.map((item) => {
          if (item.formId === newState) {
            return { ...item, active: true };
          }
          return item;
        });
        setSteps(newSteps);
        return newState;
      });
    }
    if (formActive === 3) {
      reset();
      setFormActive(1);
      setSteps(stepsValues);
    }
  };

  const handleChangeInput = (value, name) => {
    const numberValue = value.length <= 12 ? Number(value) : NaN;
    console.log("number", numberValue);
    console.log("check number", !isNaN(numberValue));
    let calPrice = null;
    let fromName = name === "send" ? "send" : "receive";
    let toName = name === "send" ? "receive" : "send";
    if (!isNaN(numberValue) && priceSend && priceReceive) {
      calPrice = (numberValue * priceSend) / priceReceive;
      setValue(fromName, numberValue);
      setValue(toName, calPrice);
    } else {
      setError("send", { message: "Please type correct money" });
      setError("receive", { message: "Please type correct money" });
    }
  };

  return (
    <div className="bg-slate-500">
      <div className="container h-screen">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-6 lg:py-32">
          <div className="lg:col-span-3 lg:col-start-4">
            <div className="rounded bg-white py-10 px-20 shadow-sm">
              <NavSteps steps={steps} />

              {formActive === 1 && (
                <div className="flex gap-6 flex-col">
                  <Select
                    name="currency_send"
                    errorMessage={errors.currency_send?.message}
                    register={register}
                    options={listCurrency}
                  />

                  <div className="flex justify-center mb-5">
                    <img src={imageSwap} alt="img" className="w-20 rotate-90" />
                  </div>
                  <Select
                    name="currency_receive"
                    errorMessage={errors.currency_receive?.message}
                    register={register}
                    options={listCurrency}
                  />
                  <Button
                    className="flex w-full items-center justify-center bg-slate-500 py-4 px-2 text-sm uppercase text-white hover:bg-slate-600"
                    onClick={handleNextStep}
                    disabled={
                      !getValues("currency_send") ||
                      !getValues("currency_receive")
                    }
                  >
                    Next Step
                  </Button>
                </div>
              )}

              {formActive === 2 && (
                <div className="gap-6 flex-col">
                  <InputNumber
                    name="send"
                    register={register}
                    type="text"
                    className="mt-8"
                    errorMessage={errors.send?.message}
                    placeholder="Amount to send"
                    onChange={handleChangeInput}
                  />
                  <div className="flex justify-center">
                    <img src={imageSwap} alt="img" className="w-20 rotate-90" />
                  </div>
                  <InputNumber
                    name="receive"
                    register={register}
                    type="text"
                    className="mt-8"
                    errorMessage={errors.receive?.message}
                    placeholder="Amount to receive"
                    onChange={handleChangeInput}
                  />
                  <Button
                    className="flex w-full items-center justify-center bg-slate-500 py-4 px-2 text-sm uppercase text-white hover:bg-slate-600"
                    onClick={handleNextStep}
                    disabled={!getValues("send") || !getValues("receive")}
                  >
                    Process Final
                  </Button>
                </div>
              )}

              {formActive === 3 && (
                <div className="gap-6 flex-col">
                  <p className="mb-2">
                    Amount To Send : {formatCurrency(getValues("send"))} (
                    {getValues("currency_send")})
                  </p>
                  <p>
                    Amount To Receive : {formatCurrency(getValues("receive"))} (
                    {getValues("currency_receive")})
                  </p>
                  <Button
                    className="flex w-full items-center justify-center bg-slate-500 py-4 px-2 text-sm uppercase text-white hover:bg-slate-600 mt-4"
                    onClick={handleNextStep}
                    disabled={!getValues("send") || !getValues("receive")}
                  >
                    Final
                  </Button>
                </div>
              )}

              {/* <Button
                className="flex w-full items-center justify-center bg-slate-500 py-4 px-2 text-sm uppercase text-white hover:bg-slate-600"
                onClick={handleNextStep}
                disabled={
                  !getValues("currency_send") || !getValues("currency_receive")
                }
              >
                Next Step
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
