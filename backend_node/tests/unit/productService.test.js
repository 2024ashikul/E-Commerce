
const request = require('supertest');
const {app} = require('../../app.test.js'); // Make sure app.js exports the Express instance


// ✅ MOCK THE CONTROLLER
jest.mock('../../controllers/productController', () => ({
  product: jest.fn((req, res) =>
    res.status(200).json({ id: req.params.id, name: 'Mock Product', price: 100,brand :'samsung',description:'s',stock : 10,category :'ah',availability :'true' ,releasedate : 'sl'})
  ),
  categories: jest.fn((req, res) =>
    res.status(200).json(['Electronics', 'Books', 'Clothing'])
  ),
  category: jest.fn((req, res) =>
    res.status(200).json({ category: req.params.category, items: ['Item1', 'Item2'] })
  ),
  submitratings: jest.fn((req, res) =>
    res.status(200).json({ success: true, message: 'Rating submitted' })
  ),
  submitcomments: jest.fn((req, res) =>
    res.status(200).json({ success: true, message: 'Comment submitted' })
  ),
  comment: jest.fn((req, res) =>
    res.status(200).json({ comments: ['Nice!', 'Good product'] })
  ),
  getratings: jest.fn((req, res) =>
    res.status(200).json([{ productId: '123', rating: 5 }])
  ),
}));

// ✅ MOCK AUTH MIDDLEWARE
jest.mock('../../middleware/auth', () => (req, res, next) => {
  req.user = { id: 'user123', name: 'Test User' }; // simulate authenticated user
  next();
});

describe('🧪 Product Routes', () => {
  // Example GET /product/:id
  it('GET /api/v1/product/:id → should return a product', async () => {
    const res = await request(app).get('/api/v1/product/123');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Mock Product');
    expect(res.body).toHaveProperty('id', '123');
  });

  // Example GET /categoryall
  it('GET /api/v1/categoryall → should return all categories', async () => {
    const res = await request(app).get('/api/v1/categoryall');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContain('Electronics');
  });

  // Example GET /c/:category
  it('GET /api/v1/c/:category → should return products for a category', async () => {
    const res = await request(app).get('/api/v1/c/Electronics');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('category', 'Electronics');
  });

  // Example POST /submitrating (requires auth)
  it('POST /api/v1/submitrating → should allow submitting rating when authenticated', async () => {
    const res = await request(app)
      .post('/api/v1/submitrating')
      .send({ productId: '123', rating: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });

  // Example POST /submitcomment (requires auth)
  it('POST /api/v1/submitcomment → should allow submitting comment when authenticated', async () => {
    const res = await request(app)
      .post('/api/v1/submitcomment')
      .send({ productId: '123', comment: 'Nice product!' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Comment submitted');
  });

  // Example POST /comment
  it('POST /api/v1/comment → should return all comments', async () => {
    const res = await request(app)
      .post('/api/v1/comment')
      .send({ productId: '123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('comments');
    expect(Array.isArray(res.body.comments)).toBe(true);
  });

  // Example POST /getratings
  it('POST /api/v1/getratings → should return ratings list', async () => {
    const res = await request(app)
      .post('/api/v1/getratings')
      .send({ productId: '123' });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('rating');
  });
});
