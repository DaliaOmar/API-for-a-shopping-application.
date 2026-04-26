import { OrderStore } from '../models/order';
import { UserStore } from '../models/user';
import { ProductStore } from '../models/product';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

let userId: number;
let productId: number;
let orderId: number;

describe('Order Model', () => {

  beforeAll(async () => {
    const user = await userStore.create({
      firstname: "Test",
      lastname: "User",
      email: `test${Date.now()}@test.com`,
      password: "1234"
    });

    userId = user.id!;

    const product = await productStore.create({
      name: "Test Product",
      price: 100,
      category: "Test"
    });

    productId = product.id!;
  });

  it('should create an order', async () => {
    const order = await orderStore.create(userId);
    orderId = order.id!;
    expect(order.user_id).toEqual(userId);
  });

  it('should add product to order', async () => {
    const result = await orderStore.addProduct(orderId, productId, 2);
    expect(result.quantity).toEqual(2);
  });

  it('should get current order by user', async () => {

    await orderStore.create(userId);
  
    const result = await orderStore.currentOrderByUser(userId);
  
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].user_id).toEqual(userId);
  });
  it('should get completed orders by user', async () => {
    const result = await orderStore.completedOrdersByUser(1);
    expect(Array.isArray(result)).toBeTrue();
  });

});