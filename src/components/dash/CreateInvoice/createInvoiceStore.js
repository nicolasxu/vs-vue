export default {
  headers: ['#', 'Description', 'Unit Price', 'Quantity', 'Sub Total'],
  rows: [
          [1, 'product A', 10, 2, 20], 
          [2, 'product B', 15, 3, 45], 
          [3, 'Service 1', 50, 1.5, 75.0]
        ],
  rows2: [
    { description: 'product A', unitPrice: 33, quantity: 3, subTotal: 99},
    { description: 'product A', unitPrice: 12, quantity: 3, subTotal: 99},
    { description: 'product A', unitPrice: 5, quantity: 3, subTotal: 99},
    { description: 'product A', unitPrice: 99, quantity: 3, subTotal: 99},
    { description: 'product A', unitPrice: 200, quantity: 3, subTotal: 99},
    { description: 'product A', unitPrice: 150, quantity: 3, subTotal: 99}
  ]
}