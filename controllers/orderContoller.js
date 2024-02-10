import MenuItems from "../models/MenuItems.js";
import OrderDetails from "../models/OrderDetails.js";


export const createOrder = async (req, res) => {
    try {
        const { userId } = req.user;
        const { items, address } = req.body;

        if (items?.length == 0) {
            return res.json({
                data: {},
                message: "please select at least one item",
                status: 400
            })
        }

        if (!address) {
            return res.json({
                data: {},
                message: "please fill the address",
                status: 400
            })
        }

        const menuItems = await MenuItems.find({ _id: { $in: items?.map(item => item?.menuItemId) } });

        let totalAmount = 0;
        items?.forEach(orderItem => {
            const menuItem = menuItems?.find(item => item?._id.toString() === orderItem?.menuItemId?.toString());
            if (menuItem) {
                totalAmount += menuItem.price * orderItem?.quantity;
            }
        });

        const order = new OrderDetails({
            userId,
            items,
            totalAmount,
            address
        });
        await order.save();

        res.status(201).json({
            data: order,
            message: 'Order created successfully',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        });
    }
}

export const getOrderList = async (req, res) => {
    try {
        let orders;
        if (req.user.role === 'admin') {
            orders = await OrderDetails.find();
        } else {
            orders = await OrderDetails.find({ userId: req.user.userId });
        }
        res.status(201).json({
            data: orders,
            message: 'orders list',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        });
    }
}

export const getSingleOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await OrderDetails.findById(id);

        if (!order) {
            return res.json({
                data: {},
                message: 'Order not found',
                status: 404
            });
        }

        return res.json({
            data: order,
            message: 'get current Order',
            status: 200
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, isOrderConfirmed } = req.body;

        const updateFields = {};
        if (status) updateFields.status = status;
        if (isOrderConfirmed !== undefined) updateFields.isOrderConfirmed = isOrderConfirmed;

        const order = await OrderDetails.findByIdAndUpdate(id, updateFields, { new: true });
        if (!order) {
            return res.json({
                data: {},
                message: 'Order not found',
                status: 404
            });
        }
        return res.json({
            data: order,
            message: 'Order updated successfully',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        });
    }
}

export const deleteOrder = async (req, res) => {
    router.delete('/orders/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const order = await OrderDetails.findByIdAndDelete(id);
            if (!order) {
                return res.json({
                    data: {},
                    message: 'Order not found',
                    status: 404
                });
            }
            return res.json({
                data: order,
                message: 'Order deleted successfully',
                status: 200
            });
        } catch (error) {
            console.error(error);
            res.json({
                data: {},
                message: 'Internal server error',
                status: 500
            });
        }
    });
}