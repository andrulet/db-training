'use strict';

/********************************************************************************************
 *                                                                                          *
 * The goal of the task is to get basic knowledge of SQL functions and                      *
 * approaches to work with data in SQL.                                                     *
 * https://dev.mysql.com/doc/refman/5.7/en/function-reference.html                          *
 *                                                                                          *
 * The course do not includes basic syntax explanations. If you see the SQL first time,     *
 * you can find explanation and some trainings at W3S                                       *
 * https://www.w3schools.com/sql/sql_syntax.asp                                             *
 *                                                                                          *
 ********************************************************************************************/


/**
 *  Create a SQL query to return next data ordered by city and then by name:
 * | Employy Id | Employee Full Name | Title | City |
 *
 * @return {array}
 *
 */
async function task_1_1(db) {
    // The first task is example, please follow the style in the next functions.
    let result = await db.query(`
        SELECT
           EmployeeID as "Employee Id",
           CONCAT(FirstName, ' ', LastName) AS "Employee Full Name",
           Title as "Title",
           City as "City"
        FROM Employees
        ORDER BY City, "Employee Full Name"
    `);
    return result[0];
}

/**
 *  Create a query to return an Order list ordered by order id descending:
 * | Order Id | Order Total Price | Total Order Discount, % |
 *
 * NOTES: Discount in OrderDetails is a discount($) per Unit.
 * @return {array}
 *
 */
async function task_1_2(db) {
    let result = await db.query(`
        select
	        OrderID as "Order Id",
            UnitPrice * Quantity as "Order Total Price",
            round((Discount/UnitPrice) * 100, 2) as "Total Order Discount, %"
        from orderdetails
        order by "Order Id" desc;
    `);
    return result[0];
}

/**
 *  Create a query to return all customers from USA without Fax:
 * | CustomerId | CompanyName |
 *
 * @return {array}
 *
 */
async function task_1_3(db) {
    let result = await db.query(`
        select
	        CustomerID, CompanyName
            from customers
            where Country = 'USA' and Fax is null;
    `);
    return result[0];
}

/**
 * Create a query to return:
 * | Customer Id | Total number of Orders | % of all orders |
 *
 * order data by % - higher percent at the top, then by CustomerID asc
 *
 * @return {array}
 *
 */
async function task_1_4(db) {
    let result = await db.query(`
        select
	        CustomerID,
            sum(Quantity) as 'Total number of Orders',
            sum(Quantity)/(select sum(Quantity) from orderdetails) * 100 as '% of all orders'
        from orderdetails
        join orders on orders.OrderID = orderdetails.OrderID
        group by CustomerID
        order by '% of all orders' desc, CustomerID asc
    `);
    return result[0];
}

/**
 * Return all products where product name starts with 'A', 'B', .... 'F' ordered by name.
 * | ProductId | ProductName | QuantityPerUnit |
 *
 * @return {array}
 *
 */
async function task_1_5(db) {
    let result = await db.query(`
        select
	        ProductID,
            ProductName,
            QuantityPerUnit
        from products
        where ProductName regexp '^A|^B|^C|^D|^E|^F'
    `);
    return result[0];
}

/**
 *
 * Create a query to return all products with category and supplier company names:
 * | ProductName | CategoryName | SupplierCompanyName |
 *
 * Order by ProductName then by SupplierCompanyName
 * @return {array}
 *
 */
async function task_1_6(db) {
    let result = await db.query(`
        select
	        ProductName,
            CategoryName,
            suppliers.CompanyName as 'SupplierCompanyName'
        from products
        join categories on products.CategoryID = categories.CategoryID
        join suppliers on products.SupplierID = suppliers.SupplierID
        order by ProductName, 'SupplierCompanyName';
    `);
    return result[0];
}

/**
 *
 * Create a query to return all employees and full name of person to whom this employee reports to:
 * | EmployeeId | FullName | ReportsTo |
 *
 * Order data by EmployeeId.
 * Reports To - Full name. If the employee does not report to anybody leave "-" in the column.
 * @return {array}
 *
 */
async function task_1_7(db) {
    let result = await db.query(`
        select
	        EmployeeID,
            concat(FirstName, ' ', LastName) as FullName,
            ifnull((select FullName from employees where Em.ReportsTo = EmployeeID), '-') as ReportsTo
        from employees as Em;
    `);
    return result[0];
}

/**
 *
 * Create a query to return:
 * | CategoryName | TotalNumberOfProducts |
 *
 * @return {array}
 *
 */
async function task_1_8(db) {
    let result = await db.query(`
        select
	        CategoryName,
            count(ProductName) as TotalNumberOfProducts
        from products
        join categories on categories.CategoryID = products.CategoryID
        group by CategoryName;
    `);
    return result[0];
}

/**
 *
 * Create a SQL query to find those customers whose contact name containing the 1st character is 'F' and the 4th character is 'n' and rests may be any character.
 * | CustomerID | ContactName |
 *
 * @return {array}
 *
 */
async function task_1_9(db) {
    let result = await db.query(`
        select
	        CustomerID,
            ContactName
        from customers
        where ContactName regexp '^F' and substring(ContactName, 4, 1) = 'n';
    `);
    return result[0];
}

/**
 * Write a query to get discontinued Product list:
 * | ProductID | ProductName |
 *
 * @return {array}
 *
 */
async function task_1_10(db) {
    let result = await db.query(`
        select
	        ProductID,
            ProductName
        from products
        where Discontinued = 1;
    `);
    return result[0];
}

/**
 * Create a SQL query to get Product list (name, unit price) where products cost between $5 and $15:
 * | ProductName | UnitPrice |
 *
 * Order by UnitPrice then by ProductName
 *
 * @return {array}
 *
 */
async function task_1_11(db) {
    let result = await db.query(`
        select
            ProductName,
            UnitPrice
        from products
        where UnitPrice between 5 and 15;
    `);
    return result[0];
}

/**
 * Write a SQL query to get Product list of twenty most expensive products:
 * | ProductName | UnitPrice |
 *
 * Order products by price then by ProductName.
 *
 * @return {array}
 *
 */
async function task_1_12(db) {
    let result = await db.query(`
        select
	        ProductName,
            UnitPrice
        from products
        order by UnitPrice desc
        limit 20;
    `);
    return result[0];
}

/**
 * Create a SQL query to count current and discontinued products:
 * | TotalOfCurrentProducts | TotalOfDiscontinuedProducts |
 *
 * @return {array}
 *
 */
async function task_1_13(db) {
    let result = await db.query(`
        select
	        count(Discontinued) as 'TotalOfCurrentProducts',
            (select count(Discontinued) - 'TotalOfCurrentProducts' from products where Discontinued = 1) as 'TotalOfDiscontinuedProducts'
	    from products
        where Discontinued = 0;
    `);
    return result[0];
}

/**
 * Create a SQL query to get Product list of stock is less than the quantity on order:
 * | ProductName | UnitsOnOrder| UnitsInStock |
 *
 * @return {array}
 *
 */
async function task_1_14(db) {
    let result = await db.query(`
        select
	        ProductName,
            UnitsOnOrder,
            UnitsInStock
        from products
        where UnitsInStock < UnitsOnOrder;
    `);
    return result[0];
}

/**
 * Create a SQL query to return the total number of orders for every month in 1997 year:
 * | January | February | March | April | May | June | July | August | September | November | December |
 *
 * @return {array}
 *
 */
async function task_1_15(db) {
    let result = await db.query(`
        select
	        (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '01') as 'January',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '02') as 'February',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '03') as 'March',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '04') as 'April',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '05') as 'May',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '06') as 'June',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '07') as 'July',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '08') as 'August',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '09') as 'September',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '10') as 'October',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '11') as 'November',
            (select count(OrderDate) from orders where EXTRACT(year from OrderDate) = '1997' and EXTRACT( month from OrderDate) = '12') as 'December'
        from orders
        limit 1
    `);
    return result[0];
}

/**
 * Create a SQL query to return all orders where ship postal code is provided:
 * | OrderID | CustomerID | ShipCountry |
 *
 * @return {array}
 *
 */
async function task_1_16(db) {
    let result = await db.query(`
        select
	        OrderID,
            CustomerID,
            ShipCountry
        from orders
        where not ShipPostalCode is null;
    `);
    return result[0];
}

/**
 * Create SQL query to display the average price of each categories's products:
 * | CategoryName | AvgPrice |
 *
 * @return {array}
 *
 * Order by AvgPrice descending then by CategoryName
 *
 */
async function task_1_17(db) {
    let result = await db.query(`
        select
	        CategoryName,
	        avg(UnitPrice) as 'AvgPrice'
        from products
        join categories on products.CategoryID = categories.CategoryID
        group by CategoryName
        order by 'AvgPrice' desc, CategoryName;
    `);
    return result[0];
}

/**
 * Create a SQL query to calcualte total orders count by each day in 1998:
 * | OrderDate | Total Number of Orders |
 *
 * OrderDate needs to be in the format '%Y-%m-%d %T'
 * @return {array}
 *
 */
async function task_1_18(db) {
    let result = await db.query(`
        select
	        distinct DATE_FORMAT(OrderDate, '%Y-%m-%d %T') as 'OrderDate',
            count(*) as 'Total Number of Orders'
        from orders
        where year(OrderDate) = '1998'
        group by OrderDate;
    `);
    return result[0];
}

/**
 * Create a SQL query to display customer details whose total orders amount is more than 10000$:
 * | CustomerID | CompanyName | TotalOrdersAmount, $ |
 *
 * Order by "TotalOrdersAmount, $" descending then by CustomerID
 * @return {array}
 *
 */
async function task_1_19(db) {
    let result = await db.query(`
        select
	        CustomerID,
            (select CompanyName from customers where customers.CustomerID = orders.CustomerID) as 'CompanyName',
            sum(UnitPrice * Quantity) as 'TotalOrdersAmount, $'
        from orderdetails
        join orders on orders.OrderID = orderdetails.OrderID
        group by CustomerID
        having sum(UnitPrice * Quantity) > 10000
        order by sum(UnitPrice * Quantity) desc, CustomerID
    `);
    return result[0];
}

/**
 *
 * Create a SQL query to find the employee that sold products for the largest amount:
 * | EmployeeID | Employee Full Name | Amount, $ |
 *
 * @return {array}
 *
 */
async function task_1_20(db) {
    let result = await db.query(`
        select
	        EmployeeID,
            (select concat(FirstName, ' ', LastName) from employees where EmployeeID = orders.EmployeeID) as 'Employee Full Name',
	        sum(UnitPrice * Quantity) as 'Amount, $'
        from orderdetails
        join orders on orderdetails.OrderID = orders.OrderID
        group by EmployeeID
        order by sum(UnitPrice * Quantity) desc
        limit 1
    `);
    return result[0];
}

/**
 * Write a SQL statement to get the maximum purchase amount of all the orders.
 * | OrderID | Maximum Purchase Amount, $ |
 *
 * @return {array}
 */
async function task_1_21(db) {
    let result = await db.query(`
        select
	        OrderID,
            ((UnitPrice - Discount) * Quantity) as 'Maximum Purchase Amount, $'
        from orderdetails
        order by (UnitPrice - Discount) * Quantity desc
        limit 1
    `);
    return result[0];
}

/**
 * Create a SQL query to display the name of each customer along with their most expensive purchased product:
 * | CompanyName | ProductName | PricePerItem |
 *
 * order by PricePerItem descending and them by CompanyName and ProductName acceding
 * @return {array}
 */
async function task_1_22(db) {
    let result = await db.query(`
        select
	        CompanyName,
            (select ProductName from products where orderdetails.ProductID = products.ProductID) as ProductName,
	        max(UnitPrice) as PricePerItem
        from orders
        join orderdetails on orderdetails.OrderID = orders.OrderID
        join customers on customers.CustomerID = orders.CustomerID
        group by CompanyName
        order by PricePerItem desc, CompanyName, PricePerItem asc
    `);
    return result[0];
}

module.exports = {
    task_1_1: task_1_1,
    task_1_2: task_1_2,
    task_1_3: task_1_3,
    task_1_4: task_1_4,
    task_1_5: task_1_5,
    task_1_6: task_1_6,
    task_1_7: task_1_7,
    task_1_8: task_1_8,
    task_1_9: task_1_9,
    task_1_10: task_1_10,
    task_1_11: task_1_11,
    task_1_12: task_1_12,
    task_1_13: task_1_13,
    task_1_14: task_1_14,
    task_1_15: task_1_15,
    task_1_16: task_1_16,
    task_1_17: task_1_17,
    task_1_18: task_1_18,
    task_1_19: task_1_19,
    task_1_20: task_1_20,
    task_1_21: task_1_21,
    task_1_22: task_1_22
};