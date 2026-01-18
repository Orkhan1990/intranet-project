import { TextInput } from "flowbite-react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import NewCardWorkersName from "./NewCardWorkersName";
import { Field, FieldArray } from "formik";
import { UserInterface } from "../types";
import { useEffect} from "react";
import { fetchUsers } from "../redux-toolkit/features/user/userSlice";
import { RootState, AppDispatch } from "../redux-toolkit/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext } from "formik";

interface CardWorkersInterface {
  workers: UserInterface[];
  values: any;
  name: string;
  // jobWorkerPrice: (price: any) => void;
  cardData?: any;
  paymentType:any;
  // allValues?:any;
}

const NewCardWorkers = ({
  workers,
  values,
  name,
  // jobWorkerPrice,
  cardData,
  paymentType,
  // allValues
}: CardWorkersInterface) => {
  const dispatch = useDispatch<AppDispatch>();
  // const [totalPrice, setTotalPrice] = useState(0);

  const { setFieldValue } = useFormikContext<any>();
  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  


useEffect(() => {
  const av = Number(values.av || 0);
  const discount = Number(values.discount || 0);

  let calculatedTotal = 0;

  if (paymentType === "internal") {
    values.workers.forEach((w: any) => {
      const workerAv = Number(w.workerAv || 0);
      const workerPercent = Number(users.find(u => u.id === Number(w.workerId))?.percent || 0) / 100;
      calculatedTotal += workerAv * 50 * workerPercent;
    });
  } else {
    calculatedTotal = av * 50;
  }

  // Discount tətbiq et
  calculatedTotal = calculatedTotal * (1 - discount / 100);

  setFieldValue(`${name}.price`, Number(calculatedTotal.toFixed(2)));
}, [values.av, values.discount, values.workers, paymentType, users]);






  console.log({ values });

  return (
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-1">
          <Field
            as={TextInput}
            type="text"
            className="w-[150px] text-xs"
            sizing="sm"
            name={`${name}.code`}
            disabled={cardData && !cardData?.isOpen}
          />
        </td>
        <td className="px-1">
          <div className="flex gap-2 items-center">
            <Field
              as={TextInput}
              type="text"
              className="w-[250px]"
              name={`${name}.name`}
              sizing="sm"
              disabled={cardData && !cardData?.isOpen}
            />
            <Link to="">
              <FaArrowAltCircleUp className="text-2xl text-green-600" />
            </Link>
          </div>
        </td>
        <td className="px-1">
          <Field
            as={TextInput}
            type="text"
            className="w-[60px]"
            name={`${name}.av`}
            sizing="sm"
            disabled={cardData && !cardData?.isOpen}
          />
        </td>
        <td className="px-1">
          <Field as={TextInput}
            type="text"
            className="w-[100px]"
            readOnly
            name={`${name}.price`}
            sizing="sm"
            disabled={cardData && !cardData?.isOpen}
          />
        </td>
        <td className="px-6">
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.discount`}
            sizing="sm"
            disabled={cardData && !cardData?.isOpen}
          />
        </td>
        <td className="px-1">
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.oil`}
            sizing="sm"
            disabled={cardData && !cardData?.isOpen}
          />
        </td>
        <td className="px-6 py-4">
          <FieldArray name={`${name}.workers`}>
            {({ push, remove }) => (
              <div className="flex flex-col gap-2">
                {values.workers.map((_: any, index: number) => (
                  <NewCardWorkersName
                    key={index}
                    workers={workers} // backend-dən gələn user list
                    name={`${name}.workers[${index}]`}
                    index={index}
                    push={push}
                    remove={remove}
                    values={values} // indi tək worker obyektidir
                    cardData={cardData}
                  />
                ))}
              </div>
            )}
          </FieldArray>
        </td>
      </tr>
    </tbody>
  );
};

export default NewCardWorkers;
