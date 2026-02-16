import { useEffect } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { NewCardInterface } from "../../types";
import { RootState } from "../../redux-toolkit/store/store";

const WayOutAutoLogic = () => {
  const { values, setFieldValue } = useFormikContext<NewCardInterface>();
  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (values.id) return;

  if (!values.isWayOut) return;
  

  const distance = Number(values.wayOutDistance || 0);
  if (distance <= 0) return;

  const prevJobs = values.cardJobs || [];
  const existingServiceJob = prevJobs.find(
    (j) => j.name === "Servis çıxışı"
  );

  const defaultWorkerId =
    existingServiceJob?.workers?.[0]?.workerId ??
    prevJobs?.[0]?.workers?.[0]?.workerId ??
    null;

  /* -------- AV -------- */
  const av =
    Number(values.wayOutCar) === 1
      ? distance * 0.014
      : distance * 0.028;

  /* -------- PRICE -------- */
  let price = 0;

  if (values.paymentType === "internal" && defaultWorkerId) {
    const foundUser = users.find((u) => u.id === defaultWorkerId);
    const percent = Number(foundUser?.percent || 0) / 100;
    price = av * 50 * percent;
  } else {
    price = Number(values.wayOutCar) === 1 ? distance * 1 : distance * 2;
  }

  const serviceJob = {
    ...(existingServiceJob ?? {
      code: "",
      name: "Servis çıxışı",
      discount: 0,
      oil: "",
    }),
    av: +av.toFixed(3),
    price: +price.toFixed(2),
    workers: defaultWorkerId
      ? [{ workerId: defaultWorkerId, workerAv: av }]
      : [],
  };

  const otherJobs = prevJobs.filter((j) => j.name !== "Servis çıxışı");
  const mergedJobs = [serviceJob, ...otherJobs];

  const isSame =
    prevJobs.length === mergedJobs.length &&
    prevJobs.every(
      (j, i) =>
        j.name === mergedJobs[i].name &&
        j.av === mergedJobs[i].av &&
        j.price === mergedJobs[i].price
    );

  if (!isSame) {
    setFieldValue("cardJobs", mergedJobs);
  }

  /* -------- EXPENSE -------- */
  const expPrice =
    Number(values.wayOutWorkTime || 0) *
    Number(values.wayOutWorkers || 0) *
    2;

  const prevExpenses = values.expences || [];
  const idx = prevExpenses.findIndex(
    (e) => e.description === "Mütəxəssis çıxışı"
  );

  const nextExpenses = [...prevExpenses];

  if (idx >= 0) {
    if (nextExpenses[idx].price !== expPrice) {
      nextExpenses[idx] = {
        ...nextExpenses[idx],
        price: expPrice,
      };
    }
  } else {
    nextExpenses.push({
      description: "Mütəxəssis çıxışı",
      price: expPrice,
    });
  }

  setFieldValue("expences", nextExpenses);
}, [
  values.isWayOut,
  values.wayOutDistance,
  values.wayOutCar,
  values.wayOutWorkTime,
  values.wayOutWorkers,
  values.paymentType,
  users,
]);


  return null;
};

export default WayOutAutoLogic;
