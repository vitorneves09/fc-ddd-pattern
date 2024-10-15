import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/orderItem";
import OrderRepositoryInterface from "../../domain/repository/customer-repository-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            }, { where: { id: entity.id } }
        );
    }

    async find(id: string): Promise<Order> {
        let orderModel;

        try {
            orderModel = await OrderModel.findOne({
                where: { id },
                include: [{ model: OrderItemModel, as: 'items' }],
            });
        } catch {
            throw new Error("Order not found");
        }

        const order = new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map((item) => {
                return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                );
            })
        );

        return order;
    }


    async findAll(): Promise<Order[]> {
        let orderModel;

        try {
            orderModel = await OrderModel.findAll({
                include: [{ model: OrderItemModel, as: 'items' }],
            });
        } catch {
            throw new Error("Order not found");
        }

        const orders = orderModel.map((order) => {
            return new Order(
                order.id,
                order.customer_id,
                order.items.map((item) => {
                    return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
                }),
            );
        });

        return orders;
    }
}