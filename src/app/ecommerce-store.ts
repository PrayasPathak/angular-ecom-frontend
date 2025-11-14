import { computed, inject } from '@angular/core';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { CartItem } from './models/cart.model';
import { Product } from './models/product.model';
import { Toaster } from './services/toaster';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user.model';
import { Router } from '@angular/router';
import { Order } from './models/order.model';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
};

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState({
    products: [
      {
        id: 'p1',
        name: 'Wireless Noise-Canceling Headphones',
        description:
          'High-fidelity over-ear headphones with active noise cancellation and 30-hour battery life.',
        price: 199.99,
        imageUrl:
          'https://images.unsplash.com/photo-1641048930621-ab5d225ae5b0?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.7,
        reviewCount: 1342,
        inStock: true,
        category: 'electronics',
      },
      {
        id: 'p2',
        name: 'Smart Fitness Watch Pro',
        description: 'Track your heart rate, sleep, workouts, and receive smart notifications.',
        price: 149.99,
        imageUrl:
          'https://images.unsplash.com/photo-1532435109783-fdb8a2be0baa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zml0bmVzcyUyMHdhdGNofGVufDB8fDB8fHww',
        rating: 4.4,
        reviewCount: 879,
        inStock: true,
        category: 'electronics',
      },
      {
        id: 'p3',
        name: '4K Ultra HD Action Camera',
        description: 'Waterproof action cam with 4K/60fps recording and image stabilization.',
        price: 129.5,
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1661481839640-1da91006f710?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHVsdHJhJTIwNGslMjBhY3Rpb24lMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D',
        rating: 4.1,
        reviewCount: 442,
        inStock: false,
        category: 'electronics',
      },
      {
        id: 'p4',
        name: "Men's Performance Running Shoes",
        description:
          'Lightweight shoes with breathable mesh and cushioned soles for long-distance running.',
        price: 89.99,
        imageUrl:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww',
        rating: 4.6,
        reviewCount: 623,
        inStock: true,
        category: 'fitness',
      },
      {
        id: 'p5',
        name: 'Adjustable Dumbbell Set',
        description: '32-lb adjustable dumbbells with quick weight-switch system.',
        price: 59.99,
        imageUrl:
          'https://media.istockphoto.com/id/1391410249/photo/sports-and-gym-activities.webp?a=1&b=1&s=612x612&w=0&k=20&c=4Ps27x-1Q5VCRgQG5VTv8c8H_Nts141AU3b2iHeEIcw=',
        rating: 4.5,
        reviewCount: 312,
        inStock: true,
        category: 'fitness',
      },
      {
        id: 'p6',
        name: 'Yoga Mat ProGrip',
        description: 'Non-slip yoga mat with 6mm cushioning for comfort during all types of yoga.',
        price: 24.99,
        imageUrl:
          'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D',
        rating: 4.2,
        reviewCount: 201,
        inStock: false,
        category: 'fitness',
      },
      {
        id: 'p7',
        name: 'Men’s Classic Cotton T-Shirt',
        description: 'Soft cotton t-shirt with a regular fit for everyday comfort.',
        price: 14.99,
        imageUrl:
          'https://images.unsplash.com/photo-1759572095384-1a7e646d0d4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y290dG9uJTIwdHNoaXJ0fGVufDB8fDB8fHww',
        rating: 4.3,
        reviewCount: 154,
        inStock: true,
        category: 'clothes',
      },
      {
        id: 'p8',
        name: "Women's Oversized Hoodie",
        description: 'Warm fleece hoodie with oversized fit and spacious front pocket.',
        price: 39.99,
        imageUrl:
          'https://images.unsplash.com/photo-1674695670808-0480f62cc7d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBvdmVyc2l6ZWQlMjBob29kaWV8ZW58MHx8MHx8fDA%3D',
        rating: 4.8,
        reviewCount: 948,
        inStock: true,
        category: 'clothes',
      },
      {
        id: 'p9',
        name: 'Sports Compression Leggings',
        description: 'Breathable compression leggings designed for high-performance workouts.',
        price: 29.99,
        imageUrl:
          'https://images.unsplash.com/photo-1734524670505-d5a78734572e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BvcnRzJTIwY29tcHJlc3Npb24lMjBsZWdnaW5nc3xlbnwwfHwwfHx8MA%3D%3D',
        rating: 4.5,
        reviewCount: 502,
        inStock: true,
        category: 'clothes',
      },
      {
        id: 'p10',
        name: 'Bluetooth Portable Speaker',
        description: 'Compact speaker with deep bass, 12-hour battery life, and waterproof design.',
        price: 45.0,
        imageUrl:
          'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydGFibGUlMjBzcGVha2VyfGVufDB8fDB8fHww',
        rating: 4.4,
        reviewCount: 780,
        inStock: false,
        category: 'electronics',
      },
      {
        id: 'p11',
        name: 'Leather Wristwatch',
        description: 'A classic leather wristwatch with a minimalist dial and durable strap.',
        price: 89.99,
        imageUrl:
          'https://images.unsplash.com/photo-1663426752652-b696d57f78ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxlYXRoZXIlMjB3cmlzdCUyMHdhdGNofGVufDB8fDB8fHww',
        rating: 4.5,
        reviewCount: 134,
        inStock: true,
        category: 'accessories',
      },
      {
        id: 'p12',
        name: 'Silk Scarf',
        description: 'Lightweight and stylish silk scarf perfect for any season.',
        price: 29.99,
        imageUrl:
          'https://images.unsplash.com/photo-1670490340295-95b418fe59a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbGslMjBzY2FyZnxlbnwwfHwwfHx8MA%3D%3D',
        rating: 4.2,
        reviewCount: 58,
        inStock: true,
        category: 'accessories',
      },
      {
        id: 'p13',
        name: 'Aromatic Soy Candle',
        description: 'Hand-poured soy candle with a calming lavender scent.',
        price: 14.99,
        imageUrl:
          'https://images.unsplash.com/photo-1651795426376-0e6adfd01f00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJvbWF0aWMlMjBzb3klMjBjYW5kbGV8ZW58MHx8MHx8fDA%3D',
        rating: 4.8,
        reviewCount: 210,
        inStock: true,
        category: 'home',
      },
      {
        id: 'p14',
        name: 'Decorative Throw Pillow',
        description: 'Soft, textured pillow that adds charm to any living space.',
        price: 24.99,
        imageUrl:
          'https://images.unsplash.com/photo-1761206887095-e57f9ae4a06f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVjb3JhdGl2ZSUyMHRocm93JTIwcGlsbG93fGVufDB8fDB8fHww',
        rating: 4.4,
        reviewCount: 92,
        inStock: false,
        category: 'home',
      },
      {
        id: 'p15',
        name: 'Bamboo Wall Clock',
        description: 'Eco-friendly wall clock crafted from natural bamboo.',
        price: 39.99,
        imageUrl:
          'https://images.unsplash.com/photo-1558603655-491ecfa8324f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2FsbCUyMGNsb2NrfGVufDB8fDB8fHww',
        rating: 4.7,
        reviewCount: 76,
        inStock: true,
        category: 'home',
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
  } as EcommerceState),
  withComputed(({ category, products, wishlistItems, cartItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),

    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),
  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),
      addToWishlist: (product: Product) => {
        const updateWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) draft.push(product);
        });

        patchState(store, { wishlistItems: updateWishlistItems });
        toaster.success('Product added to wishlist');
      },

      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist');
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
      },

      addToCart: (product: Product, quantity = 1) => {
        const existingItemIndex = store.cartItems().findIndex((p) => p.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
          } else {
            draft.push({ product, quantity });
          }
        });

        patchState(store, { cartItems: updatedCartItems });

        toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to cart');
      },

      setItemQuantity: (params: { productId: string; quantity: number }) => {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });

        patchState(store, { cartItems: updated });
      },

      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
      },

      moveToWishlist: (product: Product) => {
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
      },

      removeFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
        });
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
      },

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Please login before continuing');
          patchState(store, { loading: false });
          return;
        }
        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['/order-success']);
      },
    })
  )
);
