import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class OrderProductsTable1594854412550
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //  , order_id, price e quantity, created_at e updated_at.

    await queryRunner.createTable(
      new Table({
        name: 'orders_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 1,
            scale: 1,
          },
          {
            name: 'quantity',
            type: 'decimal',
            precision: 1,
            scale: 1,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('orders_products');
  }
}
