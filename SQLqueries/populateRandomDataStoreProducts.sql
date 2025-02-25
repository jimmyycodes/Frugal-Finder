INSERT INTO StoreProducts (pid, sid, price, searchQuery, imagePath)
VALUES
  -- Safeway (sid = 1)
  (1, 1, 3.49, 'milk', '/images/safeway/milk.png'),
  (2, 1, 2.99, 'eggs', '/images/safeway/eggs.png'),
  (3, 1, 2.49, 'bread', '/images/safeway/bread.png'),
  (6, 1, 5.99, 'chicken breast', '/images/safeway/chicken.png'),
  (7, 1, 4.49, 'organic apples', '/images/safeway/apples.png'),
  (10, 1, 1.99, 'tomatoes', '/images/safeway/tomatoes.png'),

  -- Trader Joe's (sid = 2)
  (1, 2, 3.19, 'milk', '/images/traderjoes/milk.png'),
  (2, 2, 2.79, 'eggs', '/images/traderjoes/eggs.png'),
  (3, 2, 2.29, 'bread', '/images/traderjoes/bread.png'),
  (5, 2, 3.99, 'cheddar cheese', '/images/traderjoes/cheddar.png'),
  (7, 2, 4.99, 'organic apples', '/images/traderjoes/apples.png'),
  (12, 2, 3.79, 'cereal', '/images/traderjoes/cereal.png'),

  -- Walmart (sid = 3)
  (1, 3, 2.99, 'milk', '/images/walmart/milk.png'),
  (2, 3, 2.49, 'eggs', '/images/walmart/eggs.png'),
  (3, 3, 1.99, 'bread', '/images/walmart/bread.png'),
  (4, 3, 3.49, 'butter', '/images/walmart/butter.png'),
  (6, 3, 4.99, 'chicken breast', '/images/walmart/chicken.png'),
  (13, 3, 1.29, 'pasta', '/images/walmart/pasta.png'),
  (14, 3, 1.09, 'rice', '/images/walmart/rice.png'),
  (15, 3, 0.99, 'beans', '/images/walmart/beans.png');
