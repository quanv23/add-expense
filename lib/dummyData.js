import Expense from './models/Expense.js';
import mongoose from 'mongoose';

const expenses = [
	// August 2024
	{
		title: 'Movie Night',
		amount: '34.50',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-08-05T14:23:12'),
		type: 'income',
	},
	{
		title: 'Concert Tickets',
		amount: '75.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-08-12T18:45:33'),
		type: 'income',
	},
	{
		title: 'Ice Cream',
		amount: '-12.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-08-19T10:15:48'),
		type: 'expense',
	},
	{
		title: 'Museum Visit',
		amount: '20.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-08-25T16:00:00'),
		type: 'income',
	},
	{
		title: 'Park Snacks',
		amount: '9.50',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-08-30T20:30:25'),
		type: 'income',
	},
	// September 2024
	{
		title: 'Zoo Tickets',
		amount: '-50.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-09-03T11:20:55'),
		type: 'expense',
	},
	{
		title: 'Comedy Show',
		amount: '40.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-09-10T19:05:15'),
		type: 'income',
	},
	{
		title: 'Board Games',
		amount: '30.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-09-17T13:45:00'),
		type: 'income',
	},
	{
		title: 'Arcade Games',
		amount: '-25.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-09-22T15:20:10'),
		type: 'expense',
	},
	{
		title: 'Pool Party',
		amount: '60.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-09-29T18:50:00'),
		type: 'income',
	},
	// October 2024
	{
		title: 'Pumpkin Patch',
		amount: '35.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-10-05T13:00:00'),
		type: 'income',
	},
	{
		title: 'Haunted House',
		amount: '-45.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-10-12T20:30:45'),
		type: 'expense',
	},
	{
		title: 'Apple Picking',
		amount: '25.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-10-18T11:15:30'),
		type: 'income',
	},
	{
		title: 'Costume Party',
		amount: '50.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-10-23T19:45:50'),
		type: 'income',
	},
	{
		title: 'Corn Maze',
		amount: '-30.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-10-28T17:10:00'),
		type: 'expense',
	},
	// November 2024
	{
		title: 'Thanksgiving Dinner',
		amount: '75.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-11-04T18:30:00'),
		type: 'income',
	},
	{
		title: 'Black Friday Shopping',
		amount: '150.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-11-10T09:00:15'),
		type: 'income',
	},
	{
		title: 'Charity Event',
		amount: '50.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-11-15T20:45:30'),
		type: 'income',
	},
	{
		title: 'Potluck Party',
		amount: '-20.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-11-22T14:25:40'),
		type: 'expense',
	},
	{
		title: 'Game Night',
		amount: '15.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-11-29T21:10:50'),
		type: 'income',
	},
	// December 2024
	{
		title: 'Christmas Gifts',
		amount: '-200.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-12-05T11:50:00'),
		type: 'expense',
	},
	{
		title: 'Holiday Dinner',
		amount: '100.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-12-10T19:30:10'),
		type: 'income',
	},
	{
		title: 'Winter Wonderland',
		amount: '50.00',
		category: { name: 'not fun', colour: '#38b6ff' },
		date: new Date('2024-12-15T17:25:40'),
		type: 'income',
	},
	{
		title: 'Ice Skating',
		amount: '-30.00',
		category: { name: 'fun', colour: '#ff5757' },
		date: new Date('2024-12-20T15:40:00'),
		type: 'expense',
	},
	{
		title: "New Year's Eve Party",
		amount: '75.00',
		category: { name: 'super fun', colour: '#ffde59' },
		date: new Date('2024-12-31T23:45:10'),
		type: 'income',
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
