import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { Order } from "../entites/Order";
import { OrderPart } from "../entites/OrderPart";
import { Client } from "../entites/Client";
import {
  OrderInterface,
  SupplierOrderPartInterface,
} from "../types/projectTypes";
import { User } from "../entites/User";
import { CustomRequest } from "../middleware/verifyToken";
import { OrderHistory } from "../entites/OrderHistory";
import { OrderStage, OrderStep } from "../enums/allEnums";
import { SparePart } from "../entites/SparePart";
import { log } from "console";
import { SupplierOrderHistory } from "../entites/SuppliersOrderHistory";
import { Supplier } from "../entites/Supplier";
import { In } from "typeorm";
import { SupplierOrderParts } from "../entites/SupplierOrderParts";

const orderPartsRepository = AppDataSource.getRepository(OrderPart);
const orderRepository = AppDataSource.getRepository(Order);
const clientRepository = AppDataSource.getRepository(Client);
const userRepository = AppDataSource.getRepository(User);
const orderHistoryRepository = AppDataSource.getRepository(OrderHistory);
const sparePartsRepository = AppDataSource.getRepository(SparePart);
const suppliersOrderHistoryReposiroty =
  AppDataSource.getRepository(SupplierOrderHistory);
const supplierRepository = AppDataSource.getRepository(Supplier);
const supplierOrderPartRepository =
  AppDataSource.getRepository(SupplierOrderParts);

export const createOrder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      project,
      cardNumber,
      orderType,
      clientId,
      manufacturer,
      model,
      chassisNumber,
      engineNumber,
      produceYear,
      km,
      vehicleNumber,
      paymentType,
      delivering,
      deliveringType,
      initialPayment,
      comment,
      oil,
      orderParts,
    }: OrderInterface = req.body;
    // console.log(req.body);

    const userId = req.userId;

    const getclient = await clientRepository.findOneBy({ id: clientId });
    const getUser = await userRepository.findOneBy({ id: userId });

    if (!getUser) {
      next(errorHandler(401, "Istifadəçi mövcud deyil!"));
      return;
    }

    if (!getclient) {
      next(errorHandler(401, "Müştəri mövcud deyil!"));
      return;
    }

    const newOrderArray = await Promise.all(
      orderParts.map(async (part) => {
        const newOrderPart = new OrderPart();
        newOrderPart.partName = part.partName;
        newOrderPart.count = part.count;
        newOrderPart.origCode = part.origCode;

        await orderPartsRepository.save(newOrderPart);
        return newOrderPart;
      })
    );

    const newOrder = new Order();
    newOrder.project = project;
    newOrder.cardNumber = cardNumber;
    newOrder.orderType = orderType;
    newOrder.client = getclient;
    newOrder.manufacturer = manufacturer;
    newOrder.model = model;
    newOrder.chassisNumber = chassisNumber;
    newOrder.engineNumber = engineNumber;
    newOrder.produceYear = produceYear;
    newOrder.km = km;
    newOrder.vehicleNumber = vehicleNumber;
    newOrder.paymentType = paymentType;
    newOrder.delivering = delivering;
    newOrder.deliveringType = deliveringType;
    newOrder.initialPayment = initialPayment;
    newOrder.comment = comment;
    newOrder.isExcellFile = true;
    newOrder.oil = oil;
    newOrder.user = getUser;
    newOrder.orderParts = newOrderArray;

    const newOrderHistory = new OrderHistory();
    newOrderHistory.user = getUser;
    newOrderHistory.date = new Date();
    newOrderHistory.step = OrderStep.OrderConfirm;
    newOrderHistory.confirm = true;
    newOrderHistory.order = newOrder;

    await orderRepository.save(newOrder);
    await orderHistoryRepository.save(newOrderHistory);

    res.status(200).json({
      result: `${
        orderParts.length > 1
          ? "Sifarişlər əlavə olundu"
          : "Sifariş əlavə olundu!"
      }`,
    });
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allOrders = await orderRepository.find({
      relations: ["client", "user", "orderParts", "orderHistory"],
    });

    if (!allOrders) {
      next(errorHandler(401, "Sifarişlər mövcud deyil!"));
      return;
    }

    res.status(200).json(allOrders);
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderRepository.findOne({
      where: { id: Number(req.params.id) },
      relations: [
        "user",
        "client",
        "orderParts",
        "responsibleUser",
        "orderHistory",
        "orderHistory.user",
        "orderHistory.supplierOrderHistories",
        "orderHistory.supplierOrderHistories.supplier",
      ],
    });

    if (!order) {
      next(errorHandler(401, "Sifariş mövcud deyil!"));
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const confirmOrder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const userRepository = AppDataSource.getRepository(User);
    const orderRepository = AppDataSource.getRepository(Order);

    const user = await userRepository.findOneBy({ id: userId });
    const order = await orderRepository.findOneBy({ id: Number(id) });

    if (!user) {
      next(errorHandler(401, "Belə istifadəçi yoxdur!"));
    }

    if (!order) {
      next(errorHandler(401, "Belə istifadəçi yoxdur!"));
      return;
    }

    order.confirm = true;
    order.confirmDate = new Date();
    order.isExcellFile = false;
    order.rejectMessage = null;
    order.stage = OrderStage.WarehouseConfirm;
    order.user = user;

    await orderRepository.save(order);

    const newOrderHistory = new OrderHistory();
    newOrderHistory.user = user;
    newOrderHistory.date = new Date();
    newOrderHistory.step = OrderStep.OrderAccept;
    newOrderHistory.confirm = true;
    newOrderHistory.order = order;

    await orderHistoryRepository.save(newOrderHistory);

    res.status(201).json(order);
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const updateOrder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      next(errorHandler(401, "İstifadəçi mövcud deyil!"));
      return;
    }

    const client = await clientRepository.findOneBy({ id: req.body.client.id });

    if (!client) {
      next(errorHandler(401, "Müştəri mövcud deyil!"));
      return;
    }
    const order = await orderRepository.findOneBy({ id: Number(id) });

    if (!order) {
      next(errorHandler(401, "Sifariş mövcud deyil!"));
      return;
    }
    await orderPartsRepository.delete({ order: order });

    const newOrderParts = req.body.orderParts.map(async (item: any) => {
      const newOrderPart = new OrderPart();
      newOrderPart.origCode = String(item.origCode);
      newOrderPart.count = item.count;
      newOrderPart.partName = item.partName;
      newOrderPart.order = order;
      await orderPartsRepository.save(newOrderPart);
      return newOrderPart;
    });

    order.project = req.body.project;
    order.cardNumber = req.body.cardNumber;
    order.orderType = req.body.orderType;
    order.client = client;
    order.manufacturer = req.body.manufacturer;
    order.model = req.body.model;
    order.chassisNumber = req.body.chassisNumber;
    order.engineNumber = req.body.engineNumber;
    order.produceYear = req.body.produceYear;
    order.km = req.body.km;
    order.vehicleNumber = req.body.vehicleNumber;
    order.paymentType = req.body.paymentType;
    order.delivering = req.body.delivering;
    order.deliveringType = req.body.deliveringType;
    order.initialPayment = req.body.initialPayment;
    order.comment = req.body.comment;
    order.oil = req.body.oil;
    order.user = user;
    order.orderParts = newOrderParts;

    await orderRepository.save(order);
    res.status(201).json({ result: order, message: "Uğurla yeniləndi!" });
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const updateOrderParts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  // console.log(req.body.orderPartsIdArray);
  // console.log(req.body.delivering);

  try {
    const supplierOrderParts = (
      await Promise.all(
        req.body.orderPartsIdArray.map(async (item: any) => {
          return await supplierOrderPartRepository.find({
            where: {
              supplier: { id: Number(req.body.supplierId) },
              orderPart: { id: item },
            },
          });
        })
      )
    ).flat();

    supplierOrderParts.forEach((supplierPart) => {
      const matchingOrderPart = req.body.orderParts.find(
        (orderPart: any) => orderPart.origCode === supplierPart.origCode // Match by origCode
      );

      if (matchingOrderPart) {
        Object.assign(supplierPart, {
          count: matchingOrderPart.count,
          partName: matchingOrderPart.partName,
          price: matchingOrderPart.price > 0 ? matchingOrderPart.price : 0,
          totalPrice: matchingOrderPart?.totalPrice || 0,
          sipPrice: matchingOrderPart?.sipPrice || 0,
          percent: matchingOrderPart?.percent || 0,
          profit: matchingOrderPart?.profit || 0,
          sellPrice: matchingOrderPart?.sellPrice || 0,
          stockQuantity: matchingOrderPart?.stockQuantity || 0,
          transport: matchingOrderPart?.transport || 0,
          unitSellPrice: matchingOrderPart?.unitSellPrice || 0,
          unitSipPrice: matchingOrderPart?.unitSellPrice || 0,
          delivering: req.body?.delivering || "",
          date: new Date(),
        });
      }
    });

    if (supplierOrderParts.length > 0) {
      await supplierOrderPartRepository.save(supplierOrderParts);
    }
    // console.log(supplierOrderParts);
    res.status(200).json(supplierOrderParts);
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const deleteOrderParts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await orderPartsRepository.delete({ id: Number(id) });

    res.status(200).json({ message: "Ehtiyyat hissəsi silindi!" });
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const rejectOrder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // console.log(id, req.body);

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      next(errorHandler(401, "Belə istifadəçi yoxdur!"));
      return;
    }

    const order = await orderRepository.findOneBy({ id: req.body.orderId });

    if (!order) {
      next(errorHandler(401, "Belə sifariş yoxdur!"));
    }

    order.rejectMessage = req.body.message;
    order.isExcellFile = true;
    order.user = user;

    const orderHistory = await orderHistoryRepository.findOneBy({
      id: Number(id),
    });
    if (!orderHistory) {
      next(errorHandler(401, "Sifariş tarixi mövcud deyil!"));
      return;
    }

    await orderHistoryRepository.delete({ id: Number(id) });

    await orderRepository.save(order);
    res.status(201).json(order);
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const getAllOrderParts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allOrderParts = await orderPartsRepository.find();

    if (allOrderParts.length === 0) {
      next(errorHandler(401, "Ehtiyyat hissələri mövcud deyil!"));
      return;
    }

    res.status(201).json(allOrderParts);
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const checkInStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.body);

  try {
    const newOrderPartsArray = req.body.parts.map(
      (item: { origCode: string; count: number; partName: string }) => ({
        code: item.origCode,
        requiredCount: Number(item.count),
        partName: item.partName,
      })
    );

    // log(newOrderPartsArray);

    const sparePartsList = await sparePartsRepository.find();
    const newSparePartsList = sparePartsList.map((item) => ({
      code: item.code,
      existingCount: item.count,
      partName: item.name,
    }));

    const result = newOrderPartsArray.map(
      (item: { code: string; requiredCount: number; partName: string }) => {
        // log(item);

        const matching = newSparePartsList.find(
          (orderPart: any) => orderPart.code === item.code
        );

        if (matching) {
          return {
            code: item.code,
            count: item.requiredCount,
            stockQuantity: matching?.existingCount,
            name: matching.partName,
            inStock: true,
          };
        } else {
          return {
            code: item.code,
            count: item.requiredCount,
            name: item.partName,
            stockQuantity: 0,
            inStock: false,
          };
        }
      }
    );

    res.status(200).json(result);
  } catch (error) {
    next(errorHandler(401, error)); // Handle error appropriately
  }
};

export const acceptOrder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const order = await orderRepository.findOneBy({ id: req.body.orderId });
    if (!order) {
      next(errorHandler(401, "Belə bir sifariş yoxdur!"));
      return;
    }
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      next(errorHandler(401, "Belə bir istifadəçi yoxdur!"));
      return;
    }
    const orderHistory = await orderHistoryRepository.findOneBy({
      id: Number(id),
    });

    if (!orderHistory) {
      next(errorHandler(401, "Belə bir sifariş tarixi yoxdur!"));
      return;
    }

    orderHistory.confirm = false;
    orderHistory.date = new Date();
    orderHistory.message = req.body.message;
    orderHistory.user = user;
    await orderHistoryRepository.save(orderHistory);

    const newOrderHistory = new OrderHistory();
    newOrderHistory.user = user;
    newOrderHistory.order = order;
    newOrderHistory.date = new Date();
    newOrderHistory.step = OrderStep.ResposibleFromOrder;
    newOrderHistory.confirm = true;

    await orderHistoryRepository.save(newOrderHistory);
    res.status(201).json({ order, newOrderHistory });
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const responsibleOrder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const mainUserId = req.userId;
    const { userId, messageValue, historyId } = req.body;
    // log(userId, messageValue, id);

    const order = await orderRepository.findOneBy({ id: Number(id) });
    if (!order) {
      next(errorHandler(401, "Belə bir sifariş yoxdur!"));
      return;
    }

    const responsibleUser = await userRepository.findOneBy({
      id: Number(userId),
    });
    if (!responsibleUser) {
      next(errorHandler(401, "Belə bir istifadəçi yoxdur!"));
      return;
    }
    const mainUser = await userRepository.findOneBy({ id: Number(mainUserId) });
    if (!mainUser) {
      next(errorHandler(401, "Belə bir istifadəçi yoxdur!"));
      return;
    }

    const orderHistory = await orderHistoryRepository.findOneBy({
      id: Number(historyId),
    });
    if (!orderHistory) {
      next(errorHandler(401, "Belə bir sifariş tarixi yoxdur!"));
      return;
    }

    orderHistory.confirm = false;
    orderHistory.date = new Date();
    orderHistory.user = responsibleUser;
    orderHistory.message = messageValue;
    await orderHistoryRepository.save(orderHistory);

    const newOrderHistory = new OrderHistory();
    newOrderHistory.confirm = true;
    // newOrderHistory.showResult=true;
    newOrderHistory.date = new Date();
    newOrderHistory.user = responsibleUser;
    newOrderHistory.step = OrderStep.ResponsibleUserBegin;
    newOrderHistory.order = order;
    await orderHistoryRepository.save(newOrderHistory);

    res.status(200).json(orderHistory);
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const startResponsibleOrder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { message, historyId } = req.body;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      next(errorHandler(401, "Belə bir istifadəçi yoxdur!"));
      return;
    }

    const order = await orderRepository.findOneBy({ id: Number(id) });

    if (!order) {
      next(errorHandler(401, "Belə bir sifariş yoxdur!"));
      return;
    }

    const orderHistory = await orderHistoryRepository.findOneBy({
      id: historyId,
    });

    if (!orderHistory) {
      next(errorHandler(401, "Belə bir sifariş tarixi yoxdur!"));
      return;
    }

    orderHistory.confirm = false;
    orderHistory.date = new Date();
    orderHistory.message = message;
    orderHistory.showResult=true;
    orderHistory.user = user;

    await orderHistoryRepository.save(orderHistory);

    const newHistory = new OrderHistory();
    newHistory.confirm = true;
    newHistory.showHide = true;
    newHistory.order = order;
    newHistory.user = user;
    newHistory.date = new Date();
    newHistory.step = OrderStep.RequestSupplier;

    await orderHistoryRepository.save(newHistory);
    res.status(201).json(newHistory);
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};



export const sendToSupplier = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { historyId, selectedSuppliers,orderPartArrayId} = req.body;

    console.log(orderPartArrayId,"orderPartArrayId");


    const uniqueArr = [...new Set(selectedSuppliers)];

    // console.log(uniqueArr,"uniqueArr");
    

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return next(errorHandler(404, "İstifadəçi mövcud deyil!"));

    const order = await orderRepository.findOne({
      where: { id: Number(id) },
      relations: ["orderParts"],
    });
    if (!order) return next(errorHandler(404, "Sifariş mövcud deyil!"));

    const orderHistory = await orderHistoryRepository.findOneBy({
      id: historyId,
    });
    if (!orderHistory)
      return next(errorHandler(404, "Belə bir sifariş tarixçəsi yoxdur!"));
    orderHistory.confirm = false;
    orderHistory.showResult=true;
    orderHistory.date = new Date();
    orderHistory.user = user;
    orderHistory.order = order;
    await orderHistoryRepository.save(orderHistory);

        const newOrderHistory = new OrderHistory(); 
        newOrderHistory.confirm=true;
        newOrderHistory.date=new Date();
        newOrderHistory.step=OrderStep.ResponseFromSupplier;
        newOrderHistory.order=order;
        newOrderHistory.user=user;
        newOrderHistory.showHide = true;
        await orderHistoryRepository.save(newOrderHistory);


    const existingSupplierOrders = await suppliersOrderHistoryReposiroty.find({
      where: { orderHistory },
      relations: ["supplier"],
    });

    const existingSupplierIds = new Set(
      existingSupplierOrders.map((item) => item.supplier.id)
    );
    const newSupplierIds = uniqueArr.filter(
      (id: any) => !existingSupplierIds.has(Number(id))
    );
    console.log(newSupplierIds,"newSupplierIds");


    const combinations = [];
for (const supplierId of uniqueArr) {
  for (const partId of orderPartArrayId) {
    combinations.push({
      supplier: { id: Number(supplierId) },
      orderPart: { id: Number(partId) },
    });
  }
}

// Step 2: Fetch all existing supplierOrderPart records for those combinations
const existingRecords = await supplierOrderPartRepository.find({
  where: combinations,
  relations: ["supplier", "orderPart"],
});

// Step 3: Build a Set of existing combinations
const existingSet = new Set(
  existingRecords.map(record => `${record.supplier.id}-${record.orderPart.id}`)
);

// Step 4: Loop through each supplier and process only if not all combinations exist
for (const supplierId of uniqueArr) {
  const supplier = await supplierRepository.findOneBy({ id: Number(supplierId) });
  if (!supplier) continue;

  // Filter only the order parts that do NOT exist yet for this supplier
  const missingParts = order.orderParts.filter(part => {
    const key = `${supplierId}-${part.id}`;
    return !existingSet.has(key);
  });

  if (missingParts.length === 0) {
    console.log(`Supplier ${supplierId} already has all parts. Skipping.`);
    continue; // skip this supplier
  }

  // Step 5: Create SupplierOrderHistory once per supplier
  const newSupplierOrderHistory = new SupplierOrderHistory();
  newSupplierOrderHistory.supplier = supplier;
  newSupplierOrderHistory.date = new Date();
  newSupplierOrderHistory.orderHistory = orderHistory;
  await suppliersOrderHistoryReposiroty.save(newSupplierOrderHistory);

  // Step 6: Create missing SupplierOrderParts
  const newSupplierOrderParts = missingParts.map(part => {
    const newPart = new SupplierOrderParts();
    newPart.origCode = part.origCode;
    newPart.count = part.count;
    newPart.partName = part.partName;
    newPart.orderPart = part;
    newPart.supplier = supplier;
    newPart.date = new Date();
    return newPart;
  });

  await supplierOrderPartRepository.save(newSupplierOrderParts);
}


    const updatedData = await suppliersOrderHistoryReposiroty.find({
      where: { orderHistory: { id: historyId } },
      relations: ["supplier"],
    });

    res.status(201).json({ data: updatedData });
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};


export const calculationStepPass = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { historyId } = req.body;
    // console.log(req.params);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      next(errorHandler(401, "Belə bir istifadəçi yoxdur!"));
      return;
    }

    const order = await orderRepository.findOneBy({ id: Number(id) });
    if (!order) {
      next(errorHandler(401, "Belə bir sifariş yoxdur!"));
      return;
    }

    const orderHistory = await orderHistoryRepository.findOneBy({
      id: historyId,
    });
    if (!orderHistory) {
      next(errorHandler(401, "Belə bir sifariş tarixi yoxdur!"));
      return;
    }

    orderHistory.confirm = false;
    orderHistory.showHide = false;
    orderHistory.date = new Date();
    orderHistory.order = order;
    orderHistory.user = user;
    await orderHistoryRepository.save(orderHistory);

    const newOrderHistory = new OrderHistory();
    newOrderHistory.step = OrderStep.CalculationBegin;
    newOrderHistory.date = new Date();
    newOrderHistory.showHide = false;
    newOrderHistory.order = order;
    newOrderHistory.user = user;
    await orderHistoryRepository.save(newOrderHistory);

    res.status(201).json({ message: "all good" });
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const getSupplierOrderParts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, orderId } = req.params;
     console.log(id,orderId);

    const order = await orderRepository.findOne({
      where: { id: Number(orderId) },
      relations: ["orderParts"], // Fetch related orderParts directly
    });

    if (!order) {
      return next(errorHandler(404, "Sifariş tapılmadı"));
    }
    // console.log(order,"order");

    const orderParts = order.orderParts;

    const supplier = await supplierRepository.findOneBy({ id: Number(id) });
    if (!supplier) {
      return next(errorHandler(404, "Təchizatçı tapılmadı"));
    }

    if (orderParts.length === 0) {
      return next(errorHandler(404, "Sifariş hissələri tapılmadı"));
    }

    const supplierOrderParts = (
      await Promise.all(
        orderParts.map(async (item) => {
          return supplierOrderPartRepository.findOneBy({
           
              orderPart: { id: item.id }, // Fix: Corrected query structure
              supplier: { id: supplier.id }, // Fix: Use supplier.id
            
          });
        })
      )
    ); // Fix: Flatten the array

    // console.log(supplierOrderParts);

    if (supplierOrderParts.length === 0) {
      next(
        errorHandler(401, "Təchizatçıya aid sifariş hissələri mövcud deyil!")
      );
      return;
    }
    res.status(200).json(supplierOrderParts);
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const acceptCalculation = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { orderId } = req.body;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      next(errorHandler(401, "Belə bir istifadəçi yoxdur!"));
      return;
    }
    const order = await orderRepository.findOneBy({ id: Number(orderId) });
    if (!order) {
      next(errorHandler(401, "Belə bir sifariş yoxdur!"));
      return;
    }
    order.isFinishCalculation = true;
    await orderRepository.save(order);

    const orderHistory = await orderHistoryRepository.findOneBy({
      id: Number(id),
    });
    if (!orderHistory) {
      next(errorHandler(401, "Belə bir sifariş tarixi yoxdur!"));
      return;
    }

    orderHistory.showHide = true;
    await orderHistoryRepository.save(orderHistory);

    const newOrderHistory = new OrderHistory();
    newOrderHistory.step = OrderStep.CalculationAccept;
    newOrderHistory.date = new Date();
    newOrderHistory.showHide = false;
    newOrderHistory.order = order;
    newOrderHistory.user = user;
    await orderHistoryRepository.save(newOrderHistory);

    res.status(201).json({ message: "Uğurla tamamlandı!" });
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const confirmCalculationPassNextStep = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { orderId } = req.body;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      next(errorHandler(401, "Belə bir istifadəçi yoxdur!"));
      return;
    }

    const order = await orderRepository.findOneBy({ id: Number(orderId) });
    if (!order) {
      next(errorHandler(401, "Belə bir sifariş yoxdur!"));
      return;
    }

    const orderHistory = await orderHistoryRepository.findOneBy({
      id: Number(id),
    });
    if (!orderHistory) {
      next(errorHandler(401, "Belə bir sifariş tarixi yoxdur!"));
      return;
    }

    orderHistory.date = new Date();
    orderHistory.showHide = true;
    orderHistory.user = user;
    orderHistory.order = order;

    await orderHistoryRepository.save(orderHistory);

    const newOrderHistory = new OrderHistory();
    newOrderHistory.step = OrderStep.ChoosingBestSupplier;
    newOrderHistory.date = new Date();
    newOrderHistory.showHide = false;
    newOrderHistory.order = order;
    newOrderHistory.user = user;
    await orderHistoryRepository.save(newOrderHistory);

    res.status(201).json({ message: "Məlumat yeniləndi!" });
  } catch (error) {
    next(errorHandler(401, error));
  }
};
