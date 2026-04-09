// ─── MOCK DATA (used when API is unavailable) ──────────────────────────────────
export const MOCK = {
  restaurants: [
    { restaurantId: 1, name: "Spice Garden", location: "Anna Nagar, Chennai", cuisineType: "Indian", rating: 4.5 },
    { restaurantId: 2, name: "Burger Barn", location: "T. Nagar, Chennai", cuisineType: "American", rating: 4.2 },
    { restaurantId: 3, name: "Dragon Palace", location: "Adyar, Chennai", cuisineType: "Chinese", rating: 4.7 },
    { restaurantId: 4, name: "Pizza Co.", location: "Velachery, Chennai", cuisineType: "Italian", rating: 4.3 },
    { restaurantId: 5, name: "Sushi Wave", location: "Nungambakkam, Chennai", cuisineType: "Japanese", rating: 4.8 },
    { restaurantId: 6, name: "Taco Town", location: "Mylapore, Chennai", cuisineType: "Mexican", rating: 4.0 },
  ],
  users: [
    { userId: 1, username: "Arjun Kumar", email: "arjun@email.com", phoneNumber: "9876543210", address: "42 Anna Nagar, Chennai" },
    { userId: 2, username: "Priya Menon", email: "priya@email.com", phoneNumber: "9123456789", address: "15 T. Nagar, Chennai" },
  ],
  orders: [
    { orderId: 101, userId: 1, restaurantId: 1, totalAmount: 480, orderStatus: "DELIVERED", orderDate: "2026-04-07T14:30:00.000+00:00" },
    { orderId: 102, userId: 1, restaurantId: 3, totalAmount: 720, orderStatus: "OUT_FOR_DELIVERY", orderDate: "2026-04-08T12:00:00.000+00:00" },
    { orderId: 103, userId: 2, restaurantId: 2, totalAmount: 350, orderStatus: "PREPARING", orderDate: "2026-04-08T13:15:00.000+00:00" },
  ],
  items: [
    { itemId: 1, orderId: 101, name: "Butter Chicken", quantity: 2, price: 180 },
    { itemId: 2, orderId: 101, name: "Garlic Naan", quantity: 4, price: 30 },
    { itemId: 3, orderId: 102, name: "Kung Pao Chicken", quantity: 1, price: 320 },
    { itemId: 4, orderId: 102, name: "Fried Rice", quantity: 2, price: 200 },
  ],
  payments: [
    { paymentId: 1, orderId: 101, amount: 480, paymentMethod: "UPI", paymentStatus: "SUCCESS" },
    { paymentId: 2, orderId: 102, amount: 720, paymentMethod: "CARD", paymentStatus: "PENDING" },
  ],
  deliveries: [
    { deliveryId: 1, orderId: 101, deliveryExecutiveId: 5, estimatedDeliveryTime: "2026-04-07T15:00:00.000+00:00", deliveryStatus: "DELIVERED" },
    { deliveryId: 2, orderId: 102, deliveryExecutiveId: 8, estimatedDeliveryTime: "2026-04-08T12:45:00.000+00:00", deliveryStatus: "ON_THE_WAY" },
  ],
};