"use client"

import React, { useState, useEffect } from 'react'
import { Bell, Home, Package, ShoppingCart, Truck, Users, AlertTriangle, DollarSign, Plus, Droplet, History, BarChart2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Simulated data fetching function
const fetchDashboardData = () => {
  return {
    totalRevenue: Math.floor(Math.random() * 100000) + 40000,
    activeOrders: Math.floor(Math.random() * 1000) + 500,
    inventoryStatus: Math.floor(Math.random() * 30) + 70,
    activeCustomers: Math.floor(Math.random() * 1000) + 2000,
    recentActivity: [
      { type: 'new-order', message: 'New order #1234 received from Customer A' },
      { type: 'delivery-complete', message: 'Delivery completed for order #1230' },
      { type: 'low-stock', message: '20L bottles running low' },
    ],
    alerts: [
      { type: 'critical', message: '5L bottle stock below 10% threshold' },
      { type: 'warning', message: '3 deliveries delayed in Area B' },
      { type: 'info', message: 'New pricing update pending approval' },
    ],
    salesData: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      revenue: Math.floor(Math.random() * 50000) + 30000,
    })),
    products: [
      { id: 1, name: '5L Water Bottle', stock: 500 },
      { id: 2, name: '10L Water Bottle', stock: 300 },
      { id: 3, name: '20L Water Bottle', stock: 200 },
    ],
    fillingHistory: [
      { id: 1, product: '5L Water Bottle', quantity: 100, date: '2023-05-01' },
      { id: 2, product: '10L Water Bottle', quantity: 50, date: '2023-05-02' },
      { id: 3, product: '20L Water Bottle', quantity: 30, date: '2023-05-03' },
    ],
  }
}

export function DashboardComponent() {
  const [dashboardData, setDashboardData] = useState(fetchDashboardData())
  const [activePage, setActivePage] = useState('dashboard')
  const [newProduct, setNewProduct] = useState({ name: '', initialStock: 0 })
  const [fillingStock, setFillingStock] = useState({ productId: '', quantity: 0 })

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDashboardData(fetchDashboardData())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(intervalId)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new-order':
        return <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
      case 'delivery-complete':
        return <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
      case 'low-stock':
        return <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
      default:
        return <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
      case 'info':
        return <AlertTriangle className="h-5 h-5 text-blue-500 mr-2" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500 mr-2" />
    }
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    // Add new product logic here
    console.log('New product added:', newProduct)
    setNewProduct({ name: '', initialStock: 0 })
  }

  const handleFillStock = (e: React.FormEvent) => {
    e.preventDefault()
    // Fill stock logic here
    console.log('Stock filled:', fillingStock)
    setFillingStock({ productId: '', quantity: 0 })
  }

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardData.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{dashboardData.activeOrders}</div>
                  <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inventory Status</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.inventoryStatus}%</div>
                  <Progress value={dashboardData.inventoryStatus} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{dashboardData.activeCustomers}</div>
                  <p className="text-xs text-muted-foreground">+180 new customers this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and Alerts */}
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from the last 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center">
                        {getActivityIcon(activity.type)}
                        <p className="text-sm">{activity.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                  <CardDescription>Issues that need your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.alerts.map((alert, index) => (
                      <div key={index} className="flex items-center">
                        {getAlertIcon(alert.type)}
                        <p className="text-sm">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sales Performance Chart */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Monthly revenue for the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dashboardData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        )
      case 'products':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct}>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter product name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="initialStock">Initial Stock</Label>
                        <Input
                          id="initialStock"
                          type="number"
                          placeholder="Enter initial stock"
                          value={newProduct.initialStock}
                          onChange={(e) => setNewProduct({ ...newProduct, initialStock: Number(e.target.value) })}
                        />
                      </div>
                      <Button type="submit">Add Product</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Fill Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFillStock}>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="productId">Product</Label>
                        <select
                          id="productId"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={fillingStock.productId}
                          onChange={(e) => setFillingStock({ ...fillingStock, productId: e.target.value })}
                        >
                          <option value="">Select a product</option>
                          {dashboardData.products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          placeholder="Enter quantity"
                          value={fillingStock.quantity}
                          onChange={(e) => setFillingStock({ ...fillingStock, quantity: Number(e.target.value) })}
                        />
                      </div>
                      <Button type="submit">Fill Stock</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Stock Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Product</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Current Stock</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {dashboardData.products.map((product) => (
                        <tr key={product.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle  [&:has([role=checkbox])]:pr-0">{product.name}</td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{product.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Filling Stock History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Product</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {dashboardData.fillingHistory.map((entry) => (
                        <tr key={entry.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{entry.date}</td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{entry.product}</td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{entry.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )
      case 'inventory':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Manage your water bottle inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is where you would manage your inventory. You can add, remove, or update stock levels here.</p>
            </CardContent>
          </Card>
        )
      case 'orders':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is where you would manage orders. You can view, update, or process customer orders here.</p>
            </CardContent>
          </Card>
        )
      case 'customers':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>Manage your customer database</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is where you would manage your customers. You can add, update, or view customer information here.</p>
            </CardContent>
          </Card>
        )
      case 'deliveries':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Delivery Management</CardTitle>
              <CardDescription>Track and manage deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is where you would manage deliveries. You can schedule, track, or update delivery information here.</p>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">WaterTrack</h2>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActivePage('dashboard')}
            className={`flex items-center px-4 py-2 w-full text-left ${
              activePage === 'dashboard' ? 'text-gray-700 bg-gray-200' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Home className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActivePage('products')}
            className={`flex items-center px-4 py-2 mt-2 w-full text-left ${
              activePage === 'products' ? 'text-gray-700 bg-gray-200' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Package className="w-5 h-5 mr-2" />
            Products
          </button>
          <button
            onClick={() => setActivePage('inventory')}
            className={`flex items-center px-4 py-2 mt-2 w-full text-left ${
              activePage === 'inventory' ? 'text-gray-700 bg-gray-200' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Package className="w-5 h-5 mr-2" />
            Inventory
          </button>
          <button
            onClick={() => setActivePage('orders')}
            className={`flex items-center px-4 py-2 mt-2 w-full text-left ${
              activePage === 'orders' ? 'text-gray-700 bg-gray-200' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Orders
          </button>
          <button
            onClick={() => setActivePage('customers')}
            className={`flex items-center px-4 py-2 mt-2 w-full text-left ${
              activePage === 'customers' ? 'text-gray-700 bg-gray-200' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            Customers
          </button>
          <button
            onClick={() => setActivePage('deliveries')}
            className={`flex items-center px-4 py-2 mt-2 w-full text-left ${
              activePage === 'deliveries' ? 'text-gray-700 bg-gray-200' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Truck className="w-5 h-5 mr-2" />
            Deliveries
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h1>
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="mr-2">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}