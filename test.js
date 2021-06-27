import test from "ava";
import { redactTextFromLine } from "./index";

test(`Test with no redactions`, t => {
	const unformattedRedactions = ``;
	const inputLine = `This is text`;
	const redactedText = redactTextFromLine(inputLine, unformattedRedactions);
	t.is(redactedText, inputLine);
});

test(`Test with no input`, t => {
	const unformattedRedactions = `redaction`;
	const inputLine = ``;
	const redactedText = redactTextFromLine(inputLine, unformattedRedactions);
	t.is(redactedText, inputLine);
});

test(`Test with no redactions and no input`, t => {
	const unformattedRedactions = ``;
	const inputLine = ``;
	const redactedText = redactTextFromLine(inputLine, unformattedRedactions);
	t.is(redactedText, inputLine);
});

test(`Test with given example treated literally (aka mixing spaces and commas and using unicode quotes)`, t => {
	const unformattedRedactions = `Hello world “Boston Red Sox”, ‘Pepperoni Pizza’, ‘Cheese Pizza’, beer`;
	const inputLine = `Hello hello world. Hello cruel world, Hello world! The Boston Red Sox ordered a Pepperoni Pizza. No wait, it was actually a Cheese Pizza and Beer branded beer, just like appears in that touching film where the Red and White Sox share a Cheese Pizza.`;
	const redactedText = redactTextFromLine(inputLine, unformattedRedactions);
	t.is(redactedText,
	`XXXX hello XXXX. XXXX cruel XXXX, XXXX XXXX! The XXXX ordered a XXXX. No wait, it was actually a XXXX and Beer branded XXXX, just like appears in that touching film where the Red and White Sox share a XXXX.`);
});

test(`Test with given example treated literally but using non-unicode quotes and apostrophes (aka mixing spaces and commas)`, t => {
	const unformattedRedactions = `Hello world "Boston Red Sox", 'Pepperoni Pizza', 'Cheese Pizza', beer`;
	const inputLine = `Hello hello world. Hello cruel world, Hello world! The Boston Red Sox ordered a Pepperoni Pizza. No wait, it was actually a Cheese Pizza and Beer branded beer, just like appears in that touching film where the Red and White Sox share a Cheese Pizza.`;
	const redactedText = redactTextFromLine(inputLine, unformattedRedactions);
	t.is(redactedText,
	`XXXX hello XXXX. XXXX cruel XXXX, XXXX XXXX! The XXXX ordered a XXXX. No wait, it was actually a XXXX and Beer branded XXXX, just like appears in that touching film where the Red and White Sox share a XXXX.`);
});

test(`Test with given example formatted with commas`, t => {
	const unformattedRedactions = `Hello, world, "Boston Red Sox", 'Pepperoni Pizza', 'Cheese Pizza', beer`;
	const inputLine = `Hello hello world. Hello cruel world, Hello world! The Boston Red Sox ordered a Pepperoni Pizza. No wait, it was actually a Cheese Pizza and Beer branded beer, just like appears in that touching film where the Red and White Sox share a Cheese Pizza.`;
	const redactedText = redactTextFromLine(inputLine, unformattedRedactions);
	t.is(redactedText,
	`XXXX hello XXXX. XXXX cruel XXXX, XXXX XXXX! The XXXX ordered a XXXX. No wait, it was actually a XXXX and Beer branded XXXX, just like appears in that touching film where the Red and White Sox share a XXXX.`);
});

test(`Test with given example formatted with spaces`, t => {
	const unformattedRedactions = `Hello world "Boston Red Sox" 'Pepperoni Pizza' 'Cheese Pizza' beer`;
	const inputLine = `Hello hello world. Hello cruel world, Hello world! The Boston Red Sox ordered a Pepperoni Pizza. No wait, it was actually a Cheese Pizza and Beer branded beer, just like appears in that touching film where the Red and White Sox share a Cheese Pizza.`;
	const redactedText = redactTextFromLine(inputLine, unformattedRedactions);
	t.is(redactedText,
	`XXXX hello XXXX. XXXX cruel XXXX, XXXX XXXX! The XXXX ordered a XXXX. No wait, it was actually a XXXX and Beer branded XXXX, just like appears in that touching film where the Red and White Sox share a XXXX.`);
});

test(`Test for full input match)`, t => {
	const unformattedRedactions = `Hello world "Hello world"`;
	const inputLine = `Hello world`;
	const redactedText = redactTextFromLine(inputLine, unformattedRedactions);
	t.is(redactedText, `XXXX`);
});