import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer_exits = await this.customersRepository.findById(customer_id);

    if (!customer_exits) {
      throw new AppError('Error, this customer does not exists');
    }

    // const existent_products = await this.productsRepository.findAllById(
    //   products,
    // );

    // if (!existent_products.length) {
    //   throw new AppError('could not find any products with this ids');
    // }

    // const products_ids = existent_products.map(product => product.id);

    // const product_exists_in_array = products.filter(
    //   product => !products_ids.includes(product.id),
    // );

    // if (product_exists_in_array.length) {
    //   throw new AppError(
    //     `could not find product ${product_exists_in_array[0].id}`,
    //   );
    // }

    // console.log('products_without_quantity =>>>>', product_exists_in_array);

    // const products_without_quantity = products.filter(
    //   product =>
    //     product_exists_in_array.filter(p => p.id === product.id)[0].quantity <=
    //     product.quantity,
    // );

    // if (products_without_quantity.length) {
    //   throw new AppError(
    //     `the quantity ${products_without_quantity[0].quantity} is not available for ${products_without_quantity[0].id}`,
    //   );
    // }

    // const serialized_products = products.map(product => ({
    //   product_id: product.id,
    //   quantity: product.quantity,
    //   price: existent_products.filter(p => p.id === product.id)[0].price,
    // }));

    // const order = await this.ordersRepository.create({
    //   customer: customer_exits,
    //   products: serialized_products,
    // });

    // const { order_products } = order;

    // const ordered_products_quantity = order_products.map(product => ({
    //   id: product.product_id,
    //   quantity:
    //     existent_products.filter(p => p.id === product.product_id)[0].quantity -
    //     product.quantity,
    // }));

    // await this.productsRepository.updateQuantity(ordered_products_quantity);

    // return order;
  }
}

export default CreateOrderService;
