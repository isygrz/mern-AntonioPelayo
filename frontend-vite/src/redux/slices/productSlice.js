import { createSlice } from '@reduxjs/toolkit';

// Static seed data (replace with API later)
const initialState = {
  products: [
    {
      id: '1',
      name: 'Talavera Blue Tile',
      image: '/images/p1.jpeg',
      description: 'Hand-painted traditional Mexican ceramic tile.',
      price: 6.5,
    },
    {
      id: '2',
      name: 'Rustico Terracotta',
      image: '/images/p2.jpeg',
      description: 'Earth-toned rustic tile for floors and patios.',
      price: 5.0,
    },
    {
      id: '3',
      name: 'Verde Colonial',
      image: '/images/p3.jpeg',
      description: 'Deep green glazed colonial-style tile.',
      price: 7.2,
    },
    {
      id: '4',
      name: 'Negro Matte Tile',
      image: '/images/p4.jpeg',
      description: 'Matte black tile for bold contrast and depth.',
      price: 6.75,
    },
    {
      id: '5',
      name: 'Flor de Mayo',
      image: '/images/p5.jpeg',
      description: 'Bright floral pattern with modern appeal.',
      price: 8.0,
    },
  ],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export default productSlice.reducer;
