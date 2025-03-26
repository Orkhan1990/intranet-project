import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { Order } from "../entites/Order";
import { OrderPart } from "../entites/OrderPart";
import { Client } from "../entites/Client";
import { OrderInterface, SupplierOrderPartInterface } from "../types/projectTypes";
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
const supplierOrderPartRepository=AppDataSource.getRepository(SupplierOrderParts);

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
        orderParts.length > 1 ? "Sifarişlər əlavə olundu" : "Sifariş əlavə olundu!"
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
        });
      }
    });
    
    if (supplierOrderParts.length > 0) {
      await supplierOrderPartRepository.save(supplierOrderParts);
    }
    console.log(supplierOrderParts);
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

    log(newOrderPartsArray);

    const sparePartsList = await sparePartsRepository.find();
    const newSparePartsList = sparePartsList.map((item) => ({
      code: item.code,
      existingCount: item.count,
      partName: item.name,
    }));

    const result = newOrderPartsArray.map(
      (item: { code: string; requiredCount: number; partName: string }) => {
        log(item);

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
    log(userId, messageValue, id);

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
    orderHistory.user = user;

    await orderHistoryRepository.save(orderHistory);

    const newHistory = new OrderHistory();
    newHistory.confirm = false;
    newHistory.showHide=true;
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
    // console.log(id);

    const userId = req.userId;
    const { historyId, message, selectedSuppliers } = req.body;

    const orderHistory = await orderHistoryRepository.findOneBy({
      id: historyId,
    });
    // console.log(orderHistory);

    if (!orderHistory) {
      next(errorHandler(401, "Belə bir sifariş tarixi yoxdur!"));
      return;
    }

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      next(errorHandler(401, "Belə bir istifadəçi yoxdur!"));
      return;
    }
    // console.log(user);
    const order = await orderRepository.findOne({
      where: { id: Number(id) },
      relations: ["orderParts"],
    });
    // console.log(order,"salam");

    if (!order) {
      next(errorHandler(401, "Belə bir sifariş yoxdur!"));
      return;
    }

    orderHistory.confirm = true;
    orderHistory.date = new Date();
    orderHistory.user = user;
    orderHistory.order = order;
    await orderHistoryRepository.save(orderHistory);

   

    const suppliers = await supplierRepository.findBy({
      id: In(selectedSuppliers.map(Number)) // Use 'In' to query multiple ids at once
    });


    await Promise.all(
      suppliers.map(async (supplier: any) => {


          for (const item of order.orderParts) {
            const newSupplierOrderPart = new SupplierOrderParts();
            newSupplierOrderPart.origCode = item.origCode;
            newSupplierOrderPart.count = item.count;
            newSupplierOrderPart.partName = item.partName;
            newSupplierOrderPart.orderPart = item;
            newSupplierOrderPart.supplier = supplier;
            await supplierOrderPartRepository.save(newSupplierOrderPart);
            
          }


        const newSupplierHistory = new SupplierOrderHistory();
        newSupplierHistory.orderHistory = orderHistory;
        newSupplierHistory.supplier = supplier;
        newSupplierHistory.date = new Date();

        await suppliersOrderHistoryReposiroty.save(newSupplierHistory);
      })
    );
      
     const data=await suppliersOrderHistoryReposiroty.find({
      where:{orderHistory:{id:historyId}},
      relations:["supplier"]
     })
    //  console.log(data);
     
    res.status(201).json({data});
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};


export const calculationStepPass=async(req:CustomRequest,res:Response,next:NextFunction)=>{
  try {
    

    const userId=req.userId;
    const{id}=req.params
    const {historyId}=req.body;
    // console.log(req.params);
    


    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      next(errorHandler(401, "Belə bir istifadəçi yoxdur!"));
      return;
    }
    
    const order=await orderRepository.findOneBy({id:Number(id)})
    if (!order) {
      next(errorHandler(401, "Belə bir sifariş yoxdur!"));
      return;
    }

    const orderHistory=await orderHistoryRepository.findOneBy({id:historyId});
    if (!orderHistory) {
      next(errorHandler(401, "Belə bir sifariş tarixi yoxdur!"));
      return;
    }


    orderHistory.confirm=false;
    orderHistory.showHide=false;
    orderHistory.date=new Date();
    orderHistory.order=order;
    orderHistory.user=user;
    await orderHistoryRepository.save(orderHistory);


    const newOrderHistory=new OrderHistory();
    newOrderHistory.step=OrderStep.CalculationBegin;
    newOrderHistory.date=new Date();
    newOrderHistory.showHide=true;
    newOrderHistory.order=order;
    newOrderHistory.user=user;
    await orderHistoryRepository.save(newOrderHistory);


    res.status(201).json({message:"all good"});

    
  } catch (error) {
    next(errorHandler(401, error.message));
  }
}



export const getSupplierOrderParts=async(req:Request,res:Response,next:NextFunction)=>{
  try {

     const {id,orderId}=req.params;
    //  console.log(id,orderId);

     const order = await orderRepository.findOne({
      where: { id: Number(orderId) },
      relations: ["orderParts"], // Fetch related orderParts directly
    });
    
    if (!order) {
      return next(errorHandler(404, "Sifariş tapılmadı"));
    }
      // console.log(order,"order");

      const orderParts = order.orderParts;
      
     const supplier=await supplierRepository.findOneBy({id:Number(id)});
     if (!supplier) {
    return next(errorHandler(404,"Təchizatçı tapılmadı")); 
     }

    //  console.log(supplier,"supplier");
     

   

    // console.log(orderParts);
    

     if (orderParts.length===0) {
      return next(errorHandler(404,"Sifariş hissələri tapılmadı"));
     }
    
     const supplierOrderParts = (
      await Promise.all(
        orderParts.map(async (item) => {
          return supplierOrderPartRepository.find({
            where: {
              orderPart: { id: item.id }, // Fix: Corrected query structure
              supplier: { id: supplier.id }, // Fix: Use supplier.id
            },
          });
        })
      )
    ).flat(); // Fix: Flatten the array

      // console.log(supplierOrderParts);
      
      if (supplierOrderParts.length===0) {
        next(errorHandler(401, "Təchizatçıya aid sifariş hissələri mövcud deyil!"));
        return;
      }
     res.status(200).json(supplierOrderParts);
    
  } catch (error) {
    next(errorHandler(401, error.message));
  }
}