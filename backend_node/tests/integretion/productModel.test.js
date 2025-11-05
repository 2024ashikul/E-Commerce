const { Product } = require('../../models');
const request = require('supertest');
const { app, sequelize } = require('../../app.test');


describe('🧪 Sequelize Integration: Product Model', () => {
  // Run once before all tests
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // recreate all tables
  });

  // Run after all tests
  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new product', async () => {
    const product = await Product.create({
      name: 'iPhone 16',
      price: 1200,
      releasedate : 'as',
      stock : 20,
      category : 'phone',
      availability : 'true',
    brand : 'apple',
      description: 'Latest iPhone model',
    });

    expect(product.id).toBeDefined();
    expect(product.name).toBe('iPhone 16');
  });

  it('should fetch a product by name', async () => {
    const found = await Product.findOne({ where: { name: 'iPhone 16' } });
    expect(found).not.toBeNull();
    expect(found.price).toBe(1200);
  });

  it('should update a product', async () => {
    const product = await Product.findOne({ where: { name: 'iPhone 16' } });
    await product.update({ price: 1300 });

    const updated = await Product.findOne({ where: { name: 'iPhone 16' } });
    expect(updated.price).toBe(1300);
  });

  it('should delete a product', async () => {
    const product = await Product.findOne({ where: { name: 'iPhone 16' } });
    await product.destroy();

    const deleted = await Product.findOne({ where: { name: 'iPhone 16' } });
    expect(deleted).toBeNull();
  });
});
