import Expense from './models/Expense.js';
import mongoose from 'mongoose';

const expenses = [
	// August 2024
	{
		title: 'Grocery Shopping',
		amount: '150.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-08-05'),
	},
	{
		title: 'Monthly Rent',
		amount: '1200.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-08-01'),
	},
	{
		title: 'Gas Refill',
		amount: '60.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-08-12'),
	},
	{
		title: 'Dinner at Restaurant',
		amount: '80.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-08-20'),
	},
	{
		title: 'Utility Bills',
		amount: '200.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-08-25'),
	},
	// September 2024
	{
		title: 'Grocery Shopping',
		amount: '140.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-09-03'),
	},
	{
		title: 'Gym Membership',
		amount: '50.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-09-10'),
	},
	{
		title: 'Car Maintenance',
		amount: '300.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-09-15'),
	},
	{
		title: 'Books for Study',
		amount: '120.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-09-21'),
	},
	{
		title: 'Monthly Rent',
		amount: '1200.00',
		category: { name: 'not fun', colour: '#33FF57' },
		date: new Date('2024-09-01'),
	},
	// October 2024
	{
		title: 'Halloween Costume',
		amount: '75.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-10-15'),
	},
	{
		title: 'Grocery Shopping',
		amount: '160.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-10-02'),
	},
	{
		title: 'Monthly Rent',
		amount: '1200.00',
		category: { name: 'not fun', colour: '#33FF57' },
		date: new Date('2024-10-01'),
	},
	{
		title: 'Internet Bill',
		amount: '70.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-10-20'),
	},
	{
		title: 'Movie Night',
		amount: '40.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-10-25'),
	},
	// November 2024
	{
		title: 'Black Friday Shopping',
		amount: '500.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-11-29'),
	},
	{
		title: 'Grocery Shopping',
		amount: '130.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-11-05'),
	},
	{
		title: 'Gas Refill',
		amount: '70.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-11-10'),
	},
	{
		title: 'Monthly Rent',
		amount: '1200.00',
		category: { name: 'not fun', colour: '#33FF57' },
		date: new Date('2024-11-01'),
	},
	{
		title: 'Thanksgiving Dinner',
		amount: '300.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-11-24'),
	},
	// December 2024
	{
		title: 'Christmas Gifts',
		amount: '600.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-12-25'),
	},
	{
		title: 'Grocery Shopping',
		amount: '180.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-12-03'),
	},
	{
		title: 'Monthly Rent',
		amount: '1200.00',
		category: { name: 'not fun', colour: '#33FF57' },
		date: new Date('2024-12-01'),
	},
	{
		title: 'New Year Party Supplies',
		amount: '250.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-12-31'),
	},
	{
		title: 'Electricity Bill',
		amount: '90.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-12-10'),
	},
];

async function run() {
	try {
		console.log('Connecting to DB');
		await mongoose.connect(TODO);
		console.log('Deleting expenses');
		await Expense.deleteMany({});
		console.log('Inserting expenses');
		await Expense.insertMany(expenses);
	} catch (e) {
		console.error('Error: ', e);
	} finally {
		mongoose.connection.close();
	}
}

run();
